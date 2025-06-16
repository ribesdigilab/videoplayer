/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // adatta ai tuoi path
    theme: {
        extend: {
            /* Palette personalizzata */
            colors: {
                "yellow-frossasco": "#fbb316",
                "blue-frossasco":  "#67819c",
            },
            /* Family personalizzata */
            fontFamily: {
                helvetica: ["Helvetica", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
