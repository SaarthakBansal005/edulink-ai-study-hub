import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageCircle, 
  FileText, 
  Video, 
  BarChart3, 
  Clock,
  Target,
  Lightbulb
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Test Generation",
    description: "Create personalized tests based on any topic with customizable difficulty levels, question types, and formats.",
    badge: "Smart",
    gradient: "bg-gradient-primary"
  },
  {
    icon: MessageCircle,
    title: "AI Study Assistant",
    description: "Get instant answers to your questions with our intelligent chatbot that understands your learning context.",
    badge: "24/7",
    gradient: "bg-gradient-accent"
  },
  {
    icon: FileText,
    title: "PDF Analysis",
    description: "Upload documents and get instant summaries, key insights, and automatically generated questions.",
    badge: "Instant",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Video,
    title: "Video Recommendations",
    description: "Discover relevant YouTube videos tailored to your current study topics and learning progress.",
    badge: "Curated",
    gradient: "bg-gradient-accent"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics on test performance and study habits.",
    badge: "Analytics",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Track study sessions and get insights on your most productive learning periods.",
    badge: "Efficiency",
    gradient: "bg-gradient-accent"
  }
];

const stats = [
  { label: "Tests Generated", value: "10K+", icon: Target },
  { label: "Questions Answered", value: "50K+", icon: MessageCircle },
  { label: "PDFs Analyzed", value: "5K+", icon: FileText },
  { label: "Study Hours", value: "25K+", icon: Clock }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Lightbulb className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Excel in Learning
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Discover how EduLink's AI-powered tools transform traditional learning 
            into an engaging, personalized experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-500 border-primary/10 hover:border-primary/30 hover:-translate-y-2"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to revolutionize your learning experience?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover:shadow-glow transition-all duration-300">
              Get Started Free
            </button>
            <button className="px-8 py-3 border border-primary/20 text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};