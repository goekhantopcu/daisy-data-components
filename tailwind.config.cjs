/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "modal/*.{vue,js,ts,jsx,tsx}",
        "table/*.{vue,js,ts,jsx,tsx}",
        "toast/*.{vue,js,ts,jsx,tsx}",
        "util/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
