/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom Palette derived from Annise Herbal Logo (Gold/Warm Olive)
        emerald: {
          50: "#fbfaf5", // Light cream background
          100: "#f5f3e7", // Warm beige
          200: "#eae4cb", // Vanilla
          300: "#dccf9e", // Pale Gold
          400: "#cbb373", // Rich Gold (Logo "Herbal")
          500: "#b49651", // Deep Gold (Buttons)
          600: "#95763d", // Bronze
          700: "#785b30", // Dark Bronze (Logo "Annise")
          800: "#624a2a", // Sepia styled dark
          900: "#533e26", // Deep Earth
          950: "#2f2113", // Very Dark Warm Brown (Text)
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "fade-in-down": "fadeInDown 0.3s ease-out",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
