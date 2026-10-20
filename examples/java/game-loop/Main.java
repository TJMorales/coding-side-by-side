import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import javax.swing.*;
import javax.swing.Timer; // the Swing Timer, not java.util.Timer

public class Main extends JPanel {
    static final int WIDTH = 600, HEIGHT = 400;
    static final int FRAME_MS = 16; // about 60 frames per second
    private final Rectangle ball = new Rectangle(290, 190, 20, 20);
    private final Rectangle paddle = new Rectangle(250, HEIGHT - 40, 100, 20);
    private int dx = 4, dy = 3; // pixels moved per frame (y grows downward in Swing)

    Main() {
        setPreferredSize(new Dimension(WIDTH, HEIGHT));
        setBackground(Color.WHITE);
        setFocusable(true); // the panel must have focus to receive key presses
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_LEFT) {
                    paddle.x = Math.max(0, paddle.x - 30);
                } else if (e.getKeyCode() == KeyEvent.VK_RIGHT) {
                    paddle.x = Math.min(WIDTH - paddle.width, paddle.x + 30);
                }
            }
        });
        // The Timer calls gameLoop every FRAME_MS on the Swing thread.
        new Timer(FRAME_MS, e -> gameLoop()).start();
    }

    private void gameLoop() {
        // 1. Update: move the ball.
        ball.translate(dx, dy);
        // 2. Collide: flip direction at a wall.
        if (ball.x < 0 || ball.x + ball.width > WIDTH) {
            dx = -dx;
        }
        // Bounce off the top, or off the paddle while moving down.
        // intersects() is the rectangle check: true when the two boxes overlap.
        if (ball.y < 0 || (dy > 0 && ball.intersects(paddle))) {
            dy = -dy;
        }
        // Edge case: the ball got past the paddle. Reset it to the center.
        if (ball.y > HEIGHT) {
            ball.setLocation(290, 190);
        }
        // 3. Draw: repaint() asks Swing to call paintComponent soon.
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g); // clears the last frame
        g.setColor(Color.BLACK);
        g.fillOval(ball.x, ball.y, ball.width, ball.height);
        g.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    public static void main(String[] args) {
        // Swing code should start on the Swing thread.
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Bounce");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.add(new Main());
            frame.pack();
            frame.setVisible(true);
        });
    }
}
