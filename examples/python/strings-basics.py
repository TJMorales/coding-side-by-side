song = "Bohemian Rhapsody"
artist = "Queen"

# len() counts the characters, including spaces.
print("Length:", len(song))

# Index a string like a list. The first character is at index 0.
print("First letter:", song[0])
print("Last letter:", song[len(song) - 1])

# + joins strings.
print("Now playing: " + song + " by " + artist)

# == compares the text of two strings.
search = "Que" + "en"
print("search == artist:", search == artist)

# Comparison is case-sensitive, so "queen" is not equal to "Queen".
print("Lowercase match:", "queen" == artist)
