  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Index from "./pages/WelcomePage";
  import Discovery from "./pages/Introduction";
  import AgentWelcome from "./pages/AgentWelcome";
  import Explore from "./pages/Blank";
  import NotFound from "./pages/WheelPage";
  import GestureGame from "./pages/GestureGame";
  import QuizCv from "./pages/QuizCv"; 
  import ChatPage from "./pages/ChatPage";

  const queryClient = new QueryClient();

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/introduction" element={<Discovery />} />
            <Route path="/agent" element={<AgentWelcome />} />
            <Route path="/explore" element={<NotFound />} />
            <Route path="/agent" element={<AgentWelcome />} />
            <Route path="/blank" element={<Explore />} />
            <Route path="/gesture-game" element={<GestureGame />} />
            <Route path="/quizes" element={<QuizCv />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  export default App;
