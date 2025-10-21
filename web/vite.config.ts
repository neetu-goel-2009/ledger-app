import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn: any = {
  // registerType: "prompt",
  registerType: "autoUpdate",
  injectRegister: "auto",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "My-Ledger-App",
    short_name: "mla",
    description: "My Ledger Application",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      // {
      //   src: "/apple-touch-icon.png",
      //   sizes: "180x180",
      //   type: "image/png",
      //   purpose: "apple touch icon",
      // },
      // {
      //   src: "/maskable_icon.png",
      //   sizes: "512x512",
      //   type: "image/png",
      //   purpose: "any maskable",
      // },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https: true,
  },
  plugins: [react(), mkcert(), VitePWA(manifestForPlugIn)],
});
