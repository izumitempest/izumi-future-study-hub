
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2,
  Search,
  Calendar,
  User,
  FileIcon,
  FolderOpen
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface PDFFile {
  id: string;
  name: string;
  lecturer: string;
  subject: string;
  uploadDate: string;
  size: string;
  type: "lecture" | "assignment" | "reference" | "exam";
}

export const PDFManager = () => {
  const [pdfs] = useState<PDFFile[]>([
    {
      id: "1",
      name: "Quantum Mechanics Lecture 5.pdf",
      lecturer: "Dr. Smith",
      subject: "Physics",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      type: "lecture"
    },
    {
      id: "2",
      name: "Calculus Assignment 3.pdf",
      lecturer: "Prof. Johnson",
      subject: "Mathematics",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
      type: "assignment"
    },
    {
      id: "3",
      name: "Organic Chemistry Reference.pdf",
      lecturer: "Dr. Williams",
      subject: "Chemistry",
      uploadDate: "2024-01-13",
      size: "5.2 MB",
      type: "reference"
    },
    {
      id: "4",
      name: "Midterm Exam Guide.pdf",
      lecturer: "Prof. Davis",
      subject: "Computer Science",
      uploadDate: "2024-01-12",
      size: "3.1 MB",
      type: "exam"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredPDFs = pdfs.filter(pdf => {
    const matchesSearch = pdf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pdf.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pdf.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || pdf.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "assignment": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "reference": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "exam": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          PDF Library
        </h2>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
          <Upload className="h-4 w-4 mr-2" />
          Upload PDF
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search PDFs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-red-400"
          />
        </div>
        <div className="flex space-x-2">
          {["all", "lecture", "assignment", "reference", "exam"].map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={selectedType === type 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-white/5 border-white/20 text-white hover:bg-white/10"
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 border-dashed">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
              <Upload className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Upload New PDF</h3>
              <p className="text-gray-400 mb-4">Drag and drop your PDF files here or click to browse</p>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <FolderOpen className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPDFs.map((pdf) => (
          <Card key={pdf.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start space-x-3">
                <div className="bg-red-500/20 p-3 rounded-xl">
                  <FileText className="h-6 w-6 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-white text-lg line-clamp-2 mb-2">
                    {pdf.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTypeColor(pdf.type)}>
                      {pdf.type}
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-500/30">
                      {pdf.subject}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{pdf.lecturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{pdf.uploadDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4" />
                    <span>{pdf.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPDFs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No PDFs found</h3>
          <p className="text-gray-500">Upload your first PDF to get started!</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{pdfs.length}</div>
            <div className="text-sm text-gray-400">Total PDFs</div>
          </div>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">12.5 MB</div>
            <div className="text-sm text-gray-400">Total Size</div>
          </div>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">4</div>
            <div className="text-sm text-gray-400">Subjects</div>
          </div>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-gray-400">Lecturers</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
