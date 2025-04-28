import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, BellRing, UtensilsCrossed, Calendar, MessageSquare, ArrowRight, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// User data type
type UserData = {
  name: string;
  email: string;
  id: string;
  hostel: string;
  room: string;
  joinDate: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<UserData>({
    name: "User",
    email: "",
    id: "",
    hostel: "",
    room: "",
    joinDate: "",
  });

  useEffect(() => {
    // Get user data from localStorage
    const userDataJson = localStorage.getItem('userData');
    
    if (userDataJson) {
      setStudentInfo(JSON.parse(userDataJson));
    } else {
      // Redirect to login if no user data found
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('userData');
    navigate("/");
  };

  const notifications = [
    { id: 1, title: "Maintenance scheduled", date: "Today, 14:30" },
    { id: 2, title: "Mess menu updated", date: "Yesterday" },
    { id: 3, title: "New hostel rules", date: "3 days ago" },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {studentInfo.name}</h1>
          <p className="text-gray-600">Here's what's happening in your hostel today</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hostel-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your Room</CardTitle>
            <CardDescription>Current allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">{studentInfo.room}</p>
                <p className="text-sm text-gray-500">{studentInfo.hostel}</p>
              </div>
              <User className="h-8 w-8 text-hostel-primary" />
            </div>
            <div className="mt-4">
              <Link to="/room-allocation">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hostel-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Today's Menu</CardTitle>
            <CardDescription>Mess schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dinner</p>
                <p className="text-sm text-gray-500">Served 7:30 - 9:30 PM</p>
              </div>
              <UtensilsCrossed className="h-8 w-8 text-hostel-secondary" />
            </div>
            <div className="mt-4">
              <Link to="/mess-menu">
                <Button variant="outline" className="w-full">
                  Full Menu
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hostel-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Notifications</CardTitle>
            <CardDescription>Recent updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="flex items-start gap-2 border-b border-gray-100 pb-2 last:border-0"
                >
                  <BellRing className="h-4 w-4 text-hostel-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hostel-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/room-switch">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" /> Room Switch
                </Button>
              </Link>
              <Link to="/complaints">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" /> Submit Complaint
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" /> Contact Warden
                </Button>
              </Link>
              <Link to="/mess-menu">
                <Button variant="outline" className="w-full justify-start">
                  <UtensilsCrossed className="mr-2 h-4 w-4" /> Mess Feedback
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hostel-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Student Info</CardTitle>
            <CardDescription>Your details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Student ID</span>
                <span className="text-sm">{studentInfo.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Hostel Block</span>
                <span className="text-sm">{studentInfo.hostel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Room Number</span>
                <span className="text-sm">{studentInfo.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Joining Date</span>
                <span className="text-sm">{studentInfo.joinDate}</span>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full bg-hostel-primary hover:bg-hostel-primary/90">
                Update Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;