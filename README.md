#  Personal Finance Tracker App

A responsive web application to manage your income and expenses with a live chart, data filtering, and dark/light mode toggle. Built using **HTML**, **CSS**, **JavaScript**, and **Chart.js**.

![screenshot](./screenshot-light.png)  
*Light mode interface*

![screenshot](./screenshot-dark.png)  
*Dark mode interface*

---

##  Features

-  Add income and expense transactions
-  View total **balance**, **income**, and **expenses**
-  Filter transactions by type (All, Income, Expense)
-  Export transaction data to **CSV**
-  **Dark/Light** theme toggle
-  **Doughnut chart** to visualize financial data
-  Mobile-responsive design

---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Chart.js** (via CDN)
- **LocalStorage** (for persistent data)

---

## Project Structure

personal-finance-tracker/
│
├── index.html #App layout and structure
├── styles.css #App styling + responsive design
├── app.js #App logic and interactivity
├── background.jpg #Optional background image
├── screenshot-light_theme.png #UI screenshot in light mode
└── screenshot-dark_theme.png #UI screenshot in dark mode

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/WisdomUdo/personal-finance-tracker.git
cd personal-finance-tracker

2. Open index.html
You can open the app in your browser directly:
open index.html
# OR
double-click index.html on your system
No server or build tool needed – it's a pure front-end project.

## Chart Visualization
This app uses Chart.js to render a live-updating doughnut chart reflecting your income and expenses.

- Green = Income
- Red = Expense

The chart updates automatically as you add or remove transactions.

## Theme Toggle
You can switch between light and dark mode using the checkbox in the top-right corner.

The mode preference is not saved yet, but can be enhanced using localStorage.

## Exporting Data
Click the Export CSV button to download your financial data in .csv format. Useful for Excel or Google Sheets imports.

## Mobile Responsive
Built with CSS Flexbox and media queries for optimal viewing across all screen sizes.

 ## Improvements You Can Make
 - Add a date field to each transaction
 - Save theme mode in localStorage
 - Add monthly/yearly summaries
 - Connect to a database for cloud syncing

## Author
# Wisdom Udo
Frontend Developer & Technical Writer
