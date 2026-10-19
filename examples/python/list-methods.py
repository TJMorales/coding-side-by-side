# A list can grow and shrink while the program runs.
playlist = ["Levitating", "Blinding Lights"]
playlist.append("As It Was")    # adds to the end
playlist.insert(0, "Flowers")   # adds at index 0 and shifts the rest right
print(f"Playlist: {playlist}")
print(f"Size: {len(playlist)}")

# Use an index to read or replace one item.
playlist[1] = "Espresso"
print(f"First song: {playlist[0]}")
print(f"After replacing index 1: {playlist}")

# remove() deletes by value. pop() deletes by index and returns the item.
playlist.remove("Blinding Lights")
last = playlist.pop()   # no index means the last item
print(f"Popped: {last}")
print(f"After removing: {playlist}")

# in checks for a value. index() finds where it is.
print(f"Has 'Espresso': {'Espresso' in playlist}")
print(f"Index of 'Espresso': {playlist.index('Espresso')}")

# Edge case: remove() raises ValueError if the value is missing, so check first.
if "Hello" in playlist:
    playlist.remove("Hello")
else:
    print("'Hello' is not in the playlist")
