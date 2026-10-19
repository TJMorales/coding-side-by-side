import turtle

screen = turtle.Screen()
screen.setup(400, 300)
screen.bgcolor("lightblue")

pen = turtle.Turtle()
pen.speed(0)
pen.hideturtle()


def rectangle(x, y, width, height, color):
    # Lift the pen so moving to the corner does not draw a line.
    pen.penup()
    pen.goto(x, y)
    pen.setheading(0)
    pen.pendown()
    pen.color(color)
    # Every shape drawn between begin_fill() and end_fill() gets filled.
    pen.begin_fill()
    for _ in range(2):
        pen.forward(width)
        pen.left(90)
        pen.forward(height)
        pen.left(90)
    pen.end_fill()


# (0, 0) is the center of the window, and y goes up.
# (x, y) is the bottom-left corner of each rectangle.
rectangle(-200, -150, 400, 60, "green")      # grass
rectangle(-80, -90, 160, 100, "firebrick")   # school building
rectangle(-20, -90, 40, 50, "saddlebrown")   # door

# Facing right, circle(30) puts the center 30 units above the start point.
pen.penup()
pen.goto(130, 60)
pen.setheading(0)
pen.pendown()
pen.color("orange", "gold")  # outline color, fill color
pen.begin_fill()
pen.circle(30)
pen.end_fill()

pen.penup()
pen.goto(0, 30)
pen.color("black")
pen.write("Vista Ridge", align="center", font=("Arial", 16, "bold"))

# turtle.done() keeps the window open until you close it.
turtle.done()
