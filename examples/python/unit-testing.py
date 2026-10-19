import io
import re
import unittest


# The function under test.
def letter_grade(score):
    if not 0 <= score <= 100:
        raise ValueError(f"score out of range: {score}")
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    return "F"


# Each method whose name starts with test is one test.
class TestLetterGrade(unittest.TestCase):
    def test_typical_scores(self):
        self.assertEqual(letter_grade(95), "A")
        self.assertEqual(letter_grade(85), "B")
        self.assertEqual(letter_grade(42), "F")

    def test_boundaries(self):
        # Off-by-one mistakes happen at the cutoffs, so test the exact cutoff values.
        self.assertEqual(letter_grade(90), "A")
        self.assertEqual(letter_grade(89), "B")
        self.assertEqual(letter_grade(70), "C")
        self.assertEqual(letter_grade(69), "F")

    def test_out_of_range_raises(self):
        # assertRaises passes only if the code inside raises that error.
        with self.assertRaises(ValueError):
            letter_grade(101)
        with self.assertRaises(ValueError):
            letter_grade(-1)


# unittest prints to stderr by default, so send its report to a buffer.
# In your own project you would just call unittest.main().
report = io.StringIO()
program = unittest.main(argv=["x"], exit=False,
                        testRunner=unittest.TextTestRunner(stream=report, verbosity=2))
# The "Ran 3 tests in 0.000s" time changes between runs, so remove it.
print(re.sub(r" in \d+\.\d+s", "", report.getvalue()).strip())
print("All passed:", program.result.wasSuccessful())
