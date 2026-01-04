import geopandas as gpd
import pandas as pd
import json

# Target SVG size for the dashboard map
SVG_WIDTH = 1000
SVG_HEIGHT = 800

def normalize_coords(gdf, width, height):
    """Convert Lat/Lon to 0-1000 SVG coordinate space"""
    minx, miny, maxx, maxy = gdf.total_bounds
    x_range = maxx - minx
    y_range = maxy - miny
    
    # Preserve aspect ratio
    scale_x = width / x_range
    scale_y = height / y_range
    scale = min(scale_x, scale_y)
    
    # Center the map
    x_offset = (width - (x_range * scale)) / 2
    y_offset = (height - (y_range * scale)) / 2

    def transform_point(x, y):
        # Flip Y axis because SVG y increases downwards
        return (
            x_offset + (x - minx) * scale,
            height - (y_offset + (y - miny) * scale)
        )
    return transform_point

def geom_to_svg_path(geom, transform_func):
    """Convert a Polygon/MultiPolygon to an SVG Path string"""
    paths = []
    
    if geom.geom_type == 'Polygon':
        geoms = [geom]
    elif geom.geom_type == 'MultiPolygon':
        geoms = geom.geoms
    else:
        return ""

    for poly in geoms:
        if poly.is_empty: continue
        coords = list(poly.exterior.coords)
        pts = [transform_func(x, y) for x, y in coords]
        # Create "M x,y L x,y L x,y Z" string
        path_str = "M" + " ".join([f"{x:.1f},{y:.1f}" for x, y in pts]) + "Z"
        paths.append(path_str)
        
    return " ".join(paths)

def main():
    print("Loading files...")
    # 1. Load Data
    try:
        brgy_gdf = gpd.read_file('FINAL_Reprojected_Complete_BrgyBnd.gpkg')
        points_gdf = gpd.read_file('polangui_flood_sample_points.gpkg')
        csv_df = pd.read_csv('choropleth_summary_C5_mean.csv')
    except Exception as e:
        print(f"Error loading files: {e}")
        return

    # 2. Ensure CRS is Lat/Lon (EPSG:4326)
    if brgy_gdf.crs != 'EPSG:4326':
        brgy_gdf = brgy_gdf.to_crs('EPSG:4326')
    if points_gdf.crs != 'EPSG:4326':
        points_gdf = points_gdf.to_crs('EPSG:4326')

    # 3. Setup Coordinate Transformer based on Barangay bounds
    transform = normalize_coords(brgy_gdf, SVG_WIDTH, SVG_HEIGHT)

    # 4. Process Barangays
    print("Processing Barangays...")
    
    # Normalize names for merging
    brgy_gdf['match_name'] = brgy_gdf.iloc[:, 0].astype(str).str.upper().str.strip() 
    csv_df['match_name'] = csv_df['barangay_normalized'].astype(str).str.upper().str.strip()
    
    # Merge susceptibility data
    merged = brgy_gdf.merge(csv_df, on='match_name', how='left')
    
    barangay_output = []
    for idx, row in merged.iterrows():
        path = geom_to_svg_path(row.geometry, transform)
        
        # Get Centroid for labels
        cx, cy = transform(row.geometry.centroid.x, row.geometry.centroid.y)
        
        barangay_output.append({
            "id": idx,
            "name": row['match_name'].title(),
            "path": path,
            "susceptibility": row['susceptibility'] if pd.notnull(row['susceptibility']) else None,
            "label_x": round(cx, 1),
            "label_y": round(cy, 1)
        })

    # 5. Process Points (Sample 300 to avoid lagging the browser)
    print("Processing Points...")
    if len(points_gdf) > 300:
        points_gdf = points_gdf.sample(300)
        
    points_output = []
    for idx, row in points_gdf.iterrows():
        px, py = transform(row.geometry.x, row.geometry.y)
        points_output.append({
            "id": idx,
            "x": round(px, 1),
            "y": round(py, 1),
        })

    # 6. Save to JSON
    output = {
        "barangays": barangay_output,
        "points": points_output
    }
    
    with open('map_data.json', 'w') as f:
        json.dump(output, f)
        
    print("Success! Created 'map_data.json'. Copy the contents into your React code.")

if __name__ == "__main__":
    main()