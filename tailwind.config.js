/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-violet": "#F0EFFF",
        "dark-violet": "#6650F2",
        "logo-red": "#ff4351",
        "light-gray": "#F2F2F2",
        "accent-red": "#FF4452",
        "accent-green": "#31A24C",
        "semi-gray": "#8B8B8B",
        violet: "#A7A3FF",
      },
      width: {
        large: "607px",
        871: "871px",
        195: "195px",
        325: "325px",
        238: "238px",
        660: "660px",
      },
      height: {
        376: "376px",
      },
      maxWidth: {
        210: "210px",
        422: "422px",
      },
      boxShadow: {
        "3xl": "0 5px 60px -10px rgba(0, 0, 0, 0.3)",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
};
