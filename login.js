import { fetchData } from "/fetch.js";

console.log("Moi luodaan nyt tokeneita ja kirjaudutaan sisään");

// Esimerkin takia haut ovat nyt suoraan tässä tiedostossa, jotta harjoitus ei sekoita
// teidän omaa projektin rakennetta

const loginUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const loginForm = document.querySelector(".loginForm");

  // Haetaan formista arvot
  const username = loginForm.querySelector("input[name=username]").value;
  const password = loginForm.querySelector("input[name=password]").value;

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
  };

  // Endpoint
  const url = "http://localhost:3000/api/users/login";

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    document.getElementById("loginResponse").textContent =
      "Your login details are incorrect";
    return;
  }

  if (response.message) {
    console.log(response.message, "success");
    localStorage.setItem("token", response.token);
    localStorage.setItem("name", response.user.username);
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);
  }

  console.log(response);
  loginForm.reset(); // tyhjennetään formi
};

function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", loginUser);
