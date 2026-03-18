import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import {
  Sprout,
  CloudSun,
  DollarSign,
  CalendarCheck,
  Droplets,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const yieldData = [
  { month: "Jan", yield: 30 },
  { month: "Feb", yield: 45 },
  { month: "Mar", yield: 55 },
  { month: "Apr", yield: 70 },
  { month: "May", yield: 65 },
  { month: "Jun", yield: 85 },
];

const expenseData = [
  { name: "Seeds", amount: 4500 },
  { name: "Fertilizer", amount: 3200 },
  { name: "Labor", amount: 6800 },
  { name: "Equipment", amount: 2100 },
  { name: "Irrigation", amount: 1800 },
];

const aiInsights = [
  { text: "Consider planting soybeans in Field B — soil nitrogen levels are optimal.", type: "recommendation" },
  { text: "Pest activity expected to rise in 3 days based on humidity trends.", type: "warning" },
  { text: "Irrigation efficiency improved by 12% this month.", type: "success" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Crops" value="12" change="+2 this month" changeType="positive" icon={<Sprout className="h-5 w-5" />} />
        <StatCard title="Today's Weather" value="28°C" change="Partly cloudy" changeType="neutral" icon={<CloudSun className="h-5 w-5" />} />
        <StatCard title="Monthly Revenue" value="₹1,45,000" change="+18% vs last month" changeType="positive" icon={<DollarSign className="h-5 w-5" />} />
        <StatCard title="Pending Tasks" value="5" change="2 overdue" changeType="negative" icon={<CalendarCheck className="h-5 w-5" />} />
      </div>

      {/* AI Insights */}
      <Card className="border-accent/30 bg-accent/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          <h2 className="font-semibold">AI Insights</h2>
        </div>
        <div className="space-y-2">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-card p-3 text-sm">
              {insight.type === "warning" ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              ) : insight.type === "success" ? (
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              ) : (
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              )}
              <p>{insight.text}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Crop Yield Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }} />
                <Area type="monotone" dataKey="yield" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Expense Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="amount" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-5">
        <h3 className="mb-4 font-semibold">Recent Activities</h3>
        <div className="space-y-3">
          {[
            { action: "Applied fertilizer to Field A", time: "2 hours ago", icon: <Sprout className="h-4 w-4" /> },
            { action: "Irrigation cycle completed — Zone 3", time: "5 hours ago", icon: <Droplets className="h-4 w-4" /> },
            { action: "Harvested tomatoes — 120kg", time: "Yesterday", icon: <CalendarCheck className="h-4 w-4" /> },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className="rounded-md bg-primary/10 p-1.5 text-primary">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
