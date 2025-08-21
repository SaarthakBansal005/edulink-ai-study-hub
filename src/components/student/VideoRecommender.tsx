import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Play, 
  Search, 
  Clock, 
  ThumbsUp, 
  Eye, 
  BookOpen,
  Filter,
  ExternalLink,
  Star,
  Loader2
} from "lucide-react";

interface VideoRecommendation {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  likes: string;
  rating: number;
  thumbnail: string;
  description: string;
  difficulty: string;
  topics: string[];
  url: string;
}

export const VideoRecommender = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendations, setRecommendations] = useState<VideoRecommendation[]>([
    {
      id: "1",
      title: "Machine Learning Explained - A Complete Beginner's Guide",
      channel: "Tech Education Hub",
      duration: "15:24",
      views: "1.2M",
      likes: "45K",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      description: "Perfect introduction to machine learning concepts with real-world examples and easy-to-understand explanations.",
      difficulty: "Beginner",
      topics: ["Machine Learning", "AI", "Data Science"],
      url: "https://youtube.com/watch?v=example1"
    },
    {
      id: "2", 
      title: "Advanced Calculus: Derivatives and Applications",
      channel: "Math Masters",
      duration: "28:45",
      views: "890K",
      likes: "32K",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=200&fit=crop",
      description: "Deep dive into calculus derivatives with step-by-step problem solving and practical applications.",
      difficulty: "Advanced",
      topics: ["Calculus", "Mathematics", "Derivatives"],
      url: "https://youtube.com/watch?v=example2"
    },
    {
      id: "3",
      title: "Photosynthesis Process - Biology Explained",
      channel: "Biology Simplified",
      duration: "12:33",
      views: "2.1M",
      likes: "78K", 
      rating: 4.7,
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
      description: "Complete explanation of photosynthesis with animations and diagrams to help you understand the process.",
      difficulty: "Intermediate",
      topics: ["Biology", "Photosynthesis", "Plant Science"],
      url: "https://youtube.com/watch?v=example3"
    },
    {
      id: "4",
      title: "World War II: Key Events and Timeline",
      channel: "History Channel Education",
      duration: "35:12",
      views: "1.8M",
      likes: "56K",
      rating: 4.6,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      description: "Comprehensive overview of World War II major events, battles, and historical significance.",
      difficulty: "Intermediate",
      topics: ["History", "World War II", "Timeline"],
      url: "https://youtube.com/watch?v=example4"
    }
  ]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call to YouTube
    setTimeout(() => {
      // Mock search results based on query
      const mockResults: VideoRecommendation[] = [
        {
          id: Date.now().toString(),
          title: `${searchQuery} - Complete Tutorial`,
          channel: "Educational Content",
          duration: "20:15",
          views: "850K",
          likes: "25K",
          rating: 4.5,
          thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
          description: `Comprehensive tutorial covering ${searchQuery} with examples and practice problems.`,
          difficulty: "Intermediate",
          topics: [searchQuery],
          url: "https://youtube.com/watch?v=search"
        },
        {
          id: (Date.now() + 1).toString(),
          title: `${searchQuery} for Beginners`,
          channel: "Learn Easy",
          duration: "12:30",
          views: "500K",
          likes: "18K",
          rating: 4.3,
          thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=200&fit=crop",
          description: `Perfect starting point for learning ${searchQuery} from scratch.`,
          difficulty: "Beginner",
          topics: [searchQuery, "Beginner"],
          url: "https://youtube.com/watch?v=beginner"
        }
      ];
      
      setRecommendations(prev => [...mockResults, ...prev]);
      setIsSearching(false);
    }, 1500);
  };

  const filteredRecommendations = recommendations.filter(video => {
    const difficultyMatch = selectedDifficulty === "all" || video.difficulty.toLowerCase() === selectedDifficulty;
    
    const durationMatch = selectedDuration === "all" || 
      (selectedDuration === "short" && parseInt(video.duration) < 15) ||
      (selectedDuration === "medium" && parseInt(video.duration) >= 15 && parseInt(video.duration) < 30) ||
      (selectedDuration === "long" && parseInt(video.duration) >= 30);
    
    return difficultyMatch && durationMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-accent text-accent-foreground';
      case 'intermediate': return 'bg-edulink-orange text-white';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5 text-primary" />
            <span>Educational Video Recommendations</span>
          </CardTitle>
          <CardDescription>
            Discover curated YouTube videos tailored to your learning topics and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for topics (e.g., calculus, biology, history)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchQuery.trim()}
              className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="short">Under 15 min</SelectItem>
                <SelectItem value="medium">15-30 min</SelectItem>
                <SelectItem value="long">30+ min</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecommendations.map((video) => (
          <Card key={video.id} className="border border-border hover:shadow-medium transition-all duration-300">
            <div className="p-4">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                </div>
              </AspectRatio>
            </div>

            <CardHeader className="pt-0">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm leading-tight line-clamp-2">
                  {video.title}
                </CardTitle>
                <Badge className={`ml-2 ${getDifficultyColor(video.difficulty)} flex-shrink-0`}>
                  {video.difficulty}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{video.channel}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{video.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.description}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{video.likes}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {video.topics.slice(0, 3).map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" size="sm">
                  <Play className="w-3 h-3 mr-1" />
                  Watch
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  YouTube
                </Button>
                <Button variant="outline" size="sm">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card className="border border-border">
          <CardContent className="py-8 text-center">
            <Play className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No videos found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};