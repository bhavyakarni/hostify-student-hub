// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { z } from "zod";

// type FormData = {
//   email: string;
//   password: string;
// };

// export default function Login() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(z.object({
//       email: z.string().email(),
//       password: z.string().min(1),
//     })),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       setIsLoading(true);
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Get registered users from localStorage
//       const registeredUsersJson = localStorage.getItem('registeredUsers');
//       const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : {};
      
//       // Check if user exists
//       if (!registeredUsers[data.email]) {
//         throw new Error("User not found");
//       }
      
//       // In a real app, you would validate password here
//       // For demo, we just check if the user exists
      
//       // Set logged in user data
//       localStorage.setItem('userData', JSON.stringify(registeredUsers[data.email]));
      
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//           <CardDescription>Welcome back to Hostify</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 {...register("email")}
//                 placeholder="john@example.com"
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-500">{errors.email.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 {...register("password")}
//                 placeholder="••••••••"
//               />
//               {errors.password && (
//                 <p className="text-sm text-red-500">{errors.password.message}</p>
//               )}
//             </div>

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => navigate("/register")}
//                 className="text-blue-600 hover:underline"
//               >
//                 Register
//               </button>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(z.object({
      email: z.string().email(),
      password: z.string().min(1),
    })),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get registered users from localStorage
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : {};
      
      // Check if user exists
      if (!registeredUsers[data.email]) {
        throw new Error("User not found");
      }
      
      // Get stored user data with password
      const storedPasswordJson = localStorage.getItem('userPasswords');
      const storedPasswords = storedPasswordJson ? JSON.parse(storedPasswordJson) : {};
      
      // Check if the password matches
      if (!storedPasswords[data.email] || storedPasswords[data.email] !== data.password) {
        throw new Error("Invalid password");
      }
      
      // Set logged in user data (without password)
      localStorage.setItem('userData', JSON.stringify(registeredUsers[data.email]));
      
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back to Hostify</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}