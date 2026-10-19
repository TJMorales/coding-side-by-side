import java.util.Arrays;

// An interface lists methods a class promises to have. It has no instance fields or constructors.
interface Gradable {
    double percent();
}

// An abstract class can have real fields and methods, and leave percent() to subclasses.
abstract class Assignment implements Gradable {
    protected final String title;
    Assignment(String title) {
        this.title = title;
    }

    String summary() {
        return String.format("%s: %.1f%%", title, percent());
    }
}

class Quiz extends Assignment {
    private final int correct, total;
    Quiz(String title, int correct, int total) {
        super(title);
        this.correct = correct;
        this.total = total;
    }

    @Override
    public double percent() {
        return (double) correct / total * 100;
    }
}

class Project extends Assignment {
    private final int[] rubric; // each category is scored out of 4
    Project(String title, int[] rubric) {
        super(title);
        this.rubric = rubric;
    }

    @Override
    public double percent() {
        return (double) Arrays.stream(rubric).sum() / (4 * rubric.length) * 100;
    }
}

public class Main {
    public static void main(String[] args) {
        Assignment[] gradebook = {new Quiz("Loops quiz", 9, 10), new Project("Game project", new int[] {4, 3, 4, 3})};
        for (Assignment item : gradebook) {
            System.out.println(item.summary());
        }
        // Edge case: new Assignment("Mystery"); does not compile. Assignment is abstract; cannot be instantiated.
    }
}
