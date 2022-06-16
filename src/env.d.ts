interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_AUTH_MD5_KEY: string;
  readonly VITE_APP_API_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
