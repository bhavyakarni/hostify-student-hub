
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, RefreshCw, AlertTriangle, Calendar, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const blocks = ["A", "B", "C", "D"];
const roomTypes = ["Single", "Double Sharing", "Triple Sharing"];
const reasons = [
  "Roommate Conflict",
  "Noise Issues",
  "Maintenance Problems",
  "Location Preference",
  "Health Concerns",
  "Other"
];

const RoomSwitch = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBlock || !roomNumber || !selectedReason || !description || !preferredDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Room switch request submitted successfully!");
      
      // Clear form
      setSelectedBlock("");
      setRoomNumber("");
      setSelectedReason("");
      setDescription("");
      setPreferredDate("");
    }, 1500);
  };

  // Mock previous requests
  const previousRequests = [
    {
      id: "REQ2023001",
      date: "Jan 15, 2024",
      requestedRoom: "B-205",
      reason: "Maintenance Problems",
      status: "Approved",
    },
    {
      id: "REQ2022045",
      date: "Nov 10, 2023",
      requestedRoom: "A-108",
      reason: "Location Preference",
      status: "Rejected",
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Room Switch Request</h1>
        <p className="text-gray-600">
          Submit a request to change your hostel room
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Room Switch Request</CardTitle>
              <CardDescription>
                Please provide details about your room switch request
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-room">Current Room</Label>
                    <Input 
                      id="current-room" 
                      value="C-304" 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-block">Current Block</Label>
                    <Input 
                      id="current-block" 
                      value="Block C" 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-block">Preferred Block</Label>
                    <Select 
                      value={selectedBlock} 
                      onValueChange={setSelectedBlock}
                    >
                      <SelectTrigger id="preferred-block">
                        <SelectValue placeholder="Select a block" />
                      </SelectTrigger>
                      <SelectContent>
                        {blocks.map((block) => (
                          <SelectItem key={block} value={block}>
                            Block {block}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="room-number">Preferred Room Number (if known)</Label>
                    <Input 
                      id="room-number" 
                      placeholder="e.g. A-101" 
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Room Switch</Label>
                  <Select 
                    value={selectedReason} 
                    onValueChange={setSelectedReason}
                  >
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-date">Preferred Switch Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="preferred-date" 
                      type="date" 
                      className="pl-9"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide more details about your request..."
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Important Information</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Room switch requests are processed within 5-7 working days. 
                      You will be notified once your request is approved or rejected. 
                      Approval depends on room availability and hostel policies.
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
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Previous Requests</CardTitle>
              <CardDescription>
                Your room switch request history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {previousRequests.length > 0 ? (
                <div className="space-y-4">
                  {previousRequests.map((request) => (
                    <div 
                      key={request.id} 
                      className="border rounded-md p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium">{request.id}</p>
                        <div 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === "Approved" 
                              ? "bg-green-100 text-green-800" 
                              : request.status === "Pending" 
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        Requested on {request.date}
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Requested Room:</span>
                          <span>{request.requestedRoom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Reason:</span>
                          <span>{request.reason}</span>
                        </div>
                      </div>
                      {request.status === "Approved" && (
                        <div className="mt-3 text-xs flex items-center text-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Room switch completed
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No previous requests found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RoomSwitch;
