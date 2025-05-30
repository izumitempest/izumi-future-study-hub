
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ExternalLink, 
  Plus, 
  Video, 
  FileText, 
  Link,
  Clock,
  Star
} from "lucide-react";

interface StudyMaterial {
  id: string;
  title: string;
  type: "video" | "article" | "link" | "book";
  subject: string;
  description: string;
  url?: string;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isStarred: boolean;
}

export const StudyMaterials = () => {
  const [materials] = useState<StudyMaterial[]>([
    {
      id: "1",
      title: "Linear Algebra Video Series",
      type: "video",
      subject: "Mathematics",
      description: "Comprehensive video series covering linear algebra fundamentals including vectors, matrices, and transformations.",
      url: "https://example.com",
      estimatedTime: "3h 45m",
      difficulty: "intermediate",
      isStarred: true
    },
    {
      id: "2",
      title: "Quantum Physics Research Paper",
      type: "article",
      subject: "Physics",
      description: "Recent research on quantum entanglement and its applications in quantum computing.",
      estimatedTime: "45m",
      difficulty: "advanced",
      isStarred: false
    },
    {
      id: "3",
      title: "Chemistry Lab Manual",
      type: "book",
      subject: "Chemistry",
      description: "Complete laboratory manual with experiments and safety procedures for organic chemistry.",
      estimatedTime: "2h 30m",
      difficulty: "beginner",
      isStarred: true
    },
    {
      id: "4",
      title: "Programming Concepts Tutorial",
      type: "link",
      subject: "Computer Science",
      description: "Interactive tutorial covering object-oriented programming principles and design patterns.",
      url: "https://example.com",
      estimatedTime: "1h 15m",
      difficulty: "intermediate",
      isStarred: false
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "article": return FileText;
      case "link": return Link;
      case "book": return BookOpen;
      default: return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "intermediate": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "advanced": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "article": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "link": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "book": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Study Materials
        </h2>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["All", "Videos", "Articles", "Links", "Books"].map((filter) => (
          <Button
            key={filter}
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => {
          const TypeIcon = getTypeIcon(material.type);
          
          return (
            <Card key={material.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    {material.isStarred && (
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <Badge className={getDifficultyColor(material.difficulty)}>
                    {material.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg line-clamp-2 mt-2">
                  {material.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-cyan-300 border-cyan-500/30">
                    {material.subject}
                  </Badge>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {material.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{material.estimatedTime}</span>
                  </div>
                  <Badge className={getTypeColor(material.type)}>
                    {material.type}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Study
                  </Button>
                  {material.url && (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">12</div>
            <div className="text-sm text-gray-400">Total Materials</div>
          </div>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">8h 30m</div>
            <div className="text-sm text-gray-400">Study Time</div>
          </div>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">5</div>
            <div className="text-sm text-gray-400">Subjects</div>
          </div>
        </Card>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-gray-400">Starred</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
