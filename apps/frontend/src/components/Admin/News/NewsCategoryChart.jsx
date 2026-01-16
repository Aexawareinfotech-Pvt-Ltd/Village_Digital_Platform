import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🎨 Fixed colors by category
const CATEGORY_COLORS = {
  administrative: "#3b82f6",
  health: "#ef4444",
  education: "#22c55e",
  infrastructure: "#f97316",
  agriculture: "#84cc16",
  event: "#a855f7",
  emergency: "#dc2626",
};

export default function NewsCategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/news/analytics/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
      <h2 className="text-lg text-latte-peach mb-4">
        News by Category
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    CATEGORY_COLORS[entry.category?.toLowerCase()] ||
                    "#9ca3af" // fallback gray
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">No data available</p>
      )}
    </div>
  );
}
