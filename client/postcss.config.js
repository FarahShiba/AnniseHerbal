//PostCSS acts as a processing engine that runs the Tailwind plugin and Autoprefixer to generate the final CSS output before it’s delivered to the browser.
//Because Tailwind needs to be processed before it becomes standard CSS. PostCSS acts as the processing engine that runs the Tailwind plugin and generates the final CSS output. (just simple notes)

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
