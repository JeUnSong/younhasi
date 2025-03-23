/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                starFloat: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-20px)' },
                },
            },
            animation: {
                starFloat: 'starFloat 10s linear infinite',
            },
        },
    },
    plugins: [],
};