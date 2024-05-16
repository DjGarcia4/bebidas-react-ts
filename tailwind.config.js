/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,tsx, jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/bg.jpg')",
      },
    },
  },
  plugins: [],
};
