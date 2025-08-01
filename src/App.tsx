import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavouritesProvider } from "@/contexts/FavouritesContext";
import Index from "./pages/Index";
import Saree from "./pages/Saree";
import Anarkali from "./pages/Anarkali";
import Lehenga from "./pages/Lehenga";
import SalwarSuit from "./pages/SalwarSuit";
import Western from "./pages/Western";
import Bridal from "./pages/Bridal";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavouritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/saree" element={<Saree />} />
            <Route path="/anarkali" element={<Anarkali />} />
            <Route path="/lehenga" element={<Lehenga />} />
            <Route path="/salwar-suit" element={<SalwarSuit />} />
            <Route path="/western" element={<Western />} />
            <Route path="/bridal" element={<Bridal />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FavouritesProvider>
  </QueryClientProvider>
);

export default App;
