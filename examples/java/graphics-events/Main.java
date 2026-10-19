import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Main extends JPanel {
    private static final int SIZE = 20, STEP = 20;
    private int x = 190, y = 140; // top-left corner of the square, starting in the center
    Main() {
        setPreferredSize(new Dimension(400, 300));
        // A listener is an object. An Adapter lets you override only the methods you need.
        addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                moveTo(e.getX() - SIZE / 2, e.getY() - SIZE / 2);
            }
        });
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                switch (e.getKeyCode()) {
                    case KeyEvent.VK_LEFT -> moveTo(x - STEP, y);
                    case KeyEvent.VK_RIGHT -> moveTo(x + STEP, y);
                    case KeyEvent.VK_UP -> moveTo(x, y - STEP);   // y goes down in Swing
                    case KeyEvent.VK_DOWN -> moveTo(x, y + STEP);
                }
            }
        });
        setFocusable(true); // key events go only to the component with focus
    }

    private void moveTo(int newX, int newY) {
        // Edge case: Math.clamp keeps the square inside the panel.
        x = Math.clamp(newX, 0, getWidth() - SIZE);
        y = Math.clamp(newY, 0, getHeight() - SIZE);
        repaint(); // asks Swing to call paintComponent again
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(new Color(65, 105, 225)); // royal blue
        g.fillRect(x, y, SIZE, SIZE);
    }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> { // build the window on the event dispatch thread
            JFrame frame = new JFrame("Click or press the arrow keys");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            Main panel = new Main();
            frame.add(panel);
            frame.pack(); // size the window to fit the panel
            frame.setVisible(true);
            panel.requestFocusInWindow(); // must come after setVisible(true)
        });
    }
}
