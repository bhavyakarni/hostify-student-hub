import { z } from "zod";

// User schema for validation
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  studentId: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;

// Local storage key for users
const USERS_STORAGE_KEY = 'hostify_users';

// Function to get users from localStorage
const getUsersFromStorage = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Function to save users to localStorage
const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Function to register a new user
export const registerUser = (userData: Omit<User, "id">) => {
  // Get existing users
  const users = getUsersFromStorage();
  
  // Check if user already exists
  const existingUser = users.find((user) => user.email === userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Validate user data
  const validatedUser = userSchema.parse(userData);
  
  // Add user to storage
  users.push(validatedUser);
  saveUsersToStorage(users);
  
  return validatedUser;
};

// Function to login a user
export const loginUser = (email: string, password: string) => {
  const users = getUsersFromStorage();
  const user = users.find((user) => user.email === email);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  if (user.password !== password) {
    throw new Error("Invalid password");
  }
  
  return user;
};

// Function to get user by email
export const getUserByEmail = (email: string) => {
  const users = getUsersFromStorage();
  return users.find((user) => user.email === email);
}; 