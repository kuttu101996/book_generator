/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "210mm": "210mm",
        "700px": "700px",
      },
      height: {
        "297mm": "297mm",
        "570px": "570px",
      },
    },
  },
  plugins: [],
};
