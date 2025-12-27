function calculateGrade() {
  let marks = document.getElementById("marks").value;
  let grade = "U";

  if (marks >= 90) grade = "S";
  else if (marks >= 80) grade = "A";
  else if (marks >= 70) grade = "B";
  else if (marks >= 60) grade = "C";
  else if (marks >= 50) grade = "D";
  else if (marks >= 40) grade = "E";

  document.getElementById("gradeResult").innerText = "Grade: " + grade;
}
