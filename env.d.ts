
interface ImportMetaEnv {
  readonly VITE_BASE_URL_FIREBASE: string
  readonly VITE_AUTH_URL_FIREBASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
