/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
            colors: {
                accent: 'var(--color-accent)',
                'text-main': 'var(--color-text-main)',
                'text-secondary': 'var(--color-text-secondary)',
                'footer-bg': 'var(--color-footer-bg)',
                'card-border': 'var(--color-card-border)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'), // ✅ 이렇게 추가!
    ],
};