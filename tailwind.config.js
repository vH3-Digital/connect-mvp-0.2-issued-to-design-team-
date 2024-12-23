/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#100a21",
        bgSecondary: "#211f30",
        primary: "#5681F7",
        secondary: "#4B9EF3",
        gradOne: "#4B9EF3",
        gradTwo: "#5731C9",
        card: "#1a1b23",
      },
      typography: (theme) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.gray[300]"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.gray[300]"),
            "--tw-prose-links": theme("colors.cyan[400]"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.gray[400]"),
            "--tw-prose-bullets": theme("colors.gray[400]"),
            "--tw-prose-hr": theme("colors.gray[700]"),
            "--tw-prose-quotes": theme("colors.gray[300]"),
            "--tw-prose-quote-borders": theme("colors.gray[700]"),
            "--tw-prose-captions": theme("colors.gray[400]"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.gray[300]"),
            "--tw-prose-pre-bg": theme("colors.gray[900]"),
            "--tw-prose-th-borders": theme("colors.gray[700]"),
            "--tw-prose-td-borders": theme("colors.gray[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
