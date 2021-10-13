# vitepress-auth-template
A template repository including vitepress and simple auth0 authentication. Can be used for private vitepress pages.

**Steps to use**

1. Claim auth0 project [here](https://auth0.com/de) 
2. Claim auth0 domain string like the following: `your_subdomain.eu.auth0.com`
3. Claim auth0 client id like the following (32-char-string): `l4oD58SilMNR61jhVDEb4PZBVtmWRMgh`
4. Insert your credentials at [auth_config.ts](./docs/.vitepress/auth/auth_config.ts)
5. Run your development environment: `yarn dev`
6. Check out the Vitepress docs [here](https://vitepress.vuejs.org) 

# Hints

1. Remember to include your **Allowed Callback URLs** as well as **Allowed Web Origins** in the auth0 project.
   1. For development environments: *.localhost:port
   2. For production environments: https://*.fancy-pagename.com

