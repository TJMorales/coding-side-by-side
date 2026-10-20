// Math is built in, so it works with no import or require().
// Results are plain numbers, so whole answers print with no .0.
console.log(`Square root of 144: ${Math.sqrt(144)}`);
console.log(`2 ** 10: ${2 ** 10}`);
console.log(`Math.pow(2, 10): ${Math.pow(2, 10)}`);

// Distance between two points on a game map.
const x1 = 1, y1 = 2, x2 = 4, y2 = 6;
const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
console.log(`Distance: ${distance}`);

// ceil() rounds up and floor() rounds down. / already keeps the decimal.
const students = 47;
console.log(`Buses needed (40 per bus): ${Math.ceil(students / 40)}`);
console.log(`Full rows of 10: ${Math.floor(students / 10)}`);

// abs(), max(), and min() live in Math too.
console.log(`Math.abs(-7): ${Math.abs(-7)}`);
const area = Math.PI * 3 ** 2;
console.log(`Area of a circle with radius 3: ${Math.round(area * 100) / 100}`);

// Edge case: Math.round() sends halves up, toward the larger number, even for negatives.
console.log(`Math.round(2.5): ${Math.round(2.5)}`);
console.log(`Math.round(3.5): ${Math.round(3.5)}`);
console.log(`Math.round(-2.5): ${Math.round(-2.5)}`);
