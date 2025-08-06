import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SmartAdmit from "./pages/SmartAdmit";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/questionnaire" element={<SmartAdmit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
