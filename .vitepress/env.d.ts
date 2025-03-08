/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AUTH0_DOMAIN: string
  readonly AUTH0_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}