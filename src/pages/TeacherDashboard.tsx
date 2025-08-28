import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  FileText, 
  Users, 
  BookOpen, 
  MessageSquare, 
  ClipboardCheck,
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";
import { TestManager } from "@/components/teacher/TestManager";
import { AIChat } from "@/components/student/AIChat";
import { PDFAnalyzer } from "@/components/student/PDFAnalyzer";

const TeacherDashboard = () => {
  const teacherData = JSON.parse(localStorage.getItem('teacherAuth') || '{}');

  const stats = [
    {
      title: "Tests Created",
      value: "12",
      change: "+3 this month",
      icon: FileText,
      color: "text-edulink-blue"
    },
    {
      title: "Students Taught",
      value: "156",
      change: "+8 new enrollments",
      icon: Users,
      color: "text-edulink-green"
    },
    {
      title: "PDFs Analyzed",
      value: "34",
      change: "+7 this week",
      icon: BookOpen,
      color: "text-edulink-purple"
    },
    {
      title: "Avg. Test Score",
      value: "85%",
      change: "+5% improvement",
      icon: Target,
      color: "text-edulink-orange"
    }
  ];

  const recentActivity = [
    { action: "Created test", item: "React Fundamentals Quiz", time: "2 hours ago", type: "test" },
    { action: "Assigned test", item: "JavaScript Basics to CS101-A", time: "4 hours ago", type: "assignment" },
    { action: "Analyzed PDF", item: "Advanced Algorithms.pdf", time: "1 day ago", type: "pdf" },
    { action: "Student submitted", item: "Final Project - John Smith", time: "2 days ago", type: "submission" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {teacherData.name || 'Professor'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <GraduationCap className="w-4 h-4 mr-1" />
                {teacherData.subject || 'Subject'}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {teacherData.school || 'Institution'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tests" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="tests" className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  Test Manager
                </TabsTrigger>
                <TabsTrigger value="ai-chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  AI Assistant
                </TabsTrigger>
                <TabsTrigger value="pdf-analyzer" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  PDF Analyzer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tests" className="space-y-6">
                <TestManager />
              </TabsContent>

              <TabsContent value="ai-chat" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      AI Teaching Assistant
                    </CardTitle>
                    <CardDescription>
                      Get help with lesson planning, grading, and educational content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AIChat />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pdf-analyzer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      PDF Content Analyzer
                    </CardTitle>
                    <CardDescription>
                      Analyze PDFs for key concepts and generate study materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PDFAnalyzer />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.item}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  Class Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CS101-A</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CS101-B</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CS201</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CS301</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="outline" className="p-2 cursor-pointer hover:bg-accent text-center">
                    New Test
                  </Badge>
                  <Badge variant="outline" className="p-2 cursor-pointer hover:bg-accent text-center">
                    Grade Papers
                  </Badge>
                  <Badge variant="outline" className="p-2 cursor-pointer hover:bg-accent text-center">
                    View Reports
                  </Badge>
                  <Badge variant="outline" className="p-2 cursor-pointer hover:bg-accent text-center">
                    Settings
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;