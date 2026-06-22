import { heroDrawing } from '../js/svg-art.js';

const heroArt = document.getElementById('hero-art');
if (heroArt) heroArt.innerHTML = heroDrawing();
