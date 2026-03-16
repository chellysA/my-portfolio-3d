import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  name: "Chellys",
  description: "Portfolio de Chellys",
  keywords: [
    "Portfolio",
    "Chellys",
    "Developer",
    "Web Developer",
    "React Developer",
    "Vue Developer",
    "Next.js Developer",
    "Typescript Developer",
    "3D Modelling Developer",
    "Mobile Developer",
  ],
  author: "Chellys",
  url: "https://chellys.com",
  image: "https://chellys.com/images/logo.png",
  icon: "https://chellys.com/images/logo.png",
  twitter: {
    card: "summary_large_image",
  },
});
