const savedTheme = localStorage.getItem("synexus_theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-theme");

}
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

    localStorage.removeItem("synexus_form_draft");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

}

});
const projectsData = [
    {
        title: "Technical Workshop",
        description: "Hands-on workshops to improve programming and development skills.",
        status: "Active"
    },
    {
        title: "Hackathons",
        description: "Collaborate with students and build innovative solutions.",
        status: "Completed"
    },
    {
        title: "Open Source Projects",
        description: "Contribute to open-source and build your portfolio.",
        status: "Active"
    }
];

const gridContainer = document.getElementById("dynamic-grid");
const searchInput = document.getElementById("search-projects");

function renderProjects(dataArray){

    gridContainer.innerHTML = "";

    dataArray.forEach(function(project){

        gridContainer.innerHTML += `
            <div class="initiative-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Status:</strong> ${project.status}</p>
            </div>
        `;

    });

}

renderProjects(projectsData);

searchInput.addEventListener("input", function(){

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProjects = projectsData.filter(function(project){

        return project.title.toLowerCase().includes(searchTerm);

    });
    const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

// Load saved draft
const savedData = localStorage.getItem("synexus_form_draft");

if(savedData){

    const formData = JSON.parse(savedData);

    nameInput.value = formData.name;
    emailInput.value = formData.email;

}

// Save while typing
function saveDraft(){

    const formData = {

        name: nameInput.value,
        email: emailInput.value

    };

    localStorage.setItem(
        "synexus_form_draft",
        JSON.stringify(formData)
    );

}

nameInput.addEventListener("input", saveDraft);

emailInput.addEventListener("input", saveDraft);

    renderProjects(filteredProjects);

});
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function(){

    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){

        localStorage.setItem("synexus_theme","dark");

    }

    else{

        localStorage.setItem("synexus_theme","light");

    }

});
