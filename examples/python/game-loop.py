import turtle

WIDTH, HEIGHT = 600, 400
FRAME_MS = 16  # about 60 frames per second

screen = turtle.Screen()
screen.setup(WIDTH, HEIGHT)
screen.title("Bounce")
# tracer(0) turns off automatic drawing. You draw each frame yourself with update().
screen.tracer(0)

ball = turtle.Turtle(shape="circle")
ball.penup()
dx, dy = 4, 3  # pixels moved per frame

paddle = turtle.Turtle(shape="square")
paddle.shapesize(stretch_wid=1, stretch_len=5)  # 20 x 100 pixels
paddle.penup()
paddle.goto(0, -HEIGHT / 2 + 30)


def move_paddle(step):
    # Keep the paddle inside the window.
    limit = WIDTH / 2 - 50
    paddle.setx(max(-limit, min(limit, paddle.xcor() + step)))


screen.onkeypress(lambda: move_paddle(-30), "Left")
screen.onkeypress(lambda: move_paddle(30), "Right")
screen.listen()


def game_loop():
    global dx, dy
    # 1. Update: move the ball.
    ball.goto(ball.xcor() + dx, ball.ycor() + dy)

    # 2. Collide: flip direction at a wall. The ball's radius is 10 pixels.
    if abs(ball.xcor()) > WIDTH / 2 - 10:
        dx = -dx
    if ball.ycor() > HEIGHT / 2 - 10:
        dy = -dy
    # Rectangle check: is the ball inside the paddle's box while moving down?
    if (dy < 0 and abs(ball.xcor() - paddle.xcor()) < 50 + 10
            and abs(ball.ycor() - paddle.ycor()) < 10 + 10):
        dy = -dy
    # Edge case: the ball got past the paddle. Reset it to the center.
    if ball.ycor() < -HEIGHT / 2:
        ball.goto(0, 0)

    # 3. Draw: show this frame, then schedule the next one.
    screen.update()
    screen.ontimer(game_loop, FRAME_MS)


game_loop()
# mainloop() keeps the window open and handles keys and timers.
screen.mainloop()
