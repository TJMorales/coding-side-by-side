const song = "Bohemian Rhapsody";
const artist = "Queen";

// length is a property of the string, so it has no parentheses.
console.log("Length:", song.length);

// Index a string like an array. The first character is at index 0.
console.log("First letter:", song[0]);
console.log("Last letter:", song[song.length - 1]);

// + joins strings.
console.log("Now playing: " + song + " by " + artist);

// === compares the text of two strings.
const search = "Que" + "en";
console.log("search === artist:", search === artist);

// Comparison is case-sensitive, so "queen" is not equal to "Queen".
console.log("Lowercase match:", "queen" === artist);
