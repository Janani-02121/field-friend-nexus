import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileBarChart, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const monthlyYield = [
  { month: "Oct", value: 40 },
  { month: "Nov", value: 55 },
  { month: "Dec", value: 48 },
  { month: "Jan", value: 62 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 85 },
];

const revenueVsExpense = [
  { month: "Oct", revenue: 45000, expense: 28000 },
  { month: "Nov", revenue: 52000, expense: 30000 },
  { month: "Dec", revenue: 38000, expense: 25000 },
  { month: "Jan", revenue: 60000, expense: 32000 },
  { month: "Feb", revenue: 72000, expense: 35000 },
  { month: "Mar", revenue: 85000, expense: 40000 },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("6months");

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.text("Farm Performance Report", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Period: ${period === "1month" ? "Last Month" : period === "3months" ? "3 Months" : period === "6months" ? "6 Months" : "1 Year"}`, pageWidth / 2, 28, { align: "center" });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 34, { align: "center" });

    // Crop Yield Table
    doc.setFontSize(14);
    doc.text("Crop Yield (tons)", 14, 48);
    (doc as any).autoTable({
      startY: 52,
      head: [["Month", "Yield (tons)"]],
      body: monthlyYield.map((d) => [d.month, d.value]),
      theme: "grid",
      headStyles: { fillColor: [34, 120, 60] },
    });

    // Revenue vs Expenses Table
    const afterFirst = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(14);
    doc.text("Revenue vs Expenses", 14, afterFirst);
    (doc as any).autoTable({
      startY: afterFirst + 4,
      head: [["Month", "Revenue (₹)", "Expenses (₹)", "Profit (₹)"]],
      body: revenueVsExpense.map((d) => [d.month, d.revenue.toLocaleString(), d.expense.toLocaleString(), (d.revenue - d.expense).toLocaleString()]),
      theme: "grid",
      headStyles: { fillColor: [34, 120, 60] },
    });

    // Summary
    const afterSecond = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(14);
    doc.text("Period Summary", 14, afterSecond);
    (doc as any).autoTable({
      startY: afterSecond + 4,
      head: [["Metric", "Value"]],
      body: [
        ["Total Yield", "360 tons"],
        ["Revenue", "₹3,52,000"],
        ["Expenses", "₹1,90,000"],
        ["Profit Margin", "46%"],
      ],
      theme: "grid",
      headStyles: { fillColor: [34, 120, 60] },
    });

    doc.save("farm-report.pdf");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="text-sm text-muted-foreground">Comprehensive farm performance analytics.</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportPDF}><Download className="mr-2 h-4 w-4" />Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Crop Yield (tons)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyYield}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Revenue vs Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueVsExpense}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="expense" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Summary cards */}
      <Card className="p-5">
        <h3 className="mb-4 font-semibold">Period Summary</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Yield", value: "360 tons" },
            { label: "Revenue", value: "₹3,52,000" },
            { label: "Expenses", value: "₹1,90,000" },
            { label: "Profit Margin", value: "46%" },
          ].map((s, i) => (
            <div key={i} className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
