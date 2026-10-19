public class Main {
    public static void main(String[] args) {
        String song = "Bohemian Rhapsody";
        String artist = "Queen";

        // length() is a method on the String, so it needs parentheses.
        System.out.println("Length: " + song.length());

        // charAt() gets one character. The first character is at index 0.
        System.out.println("First letter: " + song.charAt(0));
        System.out.println("Last letter: " + song.charAt(song.length() - 1));

        // + joins Strings.
        System.out.println("Now playing: " + song + " by " + artist);

        // equals() compares the text. == checks if both are the same object in memory.
        String part = "Que";
        String search = part + "en";
        System.out.println("search.equals(artist): " + search.equals(artist));
        System.out.println("search == artist: " + (search == artist));

        // equals() is case-sensitive, so "queen" is not equal to "Queen".
        System.out.println("Lowercase match: " + "queen".equals(artist));
    }
}
