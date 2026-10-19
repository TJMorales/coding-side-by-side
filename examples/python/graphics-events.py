import turtle

screen = turtle.Screen()
screen.setup(400, 300)
screen.title("Click or press the arrow keys")

player = turtle.Turtle()
player.shape("square")
player.color("royalblue")
player.penup()

STEP = 20
# The window runs from -200 to 200 across and -150 to 150 up.
# The square is 20 wide, so its center stays 10 away from each edge.
MAX_X = 190
MAX_Y = 140


# A callback is a plain function. turtle calls it when the event happens.
def move_to_click(x, y):
    # onscreenclick passes the click position as x and y.
    player.goto(x, y)


def move(dx, dy):
    # Edge case: clamp so the square never leaves the window.
    new_x = max(-MAX_X, min(MAX_X, player.xcor() + dx))
    new_y = max(-MAX_Y, min(MAX_Y, player.ycor() + dy))
    player.goto(new_x, new_y)


# Pass the function itself, with no parentheses.
screen.onscreenclick(move_to_click)
# lambda wraps move() so each key can pass different values.
screen.onkey(lambda: move(-STEP, 0), "Left")
screen.onkey(lambda: move(STEP, 0), "Right")
screen.onkey(lambda: move(0, STEP), "Up")
screen.onkey(lambda: move(0, -STEP), "Down")

# Key events arrive only after listen() gives the window keyboard focus.
screen.listen()
# Turtle redraws by itself after each move, so there is no repaint step.
turtle.done()
