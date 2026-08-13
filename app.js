// ===============================
// SYNEXUS APP.JS - DAY 25
// ===============================


// ===============================
// GLOBAL FEATURES
// ===============================

function initThemeToggle() {

    const themeButton = document.getElementById("theme-toggle");

    if (!themeButton) return;

    const savedTheme = localStorage.getItem("synexus_theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("synexus_theme", "dark");
        } else {
            localStorage.setItem("synexus_theme", "light");
        }

    });

}


// ===============================
// MOBILE MENU
// ===============================

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("nav-active");

    });

}


// ===============================
// HERO BUTTON
// ===============================

function initHeroButton() {

    const heroTitle = document.querySelector("#hero-title");
    const heroButton = document.querySelector("#hero-btn");

    if (!heroTitle || !heroButton) return;

    heroButton.addEventListener("click", function (event) {

        event.preventDefault();

        heroTitle.textContent =
            "Welcome to the Synexus Core!";

        heroTitle.classList.toggle("active-state");

    });

}


// ===============================
// CONTACT FORM
// ===============================

function initContactForm() {

    const contactForm = document.querySelector("#contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();

        if (nameValue === "") {

            nameInput.style.borderColor = "red";

            alert("Please enter your name.");

            return;
        }

        if (!emailValue.includes("@")) {

            emailInput.style.borderColor = "red";

            alert("Please enter a valid email.");

            return;
        }

        console.log("Application Ready for Server");

        localStorage.removeItem("synexus_form_draft");

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

    });

}


// ===============================
// CONTACT FORM DRAFT
// ===============================

function initFormDraft() {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (!nameInput || !emailInput) return;

    const savedData =
        localStorage.getItem("synexus_form_draft");

    if (savedData) {

        const formData = JSON.parse(savedData);

        nameInput.value = formData.name || "";
        emailInput.value = formData.email || "";

    }

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

}


// ===============================
// PROJECT DATA
// ===============================

const projectsData = [

    {
        title: "Technical Workshop",
        description:
            "Hands-on workshops to improve programming and development skills.",
        status: "Active"
    },

    {
        title: "Hackathons",
        description:
            "Collaborate with students and build innovative solutions.",
        status: "Completed"
    },

    {
        title: "Open Source Projects",
        description:
            "Contribute to open-source and build your portfolio.",
        status: "Active"
    }

];


// ===============================
// PROJECTS
// ===============================

function initProjects() {

    const gridContainer =
        document.getElementById("dynamic-grid");

    const searchInput =
        document.getElementById("search-projects");

    if (!gridContainer || !searchInput) return;


    function renderProjects(dataArray) {

        gridContainer.innerHTML = "";

        dataArray.forEach(function (project) {

            gridContainer.innerHTML += `

                <div class="initiative-card hidden">

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <p>
                        <strong>Status:</strong>
                        ${project.status}
                    </p>

                    <button
                        class="view-btn"
                        data-title="${project.title}">
                        View Details
                    </button>

                </div>

            `;

        });

        initScrollObserver();

    }


    function debounce(func, delay) {

        let timeout;

        return function (...args) {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                func.apply(this, args);

            }, delay);

        };

    }


    const debouncedSearch = debounce(function () {

        const searchTerm =
            searchInput.value.toLowerCase();

        const filteredProjects =
            projectsData.filter(function (project) {

                return project.title
                    .toLowerCase()
                    .includes(searchTerm);

            });

        renderProjects(filteredProjects);

    }, 300);


    searchInput.addEventListener(
        "input",
        debouncedSearch
    );


    renderProjects(projectsData);

}


// ===============================
// MODAL
// ===============================

function initModal() {

    const modal = document.getElementById("modal");
    const modalTitle =
        document.getElementById("modal-title");
    const closeModal =
        document.getElementById("close-modal");
    const gridContainer =
        document.getElementById("dynamic-grid");

    if (
        !modal ||
        !modalTitle ||
        !closeModal ||
        !gridContainer
    ) {
        return;
    }


    gridContainer.addEventListener("click", function (e) {

        if (e.target.classList.contains("view-btn")) {

            const title =
                e.target.getAttribute("data-title");

            modalTitle.textContent = title;

            modal.style.display = "flex";

        }

    });


    closeModal.addEventListener("click", function () {

        modal.style.display = "none";

    });

}


// ===============================
// TESTIMONIALS
// ===============================

function initTestimonials() {

    const memberName =
        document.getElementById("member-name");

    const memberQuote =
        document.getElementById("member-quote");

    if (!memberName || !memberQuote) return;


    const testimonialsData = [

        {
            name: "Bhumika",
            quote:
                "Synexus helped me improve my web development skills."
        },

        {
            name: "Priya",
            quote:
                "The community projects gave me real-world experience."
        },

        {
            name: "Ananya",
            quote:
                "I learned teamwork and gained confidence in coding."
        }

    ];


    let currentIndex = 0;


    function updateTestimonial() {

        const currentData =
            testimonialsData[currentIndex];

        memberName.textContent =
            currentData.name;

        memberQuote.textContent =
            currentData.quote;


        currentIndex++;

        if (
            currentIndex ===
            testimonialsData.length
        ) {

            currentIndex = 0;

        }

    }


    updateTestimonial();

    setInterval(updateTestimonial, 3000);

}


