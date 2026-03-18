import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const pieData = [
  { name: "Seeds", value: 4500 },
  { name: "Fertilizer", value: 3200 },
  { name: "Labor", value: 6800 },
  { name: "Equipment", value: 2100 },
  { name: "Transport", value: 1400 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
  "hsl(var(--muted-foreground))",
];

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: "income" | "expense";
  amount: number;
}

const transactions: Transaction[] = [
  { id: 1, date: "Mar 18", description: "Sold tomatoes — 200kg", type: "income", amount: 30000 },
  { id: 2, date: "Mar 17", description: "Purchased NPK fertilizer", type: "expense", amount: 5500 },
  { id: 3, date: "Mar 16", description: "Labor wages — Week 11", type: "expense", amount: 12000 },
  { id: 4, date: "Mar 15", description: "Sold wheat — 500kg", type: "income", amount: 45000 },
  { id: 5, date: "Mar 14", description: "Drip irrigation supplies", type: "expense", amount: 3200 },
];

export default function FinancePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Finance</h2>
          <p className="text-sm text-muted-foreground">Track expenses, revenue, and profit margins.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" />Add Entry</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Revenue" value="₹2,85,000" change="+22% this quarter" changeType="positive" icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard title="Total Expenses" value="₹1,40,000" change="+8% this quarter" changeType="negative" icon={<TrendingDown className="h-5 w-5" />} />
        <StatCard title="Net Profit" value="₹1,45,000" change="51% margin" changeType="positive" icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Expense breakdown */}
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Expense Breakdown</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent transactions */}
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <span className={`text-sm font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
