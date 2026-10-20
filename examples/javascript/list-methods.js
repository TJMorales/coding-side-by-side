// An array can grow and shrink while the program runs.
const playlist = ["Levitating", "Blinding Lights"];
playlist.push("As It Was");   // adds to the end
playlist.unshift("Flowers");  // adds at index 0 and shifts the rest right
console.log("Playlist:", playlist);
console.log(`Size: ${playlist.length}`);

// Use an index to read or replace one item.
playlist[1] = "Espresso";
console.log(`First song: ${playlist[0]}`);
console.log("After replacing index 1:", playlist);

// splice(index, 1) removes 1 item at an index. pop() removes the last item and returns it.
playlist.splice(playlist.indexOf("Blinding Lights"), 1);
const last = playlist.pop();
console.log(`Popped: ${last}`);
console.log("After removing:", playlist);

// includes() checks for a value. indexOf() finds where it is.
console.log(`Has 'Espresso': ${playlist.includes("Espresso")}`);
console.log(`Index of 'Espresso': ${playlist.indexOf("Espresso")}`);

// Edge case: indexOf() gives -1 for a missing value, so check before you splice.
const spot = playlist.indexOf("Hello");
if (spot !== -1) {
  playlist.splice(spot, 1);
} else {
  console.log("'Hello' is not in the playlist");
}
