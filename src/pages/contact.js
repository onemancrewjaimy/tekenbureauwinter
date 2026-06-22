import { locationDrawing } from '../js/svg-art.js';

const art = document.getElementById('location-art');
if (art) art.innerHTML = locationDrawing();
