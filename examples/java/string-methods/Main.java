public class Main {
    public static void main(String[] args) {
        // String methods return a new String. The original never changes.
        String name = "  maya lopez  ";
        String clean = name.trim().toUpperCase();
        System.out.println("Original: '" + name + "'");
        System.out.println("Cleaned: '" + clean + "'");

        // substring(start, end) includes start and stops before end.
        String course = "CSA-2115";
        System.out.println("Course: " + course.substring(0, 3));
        System.out.println("Room: " + course.substring(4));
        System.out.println("course.substring(1, 4) (index 1 up to 4): " + course.substring(1, 4));

        // indexOf() gives the index of the first match, or -1 if there is none.
        System.out.println("Index of '-': " + course.indexOf("-"));
        System.out.println("Has 'CSA': " + course.contains("CSA"));
        System.out.println("Replaced: " + course.replace("CSA", "CS1"));

        // split() breaks a String into an array. String.join() puts it back together.
        String roster = "Ana,Ben,Chloe";
        String[] names = roster.split(",");
        System.out.println("Split: " + names.length + " names, first is " + names[0]);
        System.out.println("Joined: " + String.join(" | ", names));

        // Edge case: calling a method without saving the result changes nothing.
        course.toLowerCase();
        System.out.println("After course.toLowerCase(): " + course);
        course = course.toLowerCase();
        System.out.println("After course = course.toLowerCase(): " + course);
    }
}
