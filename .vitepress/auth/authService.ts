import { readonly, ref, computed, Ref } from "vue";
import * as auth0Service from "./auth0Service";
import * as basicAuthService from "./basicAuthService";
import * as supabaseService from "./supabaseService";

// Authentication types
export type AuthProvider = "auth0" | "basic" | "supabase";

// Common interface for authentication providers
export interface AuthState {
  isAuthenticated: Ref<boolean>;
  user: Ref<any>;
  loading: Ref<boolean>;
  error: Ref<any>;
}

// Interface for authentication adapter
interface AuthAdapter {
  useAuth: () => AuthState;
  initAuth: () => Promise<void>;
  login: (options?: any) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Adapter for auth0Service
const auth0Adapter: AuthAdapter = {
  useAuth: () => {
    const auth = auth0Service.useAuth();
    return {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user,
      loading: auth.loading,
      error: auth.error,
    };
  },
  initAuth: auth0Service.initAuth,
  login: async (options?: any) => {
    await auth0Service.login(options);
    return true; // auth0 doesn't return a result, always consider it successful
  },
  logout: auth0Service.logout,
};

// Adapter for basicAuthService
const basicAuthAdapter: AuthAdapter = {
  useAuth: () => {
    const auth = basicAuthService.useBasicAuth();
    return {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user,
      loading: auth.loading,
      error: auth.error,
    };
  },
  initAuth: basicAuthService.initAuth,
  login: async (options?: any) => {
    if (options && options.username && options.password) {
      return await basicAuthService.login(options.username, options.password);
    }
    return false;
  },
  logout: basicAuthService.logout,
};

// Adapter for supabaseService
const supabaseAdapter: AuthAdapter = {
  useAuth: () => {
    const auth = supabaseService.useSupabaseAuth();
    return {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user,
      loading: auth.loading,
      error: auth.error,
    };
  },
  initAuth: supabaseService.initAuth,
  login: async (options?: any) => {
    return await supabaseService.login(options);
  },
  logout: supabaseService.logout,
};

// Registry of adapters
const adapters: Record<AuthProvider, AuthAdapter> = {
  auth0: auth0Adapter,
  basic: basicAuthAdapter,
  supabase: supabaseAdapter,
};

// Get provider from environment variables
const defaultProvider =
  (import.meta.env.DEFAULT_AUTH_PROVIDER as AuthProvider) || "auth0";

// Current authentication provider
const currentProvider = ref<AuthProvider>(defaultProvider);

// Authentication metadata
const lastLoginAttempt = ref<Date | null>(null);

// Get current adapter
function getCurrentAdapter(): AuthAdapter {
  return adapters[currentProvider.value];
}

// Export function to change provider
export function setAuthProvider(provider: AuthProvider) {
  if (provider !== currentProvider.value) {
    currentProvider.value = provider;
  }
}

// Service initialization
export async function initAuth() {
  await getCurrentAdapter().initAuth();
}

// Login method
export async function login(options?: any) {
  lastLoginAttempt.value = new Date();
  return await getCurrentAdapter().login(options);
}

// Logout method
export async function logout() {
  lastLoginAttempt.value = null;
  await getCurrentAdapter().logout();
}

// Custom hook for Vue components
export const useAuthService = () => {
  // Create computed properties based on current adapter
  const isAuthenticated = computed(
    () => getCurrentAdapter().useAuth().isAuthenticated.value
  );

  const user = computed(() => getCurrentAdapter().useAuth().user.value);

  const loading = computed(() => getCurrentAdapter().useAuth().loading.value);

  const error = computed(() => getCurrentAdapter().useAuth().error.value);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    currentProvider: readonly(currentProvider),
    lastLoginAttempt: readonly(lastLoginAttempt),
    login,
    logout,
    initAuth,
    setAuthProvider,
  };
};
