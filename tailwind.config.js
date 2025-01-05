/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "table-primary": "#fff2e0",
        "table-secondary": "#eed9d2",
        "table-border": "#e1caae",
      },
    },
  },
  plugins: [],
};
