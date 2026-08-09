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
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("nav-active");
});
const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();

    if (nameValue === "") {

        document.getElementById("name").style.borderColor = "red";
        alert("Please enter your name.");

    }

    else if (!emailValue.includes("@")) {

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

<div class="initiative-card hidden">

<h3>${project.title}</h3>

<p>${project.description}</p>

<p><strong>Status:</strong> ${project.status}</p>

<button class="view-btn"
data-title="${project.title}">
View Details
</button>

</div>

`;

    });

}

renderProjects(projectsData);
function debounce(func, delay){

    let timeout;

    return function(...args){

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}

const debouncedSearch = debounce(function(){

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProjects = projectsData.filter(function(project){

        return project.title.toLowerCase().includes(searchTerm);

    });

    renderProjects(filteredProjects);

}, 300);

searchInput.addEventListener("input", debouncedSearch);

searchInput.addEventListener("input", debouncedSearch);
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

// Load saved draft
const savedData = localStorage.getItem("synexus_form_draft");

if (savedData) {

    const formData = JSON.parse(savedData);

    nameInput.value = formData.name;
    emailInput.value = formData.email;

}

// Save draft automatically
function saveDraft() {

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
const testimonialsData = [

    {
        name: "Bhumika",
        quote: "Synexus helped me improve my web development skills."
    },

    {
        name: "Priya",
        quote: "The community projects gave me real-world experience."
    },

    {
        name: "Ananya",
        quote: "I learned teamwork and gained confidence in coding."
    }

];

let currentIndex = 0;

const memberName = document.getElementById("member-name");
const memberQuote = document.getElementById("member-quote");

function updateTestimonial(){

    const currentData = testimonialsData[currentIndex];

    memberName.textContent = currentData.name;
    memberQuote.textContent = currentData.quote;

    currentIndex++;

    if(currentIndex === testimonialsData.length){

        currentIndex = 0;

    }

}

updateTestimonial();

setInterval(updateTestimonial,3000);
const modal = document.getElementById("modal");

const modalTitle = document.getElementById("modal-title");

const closeModal = document.getElementById("close-modal");

gridContainer.addEventListener("click",function(e){

    if(e.target.classList.contains("view-btn")){

        const title = e.target.getAttribute("data-title");

        modalTitle.textContent = title;

        modal.style.display="flex";

    }

});

closeModal.addEventListener("click",function(){

    modal.style.display="none";

});
let taskState = [];

const taskInput = document.getElementById("task-input");

const addTaskBtn = document.getElementById("add-task-btn");

const taskList = document.getElementById("task-list");
function renderTasks(){

    taskList.innerHTML = "";

    taskState.forEach(function(task){

        taskList.innerHTML += `

        <li>

            <span>${task.text}</span>

            <button
            class="delete-btn"
            data-id="${task.id}">
            ×
            </button>

        </li>

        `;

    });

}
addTaskBtn.addEventListener("click",function(){

    const value = taskInput.value.trim();

    if(value===""){

        return;

    }

    taskState.push({

        id:Date.now(),

        text:value,

        completed:false

    });

    taskInput.value="";

    renderTasks();

});
taskList.addEventListener("click",function(e){

    if(e.target.classList.contains("delete-btn")){

        const targetId = Number(
            e.target.getAttribute("data-id")
        );

        taskState = taskState.filter(function(task){

            return task.id !== targetId;

        });

        renderTasks();

    }

});
const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach(function(element){

    observer.observe(element);

});
const taskCards = document.querySelectorAll(".task-card");
const columns = document.querySelectorAll(".column");
taskCards.forEach(card => {

    card.addEventListener("dragstart", () => {
        card.classList.add("is-dragging");
    });

    card.addEventListener("dragend", () => {
        card.classList.remove("is-dragging");
    });

});
columns.forEach(column => {

    column.addEventListener("dragover", (e) => {

        e.preventDefault();

        const draggingCard = document.querySelector(".is-dragging");

        column.appendChild(draggingCard);

    });

});
