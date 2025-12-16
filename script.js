document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();
    let isValid = true;

    const passwordValue = passwordInput.value;
    const confirmValue = confirmInput.value;

    if (!usernameInput.checkValidity()) {
      showError(usernameInput, "Fill the username");
      isValid = false;
    } else if (usernameInput.value.length < 3) {
      showError(usernameInput, "Username must be at least 3 chars");
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    if (passwordValue !== confirmValue) {
      showError(confirmInput, "Passwords do not match");
      isValid = false;
    }

    if (passwordValue.length < 8) {
      showError(passwordInput, "Password must be at least 8 chars");
      isValid = false;
    }

    if (isValid) {
      feedback.textContent = "Registration Successful! Redirecting...";
      feedback.className = "form-feedback success";

      form.reset();
    } else {
      feedback.textContent = "Please fix the errors above.";
      feedback.className = "form-feedback";
    }
  });

  function showError(inputElement, message) {
    inputElement.classList.add("error");
    const errorSpan = inputElement.nextElementSibling;
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  function clearErrors() {
    const inputs = document.querySelectorAll(".form-input");
    const errors = document.querySelectorAll(".error-message");

    inputs.forEach((input) => input.classList.remove("error"));
    errors.forEach((span) => (span.textContent = ""));
    feedback.textContent = "";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
