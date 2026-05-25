# JS-GRADE-EVALUATOR-EXERCISE
Part 1 — Grade Validator
  Control Structures       Operators       Truthy / Falsy       Ternary  
Write three functions that validate and classify a numeric exam score.
 
1.1   isValidScore(score)
Returns true if score is a number between 0 and 100 (inclusive), false otherwise. The function must also handle falsy inputs — if score is falsy (null, undefined, 0 treated carefully, empty string), log a warning and return false.
 
isValidScore(85);          // true
isValidScore(101);         // false
isValidScore(-5);          // false
isValidScore(null);        // Warning: no score provided. → false
isValidScore(0);           // true  (0 is a valid score!)
 
Note on 0: the number 0 is falsy in JavaScript, but it is a perfectly valid exam score.
Your function must distinguish between "no value given" and "a score of zero".
Think carefully about how to handle this case — a comment explaining your approach is required.

 
1.2   getLetterGrade(score, passingScore = 50)
Returns the letter grade as a string, based on the scale below. The passingScore parameter sets the D/F boundary and defaults to 50.
 
A
90 – 100
B
75 – 89
C
60 – 74
D
passingScore – 59
F
below passingScore

 
If the score is not valid (use isValidScore), return "Invalid".
 
getLetterGrade(92);          // "A"
getLetterGrade(58);          // "D"  (default passing = 50)
getLetterGrade(58, 60);      // "F"  (custom passing = 60)
getLetterGrade(110);         // "Invalid"
 
1.3   The == vs === trap
A score arrives from a web form as the string "85". Add this test to your file and explain the output in a comment:
 
const formScore = "85";
 
console.log(formScore == 85);    // ?
console.log(formScore === 85);   // ?
console.log(isValidScore(formScore));  // does your function handle this correctly?
 


In your comment: explain which operator you should use in isValidScore and why. Then fix isValidScore if it does not handle the string input correctly.

 
Part 2 — Score Calculators
  Arrow Functions       Default Parameters       Operators  
Write three calculator functions. All three must be arrow functions stored in const variables.
 
2.1   calculateAverage(s1, s2, s3, s4 = 0, count = 3)
Calculates the average of up to four scores. The fourth score defaults to 0 and count defaults to 3, allowing the function to work correctly with either three or four scores.
 
calculateAverage(70, 80, 90);             // (70+80+90) / 3 = 80.00
calculateAverage(70, 80, 90, 100, 4);     // (70+80+90+100) / 4 = 85.00
 
Why not just always divide by 4? If you pass only three scores, the fourth defaults to 0,
which would incorrectly lower the average. The count parameter solves this.
Explain this in a comment in your code.

 
2.2   calculateWeightedScore(exam, homework, bonus = 0)
Returns the final weighted score using these weights: exam counts 60%, homework counts 40%, and bonus points are added on top (not weighted). Round the result to two decimal places.
 
calculateWeightedScore(80, 90);         // 0.6*80 + 0.4*90 + 0 = 84.00
calculateWeightedScore(80, 90, 5);      // 84 + 5 = 89.00
calculateWeightedScore(55, 70, 0);      // 0.6*55 + 0.4*70 = 61.00
 
2.3   isEligibleForRetake(score, attendance)
A student is eligible for a retake exam if their score is below 60 AND their attendance is at or above 75 (percent). Returns a boolean.
 
isEligibleForRetake(45, 80);   // true   (failed, but attended enough)
isEligibleForRetake(45, 60);   // false  (failed, but too many absences)
isEligibleForRetake(75, 80);   // false  (passed — no retake needed)
 
Write the condition using a single return statement with logical operators. No if/else.
 
 

Part 3 — Score Processor
  Callbacks       Higher-Order Functions       Function Expressions  
Write two functions that accept other functions as arguments. This pattern lets you apply any transformation or check to a score without rewriting the core logic.
 
3.1   processScore(score, callback)
A function expression (not an arrow function, not a declaration) that takes a score and a callback. It validates the score first using isValidScore — if invalid, it prints an error and returns null. If valid, it calls the callback with the score and returns the result.
 
const processScore = function(score, callback) {
  // validate, then apply callback
};
 
// Test with different callbacks:
processScore(78, getLetterGrade);
// "B"
 
processScore(78, score => score >= 60 ? "Pass" : "Fail");
// "Pass"
 
processScore(78, score => Math.round(score * 1.1));
// 86  (10% bonus applied)
 
processScore(110, getLetterGrade);
// Error: invalid score. → null
 
