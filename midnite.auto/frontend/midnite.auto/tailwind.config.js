/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          midnite: {
            primary: 'oklch(58% 0.233 277.117)',
            secondary: 'oklch(65% 0.241 354.308)',
            accent: 'oklch(77% 0.152 181.912)',
            neutral: 'oklch(14% 0.005 285.823)',
            'base-100': 'oklch(25.33% 0.016 252.42)',
            'base-200': 'oklch(23.26% 0.014 253.1)',
            'base-300': 'oklch(21.15% 0.012 254.09)',
            info: 'oklch(74% 0.16 232.661)',
            success: 'oklch(76% 0.177 163.223)',
            warning: 'oklch(82% 0.189 84.429)',
            error: 'oklch(71% 0.194 13.428)',
            '--rounded-box': '1rem',
            '--rounded-btn': '0.5rem',
            '--rounded-badge': '1.9rem',
          },
        },
        'dark', // optional built-in dark theme
      ],
    },
  };
  