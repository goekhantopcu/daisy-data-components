/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './modal/**/*.{.vue,.ts,.tsx,.js}',
        './table/**/*.{.vue,.ts,.tsx,.js}',
        './toast/**/*.{.vue,.ts,.tsx,.js}',
        './util/**/*.{.vue,.ts,.tsx,.js}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
