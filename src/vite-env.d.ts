/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_XANO_API_URL: string
  readonly VITE_XANO_API_KEY: string
  readonly VITE_GOOGLE_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  gapi: {
    load: (api: string, callback: () => void) => void;
    auth2: {
      init: (config: { client_id: string; scope: string }) => Promise<any>;
      getAuthInstance: () => any;
    };
  };
}