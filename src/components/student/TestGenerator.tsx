import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Clock, 
  Target, 
  Brain, 
  CheckCircle2, 
  AlertCircle,
  Loader2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TestGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<any>(null);
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "intermediate",
    mcqCount: 5,
    shortAnswerCount: 3,
    longAnswerCount: 2,
    duration: 30,
  });
  
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your test.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockTest = {
        id: Date.now(),
        topic: formData.topic,
        difficulty: formData.difficulty,
        questions: [
          {
            type: "mcq",
            question: `Which of the following best describes ${formData.topic}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0,
          },
          {
            type: "short",
            question: `Explain the key concepts of ${formData.topic} in 2-3 sentences.`,
            points: 5,
          },
          {
            type: "long",
            question: `Provide a detailed analysis of ${formData.topic} including its applications and significance.`,
            points: 15,
          },
        ],
        estimatedTime: formData.duration,
        totalPoints: 30,
      };
      
      setGeneratedTest(mockTest);
      setIsGenerating(false);
      toast({
        title: "Test Generated Successfully!",
        description: `Your ${formData.topic} test is ready.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Generate Custom Test</span>
          </CardTitle>
          <CardDescription>
            Create personalized tests based on your study topics with customizable difficulty and question types.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Topic/Subject</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Machine Learning, Calculus, History..."
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        <span>Beginner</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="intermediate">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-edulink-orange rounded-full"></span>
                        <span>Intermediate</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="advanced">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-destructive rounded-full"></span>
                        <span>Advanced</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Test Duration: {formData.duration} minutes</Label>
                <Slider
                  value={[formData.duration]}
                  onValueChange={([value]) => setFormData({ ...formData, duration: value })}
                  max={120}
                  min={15}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Multiple Choice Questions: {formData.mcqCount}</Label>
                <Slider
                  value={[formData.mcqCount]}
                  onValueChange={([value]) => setFormData({ ...formData, mcqCount: value })}
                  max={20}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Short Answer Questions: {formData.shortAnswerCount}</Label>
                <Slider
                  value={[formData.shortAnswerCount]}
                  onValueChange={([value]) => setFormData({ ...formData, shortAnswerCount: value })}
                  max={10}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Long Answer Questions: {formData.longAnswerCount}</Label>
                <Slider
                  value={[formData.longAnswerCount]}
                  onValueChange={([value]) => setFormData({ ...formData, longAnswerCount: value })}
                  max={5}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Total: {formData.mcqCount + formData.shortAnswerCount + formData.longAnswerCount} questions</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formData.duration} min duration</span>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Test
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedTest && (
        <Card className="border border-border animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Generated Test: {generatedTest.topic}</span>
              </div>
              <Badge variant="secondary">{generatedTest.difficulty}</Badge>
            </CardTitle>
            <CardDescription>
              {generatedTest.questions.length} questions • {generatedTest.estimatedTime} minutes • {generatedTest.totalPoints} points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {generatedTest.questions.map((question: any, index: number) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {question.type === "mcq" ? "Multiple Choice" : 
                       question.type === "short" ? "Short Answer" : "Long Answer"}
                    </Badge>
                    {question.points && (
                      <span className="text-xs text-muted-foreground">{question.points} points</span>
                    )}
                  </div>
                  <p className="text-sm font-medium mb-2">{question.question}</p>
                  {question.options && (
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option: string, optIndex: number) => (
                        <div key={optIndex} className="text-xs text-muted-foreground p-2 bg-background rounded border">
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <Button className="flex-1">
                <Target className="w-4 h-4 mr-2" />
                Start Test
              </Button>
              <Button variant="outline">
                Preview
              </Button>
              <Button variant="outline">
                Save for Later
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};