import { Card } from "@/components/ui/card";
import { CloudSun, Droplets, Wind, Thermometer, Eye, ArrowDown } from "lucide-react";

const forecast = [
  { day: "Today", temp: "28°C", condition: "Partly Cloudy", humidity: "65%", wind: "12 km/h", icon: "⛅" },
  { day: "Tomorrow", temp: "30°C", condition: "Sunny", humidity: "55%", wind: "8 km/h", icon: "☀️" },
  { day: "Wednesday", temp: "26°C", condition: "Rain", humidity: "80%", wind: "20 km/h", icon: "🌧️" },
  { day: "Thursday", temp: "24°C", condition: "Thunderstorm", humidity: "90%", wind: "25 km/h", icon: "⛈️" },
  { day: "Friday", temp: "27°C", condition: "Cloudy", humidity: "70%", wind: "15 km/h", icon: "☁️" },
];

export default function WeatherPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-0">
      <div>
        <h2 className="text-2xl font-bold">Weather Forecast</h2>
        <p className="text-sm text-muted-foreground">Live weather data for your farm location.</p>
      </div>

      {/* Current weather */}
      <Card className="bg-secondary p-6 text-secondary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Current Weather</p>
            <p className="mt-1 text-5xl font-bold">28°C</p>
            <p className="mt-2 text-lg">Partly Cloudy</p>
            <p className="text-sm opacity-80">Feels like 31°C</p>
          </div>
          <div className="text-7xl">⛅</div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Humidity", value: "65%", icon: <Droplets className="h-4 w-4" /> },
            { label: "Wind", value: "12 km/h", icon: <Wind className="h-4 w-4" /> },
            { label: "Visibility", value: "10 km", icon: <Eye className="h-4 w-4" /> },
            { label: "Pressure", value: "1013 hPa", icon: <ArrowDown className="h-4 w-4" /> },
          ].map((item, i) => (
            <div key={i} className="rounded-lg bg-secondary-foreground/10 p-3">
              <div className="flex items-center gap-1.5 text-xs opacity-80">
                {item.icon}
                {item.label}
              </div>
              <p className="mt-1 text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5-day forecast */}
      <div>
        <h3 className="mb-3 font-semibold">5-Day Forecast</h3>
        <div className="grid gap-3 sm:grid-cols-5">
          {forecast.map((day, i) => (
            <Card key={i} className="p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">{day.day}</p>
              <p className="my-2 text-3xl">{day.icon}</p>
              <p className="text-xl font-bold">{day.temp}</p>
              <p className="text-xs text-muted-foreground">{day.condition}</p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p>💧 {day.humidity}</p>
                <p>💨 {day.wind}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
