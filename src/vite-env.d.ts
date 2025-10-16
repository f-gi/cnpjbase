interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TOKEN: string;
  readonly VITE_API_CNPJ_URL: string;
  readonly VITE_API_CNPJ_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
