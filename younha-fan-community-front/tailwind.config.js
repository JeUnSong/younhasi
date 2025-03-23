/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        "bg-oceanBackground",
        "bg-spaceBackground",
    ],
    theme: {
        extend: {
            colors: {
                oceanBackground: "#001F3F",
                oceanPrimary: "#0074D9",
                spaceBackground: "#0C0020",
                spacePrimary: "#663399",
            },
        },
    },
    plugins: [],
};