3.2   applyToAll(s1, s2, s3, callback)
Takes three scores and a callback. Calls processScore on each score and prints the result for each. Write this as a function declaration.
 
applyToAll(55, 72, 91, getLetterGrade);
// Score 55: D
// Score 72: C
// Score 91: A
 
applyToAll(55, 72, 91, score => score >= 60 ? "Pass" : "Fail");
// Score 55: Fail
// Score 72: Pass
// Score 91: Pass
 
Notice that applyToAll does not know — and does not care — what the callback does.
It could format the score, classify it, transform it, or anything else.
This is the point of higher-order functions: the logic stays separate from the structure.

 
 
 
Part 4 — Score Tracker
  Closures       Scope       Default Parameters  
Write a function createTracker(subjectName, passingScore = 60) that returns a single function. Every time the returned function is called with a score, it updates private state and prints a summary line.
 
The private state — count, total, highest score, lowest score — lives inside the closure. It is not accessible from outside. The only way to interact with it is by calling the returned function.
 
Signature
function createTracker(subjectName, passingScore = 60) {
  let count   = 0;
  let total   = 0;
  let highest = 0;
  let lowest  = 100;
 
  return function(score) {
    // 1. Validate score using isValidScore
    // 2. Update count, total, highest, lowest
    // 3. Print the summary line (see expected output below)
  };
}
 
Expected output
const mathTracker = createTracker("Mathematics");
 
mathTracker(78);
// [Mathematics]  #1   score: 78   avg: 78.00   high: 78   low: 78   → Pass
 
mathTracker(45);
// [Mathematics]  #2   score: 45   avg: 61.50   high: 78   low: 45   → Fail
 
mathTracker(92);
// [Mathematics]  #3   score: 92   avg: 71.67   high: 92   low: 45   → Pass
 
mathTracker(110);
// [Mathematics]  Error: invalid score, not recorded.
 
// Each tracker is completely independent:
const englishTracker = createTracker("English", 55);
englishTracker(60);
// [English]  #1   score: 60   avg: 60.00   high: 60   low: 60   → Pass
 
 
The Pass / Fail label at the end of each line must use a ternary operator.
 
Why does this demonstrate a closure?
 
After createTracker() finishes executing, its local variables (count, total, highest,
lowest) would normally be deleted. But because the returned function still references
them, JavaScript keeps them alive in memory. Each call to mathTracker() reads and
updates the same variables — without them being global.
 
Create two trackers (math and english) and confirm they maintain completely
separate state. Explain this in a comment.

 
 
 

Bonus — The Final Report
  All Concepts  
Write a function printStudentReport(name, exam, homework, attendance, bonus) that combines all four parts and prints a complete evaluation for one student.
 
It must:
Calculate the weighted score using calculateWeightedScore (Part 2)
Validate the result using isValidScore (Part 1)
Determine the letter grade using getLetterGrade (Part 1)
Check retake eligibility using isEligibleForRetake (Part 2)
Print the full report using template literals only — no string concatenation
 
Expected output
printStudentReport("Petra Novak", 74, 88, 82, 3);
 
====================================
Student:   Petra Novak
------------------------------------
Exam:       74    (weight: 60%)
Homework:   88    (weight: 40%)
Bonus:       3    pts
Final score: 82.60
Grade:       B
Attendance:  82%
Retake:      No
====================================
 
 
 
Acceptance Criteria
Part 1
isValidScore correctly handles the edge case of score === 0 (must return true)
getLetterGrade uses if / else if / else — no switch, no ternary chains
Default parameter passingScore = 50 is present and works
The == vs === comparison is demonstrated and explained in a comment
 
Part 2
All three functions are arrow functions assigned to const
calculateAverage uses default parameters for s4 and count
isEligibleForRetake is a single return statement using logical operators
 
Part 3
processScore is a function expression (not a declaration or arrow function)
applyToAll is a function declaration
Both functions are tested with at least two different callbacks each
 
Part 4
createTracker uses a closure — no global variables for count, total, highest, lowest
The returned function is a function expression (anonymous)
Ternary operator is used for the Pass / Fail label
Two independent trackers are created and shown to have separate state
A comment explains what a closure is and why the state survives
 
General
No var — only let and const
All output uses template literals
The file runs without errors: node grades.js
 
 
Submission
Create a file named grades.js.
At the bottom of the file, include test calls for every function — at least two tests per function, including at least one edge case or invalid input.
Push to your GitHub repository and share the link.
 
Your test calls are part of the grade. A function with no tests has not been verified.
Include both "happy path" tests (expected input) and edge cases (invalid, boundary values).

