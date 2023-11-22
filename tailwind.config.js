/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "base": "#21242e",
        "text": "#cac9ca",
        "crust": "#151924",
        "mantle": "#242736",
        "green": "#2bcc61",
        "blue": "#4e96bc",
        "lightblue": "#83c7ea",
        "teal": "#8ad4cb",
        "yellow": "#bb9b49",
        "peach": "#bb7f45",
        "mauve": "#9d68c1"
      },
      padding:{
        large: "16px"
      },
      fontSize:{
        "extra-large": "40px"
      }
    },
  },
  plugins: [],
}

