import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import  NeuralBackground  from '../components/NeuralBackground';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: 'Welcome! I\'m your AI learning assistant. Ask me anything about chatbots, image recognition, classification, or computer vision!', isAi: true }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to send a message to the Flask backend
  const sendToApi = async (message: string) => {
    try {
      // Replace with your Flask backend URL (default: http://localhost:5000)
      const response = await axios.post('http://127.0.0.1:5000/api/chat', {
        message: message,
        session_id: sessionId
      });

      // Get AI response from Flask backend
      const aiResponse = response.data.message;
      
      // Remove the "thinking" message and add the actual response
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.text !== 'Thinking... I will respond shortly.');
        return [
          ...filteredMessages,
          { text: aiResponse, isAi: true }
        ];
      });
      setIsTyping(false);
    } catch (error) {
      console.error('Error connecting to API:', error);
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.text !== 'Thinking... I will respond shortly.');
        return [
          ...filteredMessages,
          { text: 'Sorry, there was an error connecting to the AI. Please make sure the Flask server is running.', isAi: true }
        ];
      });
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: messageInput, isAi: false }]);
      const currentMessage = messageInput;
      setMessageInput('');
      
      // Show typing indicator
      setIsTyping(true);
      setMessages(prev => [
        ...prev,
        { text: 'Thinking... I will respond shortly.', isAi: true }
      ]);

      // Send to Flask API
      sendToApi(currentMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClearChat = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/api/chat/clear', {
        session_id: sessionId
      });
      setMessages([
        { text: 'Chat cleared! I\'m ready to help you learn about AI. What would you like to explore?', isAi: true }
      ]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Network Background */}
      <NeuralBackground />

      {/* Header */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-4">
        <h1 className="text-xl font-light text-cyan-400 tracking-[0.3em]">AI_EXPLORE</h1>
        <button
          onClick={handleClearChat}
          className="text-xs text-cyan-500/70 hover:text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 px-3 py-1 rounded-full transition-all duration-300"
        >
          Clear Chat
        </button>
      </div>

      {/* Chat Interface Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-8">
        <div className="w-full max-w-4xl px-8">
          
          {/* Messages Display */}
          <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-2xl shadow-cyan-500/10 mb-4 max-h-[500px] overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[75%] px-5 py-3 rounded-2xl ${
                      msg.isAi
                        ? 'bg-gradient-to-r from-cyan-900/40 to-cyan-800/30 border border-cyan-500/30 text-cyan-100'
                        : 'bg-gradient-to-r from-gray-800/80 to-gray-700/60 border border-gray-600/40 text-gray-100'
                    } shadow-lg`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-cyan-900/40 to-cyan-800/30 border border-cyan-500/30 px-5 py-3 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-3 bg-black/70 backdrop-blur-xl border border-cyan-500/30 rounded-full p-2 shadow-2xl shadow-cyan-500/20">
            <input
              type="text"
              className="flex-1 bg-transparent text-white px-6 py-3 outline-none placeholder-gray-500 text-sm"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about AI concepts like chatbots, image recognition, or computer vision..."
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <div className="w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}