import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CalendarCheck } from "lucide-react";
import { useState } from "react";

interface Activity {
  id: number;
  date: string;
  type: string;
  field: string;
  notes: string;
}

const initialActivities: Activity[] = [
  { id: 1, date: "2026-03-18", type: "Fertilizing", field: "Field A", notes: "Applied NPK 20-20-20" },
  { id: 2, date: "2026-03-17", type: "Harvesting", field: "Field C", notes: "Tomatoes — 120kg collected" },
  { id: 3, date: "2026-03-16", type: "Planting", field: "Field B", notes: "Sowed soybean seeds" },
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", type: "Planting", field: "", notes: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setActivities((prev) => [{ id: Date.now(), ...form }, ...prev]);
    setForm({ date: "", type: "Planting", field: "", notes: "" });
    setShowForm(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Farm Activities</h2>
          <p className="text-sm text-muted-foreground">Log and track daily farm operations.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />Add Activity
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Planting", "Fertilizing", "Harvesting", "Irrigation", "Spraying", "Other"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Field</Label>
                <Input placeholder="e.g., Field A" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Activity details..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <Button type="submit">Save Activity</Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {activities.map((a) => (
          <Card key={a.id} className="flex items-start gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{a.type}</span>
                <span className="text-xs text-muted-foreground">{a.field}</span>
              </div>
              <p className="mt-1 text-sm">{a.notes}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
