# raise stops the function and reports an error to the caller.
def parse_score(text):
    score = int(text)   # int("abc") raises ValueError on its own
    if score < 0 or score > 100:
        raise ValueError(f"score must be 0 to 100, got {score}")
    return score

for entry in ["88", "abc", "105"]:
    try:
        score = parse_score(entry)
    except ValueError as error:
        # The program keeps running instead of crashing.
        print(f"Bad entry '{entry}': {error}")
    else:
        # else runs only when the try block had no error.
        print(f"Saved score: {score}")
    finally:
        # finally runs every time, error or not.
        print(f"Done checking '{entry}'")

# Edge case: except only catches the error types you list.
try:
    print(f"Average: {sum([90, 80]) / 0}")
except ValueError:
    print("This does not run")
except ZeroDivisionError:
    print("Cannot divide by zero")
