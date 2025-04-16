
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, AlertTriangle, Gauge } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="h-5 w-5 text-data-teal" />
          <span className="hidden md:inline-block">Road Risk Insight Engine</span>
          <span className="inline-block md:hidden">RRIE</span>
        </div>
        
        <nav className="flex flex-1 items-center justify-center">
          <div className="hidden md:flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Map className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/risk-factors")}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Risk Factors
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/predictions")}>
              <Gauge className="mr-2 h-4 w-4" />
              Predictions
            </Button>
          </div>
        </nav>
        
        {/* Search button removed */}
      </div>
    </header>
  );
}
