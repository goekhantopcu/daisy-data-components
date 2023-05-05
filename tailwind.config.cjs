/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./**/*.{html,js,ts,tsx,vue}",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./modal/**/*.{vue,js,ts,jsx,tsx}",
        "./table/**/*.{vue,js,ts,jsx,tsx}",
        "./toast/**/*.{vue,js,ts,jsx,tsx}",
        "./util/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
