/*
 * Error List (Part 1 - Instruction 2):
 * Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="return checkMark()", causing the form to submit and reload the page immediately.
 * Error 2 (grade.html, Line 17): Wrong function casing 'showtable()' instead of 'showTable()' (JavaScript is case-sensitive).
 * Error 3 (grade.html, Line 19): Wrong script filename 'grades.js' instead of 'grade.js'.
 * Error 4 (grade.js, Line 5): Assignment operator '=' used instead of comparison operator '===' in if (name = "").
 * Error 5 (grade.js, Line 9): Misspelled function 'isNan(mark)' instead of 'isNaN(mark)'.
 * Error 6 (grade.js, Line 14): Logical AND '&&' used instead of logical OR '||' in if (mark < 0 && mark > 100), making it impossible to be true.
 * Error 7 (grade.js, Line 28 & 30 & 42): Misspelled method 'getElementByID' instead of 'getElementById' (capital 'D').
 * Error 8 (grade.js, Line 30): British spelling 'style.colour' used instead of 'style.color'.
 * Error 9 (grade.js, Line 31): 'return true;' allows the form to submit and refresh the page, erasing the result immediately. Changed to 'return false;'.
 * Error 10 (grade.js, Line 38): Loop starts at 'let i = 1' instead of 'let i = 0', skipping the first grade ("A").
 */

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extension (Instruction 5): Check for an empty mark field
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let resultElement = document.getElementById("result");

    // Determine grade and set result text color (Instruction 6)
    if (mark >= 80) {
        grade = "A";
        resultElement.style.color = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultElement.style.color = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultElement.style.color = "orange";
    } else {
        grade = "F";
        resultElement.style.color = "red";
    }

    resultElement.innerHTML = name + " got grade " + grade;

    // Extension (Instruction 8): Display the date and time in Malaysia Standard Time
let timeText = Date().replace("Singapore Standard Time", "Malaysia Standard Time");
document.getElementById("checkedTime").innerHTML = "Checked on: " + timeText;


    // Prevent form submission so the result stays visible on the page
    return false;
}

// Extension (Instruction 7): Generate a random whole number from 0 to 100 into the mark field
function randomMark() {
    let rand = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = rand;
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    
    // Added table headers to match Figure 2
    let tableHTML = "<table><tr><th>Grade</th><th>Mark Range</th></tr>";
    
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
