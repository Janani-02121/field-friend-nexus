import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sprout, Loader2 } from "lucide-react";
import { useState } from "react";

const mockRecommendations = [
  { crop: "Soybeans", confidence: 92, reason: "High nitrogen soil, optimal pH 6.5, suitable rainfall pattern" },
  { crop: "Wheat", confidence: 87, reason: "Cool season crop, matches current temperature trends" },
  { crop: "Maize", confidence: 78, reason: "Good drainage conditions, adequate sunlight hours" },
];

export default function CropsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof mockRecommendations | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResults(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20 lg:pb-0">
      <div>
        <h2 className="text-2xl font-bold">Crop Recommendation</h2>
        <p className="text-sm text-muted-foreground">Enter your field parameters and let AI suggest the best crops.</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Input placeholder="e.g., Loamy" required />
            </div>
            <div className="space-y-2">
              <Label>Soil pH</Label>
              <Input type="number" step="0.1" placeholder="e.g., 6.5" required />
            </div>
            <div className="space-y-2">
              <Label>Rainfall (mm/year)</Label>
              <Input type="number" placeholder="e.g., 1200" required />
            </div>
            <div className="space-y-2">
              <Label>Temperature (°C avg)</Label>
              <Input type="number" placeholder="e.g., 28" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea placeholder="Any specific requirements or constraints..." />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <><Sprout className="mr-2 h-4 w-4" />Get Recommendations</>}
          </Button>
        </form>
      </Card>

      {results && (
        <div className="space-y-3">
          <h3 className="font-semibold">Recommended Crops</h3>
          {results.map((r, i) => (
            <Card key={i} className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                {r.confidence}%
              </div>
              <div>
                <p className="font-semibold">{r.crop}</p>
                <p className="text-sm text-muted-foreground">{r.reason}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
