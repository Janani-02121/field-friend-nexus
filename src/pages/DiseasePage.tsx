import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";

interface Result {
  disease: string;
  confidence: number;
  treatment: string;
}

export default function DiseasePage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        disease: "Late Blight (Phytophthora infestans)",
        confidence: 94,
        treatment: "Apply copper-based fungicide immediately. Remove infected leaves. Ensure proper spacing for air circulation.",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 lg:pb-0">
      <div>
        <h2 className="text-2xl font-bold">Disease Detection</h2>
        <p className="text-sm text-muted-foreground">Upload a photo of your crop to detect diseases using AI.</p>
      </div>

      {/* Upload zone */}
      <Card
        className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-12 transition-colors hover:border-primary/50 hover:bg-muted/50"
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
        {image ? (
          <img src={image} alt="Uploaded crop" className="max-h-64 rounded-lg object-contain" />
        ) : (
          <>
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <Camera className="h-10 w-10" />
            </div>
            <p className="mt-4 font-medium">Tap to take a photo or upload</p>
            <p className="text-sm text-muted-foreground">Supports JPG, PNG up to 10MB</p>
          </>
        )}
      </Card>

      {image && !result && (
        <Button onClick={handleAnalyze} disabled={loading} className="w-full" size="lg">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing image...</> : <><Upload className="mr-2 h-4 w-4" />Analyze for Diseases</>}
        </Button>
      )}

      {result && (
        <Card className="space-y-4 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">Disease Detected</p>
              <p className="text-lg font-bold">{result.disease}</p>
              <p className="text-sm text-muted-foreground">Confidence: {result.confidence}%</p>
            </div>
          </div>
          <div className="rounded-lg bg-success/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Recommended Treatment</span>
            </div>
            <p className="text-sm">{result.treatment}</p>
          </div>
          <Button variant="outline" onClick={() => { setImage(null); setResult(null); }}>
            Scan Another Image
          </Button>
        </Card>
      )}
    </div>
  );
}
