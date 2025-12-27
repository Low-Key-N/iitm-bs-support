/*************************************************
 * PROGRAM DATA (LEVEL-WISE)
 *************************************************/

const programCourses = {
  foundation: [
    { id: "math1", name: "Mathematics for Data Science I", credits: 4 },
    { id: "math2", name: "Mathematics for Data Science II", credits: 4 },
    { id: "stats1", name: "Statistics for Data Science I", credits: 4 },
    { id: "stats2", name: "Statistics for Data Science II", credits: 4 },
    { id: "ct", name: "Computational Thinking", credits: 4 },
    { id: "python", name: "Python Programming", credits: 4 },
    { id: "eng1", name: "English I", credits: 4 },
    { id: "eng2", name: "English II", credits: 4 }
  ],

diploma: [
  { id: "dbms", name: "Database Management Systems", credits: 4 },
  { id: "pdsa", name: "Programming, Data Structures and Algorithms using Python", credits: 4 },
  { id: "mad1", name: "Modern Application Development I", credits: 4 },
  { id: "mad1p", name: "Modern Application Development I - Project", credits: 2 },
  { id: "java", name: "Programming Concepts using Java", credits: 4 },
  { id: "mad2", name: "Modern Application Development II", credits: 4 },
  { id: "mad2p", name: "Modern Application Development II - Project", credits: 2 },
  { id: "sc", name: "System Commands", credits: 3 },

  { id: "mlf", name: "Machine Learning Foundations", credits: 4 },
  { id: "bdm", name: "Business Data Management", credits: 4 },
  { id: "mlt", name: "Machine Learning Techniques", credits: 4 },
  { id: "mlp", name: "Machine Learning Practice", credits: 4 },
  { id: "mlpp", name: "Machine Learning Practice - Project", credits: 2 },
  { id: "tds", name: "Tools in Data Science", credits: 3 },

  { id: "bdmp", name: "Business Data Management - Project (Option 1)", credits: 2 },
  { id: "ba", name: "Business Analytics (Option 1)", credits: 4 },
  { id: "dlgenai", name: "Introduction to Deep Learning and Generative AI (Option 2)", credits: 4 },
  { id: "dlgenaip", name: "Deep Learning and Generative AI - Project (Option 2)", credits: 2 }
],

  degree: [
    { id: "ai", name: "Artificial Intelligence", credits: 4 },
    { id: "dl", name: "Deep Learning", credits: 4 },
    { id: "nlp", name: "Natural Language Processing", credits: 4 },
    { id: "cv", name: "Computer Vision", credits: 4 },
    { id: "bd", name: "Big Data Analytics", credits: 4 },
    { id: "cloud", name: "Cloud Computing", credits: 4 },
    { id: "advml", name: "Advanced Machine Learning", credits: 4 },
    { id: "capstone", name: "Capstone Project", credits: 8 }
  ]
};

/*************************************************
 * GRADE POINT MAP
 *************************************************/

const gradePoints = { S:10, A:9, B:8, C:7, D:6, E:4, U:0 };

/*************************************************
 * STATE
 *************************************************/

let selectedProgram = null;
let addedCourses = [];

/*************************************************
 * STEP HANDLING
 *************************************************/

function showStep(step) {
  document.getElementById("step1").style.display = step === 1 ? "block" : "none";
  document.getElementById("step2").style.display = step === 2 ? "block" : "none";
  document.getElementById("step3").style.display = step === 3 ? "block" : "none";

  const labels = [
    "Step 1 of 3 • Program Selection",
    "Step 2 of 3 • Add Your Courses",
    "Step 3 of 3 • View Results"
  ];
  document.getElementById("stepIndicator").innerText = labels[step - 1];

  if (document.getElementById("cgpaProgress")) {
    document.getElementById("cgpaProgress").style.width =
      step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  }
}

/*************************************************
 * STEP 1: PROGRAM SELECTION
 *************************************************/

function selectProgram(program, card) {
  selectedProgram = program;
  addedCourses = [];

  // Reset UI
  document.getElementById("courseList").innerHTML = "";
  document.getElementById("courseSelect").innerHTML =
    `<option value="">Select a course to add</option>`;

  document.querySelectorAll(".program-card").forEach(c => {
    c.classList.remove("active");
    const mark = c.querySelector(".checkmark");
    if (mark) mark.remove();
  });

  card.classList.add("active");
  card.querySelector(".card-header").insertAdjacentHTML(
    "beforeend",
    `<span class="checkmark">✓</span>`
  );

  populateCourseDropdown();
  showStep(2);
}

