import { ref, readonly } from "vue";

// Basic Auth credentials from environment variables
const validUsername = import.meta.env.BASIC_AUTH_USERNAME || "admin";
const validPassword = import.meta.env.BASIC_AUTH_PASSWORD || "password";

// State
const isAuthenticated = ref(false);
const user = ref<{ username: string } | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// Initialize auth state from localStorage if available
export async function initAuth() {
  loading.value = true;
  try {
    // Check if we have stored auth in localStorage
    const storedAuth = localStorage.getItem("basic_auth_user");
    if (storedAuth) {
      const userData = JSON.parse(storedAuth);
      user.value = userData;
      isAuthenticated.value = true;
    }
  } catch (e) {
    console.error("Error initializing Basic Auth:", e);
    error.value = "Failed to initialize authentication";
  } finally {
    loading.value = false;
  }
}

// Login with username and password
export async function login(
  username: string,
  password: string
): Promise<boolean> {
  loading.value = true;
  error.value = null;

  try {
    // Simple validation against environment variables
    if (username === validUsername && password === validPassword) {
      // Set authentication state
      isAuthenticated.value = true;
      user.value = { username };

      // Store in localStorage for persistence
      localStorage.setItem("basic_auth_user", JSON.stringify({ username }));
      return true;
    } else {
      error.value = "Invalid username or password";
      return false;
    }
  } catch (e) {
    console.error("Login error:", e);
    error.value = "Login failed";
    return false;
  } finally {
    loading.value = false;
  }
}

// Logout
export async function logout() {
  // Clear auth state
  isAuthenticated.value = false;
  user.value = null;

  // Remove from localStorage
  localStorage.removeItem("basic_auth_user");
}

// Expose the auth state and methods
export const useBasicAuth = () => {
  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    login,
    logout,
    initAuth,
  };
};
