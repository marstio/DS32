# DS32: Flood Susceptibility Modeling for Polangui

**University of Santo Tomas | College of Information and Computing Sciences**

> **[Live Systems Demo](https://www.google.com/search?q=https://marstio.github.io/DS32/)** — Scan the QR code or click the link to view the interactive dashboard.

## 👥 The Team

- **Raul Sebastien Baldemoro**
- **Zeandarra Gaile Giva**
- **Loryne Ritcel Laron**
- **Julian Gabriel Ramirez**

---

## 📖 Project Overview

A comprehensive data science project for predicting flood recurrence and susceptibility in Polangui, Albay, using machine learning and geospatial analysis. This project addresses spatial bias in environmental modeling by evaluating standard and spatial-aware algorithms.

### Key Features

- **Multi-Source Integration:** Combines temporal flood evacuee records with high-resolution geospatial rasters.
- **Advanced Feature Engineering:** Extraction of terrain, hydrological, and anthropogenic factors.
- **Spatial Autocorrelation Testing:** Rigorous statistical validation using Moran's I and permutation tests.
- **Interactive Visualization:** A React-based dashboard for communicating risk and model findings.

---

## 📂 Folder Structure

```text
DS32/
├── Pre-processing/
│   ├── Matrix_Making_Cleaned.ipynb      # Final data preparation pipeline
│   ├── Explanatory Factors/             # Geospatial raw data (Rasters/Vectors)
│   │   ├── Anthropogenic/               # Population density, roads, NDBI
│   │   ├── Climactic/                   # Rainfall data (CHIRPS)
│   │   ├── Geomorphic/                  # Elevation, Slope, TWI, Flow Length
│   │   ├── Hydrological/                # Drainage and Stream Density
│   │   └── Land Cover and Vegetation/   # LULC and NDVI indices
│   └── Outputs/                         # Generated datasets for Model Training
│
├── ModelTraining/
│   ├── ModelsNotebook.ipynb             # Training (Baseline, Hybrid, Spatial)
│   └── statistical_results/             # Evaluation metrics and Moran's I results
│
├── SystemsDemo/
│   ├── tdasher-app/                     # React/Vite source code for dashboard
│   └── output_scripts_data/             # Processed JSON/CSV for visualization
│
├── .github/workflows/deploy.yaml        # Automated CI/CD for GitHub Pages
├── .gitignore                           # Excludes node_modules and temp files
└── README.md                            # You are here

```

---

## 🚀 Getting Started

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/marstio/DS32.git
cd DS32

```

2. **Setup Environment:**
   Ensure you have Python 3.10+ installed. It is recommended to use a virtual environment.

```bash
pip install -r requirements.txt

```

### Running the Pipeline

1. **Preprocessing:** Run `Pre-processing/Matrix_Making_Cleaned.ipynb` to generate the point-level dataset from raw rasters.
2. **Modeling:** Run `ModelTraining/ModelsNotebook.ipynb` to evaluate the 5 condition variants (C1–C5).
3. **Local Dashboard:** Navigate to `SystemsDemo/tdasher-app`, run `npm install`, then `npm run dev`.

---

## 📊 Geospatial Data Dictionary

The model utilizes high-resolution environmental variables. Some files exceed 50MB but are included to ensure full reproducibility of the feature extraction process.

| Factor              | Type   | Description                                                     |
| ------------------- | ------ | --------------------------------------------------------------- |
| **ELEVATION/SLOPE** | Raster | Derived from SRTM DEM; dictates water accumulation.             |
| **TWI**             | Raster | Topographic Wetness Index; indicates soil saturation potential. |
| **NDBI / NDVI**     | Raster | Built-up vs. Vegetation indices (2014-2023).                    |
| **STREAM DENSITY**  | Raster | Calculated via drainage density per .                           |
| **POP DENSITY**     | Raster | Anthropogenic exposure metric (Census 2020).                    |

---

## 🤖 Model Variants (C1 - C5)

To address spatial dependency, we evaluate five experimental conditions:

- **C1 (Baseline):** Standard Random Forest/XGBoost.
- **C2/C3 (Spatial-Weighted):** Integration of neighborhood weights.
- **C4 (Lagged Features):** Models incorporating spatial lag variables.
- **C5 (Hybrid Ensemble):** Our custom approach for optimized flood susceptibility prediction.

---

## 🛠 Tech Stack

- **Data Science:** Python (GeoPandas, Rasterio, Scikit-Learn, XGBoost, PySAL)
- **Frontend:** React, Tailwind CSS, Lucide
- **Deployment:** GitHub Actions & Vite

---

**Last Updated:** January 4, 2026

**Status:** Successfully Deployed & Finalized for Submission

---
