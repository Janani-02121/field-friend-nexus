import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package } from "lucide-react";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  lastUpdated: string;
}

const initialItems: Item[] = [
  { id: 1, name: "NPK 20-20-20", category: "Fertilizer", quantity: 50, unit: "kg", lastUpdated: "Mar 18" },
  { id: 2, name: "Tomato Seeds", category: "Seeds", quantity: 200, unit: "packets", lastUpdated: "Mar 15" },
  { id: 3, name: "Neem Oil", category: "Pesticide", quantity: 10, unit: "liters", lastUpdated: "Mar 14" },
  { id: 4, name: "Drip Tape", category: "Equipment", quantity: 500, unit: "meters", lastUpdated: "Mar 10" },
  { id: 5, name: "Soybean Seeds", category: "Seeds", quantity: 80, unit: "kg", lastUpdated: "Mar 12" },
];

export default function InventoryPage() {
  const [items] = useState(initialItems);
  const [search, setSearch] = useState("");

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory</h2>
          <p className="text-sm text-muted-foreground">Track seeds, fertilizers, and equipment.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Quick Add</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Item</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Quantity</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    {item.name}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{item.category}</span>
                </td>
                <td className="px-4 py-3 text-right">{item.quantity} {item.unit}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
