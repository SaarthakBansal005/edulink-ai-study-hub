import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Download, 
  Eye, 
  BookOpen,
  Brain,
  Target,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalyzedPDF {
  id: string;
  name: string;
  size: string;
  uploadDate: Date;
  summary: string;
  keyPoints: string[];
  questions: {
    mcq: Array<{ question: string; options: string[]; correct: number }>;
    short: Array<{ question: string; points: number }>;
    long: Array<{ question: string; points: number }>;
  };
  readingTime: number;
  difficulty: string;
}

export const PDFAnalyzer = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzedPDFs, setAnalyzedPDFs] = useState<AnalyzedPDF[]>([
    {
      id: "1",
      name: "Introduction to Machine Learning.pdf",
      size: "2.4 MB",
      uploadDate: new Date("2024-01-15"),
      summary: "This document provides a comprehensive introduction to machine learning, covering fundamental concepts including supervised learning, unsupervised learning, and reinforcement learning. It discusses various algorithms such as linear regression, decision trees, and neural networks, along with their practical applications in real-world scenarios.",
      keyPoints: [
        "Machine learning is a subset of artificial intelligence",
        "Three main types: supervised, unsupervised, and reinforcement learning", 
        "Common algorithms include regression, classification, and clustering",
        "Applications span across industries like healthcare, finance, and technology",
        "Data quality and preprocessing are crucial for model performance"
      ],
      questions: {
        mcq: [
          {
            question: "Which of the following is NOT a type of machine learning?",
            options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deterministic Learning"],
            correct: 3
          },
          {
            question: "What is the primary goal of supervised learning?",
            options: ["Find hidden patterns", "Learn from labeled data", "Optimize rewards", "Reduce dimensions"],
            correct: 1
          }
        ],
        short: [
          { question: "Explain the difference between supervised and unsupervised learning.", points: 5 },
          { question: "Name three common applications of machine learning in business.", points: 5 }
        ],
        long: [
          { question: "Discuss the importance of data preprocessing in machine learning and provide examples of common preprocessing techniques.", points: 15 }
        ]
      },
      readingTime: 12,
      difficulty: "Intermediate"
    }
  ]);

  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setIsAnalyzing(true);
          
          // Simulate analysis
          setTimeout(() => {
            const newPDF: AnalyzedPDF = {
              id: Date.now().toString(),
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadDate: new Date(),
              summary: "This newly uploaded document has been analyzed using advanced AI techniques. The content covers important academic topics with detailed explanations and examples that are relevant for students at various levels.",
              keyPoints: [
                "Key concept 1 extracted from the document",
                "Important principle 2 identified in the text",
                "Critical information 3 found in the analysis",
                "Relevant detail 4 highlighted by the AI",
                "Essential point 5 summarized from content"
              ],
              questions: {
                mcq: [
                  {
                    question: "Based on the document content, which statement is most accurate?",
                    options: ["Option A", "Option B", "Option C", "Option D"],
                    correct: 1
                  }
                ],
                short: [
                  { question: "Summarize the main argument presented in the document.", points: 5 }
                ],
                long: [
                  { question: "Provide a detailed analysis of the key concepts discussed in this document.", points: 15 }
                ]
              },
              readingTime: Math.floor(Math.random() * 15) + 5,
              difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)]
            };
            
            setAnalyzedPDFs(prev => [newPDF, ...prev]);
            setIsAnalyzing(false);
            
            toast({
              title: "PDF Analyzed Successfully!",
              description: `${file.name} has been processed and questions generated.`,
            });
          }, 3000);
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  };

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
      {/* Upload Section */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>PDF Document Analyzer</span>
          </CardTitle>
          <CardDescription>
            Upload PDF documents to get AI-powered summaries, key points extraction, and automatically generated questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isUploading || isAnalyzing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
                <div className="text-center space-y-2">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm font-medium">
                    {isUploading ? "Uploading PDF..." : "Analyzing document with AI..."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isUploading ? "Please wait while we upload your file" : "Extracting key information and generating questions"}
                  </p>
                </div>
              </div>
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Upload Progress</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
                <label htmlFor="pdf-upload" className="cursor-pointer text-center space-y-2">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Click to upload PDF</p>
                    <p className="text-xs text-muted-foreground">Support for PDF files up to 10MB</p>
                  </div>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              
              <div className="flex items-center justify-center text-xs text-muted-foreground">
                <AlertCircle className="w-4 h-4 mr-1" />
                Your documents are processed securely and not stored permanently
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analyzed PDFs */}
      {analyzedPDFs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analyzed Documents</h3>
          {analyzedPDFs.map((pdf) => (
            <Card key={pdf.id} className="border border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{pdf.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{pdf.size}</span>
                      <span>{pdf.uploadDate.toLocaleDateString()}</span>
                      <span>{pdf.readingTime} min read</span>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(pdf.difficulty)}>
                    {pdf.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">AI Generated Summary</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pdf.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Key Points</h4>
                      <ul className="space-y-1">
                        {pdf.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <CheckCircle2 className="w-3 h-3 mt-0.5 text-accent flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="questions" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Multiple Choice</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-2xl font-bold text-primary">{pdf.questions.mcq.length}</div>
                          <p className="text-xs text-muted-foreground">Auto-generated MCQs</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Short Answer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-2xl font-bold text-accent">{pdf.questions.short.length}</div>
                          <p className="text-xs text-muted-foreground">Brief explanations</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-border">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Long Answer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-2xl font-bold text-edulink-orange">{pdf.questions.long.length}</div>
                          <p className="text-xs text-muted-foreground">Detailed analysis</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Button className="w-full">
                      <Target className="w-4 h-4 mr-2" />
                      Generate Practice Test
                    </Button>
                  </TabsContent>

                  <TabsContent value="actions" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button variant="outline" className="justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        View PDF
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export Summary
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Brain className="w-4 h-4 mr-2" />
                        Ask AI About This
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};