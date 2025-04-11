
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (email && password) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Please enter both email and password");
      }
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignupLoading(true);

    // Validate password match
    if (signupPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsSignupLoading(false);
      return;
    }

    // Validate all fields are filled
    if (!signupEmail || !signupPassword || !fullName || !studentId) {
      toast.error("Please fill in all fields");
      setIsSignupLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSignupLoading(false);
      toast.success("Account created successfully! Please login.");
      // Reset form
      setSignupEmail("");
      setSignupPassword("");
      setConfirmPassword("");
      setFullName("");
      setStudentId("");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-hostel-primary/10 to-hostel-secondary/10 items-center justify-center p-4">
      <div className="animate-fade-in w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hostel-primary">
            Host<span className="text-hostel-secondary">ify</span>
          </h1>
          <p className="text-gray-600 mt-2">Hostel Management System</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your student credentials to access the hostel portal
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Student Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a 
                        href="#" 
                        className="text-sm text-hostel-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-hostel-primary hover:bg-hostel-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Register for access to the hostel management system
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="STU12345"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="student@example.edu"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-hostel-secondary hover:bg-hostel-secondary/90"
                    disabled={isSignupLoading}
                  >
                    {isSignupLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <p className="text-center text-gray-600 mt-6 text-sm">
          Having trouble with your account? <br />
          Contact your hostel administrator
        </p>
      </div>
    </div>
  );
};

export default Login;
