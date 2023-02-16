/*
 * @Description: https://tailwindcss.com/docs/guides/nextjs
 * @Author: MADAO
 * @Date: 2023-02-16 15:34:52
 * @LastEditors: MADAO
 * @LastEditTime: 2023-02-16 15:35:12
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}