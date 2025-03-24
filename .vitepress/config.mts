import { defineConfig } from "vitepress";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-auth-template/",
  title: "Auth0 Vitepress Template",
  description: "Auth0 Vitepress Template",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Protected", link: "/markdown-examples" },
      { text: "Public", link: "/non-protected" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Protected Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Non-Protected Examples", link: "/non-protected" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Com-X/vitepress-auth-template",
      },
    ],

    // Explicitly disable Algolia search
    search: {
      provider: "local",
    },
  },

  // Define environment variables to expose to the client
  vite: {
    define: {
      "import.meta.env.AUTH0_DOMAIN": JSON.stringify(env.AUTH0_DOMAIN || ""),
      "import.meta.env.AUTH0_CLIENT_ID": JSON.stringify(
        env.AUTH0_CLIENT_ID || ""
      ),
      "import.meta.env.AUTH0_REDIRECT_URI": JSON.stringify(
        env.AUTH0_REDIRECT_URI || ""
      ),
      "import.meta.env.DEFAULT_AUTH_PROVIDER": JSON.stringify(
        env.DEFAULT_AUTH_PROVIDER || "auth0"
      ),
      "import.meta.env.BASIC_AUTH_USERNAME": JSON.stringify(
        env.BASIC_AUTH_USERNAME || "admin"
      ),
      "import.meta.env.BASIC_AUTH_PASSWORD": JSON.stringify(
        env.BASIC_AUTH_PASSWORD || "password"
      ),
      "import.meta.env.SUPABASE_URL": JSON.stringify(env.SUPABASE_URL || ""),
      "import.meta.env.SUPABASE_ANON_KEY": JSON.stringify(
        env.SUPABASE_ANON_KEY || ""
      ),
    },
    optimizeDeps: {
      include: ["vue", "@auth0/auth0-spa-js"],
    },
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
