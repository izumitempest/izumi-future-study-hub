
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen,
  Calendar,
  Tag
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: string;
  tags: string[];
}

export const NotesManager = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Quantum Mechanics Basics",
      content: "Wave-particle duality is a fundamental concept...",
      subject: "Physics",
      createdAt: "2024-01-15",
      tags: ["quantum", "physics", "fundamentals"]
    },
    {
      id: "2",
      title: "Calculus Integration",
      content: "Integration by parts formula: ∫u dv = uv - ∫v du...",
      subject: "Mathematics",
      createdAt: "2024-01-14",
      tags: ["calculus", "integration", "math"]
    },
    {
      id: "3",
      title: "Organic Chemistry Reactions",
      content: "SN1 and SN2 reactions differ in their mechanisms...",
      subject: "Chemistry",
      createdAt: "2024-01-13",
      tags: ["organic", "reactions", "mechanisms"]
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: "",
    tags: ""
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        subject: newNote.subject || "General",
        createdAt: new Date().toISOString().split('T')[0],
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setNotes([note, ...notes]);
      setNewNote({ title: "", content: "", subject: "", tags: "" });
      setIsCreating(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          My Notes
        </h2>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search notes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
        />
      </div>

      {/* Create Note Modal */}
      {isCreating && (
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Create New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
            <Input
              placeholder="Subject"
              value={newNote.subject}
              onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
            <Input
              placeholder="Tags (comma separated)"
              value={newNote.tags}
              onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
            <Textarea
              placeholder="Write your note content here..."
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-32"
            />
            <div className="flex space-x-3">
              <Button onClick={handleCreateNote} className="bg-green-600 hover:bg-green-700">
                Save Note
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-white text-lg line-clamp-2">{note.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{note.subject}</span>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-red-400"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-300 text-sm line-clamp-3">{note.content}</p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {note.createdAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No notes found</h3>
          <p className="text-gray-500">Create your first note to get started!</p>
        </div>
      )}
    </div>
  );
};
