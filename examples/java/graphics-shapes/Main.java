import java.awt.*;
import javax.swing.*;

// A JPanel subclass is a blank area you draw on.
class ScenePanel extends JPanel {
    ScenePanel() {
        setPreferredSize(new Dimension(400, 300));
        setBackground(new Color(173, 216, 230)); // light blue
    }

    // Swing calls paintComponent whenever the panel needs to be drawn.
    // You never call it yourself.
    @Override
    protected void paintComponent(Graphics g) {
        // super.paintComponent clears the panel and fills the background.
        super.paintComponent(g);

        // (0, 0) is the top-left corner, and y goes down.
        // fillRect(x, y, width, height) starts at the top-left corner of the shape.
        g.setColor(Color.GREEN);
        g.fillRect(0, 240, 400, 60);            // grass
        g.setColor(new Color(178, 34, 34));     // firebrick
        g.fillRect(120, 140, 160, 100);         // school building
        g.setColor(new Color(139, 69, 19));     // saddle brown
        g.fillRect(180, 190, 40, 50);           // door

        // fillOval uses the box around the circle, not its center.
        g.setColor(new Color(255, 215, 0));     // gold fill
        g.fillOval(300, 30, 60, 60);
        g.setColor(Color.ORANGE);               // outline
        g.drawOval(300, 30, 60, 60);

        // drawString's y is the baseline of the text.
        g.setColor(Color.BLACK);
        g.setFont(new Font("Arial", Font.BOLD, 16));
        // Measure the text so it can be centered at x = 200.
        int width = g.getFontMetrics().stringWidth("Vista Ridge");
        g.drawString("Vista Ridge", 200 - width / 2, 120);
    }
}

public class Main {
    public static void main(String[] args) {
        // Build Swing windows on the event dispatch thread.
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Draw shapes");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.add(new ScenePanel());
            frame.pack(); // size the window to fit the panel's preferred size
            frame.setVisible(true);
        });
    }
}
