import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070A0F",
        panel: "#0B1220",
        mint: "#34D399",
        trust: "#60A5FA",
        spark: "#FBBF24",
        muted: "#94A3B8"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52,211,153,0.18), 0 10px 35px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;