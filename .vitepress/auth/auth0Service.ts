import createAuth0Client from '@auth0/auth0-spa-js';
import type { Auth0Client, RedirectLoginOptions } from '@auth0/auth0-spa-js';
import { ref, computed, readonly } from 'vue';

// Environment variables (from .env files)
const domain = import.meta.env.AUTH0_DOMAIN || '';
const client_id = import.meta.env.AUTH0_CLIENT_ID || '';

// State
const auth0 = ref<Auth0Client | null>(null);
const loading = ref(true);
const isAuthenticated = ref(false);
const user = ref<any>(null);
const error = ref<Error | null>(null);

// Initialize the client
export async function initAuth() {
    try {
        // Create Auth0 client
        auth0.value = await createAuth0Client({
            domain,
            client_id, 
            redirect_uri: window.location.origin,
            cacheLocation: 'localstorage'
        });

        // Check if the user was redirected after login
        if (
            window.location.search.includes('code=') &&
            window.location.search.includes('state=')
        ) {
            const { appState } = await auth0.value.handleRedirectCallback();

            // Redirect to the page they were trying to access before login
            if (appState && appState.targetUrl) {
                window.location.href = appState.targetUrl;
                return;
            }
        }

        // Check if user is authenticated
        isAuthenticated.value = await auth0.value.isAuthenticated();

        // If authenticated, get user info
        if (isAuthenticated.value) {
            user.value = await auth0.value.getUser();
        }
    } catch (e) {
        error.value = e as Error;
        console.error('Auth initialization error:', e);
    } finally {
        loading.value = false;
    }
}

// Login
export async function login(options?: RedirectLoginOptions) {
    try {
        if (!auth0.value) return;

        const targetUrl = window.location.pathname;
        await auth0.value.loginWithRedirect({
            ...options,
            appState: {
                targetUrl
            }
        });
    } catch (e) {
        error.value = e as Error;
        console.error('Login error:', e);
    }
}

// Logout
export async function logout() {
    try {
        if (!auth0.value) return;

        await auth0.value.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });

        // Clear user state
        isAuthenticated.value = false;
        user.value = null;
    } catch (e) {
        error.value = e as Error;
        console.error('Logout error:', e);
    }
}

// Exposed state and methods
export const useAuth = () => {
    return {
        isAuthenticated: readonly(isAuthenticated),
        user: readonly(user),
        loading: readonly(loading),
        error: readonly(error),
        login,
        logout,
        initAuth
    };
};