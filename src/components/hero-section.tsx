import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, FileText, Video } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Students learning with technology"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-edulink-blue/20 rounded-full blur-xl" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-24 h-24 bg-edulink-green/20 rounded-full blur-xl" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-20 h-20 bg-edulink-purple/20 rounded-full blur-xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Transform Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experience the future of education with AI-powered test generation, 
            personalized learning paths, and intelligent study assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 group">
              Start Learning Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">AI Tests</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Smart Chat</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">PDF Analysis</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-glow transition-all duration-300">
                <Video className="w-8 h-8 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Video Recs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};