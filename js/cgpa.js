function addRow() {
  const table = document.getElementById("cgpaTable");
  const row = table.insertRow();
  row.innerHTML = `
    <td><input type="number" class="credits"></td>
    <td>
      <select class="grade">
        <option value="">Select</option>
        <option value="10">S</option>
        <option value="9">A</option>
        <option value="8">B</option>
        <option value="7">C</option>
        <option value="6">D</option>
        <option value="5">E</option>
        <option value="0">U</option>
      </select>
    </td>
  `;
}

function calculateCGPA() {
  let credits = document.querySelectorAll(".credits");
  let grades = document.querySelectorAll(".grade");

  let totalCredits = 0;
  let sum = 0;

  for (let i = 0; i < credits.length; i++) {
    let c = parseFloat(credits[i].value);
    let g = parseFloat(grades[i].value);
    if (!isNaN(c) && !isNaN(g)) {
      totalCredits += c;
      sum += c * g;
    }
  }

  document.getElementById("result").innerText =
    totalCredits === 0 ? "Enter valid data" : "Your CGPA is " + (sum / totalCredits).toFixed(2);
}
