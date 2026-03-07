let username = localStorage.getItem('name');
document.querySelector('.username').textContent = username
  ? username
  : 'vieras';

const userData = localStorage.getItem("loggedInUser");

if (userData) {
  const user = JSON.parse(userData);
  document.querySelector(".username").textContent = user.username;
}

const userName = document.querySelector(".user-name");
const dropdown = document.querySelector(".dropdown");

userName.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});


// Log out // 
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("token");
  window.location.href = "login.html";
});