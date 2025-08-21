import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TestGenerator } from "@/components/student/TestGenerator";
import { AIChat } from "@/components/student/AIChat";
import { PDFAnalyzer } from "@/components/student/PDFAnalyzer";
import { VideoRecommender } from "@/components/student/VideoRecommender";
import {
  BookOpen,
  Clock,
  FileText,
  MessageCircle,
  Play,
  Target,
  TrendingUp,
  Upload,
  Award,
} from "lucide-react";

const StudentDashboard = () => {
  const [studentData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@student.edu",
    testsCompleted: 24,
    studyHours: 156,
    pdfsUploaded: 18,
    averageScore: 87,
    currentStreak: 12,
    level: "Advanced",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {studentData.name}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Continue your learning journey
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                <Award className="w-4 h-4 mr-1" />
                {studentData.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-border hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{studentData.testsCompleted}</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{studentData.studyHours}h</div>
              <p className="text-xs text-muted-foreground">+12h from last week</p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PDFs Analyzed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-edulink-green">{studentData.pdfsUploaded}</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-edulink-orange">{studentData.averageScore}%</div>
              <Progress value={studentData.averageScore} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <Tabs defaultValue="test-generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="test-generator" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Test Generator</span>
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="pdf-analyzer" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">PDF Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="video-recommender" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="test-generator">
            <TestGenerator />
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChat />
          </TabsContent>

          <TabsContent value="pdf-analyzer">
            <PDFAnalyzer />
          </TabsContent>

          <TabsContent value="video-recommender">
            <VideoRecommender />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;