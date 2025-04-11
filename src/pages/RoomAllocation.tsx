
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, UserPlus, Check, X } from "lucide-react";

type Room = {
  id: string;
  block: string;
  roomNumber: string;
  type: string;
  capacity: number;
  occupied: number;
  status: "available" | "full" | "maintenance";
  amenities: string[];
};

const RoomAllocation = () => {
  // Mock data for room allocation
  const yourRoom = {
    block: "C",
    roomNumber: "C-304",
    type: "Double Sharing",
    occupants: ["Alex Johnson", "Sam Wilson"],
    since: "15 Aug 2023",
    amenities: ["Wi-Fi", "Attached Bathroom", "Study Table", "Cupboard"],
  };
  
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      block: "A",
      roomNumber: "A-101",
      type: "Single",
      capacity: 1,
      occupied: 1,
      status: "full",
      amenities: ["Wi-Fi", "Study Table", "Cupboard"],
    },
    {
      id: "2",
      block: "A",
      roomNumber: "A-102",
      type: "Double Sharing",
      capacity: 2,
      occupied: 1,
      status: "available",
      amenities: ["Wi-Fi", "Study Table", "Cupboard", "Attached Bathroom"],
    },
    {
      id: "3",
      block: "B",
      roomNumber: "B-201",
      type: "Triple Sharing",
      capacity: 3,
      occupied: 2,
      status: "available",
      amenities: ["Wi-Fi", "Study Table", "Cupboard", "Balcony"],
    },
    {
      id: "4",
      block: "B",
      roomNumber: "B-202",
      type: "Double Sharing",
      capacity: 2,
      occupied: 0,
      status: "available",
      amenities: ["Wi-Fi", "Study Table", "Cupboard"],
    },
    {
      id: "5",
      block: "C",
      roomNumber: "C-301",
      type: "Single",
      capacity: 1,
      occupied: 0,
      status: "maintenance",
      amenities: ["Wi-Fi", "Study Table", "Cupboard", "AC"],
    },
    {
      id: "6",
      block: "C",
      roomNumber: "C-302",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "full",
      amenities: ["Wi-Fi", "Study Table", "Cupboard", "Attached Bathroom"],
    },
  ]);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Room Allocation</h1>
        <p className="text-gray-600">
          Manage your room and check availability
        </p>
      </div>

      <Tabs defaultValue="your-room" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="your-room">Your Room</TabsTrigger>
          <TabsTrigger value="availability">Room Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="your-room" className="animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>Current Room Assignment</CardTitle>
              <CardDescription>
                Your hostel room allocation details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-hostel-primary">
                      Room {yourRoom.roomNumber}
                    </h3>
                    <p className="text-gray-500">
                      Block {yourRoom.block} • {yourRoom.type}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Allocated since: {yourRoom.since}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Room Occupants</h4>
                    <div className="space-y-2">
                      {yourRoom.occupants.map((occupant, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                        >
                          <User className="h-5 w-5 text-hostel-primary" />
                          <span>{occupant}</span>
                          {index === 0 && (
                            <Badge variant="outline" className="ml-auto">
                              You
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {yourRoom.amenities.map((amenity, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-hostel-secondary/10 text-hostel-secondary hover:bg-hostel-secondary/20"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-4">Room Actions</h4>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <UserPlus className="mr-2 h-4 w-4" /> 
                        Report Roommate Issue
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <User className="mr-2 h-4 w-4" /> 
                        Request Maintenance
                      </Button>
                      <Button 
                        className="w-full justify-start bg-hostel-primary hover:bg-hostel-primary/90"
                      >
                        <Check className="mr-2 h-4 w-4" /> 
                        Request Room Switch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability" className="animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>Available Rooms</CardTitle>
              <CardDescription>
                Check room availability across all hostel blocks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="border rounded-lg p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Room {room.roomNumber}</h3>
                      <Badge
                        className={
                          room.status === "available"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : room.status === "maintenance"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {room.status === "available"
                          ? "Available"
                          : room.status === "maintenance"
                          ? "Maintenance"
                          : "Full"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Block {room.block} • {room.type}
                    </p>
                    <p className="text-sm mb-3">
                      <span className="font-medium">
                        {room.occupied}/{room.capacity}
                      </span>{" "}
                      occupants
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 2).map((amenity, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {amenity}
                        </Badge>
                      ))}
                      {room.amenities.length > 2 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                        >
                          +{room.amenities.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled={room.status !== "available"}
                    >
                      {room.status === "available" ? "Request Room" : "Unavailable"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default RoomAllocation;
