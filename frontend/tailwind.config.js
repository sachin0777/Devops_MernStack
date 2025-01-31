/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		animation: {
		  "fade-in": "fadeIn 2s ease-in-out",
		  "slide-in": "slideIn 1.5s ease-out",
		  "slide-in-delay": "slideIn 1.5s 0.5s ease-out",
		  highlight: "highlight 1.5s ease-in-out infinite",
		  glow: "glow 2s ease-in-out infinite",
		},
		keyframes: {
		  fadeIn: {
			"0%": { opacity: 0 },
			"100%": { opacity: 1 },
		  },
		  slideIn: {
			"0%": { transform: "translateY(20px)", opacity: 0 },
			"100%": { transform: "translateY(0)", opacity: 1 },
		  },

		  glow: {
			"0%, 100%": {
			  boxShadow: "0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.6)",
			},
			"50%": {
			  boxShadow: "0 0 20px rgba(0, 255, 0, 1), 0 0 40px rgba(0, 255, 0, 1)",
			},
		  },
		},
	  },
	},
	plugins: [],
  };
  