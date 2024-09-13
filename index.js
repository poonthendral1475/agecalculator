const enteredDay = document.getElementById("day-input");
const enteredMonth = document.getElementById("month-input");
const enteredYear = document.getElementById("year-input");
const form = document.querySelector("form");
const finalYear = document.getElementById("year-ans");
const finalMonth = document.getElementById("month-ans");
const finalDays = document.getElementById("day-ans");

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
  event.preventDefault();
  if (validateDate()) {
    calculateAge();
  }else{
    resetOutput();
  }
}

function validateDate() {
  const day = enteredDay.value;
  const month = enteredMonth.value;
  const year = enteredYear.value;
  const today = new Date();
  const currentDate = today.getDate();
  const currentmonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const daysInAMonth = new Date(year, month, 0).getDate();
  let valid = true;

  if (!day) {
    setError(enteredDay, "This Field is Required");
    valid = false;
  } else if (day < 1 || day > daysInAMonth) {
    setError(enteredDay, "Enter a Valid day");
    valid = false;
  } else if (year == currentYear && month >= currentmonth) {
    if (day >= currentDate) {
      setError(enteredDay, "Must be in Past");
      valid = false;
    } else {
      removeError(enteredDay);
    }
  } else {
    removeError(enteredDay);
  }

  if (!month) {
    setError(enteredMonth, "This Field is Required");
    valid = false;
  } else if (month < 1 || month > 12) {
    setError(enteredMonth, "Enter a Valid month");
    valid = false;
  } else if (year == currentYear) {
    if (month > currentmonth) {
      setError(enteredMonth, "Must be in Past");
      valid = false;
    } else {
      removeError(enteredMonth);
    }
  } else {
    removeError(enteredMonth);
  }

  if (!year) {
    setError(enteredYear, "This Field is Required");
    valid = false;
  } else if (year < 1000) {
    setError(enteredYear, "Enter a Valid year");
    valid = false;
  } else if (year > currentYear) {
    setError(enteredYear, "Must be in Past");
    valid = false;
  } else {
    removeError(enteredYear);
  }

  return valid;
}

function setError(element, message) {
  const errorGroup = element.parentElement;
  const errorMessageElement = errorGroup.querySelector(".error-msg");
  errorMessageElement.innerText = message;
  errorGroup.classList.add("invalid");
}

function removeError(element) {
  const errorGroup = element.parentElement;
  const errorMessageElement = errorGroup.querySelector(".error-msg");
  errorMessageElement.innerText = "";
  errorGroup.classList.remove("invalid");
}

function calculateAge() {
  const day = enteredDay.value;
  const month = enteredMonth.value;
  const year = enteredYear.value;
  const entereValue = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  const enteredDate = new Date(entereValue);
  const today = new Date();

  const ageInMilliSecond = today - enteredDate;
  const ageInSeconds = ageInMilliSecond / 1000;
  const ageInMinute = ageInSeconds / 60;
  const ageInHour = ageInMinute / 60;
  const ageInDay = ageInHour / 24;

  const ageInYears = Math.floor(ageInDay / 365.25);
  const ageInMonths = Math.floor((ageInDay % 365.25) / 30);
  const ageInDays = Math.floor((ageInDay % 365.25) % 30);

  if (isNaN(ageInYears) || isNaN(ageInMonths) || isNaN(ageInDays)) {
    resetOutput();
  } else {
    finalYear.innerText = ageInYears;
    finalMonth.innerText = ageInMonths;
    finalDays.innerText = ageInDays;
  }
}

function resetOutput(){
  finalYear.innerText = "--";
  finalMonth.innerText = "--";
  finalDays.innerText = "--";
}