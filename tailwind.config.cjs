/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.{html,js,ts,tsx,vue}",
        "/**/*.{html,js,ts,tsx,vue}",
        "**/*.{html,js,ts,tsx,vue}",
        "*/**/*.{html,js,ts,tsx,vue}"
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
