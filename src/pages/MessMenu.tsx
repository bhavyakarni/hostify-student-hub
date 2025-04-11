
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coffee, Utensils, UtensilsCrossed, ThumbsUp, ThumbsDown } from "lucide-react";

// Types for our meal data
type MealItem = {
  name: string;
  type: "veg" | "non-veg" | "special";
  description?: string;
};

type Meal = {
  time: string;
  items: MealItem[];
};

type DayMenu = {
  day: string;
  date: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
  };
};

const MessMenu = () => {
  // Mock data for mess menu
  const weekMenu: DayMenu[] = [
    {
      day: "Monday",
      date: "April 10",
      meals: {
        breakfast: {
          time: "7:00 AM - 9:00 AM",
          items: [
            { name: "Bread & Butter", type: "veg" },
            { name: "Eggs to Order", type: "non-veg" },
            { name: "Oatmeal", type: "veg" },
            { name: "Fresh Fruits", type: "veg" },
            { name: "Tea/Coffee", type: "veg" },
          ],
        },
        lunch: {
          time: "12:30 PM - 2:30 PM",
          items: [
            { name: "Rice", type: "veg" },
            { name: "Dal Fry", type: "veg" },
            { name: "Mixed Vegetables", type: "veg" },
            { name: "Chicken Curry", type: "non-veg" },
            { name: "Salad", type: "veg" },
            { name: "Yogurt", type: "veg" },
          ],
        },
        dinner: {
          time: "7:30 PM - 9:30 PM",
          items: [
            { name: "Roti/Chapati", type: "veg" },
            { name: "Paneer Butter Masala", type: "veg", description: "Cottage cheese in rich tomato gravy" },
            { name: "Jeera Rice", type: "veg" },
            { name: "Mixed Dal", type: "veg" },
            { name: "Green Salad", type: "veg" },
            { name: "Ice Cream", type: "veg", description: "Vanilla & Chocolate" },
          ],
        },
      },
    },
    {
      day: "Tuesday",
      date: "April 11",
      meals: {
        breakfast: {
          time: "7:00 AM - 9:00 AM",
          items: [
            { name: "Idli & Sambar", type: "veg" },
            { name: "Coconut Chutney", type: "veg" },
            { name: "Boiled Eggs", type: "non-veg" },
            { name: "Fresh Fruits", type: "veg" },
            { name: "Tea/Coffee", type: "veg" },
          ],
        },
        lunch: {
          time: "12:30 PM - 2:30 PM",
          items: [
            { name: "Pulao Rice", type: "veg" },
            { name: "Rajma Curry", type: "veg" },
            { name: "Aloo Gobi", type: "veg" },
            { name: "Fish Curry", type: "non-veg", description: "Fresh seasonal fish" },
            { name: "Raita", type: "veg" },
            { name: "Papad", type: "veg" },
          ],
        },
        dinner: {
          time: "7:30 PM - 9:30 PM",
          items: [
            { name: "Naan/Roti", type: "veg" },
            { name: "Malai Kofta", type: "veg", description: "Special item" },
            { name: "Mixed Vegetable Curry", type: "veg" },
            { name: "Steamed Rice", type: "veg" },
            { name: "Cucumber Raita", type: "veg" },
            { name: "Fruit Custard", type: "veg" },
          ],
        },
      },
    },
    {
      day: "Wednesday",
      date: "April 12",
      meals: {
        breakfast: {
          time: "7:00 AM - 9:00 AM",
          items: [
            { name: "Poha", type: "veg" },
            { name: "Boiled Eggs", type: "non-veg" },
            { name: "Toast & Jam", type: "veg" },
            { name: "Banana", type: "veg" },
            { name: "Tea/Coffee", type: "veg" },
          ],
        },
        lunch: {
          time: "12:30 PM - 2:30 PM",
          items: [
            { name: "Rice", type: "veg" },
            { name: "Chana Masala", type: "veg" },
            { name: "Bhindi Fry", type: "veg" },
            { name: "Egg Curry", type: "non-veg" },
            { name: "Mixed Salad", type: "veg" },
            { name: "Pickle", type: "veg" },
          ],
        },
        dinner: {
          time: "7:30 PM - 9:30 PM",
          items: [
            { name: "Roti/Chapati", type: "veg" },
            { name: "Palak Paneer", type: "veg" },
            { name: "Dal Tadka", type: "veg" },
            { name: "Jeera Rice", type: "veg" },
            { name: "Boondi Raita", type: "veg" },
            { name: "Gulab Jamun", type: "veg", description: "Special sweet" },
          ],
        },
      },
    },
  ];

  const [currentTab, setCurrentTab] = useState<string>("Monday");
  const today = weekMenu.find(day => day.day === "Monday") || weekMenu[0];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mess Menu</h1>
        <p className="text-gray-600">
          Weekly food schedule for the hostel mess
        </p>
      </div>

      <Tabs 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
          {weekMenu.map((day) => (
            <TabsTrigger key={day.day} value={day.day}>
              <span className="hidden md:inline">{day.day}</span>
              <span className="md:hidden">{day.day.substring(0, 3)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {weekMenu.map((day) => (
          <TabsContent key={day.day} value={day.day} className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {/* Breakfast Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Coffee className="h-5 w-5 mr-2 text-hostel-primary" />
                        Breakfast
                      </CardTitle>
                      <CardDescription>{day.meals.breakfast.time}</CardDescription>
                    </div>
                    <Badge>{day.day}, {day.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day.meals.breakfast.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 border rounded-md"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500">{item.description}</p>
                          )}
                        </div>
                        <Badge 
                          className={`ml-auto ${
                            item.type === "veg" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : item.type === "non-veg" 
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          }`}
                        >
                          {item.type === "veg" ? "Veg" : item.type === "non-veg" ? "Non-Veg" : "Special"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lunch Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Utensils className="h-5 w-5 mr-2 text-hostel-secondary" />
                        Lunch
                      </CardTitle>
                      <CardDescription>{day.meals.lunch.time}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <ThumbsUp className="h-5 w-5 text-gray-400 cursor-pointer hover:text-green-500" />
                      <ThumbsDown className="h-5 w-5 text-gray-400 cursor-pointer hover:text-red-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day.meals.lunch.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 border rounded-md"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500">{item.description}</p>
                          )}
                        </div>
                        <Badge 
                          className={`ml-auto ${
                            item.type === "veg" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : item.type === "non-veg" 
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          }`}
                        >
                          {item.type === "veg" ? "Veg" : item.type === "non-veg" ? "Non-Veg" : "Special"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dinner Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <UtensilsCrossed className="h-5 w-5 mr-2 text-hostel-accent" />
                        Dinner
                      </CardTitle>
                      <CardDescription>{day.meals.dinner.time}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <ThumbsUp className="h-5 w-5 text-gray-400 cursor-pointer hover:text-green-500" />
                      <ThumbsDown className="h-5 w-5 text-gray-400 cursor-pointer hover:text-red-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day.meals.dinner.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 border rounded-md"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500">{item.description}</p>
                          )}
                        </div>
                        <Badge 
                          className={`ml-auto ${
                            item.type === "veg" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : item.type === "non-veg" 
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          }`}
                        >
                          {item.type === "veg" ? "Veg" : item.type === "non-veg" ? "Non-Veg" : "Special"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
};

export default MessMenu;
