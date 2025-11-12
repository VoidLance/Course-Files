# Tailwind CSS Project Setup

This project is configured with Tailwind CSS v4 and ready for development.

## 📁 Project Structure

```
├── dist/
│   └── output.css          # Generated Tailwind CSS file
├── src/
│   └── input.css           # Source CSS file with Tailwind directives
├── index.html              # Demo HTML file
├── tailwind.config.js      # Tailwind configuration
└── package.json           # NPM configuration
```

## 🚀 Getting Started

### Available Scripts

- **Build CSS**: `npm run build`
  - Compiles Tailwind CSS from `src/input.css` to `dist/output.css`

- **Watch Mode**: `npm run build:watch`
  - Watches for changes and automatically rebuilds CSS

- **Development Server**: `npm run dev`
  - Starts a local server on port 3000 to preview your HTML files

### Development Workflow

1. **Start watch mode** (in one terminal):

   ```bash
   npm run build:watch
   ```

2. **Start development server** (in another terminal):

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:

   ```
   http://localhost:3000
   ```

4. **Edit your files**:
   - Modify `index.html` to add HTML content with Tailwind classes
   - Add custom styles to `src/input.css`
   - Configure Tailwind in `tailwind.config.js`

## 🎨 Using Tailwind CSS

### Basic Example

```html
<div class="rounded-lg bg-blue-500 p-4 text-white shadow-md">
  <h1 class="text-2xl font-bold">Hello Tailwind!</h1>
  <p class="mt-2">This is styled with utility classes.</p>
</div>
```

### Custom Styles

Add custom CSS to `src/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles here */
.custom-button {
  @apply rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600;
}
```

## 📖 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind UI Components](https://tailwindui.com/)

## 🔧 Configuration

Edit `tailwind.config.js` to customize:

- Colors
- Fonts
- Spacing
- Breakpoints
- And much more!

Example:

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```
