// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(56,189,248,.35), 0 0 30px rgba(56,189,248,.2)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%,100%": { opacity: ".55" },
          "50%": { opacity: ".95" },
        },
        scan: {
          "0%": { transform: "translateY(-60%)" },
          "100%": { transform: "translateY(160%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        glow: "glow 3.5s ease-in-out infinite",
        scan: "scan 3.8s linear infinite",
      },
    },
  },
  plugins: [],
};

