let isLogin = true;
const formTitle = document.getElementById("formTitle");
const toggleForm = document.getElementById("toggleForm");
const authForm = document.getElementById("authForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const dashboard = document.getElementById("dashboard");
const authContainer = document.getElementById("authContainer");
const userDisplay = document.getElementById("userDisplay");
const logoutBtn = document.getElementById("logoutBtn");

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Signup";
  submitBtn.textContent = isLogin ? "Login" : "Signup";
  toggleForm.textContent = isLogin
    ? "Don't have an account? Signup"
    : "Already have an account? Login";
  message.textContent = "";
});

authForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      localStorage.setItem("loggedInUser", username);
      showDashboard(username);
    } else {
      message.textContent = "Invalid credentials.";
    }
  } else {
    if (localStorage.getItem(username)) {
      message.textContent = "Username already exists.";
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      message.textContent = "Signup successful. Please login.";
      toggleForm.click();
    }
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  dashboard.style.display = "none";
  authContainer.style.display = "block";
});

function showDashboard(username) {
  userDisplay.textContent = username;
  dashboard.style.display = "block";
  authContainer.style.display = "none";
  message.textContent = "";
}

// Auto-login if session exists
window.onload = () => {
  const user = localStorage.getItem("loggedInUser");
  if (user) showDashboard(user);
};