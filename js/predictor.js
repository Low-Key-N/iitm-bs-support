// SUBJECT DATA (EASY TO EXTEND)
const subjectsByLevel = {
  foundation: [
    "English 1",
    "Mathematics for Data Science 1",
    "Computational Thinking",
    "Statistics for Data Science 1",
    "Intro to Python Programming",
    "Mathematics for Data Science 2",
    "Statistics for Data Science 2",
    "English 2"
  ],
  diploma: [
    "Database Management Systems",
    "Machine Learning Techniques",
    "Business Analytics",
    "Application Development"
  ],
  degree: [
    "Advanced Machine Learning",
    "Deep Learning",
    "Big Data Analytics",
    "Software Engineering"
  ]
};

// UPDATE SUBJECT DROPDOWN
function updateSubjects() {
  const level = document.getElementById("levelSelect").value;
  const subjectSelect = document.getElementById("subjectSelect");

  subjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';

  if (!level) {
    subjectSelect.disabled = true;
    return;
  }

  subjectsByLevel[level].forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  subjectSelect.disabled = false;
}

// MARKS PREDICTOR
function predictMarks() {
  const current = Number(document.getElementById("currentMarks").value);
  const target = Number(document.getElementById("targetMarks").value);

  if (isNaN(current) || isNaN(target)) {
    document.getElementById("result").innerText = "Please enter valid marks.";
    return;
  }

  const needed = target - current;

  document.getElementById("result").innerText =
    needed <= 0
      ? "🎉 Target already achievable!"
      : `You need ${needed} marks in the end-term exam.`;
}