// ===============================
// TASK TRACKER
// ===============================

function initTaskTracker() {

    const taskInput =
        document.getElementById("task-input");

    const addTaskBtn =
        document.getElementById("add-task-btn");

    const taskList =
        document.getElementById("task-list");

    if (
        !taskInput ||
        !addTaskBtn ||
        !taskList
    ) {
        return;
    }


    let taskState = [];


    function renderTasks() {

        taskList.innerHTML = "";

        taskState.forEach(function (task) {

            taskList.innerHTML += `

                <li>

                    <span>
                        ${task.text}
                    </span>

                    <button
                        class="delete-btn"
                        data-id="${task.id}">
                        ×
                    </button>

                </li>

            `;

        });

    }


    addTaskBtn.addEventListener(
        "click",
        function () {

            const value =
                taskInput.value.trim();

            if (value === "") {
                return;
            }


            taskState.push({

                id: Date.now(),

                text: value,

                completed: false

            });


            taskInput.value = "";

            renderTasks();

        }
    );


    taskList.addEventListener(
        "click",
        function (e) {

            if (
                e.target.classList
                    .contains("delete-btn")
            ) {

                const targetId =
                    Number(
                        e.target.getAttribute(
                            "data-id"
                        )
                    );


                taskState =
                    taskState.filter(
                        function (task) {

                            return (
                                task.id !==
                                targetId
                            );

                        }
                    );


                renderTasks();

            }

        }
    );

}


// ===============================
// SCROLL OBSERVER
// ===============================

function initScrollObserver() {

    const hiddenElements =
        document.querySelectorAll(".hidden");

    if (!hiddenElements.length) return;


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList
                            .add("show");

                    }

                });

            }
        );


    hiddenElements.forEach(function (element) {

        observer.observe(element);

    });

}


// ===============================
// KANBAN BOARD
// ===============================

function initKanbanBoard() {

    const taskCards =
        document.querySelectorAll(".task-card");

    const columns =
        document.querySelectorAll(".column");

    if (!taskCards.length || !columns.length) {
        return;
    }


    taskCards.forEach(function (card) {

        card.addEventListener(
            "dragstart",
            function () {

                card.classList.add(
                    "is-dragging"
                );

            }
        );


        card.addEventListener(
            "dragend",
            function () {

                card.classList.remove(
                    "is-dragging"
                );

            }
        );

    });


    columns.forEach(function (column) {

        column.addEventListener(
            "dragover",
            function (e) {

                e.preventDefault();

                const draggingCard =
                    document.querySelector(
                        ".is-dragging"
                    );

                if (draggingCard) {

                    column.appendChild(
                        draggingCard
                    );

                }

            }
        );

    });

}


// ===============================
// ROUTER
// ===============================

const appRoot =
    document.getElementById("app-root");


// Your GitHub Pages project path
const BASE_PATH =
    "/50-days-web-dev-challenge-";


