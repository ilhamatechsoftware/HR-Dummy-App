# Employee Attendance App

A simple, no-backend Employee Attendance web application built with plain **HTML, CSS, and JavaScript**.

## Features

- **Attendance Form** — record an employee's ID, name, department, status, and time.
- **Today's Attendance** — view a table of all attendance records submitted today.
- **Dashboard** — placeholder tab, currently marked as *Work In Progress*.

## Tech Stack

- HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript (no libraries)
- Browser `localStorage` for data persistence (no server/database required)

## Project Structure

```
attendance-app/
├── index.html          # App markup / structure
├── style.css            # App styling
├── script.js             # App logic (menu switching, form handling, storage)
├── README.md             # This file
└── DOCUMENTATION.md      # Detailed project documentation
```

## How to Run

No build step or server is required.

1. Download / copy the `attendance-app` folder to your computer.
2. Open `index.html` directly in any modern web browser (double-click it, or right-click → Open With → your browser).

That's it — the app runs entirely client-side.

> Optional: if you prefer serving it over a local web server (e.g. for testing on other devices on your network), you can run something like `python3 -m http.server` inside the folder and visit `http://localhost:8000`.

## Data Persistence

All attendance records are saved in the browser's `localStorage`. This means:

- Data will persist across page reloads on the **same browser, same device**.
- Data is **not shared** between different browsers, devices, or users.
- Clearing browser storage/cache will erase the saved records.

This app is intended as a lightweight starting point / demo. See `DOCUMENTATION.md` for notes on extending it with a real backend.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Edge, Safari) that support `localStorage` and ES6 JavaScript.
