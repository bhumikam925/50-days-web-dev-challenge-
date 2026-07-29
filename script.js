const heroTitle = document.querySelector("#hero-title");
const heroButton = document.querySelector("#hero-btn");

heroButton.addEventListener("click", function (event) {
    event.preventDefault();

    heroTitle.textContent = "Welcome to the Synexus Core!";

    heroTitle.classList.toggle("active-state");
});
const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();

    if(nameValue === ""){

        document.getElementById("name").style.borderColor = "red";
        alert("Please enter your name.");

    }

    else if(!emailValue.includes("@")){

        document.getElementById("email").style.borderColor = "red";
        alert("Please enter a valid email.");

    }

    else{

        console.log("Application Ready for Server");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

    }

});
