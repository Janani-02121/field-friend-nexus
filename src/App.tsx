import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import CropsPage from "@/pages/CropsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import WeatherPage from "@/pages/WeatherPage";
import DiseasePage from "@/pages/DiseasePage";
import IrrigationPage from "@/pages/IrrigationPage";
import InventoryPage from "@/pages/InventoryPage";
import FinancePage from "@/pages/FinancePage";
import ReportsPage from "@/pages/ReportsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/crops" element={<CropsPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/disease" element={<DiseasePage />} />
            <Route path="/irrigation" element={<IrrigationPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
