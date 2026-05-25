//starting with the 1st part
//GRADE VALIDATOR
//1.1 
function isValidScore(score){
// first, we take care of the 0 problem. 
//we need to check if count is not "empty" (undefined, null or "") 
//and also include the situation when score is not 0
    if (!score && score !== 0){
        console.log('Warning: no score provided.')
        return false;
    }
 // include the scores from 0 to 100   
    if (score >= 0 && score <= 100){
        return true;
    }else{
        return false;
    }
}
// calling isvalidScore function to check if it's working properly
isValidScore(85);
isValidScore(101);   
isValidScore(-5); 
isValidScore(null);
isValidScore(0);

// 1.2
function getLetterGrade(score, passingScore = 50){
//first, we have to check if score is valid    
    if (!isValidScore(score)){
        return 'Invalid';
    }
// use switch statement to give specific score specific letter    
    switch (true){
        case (score >= 90 && score <= 100):
            return 'A';
        case (score >= 75 && score <= 89):
            return 'B';
        case (score >= 60 && score <=74):
            return 'C';
        case (score >= passingScore && score <= 59):
            return 'D';
        case (score < passingScore):
            return 'F';
    }
    }    
    
    getLetterGrade(92);
    getLetterGrade(58);
    getLetterGrade(58, 60);
    getLetterGrade(110);

// 1.3
// fixing the isValidScore function
function isValidScore(score){
    // we need to transform any string coming to the function as a score into a number
    let numScore = Number(score);

    //we also need to check if score is valid (not empty) 
    //and also check if the transformed number may be equal to 0 (real zero score, not null)
    if (!score && numScore !== 0){
        console.log('Warning: no score provided.');
        return false;
    }
    // check if the transformed score is between 0 and 100
    if (numScore >= 0 && numScore <=100){
        return true;
    } else {
        return false;
    }
}
const formScore = "85";

console.log(formScore == 85);    // true
console.log(formScore === 85);   // false
console.log(isValidScore(formScore));  // does your function handle this correctly? // absolutely <3

// we should use the === operator, 
// because it not only compares the value,
//but === operator checks both the value and the type of a score.

//Part 2 Score Calculators
//2.1 average calculator
const calculateAverage = 
    (s1, s2, s3, s4 = 0, count = 3) =>
    (s1 + s2 + s3 + s4) / count;
//for getting the average, we have to add every number we have and
//devide the final number into the count of numbers.
//so, because we have the option in this function and count may be 3 or 4,
//we have to divide on the 'count', not strictly on the number 4 itself

//2.2 weighted score calculator
const calculateWeightedScore = 
    (exam, homework, bonus = 0) =>
    +(exam * 0.6 + homework * 0.4 + bonus).toFixed(2);
    
    // used toFixed(2) tool to add 2 decimals to the final returned number,
    //but the final result is string after using .toFixed(2) function, so
    //plus sign is needed to transform the result from string to a number,

//2.3 eligibility for the exam
const isEligibleForRetake =
    (score, attendance) =>
    (score <60 && attendance >=75);

//Part 3 score processor
//3.1 
const processScore = function(score, callback) {
    // validate, then apply callback
    if (!isValidScore(score)){
        console.log('Error!');
        return null;
    }
    return callback(score);
  }
  processScore(78, getLetterGrade);
  processScore(78, score => score >= 60 ? "Pass" : "Fail");
  processScore(78, score => Math.round(score * 1.1));
  processScore(110, getLetterGrade);

//3.2
function applyToAll(s1, s2, s3, callback){
    console.log(processScore(s1, callback));
    console.log(processScore(s2, callback));
    console.log(processScore(s3, callback));
}
applyToAll(55, 72, 91, getLetterGrade);
applyToAll(55, 72, 91, score => score >= 60 ? "Pass" : "Fail");

//Part 4 Score Tracker
function createTracker(subjectName, passingScore = 60) {
    let count   = 0;
    let total   = 0;
    let highest = 0;
    let lowest  = 100;
   
    return function(score) {
      // 1. Validate score using isValidScore
      if (!isValidScore(score)){
        console.log(`[${subjectName}]  Error: invalid score, not recorded.`);
        return;
      }
      // 2. Update count, total, highest, lowest
      count++;

      total += score;

      if (score > highest){
        highest = score;
      }
      if (score < lowest){
        lowest = score;
      }
      //preparing average score part for the final output of this function
      let average = (total / count).toFixed(2);
      //preparing the status part for the final output(pass or fail)
      let status = score >= passingScore ? "Pass":"Fail";
      // 3. Print the summary line (see expected output below)
      console.log(`[${subjectName}]  #${count}   score: ${score}   avg: ${average}   high: ${highest}   low: ${lowest}   → ${status}`);

    }
  }
  const mathTracker = createTracker("Mathematics");
  mathTracker(78);
  mathTracker(45);
  mathTracker(92);
  mathTracker(110);

  const englishTracker = createTracker("English", 55);
  englishTracker(60);