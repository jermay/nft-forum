/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MORALIS_APP_ID: string;
  readonly VITE_MORALIS_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
