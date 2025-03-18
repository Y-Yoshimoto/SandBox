import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig(({ mode }) => {
  // 環境変数取り出し
  const env = loadEnv(mode, process.cwd(), '');
  const APP_ENV = {
    VITE_APP_ROUTER_BASE: env.VITE_APP_ROUTER_BASE || "/",
    VITE_APP_TITLE: env.VITE_APP_TITLE || "Vite App",
    VITE_APP_VERSION: env.VITE_APP_VERSION || "v_0.0.0",
  };

  return {
    // ベースパスを指定
    base: APP_ENV.VITE_APP_ROUTER_BASE,
    // ソースコードのルートディレクトリとエイリアスの設定
    resolve: { alias: { '@': '/src' } },
    // プラグインの設定
    plugins: [
      react(),  //reactを使うためのプラグイン
      VitePWA({ //PWAを使うためのプラグイン(https://vite-pwa-org.netlify.app/guide/)
        registerType: 'autoUpdate',
        devOptions: { enabled: true },
        //サービスワーカの設定
        ...serviceworker,
        // manifest.jsonの設定
        manifest: manifest as ManifestOptions,
      } as VitePWAOptions)],
    define: {
      __APP_ENV__: JSON.stringify(APP_ENV),
    },
    build: {
      chunkSizeWarningLimit: 1024,
    },
    // サーバー起動設定
    server: {
      host: "0.0.0.0",
      port: 5173,
      // リバースプロキシの設定
      proxy: reverseproxy
    }
  }
});

// マニフェスト設定
const manifest = {
  id: "ReactPortalSample",
  name: "React Portal",
  short_name: "rPortal",
  description: "Reactポータルサンプル",
  lang: "ja",
  icons: [
    {
      src: "favicon.ico",
      sizes: "256x256",
      type: "image/x-icon"
    },
    {
      src: "icon.png",
      type: "image/png",
      sizes: "1024x1024"
    }
  ],
  start_url: ".",
  display: "standalone",
  theme_color: "#000000",
  background_color: "#FEFEFE"
};

// リバースプロキシ設定
const reverseproxy = {
  // https://ja.vitejs.dev/config/server-options.html
  '/api': {
    target: 'http://localhost:8080/api',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}
// サービスワーカ設定
// https://vite-pwa-org.netlify.app/guide/inject-manifest.html
const serviceworker = {
  strategies: 'injectManifest',
  injectManifest: {
    injectionPoint: undefined
  },
  srcDir: 'src',
  filename: 'serviceworker.js',
}