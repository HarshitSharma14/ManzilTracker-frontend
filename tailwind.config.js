/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Adding the specific colors used in your bubble effects
                bubble: {
                    purple: '#6b21a8',
                    blue: '#1e40af',
                    indigo: '#4338ca',
                    pink: '#be185d',
                    teal: '#0f766e',
                },
                // Adding glow colors
                glow: {
                    purple: 'rgba(192,132,252,0.9)',
                    blue: 'rgba(96,165,250,0.9)',
                    indigo: 'rgba(129,140,248,0.9)',
                    pink: 'rgba(244,114,182,0.9)',
                    teal: 'rgba(94,234,212,0.9)',
                },
                gradient: {
                    start: '#000000',
                    mid: '#1e0245',
                    end: '#3b0764',
                    level2: '#1e1b4b',
                }
            },
            animation: {
                'cloud-drift': 'cloudDrift 2s ease-in-out forwards',
            },
            keyframes: {
                cloudDrift: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '20%': { opacity: '1', transform: 'translateY(0)' },
                    '80%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-20px)' },
                }
            },
            boxShadow: {
                // Custom glow shadows for bubbles
                'glow-purple': '0 0 80px 40px rgba(192,132,252,0.9)',
                'glow-blue': '0 0 80px 40px rgba(96,165,250,0.9)',
                'glow-indigo': '0 0 80px 40px rgba(129,140,248,0.9)',
                'glow-pink': '0 0 80px 40px rgba(244,114,182,0.9)',
                'glow-teal': '0 0 80px 40px rgba(94,234,212,0.9)',
            },
            zIndex: {
                '60': '60', // For your scroll effect
            },
            backgroundImage: {
                'level1': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
                'level2': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    safelist: [
        {
            pattern: /bg-\[url\(.*\)\]/,
        },
        // Safelist all bubble colors and glows
        {
            pattern: /bg-bubble-(purple|blue|indigo|pink|teal)/,
        },
        {
            pattern: /shadow-glow-(purple|blue|indigo|pink|teal)/,
        },
        // Safelist animation classes
        'animate-cloud-drift',
        // Safelist z-index classes
        'z-10', 'z-20', 'z-30', 'z-40', 'z-50', 'z-60'
    ]
};