
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, Clock, Calendar, User } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  // Mock data for contact page
  const staffMembers = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      role: "Hostel Warden",
      email: "sarah.mitchell@hostify.edu",
      phone: "+1 (555) 234-5678",
      officeHours: "Mon-Fri, 10:00 AM - 4:00 PM",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Robert Wilson",
      role: "Assistant Warden",
      email: "robert.wilson@hostify.edu",
      phone: "+1 (555) 876-5432",
      officeHours: "Mon-Wed, 9:00 AM - 2:00 PM",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Jennifer Thompson",
      role: "Administrative Assistant",
      email: "jennifer.thompson@hostify.edu",
      phone: "+1 (555) 345-6789",
      officeHours: "Mon-Fri, 8:00 AM - 5:00 PM",
      avatar: "/placeholder.svg",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! Staff will respond within 24 hours.");
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contact Hostel Staff</h1>
        <p className="text-gray-600">
          Reach out to wardens and administrators for assistance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {staffMembers.map((staff) => (
          <Card key={staff.id} className="hostel-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src={staff.avatar} alt={staff.name} />
                  <AvatarFallback className="bg-hostel-primary text-white text-xl">
                    {staff.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium">{staff.name}</h3>
                <p className="text-hostel-secondary font-medium">{staff.role}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-hostel-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-500">{staff.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-hostel-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-500">{staff.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-hostel-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Office Hours</p>
                    <p className="text-sm text-gray-500">{staff.officeHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(`mailto:${staff.email}`)}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
                <Button 
                  className="w-full bg-hostel-primary hover:bg-hostel-primary/90"
                  onClick={() => window.open(`tel:${staff.phone.replace(/\D/g, '')}`)}
                >
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>
            Get in touch with the hostel administrative team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Your Name"
                    className="pl-9"
                    defaultValue="Alex Johnson"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Student ID</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Your Student ID"
                    className="pl-9"
                    defaultValue="STU2023145"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Message Subject"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-hostel-primary hover:bg-hostel-primary/90"
              >
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ContactPage;
