import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit2, 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  Users, 
  Clock, 
  FileText, 
  CheckCircle,
  XCircle,
  BookOpen,
  GraduationCap,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

interface Test {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  questions: Question[];
  totalPoints: number;
  estimatedTime: number;
  createdAt: string;
  status: 'draft' | 'published' | 'assigned';
  assignedTo: string[];
}

export const TestManager = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [savedTests, setSavedTests] = useState<Test[]>([]);
  const { toast } = useToast();

  // Test Generation Form Data
  const [formData, setFormData] = useState({
    topic: '',
    difficulty: '',
    mcqCount: [5],
    tfCount: [3],
    saCount: [2],
    essayCount: [1],
    duration: [60]
  });

  // Assignment Data
  const [assignmentData, setAssignmentData] = useState({
    selectedTest: '',
    assignTo: 'individual',
    students: '',
    classes: '',
    dueDate: '',
    instructions: ''
  });

  const handleGenerate = async () => {
    if (!formData.topic || !formData.difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in topic and difficulty level.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const questions: Question[] = [];
      let questionId = 1;

      // Generate MCQ questions
      for (let i = 0; i < formData.mcqCount[0]; i++) {
        questions.push({
          id: `q${questionId++}`,
          type: 'multiple-choice',
          question: `Which of the following best describes ${formData.topic}? (Question ${i + 1})`,
          options: [
            `Correct answer about ${formData.topic}`,
            `Incorrect option A`,
            `Incorrect option B`,
            `Incorrect option C`
          ],
          correctAnswer: `Correct answer about ${formData.topic}`,
          points: 2
        });
      }

      // Generate True/False questions
      for (let i = 0; i < formData.tfCount[0]; i++) {
        questions.push({
          id: `q${questionId++}`,
          type: 'true-false',
          question: `${formData.topic} is an important concept in this field. (T/F ${i + 1})`,
          options: ['True', 'False'],
          correctAnswer: 'True',
          points: 1
        });
      }

      // Generate Short Answer questions
      for (let i = 0; i < formData.saCount[0]; i++) {
        questions.push({
          id: `q${questionId++}`,
          type: 'short-answer',
          question: `Briefly explain the key aspects of ${formData.topic}. (Short Answer ${i + 1})`,
          points: 3
        });
      }

      // Generate Essay questions
      for (let i = 0; i < formData.essayCount[0]; i++) {
        questions.push({
          id: `q${questionId++}`,
          type: 'essay',
          question: `Write a comprehensive essay about ${formData.topic}, discussing its importance and applications. (Essay ${i + 1})`,
          points: 10
        });
      }

      const newTest: Test = {
        id: `test_${Date.now()}`,
        title: `${formData.topic} Assessment`,
        subject: formData.topic,
        difficulty: formData.difficulty,
        questions,
        totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
        estimatedTime: formData.duration[0],
        createdAt: new Date().toISOString(),
        status: 'draft',
        assignedTo: []
      };

      setSavedTests(prev => [...prev, newTest]);
      setEditingTest(newTest);
      setActiveTab("edit");

      toast({
        title: "Test Generated Successfully!",
        description: `Created ${questions.length} questions for ${formData.topic}`,
      });

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTest = () => {
    if (editingTest) {
      setSavedTests(prev => 
        prev.map(test => test.id === editingTest.id ? editingTest : test)
      );
      toast({
        title: "Test Saved",
        description: "Your test has been saved successfully.",
      });
    }
  };

  const handleAssignTest = () => {
    if (!assignmentData.selectedTest || !assignmentData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please select a test and due date.",
        variant: "destructive",
      });
      return;
    }

    const assignees = assignmentData.assignTo === 'individual' 
      ? assignmentData.students.split(',').map(s => s.trim()).filter(s => s)
      : assignmentData.classes.split(',').map(c => c.trim()).filter(c => c);

    setSavedTests(prev =>
      prev.map(test => 
        test.id === assignmentData.selectedTest
          ? { ...test, status: 'assigned' as const, assignedTo: assignees }
          : test
      )
    );

    toast({
      title: "Test Assigned Successfully!",
      description: `Test assigned to ${assignees.length} ${assignmentData.assignTo === 'individual' ? 'students' : 'classes'}`,
    });

    setAssignmentData({
      selectedTest: '',
      assignTo: 'individual',
      students: '',
      classes: '',
      dueDate: '',
      instructions: ''
    });
  };

  const handleDeleteTest = (testId: string) => {
    setSavedTests(prev => prev.filter(test => test.id !== testId));
    if (editingTest?.id === testId) {
      setEditingTest(null);
    }
    toast({
      title: "Test Deleted",
      description: "Test has been removed from your library.",
    });
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    if (editingTest) {
      setEditingTest({
        ...editingTest,
        questions: editingTest.questions.map(q => 
          q.id === questionId ? { ...q, ...updates } : q
        ),
        totalPoints: editingTest.questions.reduce((sum, q) => 
          sum + (q.id === questionId ? (updates.points || q.points) : q.points), 0
        )
      });
    }
  };

  const removeQuestion = (questionId: string) => {
    if (editingTest) {
      const newQuestions = editingTest.questions.filter(q => q.id !== questionId);
      setEditingTest({
        ...editingTest,
        questions: newQuestions,
        totalPoints: newQuestions.reduce((sum, q) => sum + q.points, 0)
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Test</TabsTrigger>
          <TabsTrigger value="edit">Edit Test</TabsTrigger>
          <TabsTrigger value="library">Test Library</TabsTrigger>
          <TabsTrigger value="assign">Assign Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Create New Test
              </CardTitle>
              <CardDescription>
                Generate a customized test for your students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Test Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., React Fundamentals"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({...formData, difficulty: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Multiple Choice Questions: {formData.mcqCount[0]}</Label>
                    <Slider
                      value={formData.mcqCount}
                      onValueChange={(value) => setFormData({...formData, mcqCount: value})}
                      max={20}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>True/False Questions: {formData.tfCount[0]}</Label>
                    <Slider
                      value={formData.tfCount}
                      onValueChange={(value) => setFormData({...formData, tfCount: value})}
                      max={15}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Short Answer Questions: {formData.saCount[0]}</Label>
                    <Slider
                      value={formData.saCount}
                      onValueChange={(value) => setFormData({...formData, saCount: value})}
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Essay Questions: {formData.essayCount[0]}</Label>
                    <Slider
                      value={formData.essayCount}
                      onValueChange={(value) => setFormData({...formData, essayCount: value})}
                      max={5}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Test Duration: {formData.duration[0]} minutes</Label>
                <Slider
                  value={formData.duration}
                  onValueChange={(value) => setFormData({...formData, duration: value})}
                  max={180}
                  min={15}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Test Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Questions:</span>
                    <div className="font-medium">
                      {formData.mcqCount[0] + formData.tfCount[0] + formData.saCount[0] + formData.essayCount[0]}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-medium">{formData.duration[0]} min</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimated Points:</span>
                    <div className="font-medium">
                      {formData.mcqCount[0] * 2 + formData.tfCount[0] * 1 + formData.saCount[0] * 3 + formData.essayCount[0] * 10}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Difficulty:</span>
                    <div className="font-medium capitalize">{formData.difficulty}</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating Test...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Test
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          {editingTest ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Edit2 className="w-5 h-5" />
                    Edit Test: {editingTest.title}
                  </span>
                  <Button onClick={handleSaveTest} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Total Questions</span>
                    <div className="font-medium">{editingTest.questions.length}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <div className="font-medium">{editingTest.totalPoints}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Estimated Time</span>
                    <div className="font-medium">{editingTest.estimatedTime} min</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {editingTest.questions.map((question, index) => (
                    <Card key={question.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline">{question.type.replace('-', ' ').toUpperCase()}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label>Question {index + 1}</Label>
                          <Textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        {question.options && (
                          <div>
                            <Label>Options</Label>
                            <div className="space-y-2 mt-1">
                              {question.options.map((option, optIndex) => (
                                <Input
                                  key={optIndex}
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options!];
                                    newOptions[optIndex] = e.target.value;
                                    updateQuestion(question.id, { options: newOptions });
                                  }}
                                  placeholder={`Option ${optIndex + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Label>Points</Label>
                            <Input
                              type="number"
                              value={question.points}
                              onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 0 })}
                              min="1"
                              className="mt-1"
                            />
                          </div>
                          {question.correctAnswer && (
                            <div className="flex-1">
                              <Label>Correct Answer</Label>
                              <Input
                                value={question.correctAnswer}
                                onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Test Selected</h3>
                <p className="text-muted-foreground text-center">
                  Create a new test or select one from your library to start editing.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Test Library
              </CardTitle>
              <CardDescription>
                Manage your saved tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedTests.length > 0 ? (
                <div className="space-y-4">
                  {savedTests.map((test) => (
                    <Card key={test.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{test.title}</h3>
                            <Badge 
                              variant={test.status === 'assigned' ? 'default' : test.status === 'published' ? 'secondary' : 'outline'}
                            >
                              {test.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>Questions: {test.questions.length}</div>
                            <div>Points: {test.totalPoints}</div>
                            <div>Duration: {test.estimatedTime} min</div>
                            <div>Difficulty: {test.difficulty}</div>
                          </div>
                          {test.assignedTo.length > 0 && (
                            <div className="mt-2 text-sm">
                              <span className="text-muted-foreground">Assigned to: </span>
                              {test.assignedTo.join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingTest(test)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTest(test.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Tests Created</h3>
                  <p className="text-muted-foreground text-center">
                    Create your first test to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assign" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Assign Tests
              </CardTitle>
              <CardDescription>
                Assign tests to students or classes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Test</Label>
                <Select
                  value={assignmentData.selectedTest}
                  onValueChange={(value) => setAssignmentData({...assignmentData, selectedTest: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a test to assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedTests.map((test) => (
                      <SelectItem key={test.id} value={test.id}>
                        {test.title} ({test.questions.length} questions)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assign To</Label>
                <Select
                  value={assignmentData.assignTo}
                  onValueChange={(value: 'individual' | 'class') => setAssignmentData({...assignmentData, assignTo: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Students</SelectItem>
                    <SelectItem value="class">Entire Classes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {assignmentData.assignTo === 'individual' ? (
                <div className="space-y-2">
                  <Label>Student Names/IDs</Label>
                  <Textarea
                    placeholder="Enter student names or IDs separated by commas&#10;e.g., John Smith, Jane Doe, student123"
                    value={assignmentData.students}
                    onChange={(e) => setAssignmentData({...assignmentData, students: e.target.value})}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Class Names</Label>
                  <Textarea
                    placeholder="Enter class names separated by commas&#10;e.g., CS101-A, CS101-B, Math202"
                    value={assignmentData.classes}
                    onChange={(e) => setAssignmentData({...assignmentData, classes: e.target.value})}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="datetime-local"
                  value={assignmentData.dueDate}
                  onChange={(e) => setAssignmentData({...assignmentData, dueDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea
                  placeholder="Add any special instructions for this test..."
                  value={assignmentData.instructions}
                  onChange={(e) => setAssignmentData({...assignmentData, instructions: e.target.value})}
                />
              </div>

              <Button onClick={handleAssignTest} className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Assign Test
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};