import { Cloud, CloudRain, Wind, ThermometerSun, AlertTriangle, Droplets } from "lucide-react";

const mockWeatherData = {
  temperature: 28,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  rainChance: 40,
  forecast: [
    { day: "Mon", temp: 28, condition: "Cloudy" },
    { day: "Tue", temp: 30, condition: "Sunny" },
    { day: "Wed", temp: 27, condition: "Rainy" },
    { day: "Thu", temp: 26, condition: "Rainy" },
    { day: "Fri", temp: 29, condition: "Sunny" },
    { day: "Sat", temp: 31, condition: "Sunny" },
    { day: "Sun", temp: 30, condition: "Partly Cloudy" },
  ],
};

const activeWeatherAlerts = [
  {
    id: "1",
    message: "Heavy rainfall expected in next 48 hours – avoid irrigation",
    type: "rain",
    priority: "emergency",
    expiryDate: "2026-01-05",
  },
];

export default function Weather() {
  const getAlertColor = (priority) => {
    switch (priority) {
      case "emergency":
        return "#d20f39";
      case "important":
        return "#fe640b";
      case "normal":
        return "#df8e1d";
      default:
        return "#df8e1d";
    }
  };

  const getAlertBgColor = (priority) => {
    switch (priority) {
      case "emergency":
        return "#fef0f2";
      case "important":
        return "#fef6ed";
      case "normal":
        return "#fef9ed";
      default:
        return "#fef9ed";
    }
  };

  return (
    <div>
      {/* Active Alerts */}
      {activeWeatherAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          {activeWeatherAlerts.map((alert) => (
            <div
              key={alert.id}
              className="border-l-4 rounded-2xl p-4"
              style={{
                borderColor: getAlertColor(alert.priority),
                backgroundColor: getAlertBgColor(alert.priority),
              }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: getAlertColor(alert.priority) }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-sm text-left font-semibold uppercase"
                      style={{ color: getAlertColor(alert.priority) }}
                    >
                      {alert.priority} ALERT
                    </span>
                  </div>
                  <p className="text-gray-700 text-left font-medium">
                    {alert.message}
                  </p>
                  <p className="text-sm text-left text-gray-600 mt-1">
                    Valid until:{" "}
                    {new Date(alert.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Current Weather</h2>
            <p className="text-white/80 text-sm text-left">Live weather information</p>
          </div>
          <Cloud className="w-16 h-16 opacity-50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <ThermometerSun className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">
              {mockWeatherData.temperature}°C
            </p>
            <p className="text-sm text-white/70">Temperature</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <CloudRain className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">
              {mockWeatherData.rainChance}%
            </p>
            <p className="text-sm text-white/70">Rain Chance</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <Wind className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">
              {mockWeatherData.windSpeed} km/h
            </p>
            <p className="text-sm text-white/70">Wind Speed</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <Droplets className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{mockWeatherData.humidity}%</p>
            <p className="text-sm text-white/70">Humidity</p>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-white mb-3">7-Day Forecast</h3>
          <div className="grid grid-cols-7 gap-2">
            {mockWeatherData.forecast.map((day, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center"
              >
                <p className="text-sm font-medium mb-1">{day.day}</p>
                <Cloud className="w-5 h-5 mx-auto mb-1 opacity-70" />
                <p className="text-lg font-bold">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}