# Project Documentation — Employee Attendance App

## 1. Overview

The Employee Attendance App is a lightweight, single-page front-end application for recording and viewing daily employee attendance. It has no backend/server component — all data lives in the browser via `localStorage`.

The app has three menu sections:

| Menu               | Purpose                                                        |
|---------------------|-----------------------------------------------------------------|
| Attendance Form     | Submit a new attendance entry for an employee.                 |
| Today's Attendance  | View all attendance entries recorded for the current date.     |
| Dashboard           | Reserved for future reporting/analytics. Currently shows "Work In Progress". |

## 2. Architecture

This is a static client-side app made of three files:

- **`index.html`** — defines the layout: a header with the navigation menu, and three `<section>` blocks (one per menu item), only one of which is visible at a time (`.page.active`).
- **`style.css`** — visual styling for the header, nav buttons, form, table, and dashboard placeholder.
- **`script.js`** — all behavior:
  - Menu/tab switching
  - Form submission and validation (via native HTML `required` attributes)
  - Reading/writing attendance records to `localStorage`
  - Rendering the "Today's Attendance" table

There is no build tooling, bundler, or external dependency — the app runs by opening `index.html` in a browser.

## 3. Data Model

Each attendance entry is stored as a JSON object with the following shape:

```json
{
  "id": 1699999999999,
  "empId": "EMP001",
  "empName": "Jane Doe",
  "department": "Engineering",
  "status": "Present",
  "time": "09:03",
  "date": "2026-09-18"
}
```

| Field        | Type   | Description                                              |
|--------------|--------|------------------------------------------------------------|
| `id`         | number | Unique identifier, generated from `Date.now()` at submission time. |
| `empId`      | string | Employee ID entered in the form.                          |
| `empName`    | string | Employee name entered in the form.                        |
| `department` | string | Optional department/team name.                            |
| `status`     | string | One of: `Present`, `Late`, `Half Day`, `Absent`.           |
| `time`       | string | Time of the entry, `HH:MM` (24-hour), defaults to current time but is editable. |
| `date`       | string | Date the entry was submitted, `YYYY-MM-DD`, always set to the current date automatically. |

All records are stored together as a single JSON array under the `localStorage` key:

```
attendanceRecords
```

## 4. Key Functions (script.js)

| Function                  | Responsibility                                                        |
|-----------------------------|--------------------------------------------------------------------------|
| `getTodayISO()`             | Returns today's date as `YYYY-MM-DD`.                                    |
| `getCurrentTimeValue()`     | Returns the current time as `HH:MM`, used to pre-fill the time field.    |
| `loadRecords()`             | Reads and parses the full attendance array from `localStorage`.         |
| `saveRecord(record)`        | Appends a new record and writes the array back to `localStorage`.       |
| `renderTodayAttendance()`   | Filters records by today's date and renders them into the table.        |

Menu switching is handled by a single event listener attached to all `.menu-btn` elements: it toggles the `active` class on both the clicked button and the matching `.page` section, and re-renders the attendance table whenever the "Today's Attendance" tab is opened.

## 5. How the Menus Work

### Attendance Form
- User fills in Employee ID, Name, Department (optional), Status, and Time.
- On submit, a new record is created with today's date and saved to `localStorage`.
- A success message is briefly shown, and the form resets (with the time field re-populated to the current time).

### Today's Attendance
- On opening this tab, the app reads all stored records, filters to only those matching today's date, and renders them into a table.
- If there are no records yet for today, a "No attendance records for today yet." message is shown instead of an empty table.

### Dashboard
- Static placeholder section. Displays a "🚧 Work In Progress 🚧" message. Intended for future features such as attendance summaries, charts, or reports.

## 6. Known Limitations

- **No multi-device sync** — data is stored per-browser via `localStorage`; it will not appear on other devices or browsers.
- **No authentication** — there is no login or user accounts; anyone with access to the page can submit or view records.
- **No edit/delete** — once submitted, a record cannot currently be edited or removed from the UI (this would need to be added).
- **No historical view** — only today's records are shown; there is no view for past dates yet.
- **Data can be lost** — clearing browser cache/storage will delete all saved attendance records.

## 7. Suggested Future Enhancements

- Replace `localStorage` with a real backend (e.g., a REST API + database) for multi-user, multi-device support.
- Add authentication/roles (e.g., employee vs. admin/HR).
- Build out the Dashboard with summaries (e.g., attendance rate, late count, absentee trends).
- Add a date picker to browse attendance history beyond "today".
- Add edit/delete capability for existing records.
- Add CSV/Excel export of attendance data.

## 8. File Reference

```
attendance-app/
├── index.html          # Structure & 3 sections (form / today / dashboard)
├── style.css            # Styling
├── script.js             # App logic
├── README.md             # Quick start guide
└── DOCUMENTATION.md      # This file
```
