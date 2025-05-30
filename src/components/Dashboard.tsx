
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  FileText, 
  Clock,
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";

export const Dashboard = () => {
  const stats = [
    { title: "Total Notes", value: 24, icon: FileText, color: "from-blue-500 to-cyan-500" },
    { title: "Study Materials", value: 12, icon: BookOpen, color: "from-purple-500 to-pink-500" },
    { title: "Study Hours", value: 45, icon: Clock, color: "from-green-500 to-emerald-500" },
    { title: "Weekly Goal", value: 80, icon: Target, color: "from-orange-500 to-red-500" },
  ];

  const recentActivity = [
    { type: "note", title: "Physics - Quantum Mechanics", time: "2 hours ago" },
    { type: "pdf", title: "Mathematics Lecture 5.pdf", time: "4 hours ago" },
    { type: "material", title: "Chemistry Lab Report", time: "1 day ago" },
    { type: "note", title: "History - World War II", time: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome back, Student!
        </h2>
        <p className="text-gray-400 text-lg">
          Continue your learning journey with StudySpace
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-300 text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% from last week
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Progress */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-cyan-400" />
              Weekly Study Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Mathematics</span>
                <span className="text-white">8/10 hours</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Physics</span>
                <span className="text-white">6/8 hours</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Chemistry</span>
                <span className="text-white">4/6 hours</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'note' ? 'bg-blue-400' :
                    activity.type === 'pdf' ? 'bg-red-400' : 'bg-green-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.title}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
