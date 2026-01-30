import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

/* 🎨 Category-wise colors */
const CATEGORY_COLORS = {
  festival: "#a855f7",     // purple
  health: "#22c55e",       // green
  agriculture: "#f59e0b",  // amber
  cultural: "#3b82f6",     // blue
  sports: "#ef4444",       // red
  community: "#6b7280",    // gray
  education: "#06b6d4",    // cyan
  other: "#64748b",        // slate
};

export default function EventCategoryAnalyticsChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No event analytics data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-left text-[#fe640b] mb-4">
        Event Registrations by Category
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="registrations" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    CATEGORY_COLORS[entry.category] || "#94a3b8"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
