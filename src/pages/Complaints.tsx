
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Send, CheckCircle2, XCircle, Clock, FileImage } from "lucide-react";
import { toast } from "sonner";

// Types for complaints
type ComplaintStatus = "pending" | "in-progress" | "resolved" | "rejected";

type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  status: ComplaintStatus;
  response?: string;
};

const categoryOptions = [
  "Room Maintenance",
  "Plumbing Issue",
  "Electrical Issue",
  "Furniture Damage",
  "Wi-Fi Problem",
  "Cleanliness",
  "Roommate Issue",
  "Mess Food Quality",
  "Security Concern",
  "Other",
];

const priorityOptions = ["Low", "Medium", "High", "Urgent"];

const Complaints = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data for complaints
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "COMP2023045",
      title: "Leaking Tap in Bathroom",
      category: "Plumbing Issue",
      description: "The bathroom sink tap has been leaking continuously for the past two days, causing water wastage.",
      date: "March 25, 2024",
      status: "resolved",
      response: "Plumber visited and replaced the tap. Issue has been resolved. Please let us know if it occurs again.",
    },
    {
      id: "COMP2023032",
      title: "Flickering Lights in Room",
      category: "Electrical Issue",
      description: "The main light in my room has been flickering for several days. It's becoming difficult to study at night.",
      date: "March 15, 2024",
      status: "in-progress",
      response: "Electrician has been assigned. Will visit tomorrow between 10AM-12PM.",
    },
    {
      id: "COMP2023021",
      title: "Wi-Fi Connectivity Issues",
      category: "Wi-Fi Problem",
      description: "Unable to connect to hostel Wi-Fi from my room for the past week. The signal is very weak.",
      date: "February 28, 2024",
      status: "pending",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !priority || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComplaint: Complaint = {
        id: `COMP${Math.floor(Math.random() * 1000000)}`,
        title,
        category,
        description,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "pending",
      };
      
      setComplaints([newComplaint, ...complaints]);
      setIsSubmitting(false);
      toast.success("Complaint submitted successfully!");
      
      // Clear form
      setTitle("");
      setCategory("");
      setPriority("");
      setDescription("");
    }, 1500);
  };

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "in-progress":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  const getStatusText = (status: ComplaintStatus) => {
    switch (status) {
      case "resolved":
        return "Resolved";
      case "rejected":
        return "Rejected";
      case "in-progress":
        return "In Progress";
      default:
        return "Pending";
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Complaints & Feedback</h1>
        <p className="text-gray-600">
          Submit and track issues related to the hostel
        </p>
      </div>

      <Tabs defaultValue="new" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New Complaint</TabsTrigger>
          <TabsTrigger value="history">Complaint History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Complaint</CardTitle>
              <CardDescription>
                Report an issue or provide feedback about hostel services
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Brief title of your complaint" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={category} 
                      onValueChange={setCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={priority} 
                      onValueChange={setPriority}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide detailed information about the issue..."
                    className="min-h-[150px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <FileImage className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag & drop photos or documents, or click to browse
                    </p>
                    <Input 
                      id="attachments"
                      type="file" 
                      className="hidden" 
                      accept="image/*,.pdf,.doc,.docx"
                      multiple
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById("attachments")?.click()}
                    >
                      Select Files
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">
                      Max 3 files. PNG, JPG, PDF (Max 5MB each)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Response Timeline</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Complaints are typically addressed within 24-48 hours depending on the priority and complexity of the issue.
                      You will receive updates on this page and via email.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-hostel-primary hover:bg-hostel-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      Submit Complaint
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Your Complaint History</CardTitle>
              <CardDescription>
                Track and manage your previously submitted complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {complaints.length > 0 ? (
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div 
                      key={complaint.id} 
                      className="border rounded-lg p-4 transition-all hover:shadow-sm"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-medium">{complaint.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {complaint.id} • {complaint.date}
                            </span>
                            <Badge variant="outline">
                              {complaint.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge 
                          className={getStatusColor(complaint.status)}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(complaint.status)}
                            {getStatusText(complaint.status)}
                          </span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {complaint.description}
                      </p>
                      
                      {complaint.response && (
                        <div className="bg-gray-50 p-3 rounded-md mt-3">
                          <p className="text-sm font-medium mb-1">Staff Response:</p>
                          <p className="text-sm text-gray-600">
                            {complaint.response}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-3 gap-2">
                        {complaint.status === "resolved" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            Reopen
                          </Button>
                        )}
                        {(complaint.status === "pending" || complaint.status === "in-progress") && (
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No complaints found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Your submitted complaints will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Complaints;
