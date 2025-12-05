  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import WelcomePage from "./pages/WelcomePage";
  import Introduction from "./pages/Introduction";
  import AgentWelcome from "./pages/AgentWelcome";
  import WheelPage from "./pages/WheelPage";
  import GestureGame from "./pages/GestureGame";
  import QuizCv from "./pages/QuizCv"; 
  import ChatPage from "./pages/ChatPage";
  import Blank from "./pages/Blank";

  const queryClient = new QueryClient();

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/agent" element={<AgentWelcome />} />
            <Route path="/wheelpage" element={<WheelPage />} />
            <Route path="/agent" element={<AgentWelcome />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/gesture-game" element={<GestureGame />} />
            <Route path="/quizes" element={<QuizCv />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Blank />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  export default App;
