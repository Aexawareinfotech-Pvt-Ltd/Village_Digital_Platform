import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ef4444", "#"];

export default function GrievanceCategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/grievances/analytics/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border  border-orange-100 p-6">
      <h2 className="text-lg text-latte-peach mb-4">
        Grievances by Category
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
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
