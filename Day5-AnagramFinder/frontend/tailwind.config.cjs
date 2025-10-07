/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: { "0%": { opacity: 0, transform: "translateY(6px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        float: { "0%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" }, "100%": { transform: "translateY(0)" } },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.26s ease-out both",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
