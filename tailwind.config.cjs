/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './**/*.{.vue,.ts,.tsx,.js}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
