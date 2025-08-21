import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen, 
  Calculator,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI study assistant. I can help you with questions about any subject, explain complex concepts, provide examples, and guide you through problem-solving. What would you like to learn about today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { icon: Calculator, text: "Explain calculus derivatives", category: "Math" },
    { icon: BookOpen, text: "Summarize photosynthesis", category: "Biology" },
    { icon: Lightbulb, text: "How does AI work?", category: "Technology" },
  ];

  const mockResponses = [
    "Great question! Let me break that down for you step by step...",
    "That's an interesting topic. Here's what you need to know:",
    "I'd be happy to help explain that concept. Let's start with the basics:",
    "That's a fundamental concept in this subject. Here's a comprehensive explanation:",
    "Excellent question! This is actually a key principle that many students find challenging at first.",
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "",
      isUser: false,
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `${randomResponse}\n\nRegarding "${content}", here are the key points:\n\n• This concept is fundamental to understanding the broader topic\n• It connects to several other important principles\n• Practice problems and examples help reinforce the learning\n• Feel free to ask follow-up questions for clarification\n\nWould you like me to provide some practice problems or explain any specific aspect in more detail?`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => prev.filter(msg => msg.id !== "typing").concat(aiResponse));
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>AI Study Assistant</span>
            <Badge variant="secondary" className="ml-auto">
              <Bot className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Questions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Quick Questions:</h4>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(question.text)}
                  className="h-auto p-2 text-xs hover:bg-primary/5"
                  disabled={isLoading}
                >
                  <question.icon className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">{question.category}: </span>
                  {question.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <Card className="h-96 border border-border">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.isUser ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                        {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center space-x-1">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is typing...</span>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about your studies..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};