import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Droplets, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Zone {
  id: number;
  name: string;
  schedule: string;
  active: boolean;
  lastRun: string;
  moisture: number;
}

const initialZones: Zone[] = [
  { id: 1, name: "Zone A — Rice Paddy", schedule: "6:00 AM, 6:00 PM", active: true, lastRun: "2 hours ago", moisture: 72 },
  { id: 2, name: "Zone B — Vegetable Garden", schedule: "7:00 AM", active: true, lastRun: "5 hours ago", moisture: 45 },
  { id: 3, name: "Zone C — Orchard", schedule: "5:30 AM", active: false, lastRun: "Yesterday", moisture: 30 },
];

export default function IrrigationPage() {
  const [zones, setZones] = useState(initialZones);

  const toggleZone = (id: number) => {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z)));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20 lg:pb-0">
      <div>
        <h2 className="text-2xl font-bold">Irrigation Management</h2>
        <p className="text-sm text-muted-foreground">Manage schedules and monitor soil moisture.</p>
      </div>

      {/* Alert */}
      <Card className="flex items-start gap-3 border-accent/40 bg-accent/10 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="font-medium">Low Moisture Alert</p>
          <p className="text-sm text-muted-foreground">Zone C moisture is below 35%. Consider activating irrigation.</p>
        </div>
      </Card>

      {/* Zones */}
      <div className="space-y-4">
        {zones.map((zone) => (
          <Card key={zone.id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{zone.name}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{zone.schedule}</span>
                    <span>Last run: {zone.lastRun}</span>
                  </div>
                </div>
              </div>
              <Switch checked={zone.active} onCheckedChange={() => toggleZone(zone.id)} />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Soil Moisture</span>
                <span className="font-medium">{zone.moisture}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${zone.moisture > 60 ? "bg-success" : zone.moisture > 35 ? "bg-accent" : "bg-destructive"}`}
                  style={{ width: `${zone.moisture}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
