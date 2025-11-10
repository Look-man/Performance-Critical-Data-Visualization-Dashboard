# ⚡ Real-Time Performance Dashboard

A high-performance **real-time data visualization dashboard** built with **Next.js 14+, TypeScript, Tailwind CSS**, and **React**.  
It can render and update **10,000+ data points** smoothly at **60fps** using efficient virtualization and memoization techniques.

---

## 🚀 Features

### 🔹 Core Functionality
- **Real-time charts** (Line, Bar, Scatter, Heatmap)
- **Data table** with virtualization for 10,000+ records
- **Performance monitor** to track FPS and render speed
- **Filter & time range controls**
- **Responsive layout** (auto adjusts for all screen sizes)

### 🔹 Tech Highlights
- Built with **Next.js 14 App Router**
- Fully typed with **TypeScript**
- Styled using **Tailwind CSS**
- Optimized with:
  - `React.memo` & `useMemo` to minimize re-renders
  - `requestAnimationFrame` for smooth updates
  - `React virtualization` for table rendering

---

## 🧱 Folder Structure

src/
├── app/
│ ├── page.tsx # Main dashboard page
│ └── globals.css # Global Tailwind styles
│
├── components/
│ ├── charts/
│ │ ├── LineChart.tsx
│ │ ├── BarChart.tsx
│ │ ├── ScatterPlot.tsx
│ │ └── Heatmap.tsx
│ │
│ ├── controls/
│ │ ├── FilterPanel.tsx
│ │ └── TimeRangeSelector.tsx
│ │
│ ├── ui/
│ │ ├── DataTable.tsx
│ │ └── PerformanceMonitor.tsx
│ │
│ └── providers/
│ └── DataProvider.tsx
│
└── hooks/
└── useVirtualization.ts


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/realtime-dashboard.git
cd realtime-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev


Then open http://localhost:3000
 in your browser.

💡 Customization
Area	File	Description
Chart styles	src/components/charts/*	Adjust chart type, colors, or animation
Table settings	DataTable.tsx	Change row height or data density
Real-time simulation	DataProvider.tsx	Modify data update interval (default: 100ms)
Theme	globals.css or Tailwind config	Update background, color palette, or font
📊 Dashboard Layout

The dashboard displays 4 charts and a data table, organized as:

Row	Items
1	Line Chart • Bar Chart • Scatter Plot
2	Heatmap • Data Table (full width)
