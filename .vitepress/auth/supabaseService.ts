import { ref, readonly } from "vue";
import { createClient, Session, AuthChangeEvent } from "@supabase/supabase-js";

// Environment variables
const supabaseUrl = import.meta.env.SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || "";

// Check for required environment variables
if (!supabaseUrl) {
  console.error("SUPABASE_URL is not set in environment variables.");
}

if (!supabaseAnonKey) {
  console.error("SUPABASE_ANON_KEY is not set in environment variables.");
}

// Initialize Supabase client only if we have URL and key
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// State
const isAuthenticated = ref(false);
const user = ref<any>(null);
const loading = ref(false);
const error = ref<Error | null>(null);

// Initialize auth state
export async function initAuth() {
  loading.value = true;

  try {
    // Check if Supabase client is initialized
    if (!supabase) {
      throw new Error(
        "Supabase client was not initialized. Check the SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
      );
    }

    // Get current session
    const { data, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (data?.session) {
      isAuthenticated.value = true;
      user.value = data.session.user;
    }

    // Setup auth state change listener
    supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_IN" && session) {
          isAuthenticated.value = true;
          user.value = session.user;
        } else if (event === "SIGNED_OUT") {
          isAuthenticated.value = false;
          user.value = null;
        }
      }
    );
  } catch (e) {
    error.value = e as Error;
    console.error("Supabase auth initialization error:", e);
  } finally {
    loading.value = false;
  }
}

// Login with email and password
export async function login(options?: any): Promise<boolean> {
  loading.value = true;
  error.value = null;

  try {
    // Check if Supabase client is initialized
    if (!supabase) {
      throw new Error(
        "Supabase client was not initialized. Check the SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
      );
    }

    if (!options || !options.email || !options.password) {
      error.value = new Error("Email and password are required");
      return false;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: options.email,
        password: options.password,
      }
    );

    if (signInError) {
      error.value = signInError;
      return false;
    }

    if (data?.user) {
      user.value = data.user;
      isAuthenticated.value = true;
      return true;
    }

    return false;
  } catch (e) {
    error.value = e as Error;
    console.error("Login error:", e);
    return false;
  } finally {
    loading.value = false;
  }
}

// Logout
export async function logout() {
  try {
    // Check if Supabase client is initialized
    if (!supabase) {
      throw new Error(
        "Supabase client was not initialized. Check the SUPABASE_URL and SUPABASE_ANON_KEY environment variables."
      );
    }

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      throw signOutError;
    }

    isAuthenticated.value = false;
    user.value = null;
  } catch (e) {
    error.value = e as Error;
    console.error("Logout error:", e);
  }
}

// Exposed state and methods
export const useSupabaseAuth = () => {
  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    login,
    logout,
    initAuth,
    supabase, // Expose supabase client for advanced usage
  };
};
