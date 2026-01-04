import React, { useState, useEffect } from "react";
import {
  Map,
  BarChart3,
  Info,
  Layers,
  MapPin,
  Maximize2,
  AlertTriangle,
  Droplets,
  Mountain,
  Wind,
  Activity,
  ChevronRight,
  ThermometerSun,
  Trees,
  FileText,
  Lightbulb,
  Shield,
  Scan,
  Cpu,
  Users,
} from "lucide-react";

const SusceptibilityDashboard = () => {
  const [activeView, setActiveView] = useState("polygons");
  const [selectedZone, setSelectedZone] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // animations on mount
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Data for Polangui Barangays
  const barangayData = [
    {
      id: 1,
      name: "Centro Occidental",
      risk: 0.65,
      pop: 3420,
      coords: { top: "40%", left: "45%" },
      susceptibility: "Very High",
      desc: "Located in the high-density poblacion area. Drainage capacity is frequently overwhelmed during heavy rainfall events, leading to urban flooding risks.",
    },
    {
      id: 2,
      name: "Basud",
      risk: 0.55,
      pop: 2100,
      coords: { top: "55%", left: "50%" },
      susceptibility: "High",
      desc: "Situated along the major river tributary. The soil composition here shows high saturation potential, increasing vulnerability during monsoon seasons.",
    },
    {
      id: 3,
      name: "Kinale",
      risk: 0.82,
      pop: 1500,
      coords: { top: "25%", left: "60%" },
      susceptibility: "Very High",
      desc: "A low-lying agricultural zone acting as a catch basin for runoff from surrounding highlands. Critical attention required for flood mitigation.",
    },
    {
      id: 4,
      name: "Maguran",
      risk: 0.35,
      pop: 1200,
      coords: { top: "30%", left: "30%" },
      susceptibility: "Moderate",
      desc: "Transitional zone with moderate slopes. Erosion markers have been observed near road networks, though immediate landslide risk remains managed.",
    },
    {
      id: 5,
      name: "Ponso",
      risk: 0.15,
      pop: 980,
      coords: { top: "60%", left: "20%" },
      susceptibility: "Low",
      desc: "High elevation area with stable bedrock and dense vegetation cover. Serves as a natural watershed with minimal susceptibility to mass movement.",
    },
    {
      id: 6,
      name: "Matacon",
      risk: 0.25,
      pop: 4500,
      coords: { top: "15%", left: "25%" },
      susceptibility: "Moderate",
      desc: "Mixed-use area with rolling terrain. Development has encroached on some slope areas, slightly elevating the risk profile compared to previous years.",
    },
    {
      id: 7,
      name: "Santicon",
      risk: 0.05,
      pop: 800,
      coords: { top: "70%", left: "75%" },
      susceptibility: "Very Low",
      desc: "Predominantly forest reserve with very low anthropogenic intervention. The natural topography provides excellent drainage and slope stability.",
    },
    {
      id: 8,
      name: "Lanigay",
      risk: 0.45,
      pop: 1890,
      coords: { top: "45%", left: "65%" },
      susceptibility: "High",
      desc: "Characterized by steep slopes >30 degrees. Soil cohesion analysis suggests potential instability during prolonged precipitation events.",
    },
    {
      id: 9,
      name: "Balangibang",
      risk: 0.18,
      pop: 2200,
      coords: { top: "50%", left: "35%" },
      susceptibility: "Low",
      desc: "Flat terrain with established drainage infrastructure. Historical data shows minimal impact from severe weather events over the last decade.",
    },
  ];

  // Feature Importance Data with gradient colors
  const features = [
    {
      name: "Elevation / Slope",
      value: 85,
      color: "from-emerald-500 to-teal-600",
      icon: <Mountain size={18} />,
    },
    {
      name: "Proximity to River",
      value: 72,
      color: "from-cyan-500 to-blue-600",
      icon: <Droplets size={18} />,
    },
    {
      name: "Rainfall Intensity",
      value: 65,
      color: "from-blue-500 to-indigo-600",
      icon: <Wind size={18} />,
    },
    {
      name: "Land Use / Cover",
      value: 45,
      color: "from-amber-500 to-orange-600",
      icon: <Trees size={18} />,
    },
    {
      name: "Soil Composition",
      value: 30,
      color: "from-stone-500 to-neutral-600",
      icon: <Activity size={18} />,
    },
  ];

  const getRiskGradient = (val) => {
    if (val === 0.0) return "from-sky-400 to-sky-600";
    if (val > 0.0 && val <= 0.2) return "from-emerald-400 to-emerald-600";
    if (val > 0.2 && val <= 0.4) return "from-amber-400 to-amber-600";
    if (val > 0.4 && val <= 0.6) return "from-orange-400 to-orange-600";
    if (val > 0.6) return "from-red-500 to-red-700";
    return "from-gray-300 to-gray-500";
  };

  const getRiskBorder = (val) => {
    if (val === 0.0) return "border-sky-500";
    if (val > 0.0 && val <= 0.2) return "border-emerald-500";
    if (val > 0.2 && val <= 0.4) return "border-amber-500";
    if (val > 0.4 && val <= 0.6) return "border-orange-500";
    if (val > 0.6) return "border-red-600";
    return "border-gray-400";
  };

  const getRiskText = (val) => {
    if (val === 0.0) return "text-sky-600";
    if (val > 0.0 && val <= 0.2) return "text-emerald-700";
    if (val > 0.2 && val <= 0.4) return "text-amber-700";
    if (val > 0.4 && val <= 0.6) return "text-orange-700";
    if (val > 0.6) return "text-red-700";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden flex flex-col selection:bg-cyan-100 selection:text-cyan-900">
      {/* --- Header --- */}
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left: Title & Description */}
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-700 shrink-0 hidden sm:block">
                <Map size={28} className="text-cyan-400" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    Polangui Geospatial Analytics
                  </h1>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 uppercase tracking-wide flex items-center gap-1.5 w-fit">
                    <Cpu size={12} /> Cascading Hybrid Model
                  </span>
                </div>
                <p className="text-slate-400 text-sm max-w-xl leading-relaxed font-light">
                  Specialized susceptibility assessment for the First Class
                  Municipality of Polangui, Albay, utilizing advanced
                  topographical risk modeling.
                </p>
              </div>
            </div>

            {/* Right: Group no.*/}
            <div className="flex flex-col items-end gap-2 shrink-0 self-start md:self-center">
              <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-2 hover:bg-slate-700 transition-colors cursor-default">
                <Users size={14} className="text-cyan-500" /> Group DS32
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
        {/* --- KPI Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              label: "Avg Susceptibility",
              val: "0.42",
              sub: "Moderate Risk",
              icon: <ThermometerSun size={20} />,
              color: "text-amber-600",
              accent: "border-amber-500",
              bgIcon: "bg-amber-100",
            },
            {
              label: "High Risk Barangays",
              val: "8",
              sub: "Critical Attention",
              icon: <AlertTriangle size={20} />,
              color: "text-red-600",
              accent: "border-red-500",
              bgIcon: "bg-red-100",
            },
            {
              label: "Total Land Area",
              val: "390.2",
              sub: "Square Kilometers",
              icon: <Scan size={20} />,
              color: "text-cyan-700",
              accent: "border-cyan-500",
              bgIcon: "bg-cyan-100",
            },
            {
              label: "Explanatory Factors",
              val: "5",
              sub: "Diagnostic Model",
              icon: <Layers size={20} />,
              color: "text-emerald-600",
              accent: "border-emerald-500",
              bgIcon: "bg-emerald-100",
            },
          ].map((kpi, idx) => (
            <div
              key={idx}
              className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 ${kpi.accent}`}
              ></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {kpi.label}
                  </p>
                  <h3 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                    {kpi.val}
                  </h3>
                  <p
                    className={`text-sm mt-1 font-semibold ${kpi.color} flex items-center gap-1`}
                  >
                    {kpi.sub}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${kpi.bgIcon} ${kpi.color} shadow-inner`}
                >
                  {kpi.icon}
                </div>
              </div>
              {/* Decorative background blob */}
              <div
                className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-5 ${kpi.accent.replace(
                  "border-",
                  "bg-"
                )}`}
              ></div>
            </div>
          ))}
        </div>

        {/* --- Main Grid: Features & Map --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto items-start">
          {/* LEFT: Feature Importance (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 h-full">
              <div className="flex items-center gap-3 mb-8">
                {/* Icon Updated to match KPI style */}
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-inner">
                  <BarChart3 size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Feature Importance
                </h2>
              </div>

              <p className="text-sm text-slate-500 mb-8 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                Relative significance of variables in the susceptibility model,
                refined through{" "}
                <span className="font-semibold text-cyan-700">
                  diagnostic residual analysis
                </span>
                .
              </p>

              <div className="space-y-8">
                {features.map((feat, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between text-sm mb-2 font-semibold text-slate-700">
                      <span className="flex items-center gap-2.5 text-slate-600 group-hover:text-cyan-700 transition-colors">
                        {feat.icon} {feat.name}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                        {feat.value}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${feat.color} transition-all duration-1000 ease-out shadow-sm relative`}
                        style={{ width: isLoaded ? `${feat.value}%` : "0%" }}
                      >
                        <div className="absolute inset-0 bg-white opacity-20 animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="flex gap-3">
                  <Info className="text-cyan-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      Topological Dominance
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Slope and Elevation combine for {">"}50% of the model
                      variance, indicating topography is the primary risk driver
                      in Polangui.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Map */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white p-1.5 rounded-3xl shadow-xl border border-slate-200 relative overflow-hidden group">
              {/* Floating Map Controls */}
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200/60 p-1.5 flex gap-1">
                  <button
                    onClick={() => setActiveView("polygons")}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${
                      activeView === "polygons"
                        ? "bg-slate-800 text-white shadow-md"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <Layers size={14} /> BARANGAYS
                  </button>
                  <button
                    onClick={() => setActiveView("points")}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${
                      activeView === "points"
                        ? "bg-slate-800 text-white shadow-md"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <MapPin size={14} /> POINTS
                  </button>
                </div>
              </div>

              {/* Floating Legend */}
              <div className="absolute bottom-6 right-6 z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/60 p-4 w-48">
                  <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Susceptibility Index
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "> 0.6 Very High", color: "bg-red-600" },
                      { label: "0.4 - 0.6 High", color: "bg-orange-500" },
                      { label: "0.2 - 0.4 Moderate", color: "bg-amber-500" },
                      { label: "0.0 - 0.2 Low", color: "bg-emerald-500" },
                      { label: "0.0 Very Low", color: "bg-sky-500" },
                      { label: "No Data", color: "bg-gray-300" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-[11px] text-slate-600 font-semibold"
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm`}
                        ></span>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Container Simulation */}
              <div className="h-[550px] bg-slate-100 relative w-full overflow-hidden rounded-2xl">
                {/* Map Texture */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/shatter.png')] mix-blend-multiply"></div>

                {/* Simulated Vector Terrain Background */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" className="opacity-40">
                    {/* Contour Lines */}
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    <path
                      d="M-50,250 C100,300 300,150 600,200 S900,350 1000,300"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="5,5"
                    />
                    <path
                      d="M-50,450 C200,400 400,500 700,400 S1000,450 1100,400"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="5,5"
                    />

                    {/* Main River */}
                    <path
                      d="M400,-50 C480,100 320,250 450,350 S650,500 600,600"
                      fill="none"
                      stroke="#bae6fd"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M400,-50 C480,100 320,250 450,350 S650,500 600,600"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeOpacity="0.5"
                      strokeDasharray="10,5"
                    />
                  </svg>
                </div>

                {/* Render Barangays */}
                {barangayData.map((bgy) => (
                  <div
                    key={bgy.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 group z-0"
                    style={{ top: bgy.coords.top, left: bgy.coords.left }}
                    onClick={() => setSelectedZone(bgy)}
                  >
                    {activeView === "polygons" ? (
                      // Polygon View (Static, no ping)
                      <div className="relative flex items-center justify-center">
                        {/* Main Zone Circle */}
                        <div
                          className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${getRiskGradient(
                            bgy.risk
                          )} opacity-60 border-2 border-white shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}
                        ></div>

                        {/* Label on Hover */}
                        <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
                          <span className="text-[10px] font-bold text-slate-700 bg-white/90 px-2 py-1 rounded-md shadow-md backdrop-blur whitespace-nowrap border border-slate-200">
                            {bgy.name}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Point View
                      <div className="flex flex-col items-center relative group">
                        <div
                          className={`absolute -bottom-1 w-4 h-1.5 bg-black/20 rounded-[100%] blur-[2px] group-hover:scale-125 transition-transform`}
                        ></div>
                        <MapPin
                          size={36}
                          className={`drop-shadow-xl transition-transform duration-300 ${getRiskText(
                            bgy.risk
                          )} ${
                            selectedZone?.id === bgy.id
                              ? "scale-125 -translate-y-2"
                              : "group-hover:-translate-y-1"
                          }`}
                          fill="currentColor"
                          stroke="white"
                          strokeWidth={2}
                        />
                        <span className="absolute top-full mt-1 text-[10px] font-bold text-slate-700 bg-white/95 px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 z-10">
                          {bgy.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Box */}
            <div
              className={`transition-all duration-500 ease-out transform ${
                selectedZone
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95 hidden"
              }`}
            >
              {selectedZone && (
                <div
                  className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${getRiskBorder(
                    selectedZone.risk
                  )} flex flex-col md:flex-row gap-8 items-start relative overflow-hidden`}
                >
                  {/* Background Watermark */}
                  <MapPin
                    className="absolute -right-6 -bottom-6 text-slate-50 w-48 h-48 rotate-12"
                    strokeWidth={0.5}
                  />

                  <div className="flex-1 w-full relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {selectedZone.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase shadow-sm bg-gradient-to-r ${getRiskGradient(
                          selectedZone.risk
                        )}`}
                      >
                        {selectedZone.susceptibility}
                      </span>
                    </div>

                    <div className="flex gap-6 mt-6">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center min-w-[120px] group hover:border-slate-200 transition-colors">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Susceptibility Index
                        </p>
                        <p
                          className={`text-2xl font-extrabold ${getRiskText(
                            selectedZone.risk
                          )}`}
                        >
                          {selectedZone.risk}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center min-w-[120px] group hover:border-slate-200 transition-colors">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Population
                        </p>
                        <p className="text-2xl font-bold text-slate-700">
                          {selectedZone.pop.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-80 flex flex-col justify-center gap-3 relative z-10 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Info size={12} /> Locational Context
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {selectedZone.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="pt-10 mt-4 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-600">
            {/* Methodology */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-cyan-800 font-bold text-base">
                <FileText size={18} className="text-cyan-600" />
                <h3>Methodology Snapshot</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                This analysis utilizes a diagnostic approach combining RF and
                XGBoost algorithms to refine residual errors, applying spatial
                sample weighting (KNN) to ensure local accuracy across varied
                topographical zones.
              </p>
            </div>

            {/* Key Findings */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
                <Lightbulb size={18} className="text-amber-600" />
                <h3>Key Findings</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Upland barangays like Lanigay and Matacon exhibit higher
                landslide susceptibility due to steep slopes ({">"}30°).
                Low-lying areas near the river basin face moderate flood risks
                during monsoon peaks.
              </p>
            </div>

            {/* Recommendations */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                <Shield size={18} className="text-slate-600" />
                <h3>Recommendations</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Recommended prohibition of new residential structures in "Very
                High" risk zones (Red). Structural reinforcement mandated for
                "High" risk zones. Early warning systems prioritized for amber
                zones.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center pb-8">
            <p className="text-xs text-slate-400">
              © 2025 Geospatial Analysis Lab - Polangui Project Thesis
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SusceptibilityDashboard;
