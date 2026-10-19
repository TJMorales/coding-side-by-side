# The four basic types: int, float, str, bool.
players = 11            # int: whole number
average_points = 14.5   # float: number with a decimal point
team_name = "Rangers"   # str: text in quotes
is_home_game = True     # bool: True or False

print(players, type(players))
print(average_points, type(average_points))
print(team_name, type(team_name))
print(is_home_game, type(is_home_game))

# Python has no separate character type. One letter is a str of length 1.
grade = "A"
print(grade, type(grade))

# A Python int has no maximum size, so it never overflows.
big_number = 2147483647 + 1
print("Big number:", big_number)
