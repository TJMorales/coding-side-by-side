from abc import ABC, abstractmethod


# Python has no interface keyword. An ABC with only abstract methods does that job.
class Gradable(ABC):
    @abstractmethod
    def percent(self):
        pass


# An abstract class can have real fields and methods too.
# It leaves percent() for each subclass to write.
class Assignment(Gradable):
    def __init__(self, title):
        self.title = title

    def summary(self):
        return f"{self.title}: {self.percent():.1f}%"


class Quiz(Assignment):
    def __init__(self, title, correct, total):
        super().__init__(title)
        self.correct = correct
        self.total = total

    def percent(self):
        return self.correct / self.total * 100


class Project(Assignment):
    def __init__(self, title, rubric):
        super().__init__(title)
        self.rubric = rubric  # each category is scored out of 4

    def percent(self):
        return sum(self.rubric) / (4 * len(self.rubric)) * 100


gradebook = [Quiz("Loops quiz", 9, 10), Project("Game project", [4, 3, 4, 3])]
for item in gradebook:
    print(item.summary())

# Edge case: you cannot create an object from an abstract class.
try:
    Assignment("Mystery")
except TypeError as error:
    print(f"TypeError: {error}")
