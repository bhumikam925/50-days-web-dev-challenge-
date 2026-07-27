const heroTitle = document.querySelector("#hero-title");
const heroButton = document.querySelector("#hero-btn");

heroButton.addEventListener("click", function (event) {
    event.preventDefault();

    heroTitle.textContent = "Welcome to the Synexus Core!";

    heroTitle.classList.toggle("active-state");
});