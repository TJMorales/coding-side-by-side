# Strategy pattern: the gradebook does not know HOW a final grade is computed.
# You pass in the rule (the strategy), so you can swap it without editing the class.

def average_all(scores):
    return sum(scores) / len(scores)


def drop_lowest(scores):
    # Edge case: with one score, there is nothing to drop.
    if len(scores) < 2:
        return average_all(scores)
    return (sum(scores) - min(scores)) / (len(scores) - 1)


def best_three(scores):
    top = sorted(scores, reverse=True)[:3]
    return sum(top) / len(top)


class Gradebook:
    def __init__(self, strategy):
        # In Python a strategy can be any function that takes a list of scores.
        self.strategy = strategy

    def final_grade(self, scores):
        return round(self.strategy(scores), 1)


maya_scores = [92, 58, 88, 95, 81]
print("Scores:", maya_scores)

for strategy in [average_all, drop_lowest, best_three]:
    book = Gradebook(strategy)
    print(f"{strategy.__name__:12} -> {book.final_grade(maya_scores)}")

# A lambda works too, for a one-off rule.
curve_five = Gradebook(lambda scores: min(100, average_all(scores) + 5))
print(f"{'curve +5':12} -> {curve_five.final_grade(maya_scores)}")

# Swap the strategy at run time on the same object.
book = Gradebook(average_all)
book.strategy = drop_lowest
print("Switched to drop_lowest:", book.final_grade(maya_scores))

# Edge case: one score.
print("One score, drop_lowest:", Gradebook(drop_lowest).final_grade([77]))
