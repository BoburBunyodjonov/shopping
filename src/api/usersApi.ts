import { post } from "./apiClient";

// Type for user registration data
export interface UserRegistration {
  name: string; // User's name
  password: string; // User's password
  phone_number: string; // User's phone number
  location: string; // User's location
}

// Type for the response after successful registration
export interface UserResponse {
  user: {
    id: number; // User's unique ID
    name: string; // User's name
    phone_number: string; // User's phone number
    password: string; // Hashed password
    location: string; // User's location
    role: string; // User's role (e.g., "user")
    access: boolean; // Access status
    create_user_at: string; // User creation timestamp
  };
  token: string; // Authentication token
}

// Type for user login data
export interface UserLogin {
  phone_number: string; // User's phone number
  password: string; // User's password
}

// Type for the response after successful login
export interface LoginResponse {
  id: number; // User's unique ID
  username: string; // User's username
  email: string; // User's email
  token: string; // Authentication token
}

// Type for Axios error response
export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string; // Server-provided error message
    };
    status?: number; // HTTP status code
  };
  message?: string; // Axios error message
}

// Helper function to extract error message
const extractErrorMessage = (error: AxiosErrorResponse): string => {
  if (error.response?.data?.message) {
    return error.response.data.message; // Server-provided error message
  }
  if (error.message) {
    return error.message; // Axios error message
  }
  return "An unknown error occurred"; // Fallback message
};

// Register a new user
export const registerUser = async (userData: UserRegistration): Promise<UserResponse> => {
  try {
    return await post<UserResponse, UserRegistration>("/users/create/user", userData);
  } catch (error) {
    throw new Error(extractErrorMessage(error as AxiosErrorResponse)); // Use helper to extract error message
  }
};

// Login a user
export const loginUser = async (loginData: UserLogin): Promise<LoginResponse> => {
  try {
    return await post<LoginResponse, UserLogin>("/users/login", loginData);
  } catch (error) {
    throw new Error(extractErrorMessage(error as AxiosErrorResponse)); // Use helper to extract error message
  }
};