const routes = {

    "/": `

        <section>

            <h1 id="hero-title">
                Empowering the Next Generation
                of Engineers
            </h1>

            <p>
                Welcome to Synexus, a student-driven
                engineering community focused on
                learning, collaboration, innovation,
                and practical experience.
            </p>

            <p>
                We bring together students who are
                passionate about technology and provide
                opportunities to explore new ideas,
                strengthen technical skills, and work
                on meaningful projects.
            </p>

            <h2>Why Join Synexus?</h2>

            <p>
                Be part of a supportive community where
                you can learn from others, share your
                ideas, participate in technical
                activities, and turn your ideas into
                real projects.
            </p>

            <a
                href="${BASE_PATH}/about"
                class="nav-link"
                id="hero-btn">
                Learn More About Us
            </a>

        </section>

    `,


    "/about": `

        <section>

            <h2>About Synexus</h2>

            <p>
                Synexus is a student community created
                to encourage young engineers to learn,
                collaborate, and explore technology.
            </p>

            <p>
                We organize technical workshops,
                coding sessions, project collaborations,
                hackathons, and other learning
                activities that help students improve
                their technical and problem-solving
                skills.
            </p>

            <h2>Our Mission</h2>

            <p>
                Our mission is to empower students with
                knowledge, opportunities, and community
                support so they can become confident
                engineers and lifelong learners.
            </p>

            <h2>What We Believe</h2>

            <p>
                We believe that every student has the
                ability to learn and innovate. By
                working together and sharing ideas,
                we can create better solutions and
                help each other grow.
            </p>

        </section>

    `,


    "/initiatives": `

        <section>

            <h2>Our Initiatives</h2>

            <p>
                Synexus organizes technical initiatives
                designed to help students learn,
                experiment, collaborate, and gain
                practical experience.
            </p>

            <p>
                From hands-on workshops and coding
                events to hackathons and open-source
                projects, our initiatives encourage
                creativity, teamwork, problem-solving,
                and continuous learning.
            </p>

            <h2>Explore Our Initiatives</h2>

            <input
                type="text"
                id="search-projects"
                placeholder="Search initiatives..."
            >

            <div
                class="initiatives-grid"
                id="dynamic-grid">
            </div>

        </section>

    `,


    "/team": `

        <section>

            <h2>Core Team</h2>

            <p>
                Meet the dedicated students who help
                organize and support the Synexus
                community.
            </p>

            <p>
                Our core team works together to plan
                events, coordinate projects, encourage
                participation, and create opportunities
                for members to learn and grow.
            </p>

            <div class="team-grid">

                <div class="profile-card">

                    <h3>Anant Sharma</h3>

                    <p>Founder</p>

                    <p>
                        Passionate about building a
                        collaborative environment where
                        students can learn technology
                        and work together on innovative
                        ideas.
                    </p>

                </div>

            </div>

            <h2>Our Team's Goal</h2>

            <p>
                We aim to build a community where
                students feel comfortable asking
                questions, sharing ideas, taking part
                in projects, and developing skills
                that will help them in their future
                careers.
            </p>

        </section>
          `,

    `
   "/github": `
    <section id="github-lookup">

        <h2>GitHub Developer Lookup</h2>

        <p>
            Explore a developer's GitHub profile
            and discover their work.
        </p>

        <div class="github-search-box">

            <input
                type="text"
                id="github-username"
                placeholder="Enter GitHub username"
            >

            <button id="search-dev-btn">
                🔍 Lookup Developer
            </button>

        </div>

        <div id="dev-profile-card"></div>

    </section>
`,

};


// ===============================
// ROUTER FUNCTION
// ===============================

async function router() {

    let path =
        window.location.pathname;


    // Remove GitHub repository name
    // from the pathname

    if (path.startsWith(BASE_PATH)) {

        path =
            path.substring(BASE_PATH.length);

    }


    if (path === "") {
        path = "/";
    }


    const view =
        routes[path] || `

            <section class="not-found">

                <h2>
                    404 - Page Not Found
                </h2>

                <p>
                    Sorry, the page you are
                    looking for does not exist.
                </p>

                <a
                    href="${BASE_PATH}/"
                    class="nav-link">
                    Go Home
                </a>

            </section>

        `;
   

        getDeveloperProfile(username);

    });

}


    appRoot.innerHTML = view;


    // ===========================
    // PAGE-SPECIFIC INITIALIZERS
    // ===========================

    if (path === "/") {

        initHeroButton();
        initScrollObserver();

    }


    if (path === "/about") {

        initScrollObserver();

    }


    if (path === "/initiatives") {

        initProjects();
        initModal();
        initScrollObserver();

    }


    if (path === "/team") {

        initKanbanBoard();
        initTestimonials();
        initTaskTracker();
        initScrollObserver();

    }
    if (path === "/github") {
    initGithubLookup();
}

}


// ===============================
// NAVIGATION EVENT DELEGATION
// ===============================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "a.nav-link"
            );


        if (!link) {
            return;
        }


        event.preventDefault();


        const href =
            link.getAttribute("href");


        window.history.pushState(
            {},
            "",
            href
        );


        router();

    }
);


// ===============================
// BROWSER BACK / FORWARD
// ===============================

window.addEventListener(
    "popstate",
    router
);


// ===============================
// INITIALIZATION
// ===============================

function initApp() {

    // Global features
    // Run only once

    initThemeToggle();

    initMobileMenu();

    router();

}


// ===============================
// START APP
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
async function getDeveloperProfile(username) {

    const profileCard =
        document.getElementById("dev-profile-card");

    if (!profileCard) return;

    profileCard.innerHTML = "Fetching data...";

    try {

        const response =
            await fetch(
                `https://api.github.com/users/${username}`
            );

        if (!response.ok) {
            throw new Error("GitHub user not found");
        }

        const data =
            await response.json();

        profileCard.innerHTML = `

            <div class="github-profile">

                <img
                    src="${data.avatar_url}"
                    alt="GitHub profile">

                <h3>
                    ${data.name || username}
                </h3>

                <p>
                    ${data.bio || "No bio available."}
                </p>

            </div>

        `;

    } catch (error) {

        profileCard.innerHTML = `
            <p>
                Unable to find this GitHub user.
            </p>
        `;

    }

}
function initGithubLookup() {

    const usernameInput =
        document.getElementById("github-username");

    const searchButton =
        document.getElementById("search-dev-btn");

    if (!usernameInput || !searchButton) return;

    searchButton.addEventListener("click", function () {

        const username =
            usernameInput.value.trim();

        if (username === "") {
            return;
        }

        getDeveloperProfile(username);

    });

}
