/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ aktifkan dark mode
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Gunakan CSS variable sebagai warna
        
        // ✅ Tetap pertahankan warna pink custom kamu
        black: '#000000',
        pink: {
          50: '#ffe6f0',
          100: '#ffccde',
          200: '#ff99bd',
          300: '#ff669c',
          400: '#ff337b',
          500: '#ff005a',
          600: '#cc0048',
          700: '#990036',
          800: '#660024',
          900: '#330012',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [],
}
