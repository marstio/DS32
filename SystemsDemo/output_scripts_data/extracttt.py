import pandas as pd
import json

# 1. Load 
try:
    df = pd.read_csv('final_polangui_cascading_cleaned.csv')
    print("✅ File loaded successfully.")
except FileNotFoundError:
    print("❌ Error: File not found. Please check the filename.")
    exit()

# 2. Clean and Normalize Data
df.columns = df.columns.str.strip()

# 3. Group by BARANGAY_NAME 
grouped = df.groupby('BARANGAY_NAME').agg({
    'POP_DENSITY': 'max',       # Static value
    'ANNUAL_RAINFALL': 'mean',  # Average over the years
    'SLOPE': 'mean',            
    'ELEVATION': 'mean'         
}).reset_index()

output_list = []

# 4. Generate JSON
for index, row in grouped.iterrows():
    
    # context string
    desc = f"Avg Elev: {row['ELEVATION']:.1f}m, Rainfall: {row['ANNUAL_RAINFALL']:.0f}mm. "
    if row['SLOPE'] > 15:
        desc += "Steep terrain, high landslide risk."
    elif row['ELEVATION'] < 10:
        desc += "Low-lying area, potential flood risk."
    else:
        desc += "Moderate terrain characteristics."

    barangay_obj = {
        "name": row['BARANGAY_NAME'], 
        "pop": int(row['POP_DENSITY']), 
        "rainfall": round(row['ANNUAL_RAINFALL'], 1),
        "description": desc
    }
    output_list.append(barangay_obj)

print("\n✅ PROCESSING COMPLETE. Copy the array below:\n")
print(json.dumps(output_list, indent=2))

with open('barangay_data_output.json', 'w') as f:
    json.dump(output_list, f, indent=2)
