// ==========================================================
// Employee Attendance App
// Simple vanilla JS app. Data is persisted in the browser's
// localStorage (key: "attendanceRecords"). No backend needed.
// ==========================================================

const STORAGE_KEY = "attendanceRecords";

// ---------- Helpers ----------

function getTodayISO() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getCurrentTimeValue() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${min}`;
}

function loadRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveRecord(record) {
  const records = loadRecords();
  records.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ---------- Menu switching ----------

const menuButtons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // toggle active button
    menuButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // toggle active page
    const targetId = btn.dataset.target;
    pages.forEach((page) => {
      page.classList.toggle("active", page.id === targetId);
    });

    // refresh today's attendance table whenever that tab is opened
    if (targetId === "today-attendance") {
      renderTodayAttendance();
    }
  });
});

// ---------- Attendance Form ----------

const attendanceForm = document.getElementById("attendanceForm");
const formMessage = document.getElementById("formMessage");
const timeInInput = document.getElementById("timeIn");

// Pre-fill the time field with the current time on load
timeInInput.value = getCurrentTimeValue();

attendanceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const record = {
    id: Date.now(),
    empId: document.getElementById("empId").value.trim(),
    empName: document.getElementById("empName").value.trim(),
    department: document.getElementById("department").value.trim(),
    status: document.getElementById("status").value,
    time: timeInInput.value,
    date: getTodayISO(),
  };

  saveRecord(record);

  formMessage.textContent = `Attendance for "${record.empName}" saved successfully.`;
  attendanceForm.reset();
  timeInInput.value = getCurrentTimeValue();

  // clear the message after a few seconds
  setTimeout(() => {
    formMessage.textContent = "";
  }, 3000);
});

// ---------- Today's Attendance ----------

const attendanceTableBody = document.getElementById("attendanceTableBody");
const noRecordsMsg = document.getElementById("noRecords");
const todayDateSpan = document.getElementById("todayDate");

function renderTodayAttendance() {
  const today = getTodayISO();
  todayDateSpan.textContent = today;

  const records = loadRecords().filter((r) => r.date === today);

  attendanceTableBody.innerHTML = "";

  if (records.length === 0) {
    noRecordsMsg.style.display = "block";
    return;
  }

  noRecordsMsg.style.display = "none";

  records.forEach((r) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.empId}</td>
      <td>${r.empName}</td>
      <td>${r.department || "-"}</td>
      <td>${r.status}</td>
      <td>${r.time}</td>
    `;
    attendanceTableBody.appendChild(row);
  });
}

// Initial render in case the user lands directly on that tab later
renderTodayAttendance();
