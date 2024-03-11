/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  variants: {
    borderColor: ["responsive", "hover", "focus", "focus-within"],
  },

  theme: {
    extend: {
      maxWidth: {
        a4: "210mm",
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      colors: {
        primary: "#A2C2E6",
        secondary: "#E577A1",
        cpink: "#E577A1",
        lightPink: "#eddfd5",
        cblue: "#A2C2E6",
        cwhite: "#F6F4F3",
        cblack: "#080406",
        cbrown: "#31241e",
        textSecondary: "#807792",
        inputBg: "#d1c8c1",
      },
    },

    fontFamily: {
      sans: ["Monsterrat", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      body: ['"Monsterrat"', "Font Awesome"],
      display: ['"Wedges"'],
      bobbyjones: "bobbyjones",
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["cupcake", "light", "dark"],
    base: true,
    styled: true,
    utils: true,
    logs: true,
    prefix: "",
    darkTheme: false,
  },
};
