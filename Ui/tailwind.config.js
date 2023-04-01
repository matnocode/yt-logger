/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss")],
  prefix: "tw-",
};
