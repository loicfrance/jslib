/**
 * @module utils/colors
 */

/**
 * @typedef {Object} rgb
 * @property {number} r - integer in [0;255]
 * @property {number} g - integer in [0;255]
 * @property {number} b - integer in [0;255]
 */
//noinspection JSSuspiciousNameCombination
/**
 * @typedef {Object} hsv
 *
 * @property {number} h - integer in [0;359]
 * @property {number} s - integer in [0;255]
 * @property {number} v - integer in [0;255]
 */

/**
 * generates a random hex color
 *
 * @param {number} [octets=3] - number of bytes this color will be on (4, 3 or 1.5) (not checked)
 * @returns {string}
 */
const randomColor = (octets=3) => '#'+Math.random().toString(16).substr(2,2*octets);
/**
 * convert hsv color to rgb
 *
 * @param {number} h - in [0;1]
 * @param {number} s - in [0;1]
 * @param {number} v - in [0;1]
 * @returns {r,g,b}
 */
function HSVtoRGB(h, s, v) {
    const
        i = Math.floor(h * 6),
        f = h * 6 - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s);
    let r,g,b;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
/**
 * convert rgb color to hsv
 *
 * @param {number} r - integer in [0;255]
 * @param {number} g - integer in [0;255]
 * @param {number} b - integer in [0;255]
 * @returns {hsv}
 */
function RBGtoHSV(r, g, b) {
    const max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: return {h: 0, s: s, v: v};
        case r: return { h: ((g - b) + d * (g < b ? 6: 0))/(6*d), s: s, v: v};
        case g: return { h: ((b - r) + d * 2)/(6*d), s: s, v: v};
        case b: return { h: ((r - g) + d * 4)/(6*d), s: s, v: v};
        default : return {h: 0, s: 0, v: 0};
    }
}
/**
 * convert rgb color to hexadecimal string formated color
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
const RGBToHex = (r, g, b)=> ((r<16 && g < 16 && b < 16) || (r >= 16 && g >= 16 && b >= 16)) ?
    `#${r.toString(16)}${g.toString(16)}${b.toString(16)}` :
    `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;

export {
    randomColor,
    HSVtoRGB,
    RBGtoHSV,
    RGBToHex
}