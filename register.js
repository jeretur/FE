import { fetchData } from "/fetch.js";


const registerUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const registerForm = document.querySelector('.registerForm');

  // Haetaan formista arvot
  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/users';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

    if (response.error) {
    document.getElementById("registerResponse").textContent =
      "Your login details are incorrect";
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1000);
  }

  console.log(response);
  registerForm.reset(); // tyhjennetään formi
};
const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);