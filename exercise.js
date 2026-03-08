import { fetchData } from "/fetch.js";

const diary = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const exerciseForm = document.querySelector(".exerciseForm");

  // Haetaan formista arvot
  const entry_date = exerciseForm.querySelector("input[name=entrydate]").value;
  const mood = exerciseForm.querySelector("input[name=mood]").value;
  const weight = exerciseForm.querySelector("input[name=weight]").value;
  const sleep_hours = exerciseForm.querySelector(
    "input[name=sleep_hours]",
  ).value;
  const notes = exerciseForm.querySelector("input[name=notes]").value;

  // Validointi
  const responseDiv = document.getElementById("exerciseResponse");

  // Validoi entry_date (YYYY-MM-DD format)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!entry_date || !dateRegex.test(entry_date)) {
    responseDiv.textContent = "Entry date must be in YYYY-MM-DD format";
    return;
  }
  const dateObj = new Date(entry_date);
  if (isNaN(dateObj.getTime())) {
    responseDiv.textContent = "Entry date must be a valid date";
    return;
  }

  // Validoi mood (text, must not be empty)
  if (!mood || mood.trim() === "") {
    responseDiv.textContent = "Mood cannot be empty";
    return;
  }

  // Validoi weight (50-150 kg)
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum) || weightNum < 50 || weightNum > 150) {
    responseDiv.textContent = "Weight must be between 50 and 150 kg";
    return;
  }

  // Validoi sleep_hours (0-24)
  const sleepNum = parseFloat(sleep_hours);
  if (isNaN(sleepNum) || sleepNum < 0 || sleepNum > 24) {
    responseDiv.textContent = "Sleep hours must be between 0 and 24";
    return;
  }

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    entry_date: entry_date,
    mood: mood,
    weight: weight,
    sleep_hours: sleep_hours,
    notes: notes,
  };

  const url = "http://localhost:3000/api/entries";
  const token = localStorage.getItem("token");

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.message) {
    // Hide current form
    document.querySelector(".exerciseForm").style.display = "none";

    // Show next form
    document.querySelector(".nextForm").style.display = "block";
  }
};

const nextForm = async (event) => {
  event.preventDefault();

  const nextForm = document.querySelector(".nextForm");

  // Haetaan formista arvot
  const type = nextForm.querySelector("input[name=type]").value;
  const duration = nextForm.querySelector("input[name=duration]").value;
  const intensity = nextForm.querySelector("input[name=intensity]").value;

  const responseDiv = document.getElementById("exerciseResponse");

  if (!type || type.trim() === "") {
    responseDiv.textContent = "Exercise cannot be empty";
    return;
  }

    const durationNum = parseFloat(duration);
  if (isNaN(durationNum) || durationNum < 0 || durationNum > 999) {
    responseDiv.textContent = "Duration must be a number between 0 and 999";
    return;
  }

      const intensityNum = parseFloat(intensity);
  if (isNaN(intensityNum) || intensityNum < 1 || intensityNum > 10) {
    responseDiv.textContent = "Intensity must be a number between 1 and 10";
    return;
  }
  const bodyData = {
    type: type,
    duration: duration,
    intensity: intensity,
  };

  const url = "http://localhost:3000/api/entries/exercises";
  const token = localStorage.getItem("token");

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

if (response.message) {
    responseDiv.textContent = "Exercise saved.";
    
    // Emit custom event for profile.html to listen to
    window.dispatchEvent(new Event("exerciseAdded"));
    
    setTimeout(function () {
      window.location.href = "profile.html"; // Redirect to profile instead of index
    }, 1000);
  }
};






const nextItemForm = document.querySelector(".nextForm");
const addItemForm = document.querySelector(".exerciseForm");
addItemForm.addEventListener("submit", diary);
nextItemForm.addEventListener("submit", nextForm);