/*************************************************
 * COURSE DROPDOWN
 *************************************************/

function populateCourseDropdown() {
  const select = document.getElementById("courseSelect");
  select.innerHTML = `<option value="">Select a course to add</option>`;

  if (!selectedProgram) return;

  const addedIds = addedCourses.map(c => c.id);

  programCourses[selectedProgram].forEach(course => {
    if (addedIds.includes(course.id)) return;

    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.name} (${course.credits} credits)`;
    select.appendChild(option);
  });
}

/*************************************************
 * ADD / REMOVE COURSES
 *************************************************/

function addCourse() {
  const courseId = document.getElementById("courseSelect").value;
  if (!courseId) return;

  const course = programCourses[selectedProgram].find(c => c.id === courseId);
  addedCourses.push({ ...course, grade: "", include: true });

  populateCourseDropdown();
  renderCourses();
}

function removeCourse(index) {
  addedCourses.splice(index, 1);
  populateCourseDropdown();
  renderCourses();
}

/*************************************************
 * RENDER COURSES
 *************************************************/

function renderCourses() {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  addedCourses.forEach((course, index) => {
    container.innerHTML += `
      <div class="course-row">
        <strong>${course.name}</strong> (${course.credits} credits)

        <select onchange="setGrade(${index}, this.value)">
          <option value="">Grade</option>
          ${Object.keys(gradePoints).map(g =>
            `<option value="${g}" ${course.grade === g ? "selected" : ""}>${g}</option>`
          ).join("")}
        </select>

        <label>
          <input type="checkbox" checked onchange="toggleInclude(${index}, this.checked)">
          Include
        </label>

        <button onclick="removeCourse(${index})">🗑</button>
      </div>
    `;
  });
}

/*************************************************
 * HANDLERS
 *************************************************/

function setGrade(index, grade) {
  addedCourses[index].grade = grade;
}

function toggleInclude(index, value) {
  addedCourses[index].include = value;
}

/*************************************************
 * CALCULATE CGPA
 *************************************************/

function calculateCGPA() {
  let totalCredits = 0;
  let totalPoints = 0;
  let totalCourses = 0;

  const gradeCount = { S:0, A:0, B:0, C:0, D:0, E:0 };

  addedCourses.forEach(course => {
    if (!course.include || !course.grade) return;

    totalCredits += course.credits;
    totalPoints += gradePoints[course.grade] * course.credits;
    totalCourses++;

    if (gradeCount[course.grade] !== undefined) {
      gradeCount[course.grade]++;
    }
  });

  if (!totalCredits) {
    alert("Please select at least one graded course.");
    return;
  }

  const cgpa = totalPoints / totalCredits;

  document.getElementById("overallCgpa").innerText = cgpa.toFixed(2);
  document.getElementById("cgpaPercent").innerText = `${(cgpa * 10).toFixed(1)}%`;
  document.getElementById("totalCredits").innerText = totalCredits;
  document.getElementById("totalCourses").innerText = totalCourses;

  document.getElementById("foundationCgpa").innerText = cgpa.toFixed(2);
  document.getElementById("foundationMeta").innerText =
    `${totalCredits} credits • ${totalCourses} courses`;

  document.getElementById("countS").innerText = gradeCount.S;
  document.getElementById("countA").innerText = gradeCount.A;
  document.getElementById("countB").innerText = gradeCount.B;
  document.getElementById("countC").innerText = gradeCount.C;
  document.getElementById("countD").innerText = gradeCount.D;
  document.getElementById("countE").innerText = gradeCount.E;

  showStep(3);
}

/*************************************************
 * BACK BUTTONS (FIXED)
 *************************************************/

function goBackToStep1() {
  selectedProgram = null;
  addedCourses = [];

  document.getElementById("courseList").innerHTML = "";
  document.getElementById("courseSelect").innerHTML =
    `<option value="">Select a course to add</option>`;

  document.querySelectorAll(".program-card").forEach(card => {
    card.classList.remove("active");
    const mark = card.querySelector(".checkmark");
    if (mark) mark.remove();
  });

  showStep(1);
}

function goBackToStep2() {
  showStep(2);
}

/*************************************************
 * INIT
 *************************************************/

showStep(1);
