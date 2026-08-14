// ======================================================
// SYNEXUS APP.JS - DAY 25
// ======================================================


// ======================================================
// BASE PATH
// ======================================================

const BASE_PATH = "/50-days-web-dev-challenge-";

const appRoot = document.getElementById("app-root");


// ======================================================
// GLOBAL FEATURE — DARK MODE
// ======================================================

function initThemeToggle() {

    const themeButton =
        document.getElementById("theme-toggle");

    if (!themeButton) return;

    const savedTheme =
        localStorage.getItem("synexus_theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (
            document.body.classList.contains("dark-theme")
        ) {

            localStorage.setItem(
                "synexus_theme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "synexus_theme",
                "light"
            );

        }

    });

}


// ======================================================
// GLOBAL FEATURE — MOBILE MENU
// ======================================================

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("nav-active");

    });

}


// ======================================================
// HERO BUTTON
// ======================================================

function initHeroButton() {

    const heroButton =
        document.getElementById("hero-btn");

    if (!heroButton) return;

    heroButton.addEventListener("click", function (event) {

        event.preventDefault();

        const href =
            heroButton.getAttribute("href");

        window.history.pushState(
            {},
            "",
            href
        );

        router();

    });

}


// ======================================================
// SCROLL OBSERVER
// ======================================================

function initScrollObserver() {

    const hiddenElements =
        document.querySelectorAll(".hidden");

    if (!hiddenElements.length) return;

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                });

            }
        );

    hiddenElements.forEach(function (element) {

        observer.observe(element);

    });

}


// ======================================================
// PROJECT DATA
// ======================================================

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


// ======================================================
// INITIATIVES
// ======================================================

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

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

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

            timeout = setTimeout(
                function () {

                    func.apply(this, args);

                },
                delay
            );

        };

    }


    const debouncedSearch =
        debounce(function () {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();

            const filteredProjects =
                projectsData.filter(
                    function (project) {

                        return (
                            project.title
                                .toLowerCase()
                                .includes(searchTerm)
                        );

                    }
                );

            renderProjects(filteredProjects);

        }, 300);


    searchInput.addEventListener(
        "input",
        debouncedSearch
    );


    renderProjects(projectsData);

}


// ======================================================
// MODAL
// ======================================================

function initModal() {

    const modal =
        document.getElementById("modal");

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


    gridContainer.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList
                    .contains("view-btn")
            ) {

                const title =
                    event.target.getAttribute(
                        "data-title"
                    );

                modalTitle.textContent =
                    title;

                modal.style.display = "flex";

            }

        }
    );


    closeModal.addEventListener(
        "click",
        function () {

            modal.style.display = "none";

        }
    );


    window.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.style.display = "none";

            }

        }
    );

}


// ======================================================
// TESTIMONIALS
// ======================================================

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
            currentIndex >=
            testimonialsData.length
        ) {

            currentIndex = 0;

        }

    }


    updateTestimonial();

    setInterval(
        updateTestimonial,
        3000
    );

}


// ======================================================
// TASK TRACKER
// ======================================================

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

        taskState.forEach(
            function (task) {

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

            }
        );

    }


    addTaskBtn.addEventListener(
        "click",
        function () {

            const value =
                taskInput.value.trim();

            if (value === "") return;


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
        function (event) {

            if (
                event.target.classList
                    .contains("delete-btn")
            ) {

                const targetId =
                    Number(
                        event.target.getAttribute(
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


// ======================================================
// KANBAN BOARD
// ======================================================

function initKanbanBoard() {

    const taskCards =
        document.querySelectorAll(
            ".task-card"
        );

    const columns =
        document.querySelectorAll(
            ".column"
        );

    if (
        !taskCards.length ||
        !columns.length
    ) {
        return;
    }


    taskCards.forEach(
        function (card) {

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

        }
    );


    columns.forEach(
        function (column) {

            column.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();

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

        }
    );

}


// ======================================================
// CONTACT FORM
// ======================================================

function initContactForm() {

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    if (!contactForm) return;


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");


            if (
                !nameInput ||
                !emailInput ||
                !messageInput
            ) {
                return;
            }


            const nameValue =
                nameInput.value.trim();

            const emailValue =
                emailInput.value.trim();


            nameInput.style.borderColor = "";
            emailInput.style.borderColor = "";


            if (nameValue === "") {

                nameInput.style.borderColor =
                    "red";

                alert(
                    "Please enter your name."
                );

                return;

            }


            if (!emailValue.includes("@")) {

                emailInput.style.borderColor =
                    "red";

                alert(
                    "Please enter a valid email."
                );

                return;

            }


            console.log(
                "Application Ready for Server"
            );


            localStorage.removeItem(
                "synexus_form_draft"
            );


            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";


            alert(
                "Thank you! Your message is ready to be sent."
            );

        }
    );

}


// ======================================================
// CONTACT FORM DRAFT
// ======================================================

function initFormDraft() {

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    if (!nameInput || !emailInput) return;


    const savedData =
        localStorage.getItem(
            "synexus_form_draft"
        );


    if (savedData) {

        try {

            const formData =
                JSON.parse(savedData);

            nameInput.value =
                formData.name || "";

            emailInput.value =
                formData.email || "";

        } catch (error) {

            localStorage.removeItem(
                "synexus_form_draft"
            );

        }

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


    nameInput.addEventListener(
        "input",
        saveDraft
    );

    emailInput.addEventListener(
        "input",
        saveDraft
    );

}


// ======================================================
// GITHUB DEVELOPER LOOKUP
// ======================================================

async function getDeveloperProfile(username) {

    const profileCard =
        document.getElementById(
            "dev-profile-card"
        );

    if (!profileCard) return;


    profileCard.innerHTML =
        "<p>Fetching GitHub profile...</p>";


    try {

        const response =
            await fetch(
                `https://api.github.com/users/${username}`
            );


        if (!response.ok) {

            throw new Error(
                "GitHub user not found"
            );

        }


        const data =
            await response.json();


        profileCard.innerHTML = `

            <div class="github-profile">

                <img
                    src="${data.avatar_url}"
                    alt="GitHub profile picture">

                <h3>
                    ${data.name || username}
                </h3>

                <p>
                    ${data.bio || "No bio available."}
                </p>

                <p>
                    <strong>
                        Username:
                    </strong>
                    ${data.login}
                </p>

                <p>
                    <strong>
                        Public Repositories:
                    </strong>
                    ${data.public_repos}
                </p>

                <a
                    href="${data.html_url}"
                    target="_blank"
                    rel="noopener noreferrer">
                    View GitHub Profile
                </a>

            </div>

        `;


    } catch (error) {

        profileCard.innerHTML = `

            <div class="github-error">

                <p>
                    ❌ Unable to find this GitHub user.
                </p>

                <p>
                    Please check the username and try again.
                </p>

            </div>

        `;

    }

}


function initGithubLookup() {

    const usernameInput =
        document.getElementById(
            "github-username"
        );

    const searchButton =
        document.getElementById(
            "search-dev-btn"
        );


    if (
        !usernameInput ||
        !searchButton
    ) {
        return;
    }


    searchButton.addEventListener(
        "click",
        function () {

            const username =
                usernameInput.value.trim();


            if (username === "") {

                alert(
                    "Please enter a GitHub username."
                );

                return;

            }


            getDeveloperProfile(
                username
            );

        }
    );


    usernameInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchButton.click();

            }

        }
    );

}


// ======================================================
// ROUTES
// ======================================================

const routes = {

    // ==================================================
    // HOME
    // ==================================================

    "/": `

        <section class="hero">

            <h1 id="hero-title">
                Empowering the Next Generation
                of Engineers
            </h1>

            <p>
                Join our community to learn,
                collaborate, and build innovative
                projects with students who share
                the same passion for technology.
            </p>

            <p>
                We create an environment where
                students can explore ideas,
                improve technical skills, and gain
                practical experience through
                teamwork, workshops, coding events,
                and real-world projects.
            </p>

            <a
                href="${BASE_PATH}/about"
                id="hero-btn"
                class="nav-link">
                Join Our Community
            </a>

        </section>


        <section class="hidden">

            <h2>
                About Synexus
            </h2>

            <p>
                Synexus is a student-driven engineering
                community focused on learning,
                collaboration, innovation, and
                practical experience.
            </p>

            <p>
                We bring students together to learn
                new technologies, exchange ideas,
                participate in projects, and develop
                skills that prepare them for the
                future.
            </p>

        </section>


        <section class="hidden">

            <h2>
                Our Initiatives
            </h2>

            <p>
                From technical workshops and coding
                sessions to hackathons and open-source
                projects, our initiatives encourage
                students to learn by doing.
            </p>

            <div class="initiatives-grid">

                <div class="initiative-card">

                    <h3>
                        Technical Workshops
                    </h3>

                    <p>
                        Hands-on sessions designed to
                        improve programming and
                        development skills.
                    </p>

                </div>


                <div class="initiative-card">

                    <h3>
                        Hackathons
                    </h3>

                    <p>
                        Collaborative events where
                        students turn ideas into
                        innovative solutions.
                    </p>

                </div>


                <div class="initiative-card">

                    <h3>
                        Open Source
                    </h3>

                    <p>
                        Opportunities to contribute
                        to projects and build practical
                        experience.
                    </p>

                </div>

            </div>

        </section>


        <section class="hidden">

            <h2>
                Core Team
            </h2>

            <p>
                Meet the students who help organize
                activities, coordinate projects,
                and support the Synexus community.
            </p>

            <div class="team-grid">

                <div class="profile-card">

                    <h3>
                        Anant Sharma
                    </h3>

                    <p>
                        Founder
                    </p>

                    <p>
                        Passionate about building a
                        collaborative environment where
                        students can learn technology
                        and work together.
                    </p>

                </div>

            </div>

        </section>


        <section
            id="testimonials"
            class="hidden">

            <h2>
                Community Testimonials
            </h2>

            <div id="testimonial-container">

                <h3 id="member-name"></h3>

                <p id="member-quote"></p>

            </div>

        </section>


        <section class="hidden">

            <h2>
                Task Board
            </h2>

            <div class="board">

                <div class="column">

                    <h3>
                        To Do
                    </h3>

                    <div
                        class="task-card"
                        draggable="true">
                        Learn HTML
                    </div>

                    <div
                        class="task-card"
                        draggable="true">
                        Practice CSS
                    </div>

                    <div
                        class="task-card"
                        draggable="true">
                        Complete JavaScript
                    </div>

                </div>


                <div class="column">

                    <h3>
                        In Progress
                    </h3>

                </div>


                <div class="column">

                    <h3>
                        Done
                    </h3>

                </div>

            </div>

        </section>


        <section
            id="task-tracker"
            class="hidden">

            <h2>
                Task Tracker
            </h2>

            <input
                type="text"
                id="task-input"
                placeholder="Enter a task">

            <button id="add-task-btn">
                Add Task
            </button>

            <ul id="task-list"></ul>

        </section>


        <section
            id="contact"
            class="hidden">

            <h2>
                Contact Us
            </h2>

            <p>
                Have an idea, question, or want to
                connect with Synexus? Send us a message.
            </p>

            <form id="contact-form">

                <label for="name">
                    Full Name
                </label>

                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required>


                <label for="email">
                    Email Address
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required>


                <label for="message">
                    Message
                </label>

                <textarea
                    id="message"
                    rows="5"
                    placeholder="Write your message"
                    required></textarea>


                <button type="submit">
                    Send Message
                </button>

            </form>

        </section>


        <section
            id="github-home"
            class="hidden">

            <h2>
                GitHub Developer Lookup
            </h2>

            <p>
                Search for a GitHub developer and
                explore their public profile.
            </p>

            <div class="github-search-box">

                <input
                    type="text"
                    id="github-username"
                    placeholder="Enter GitHub username">

                <button id="search-dev-btn">
                    🔍 Lookup Developer
                </button>

            </div>

            <div id="dev-profile-card"></div>

        </section>

    `,


    // ==================================================
    // ABOUT
    // ==================================================

    "/about": `

        <section>

            <h2>
                About Synexus
            </h2>

            <p>
                Synexus is a student-driven engineering
                community created to encourage students
                to learn, collaborate, innovate, and
                grow together.
            </p>

            <p>
                We organize technical workshops,
                coding sessions, project collaborations,
                hackathons, and knowledge-sharing
                activities that help students develop
                technical and problem-solving skills.
            </p>

            <h2>
                Our Mission
            </h2>

            <p>
                Our mission is to empower students with
                knowledge, opportunities, and community
                support so they can become confident
                engineers and lifelong learners.
            </p>

            <h2>
                What We Believe
            </h2>

            <p>
                We believe that every student can learn,
                create, and innovate. By sharing ideas
                and working together, we can build a
                stronger engineering community.
            </p>

        </section>

    `,


    // ==================================================
    // INITIATIVES
    // ==================================================

    "/initiatives": `

        <section>

            <h2>
                Our Initiatives
            </h2>

            <p>
                Synexus organizes technical initiatives
                that help students experiment,
                collaborate, and gain practical
                experience.
            </p>

            <input
                type="text"
                id="search-projects"
                placeholder="Search initiatives...">

            <div
                class="initiatives-grid"
                id="dynamic-grid">
            </div>

        </section>

    `,


    // ==================================================
    // TEAM
    // ==================================================

    "/team": `

        <section>

            <h2>
                Core Team
            </h2>

            <p>
                Meet the dedicated students who help
                organize and support the Synexus
                community.
            </p>

            <div class="team-grid">

                <div class="profile-card">

                    <h3>
                        Anant Sharma
                    </h3>

                    <p>
                        Founder
                    </p>

                    <p>
                        Passionate about creating a
                        collaborative environment where
                        students can learn and work
                        together on innovative ideas.
                    </p>

                </div>

            </div>

            <h2>
                Our Team's Goal
            </h2>

            <p>
                We aim to create a supportive community
                where students can ask questions,
                share ideas, participate in projects,
                and develop skills for their future.
            </p>

        </section>

    `,


    // ==================================================
    // GITHUB
    // ==================================================

    "/github": `

        <section id="github-lookup">

            <h2>
                GitHub Developer Lookup
            </h2>

            <p>
                Search for a GitHub developer and view
                their public profile information.
            </p>

            <div class="github-search-box">

                <input
                    type="text"
                    id="github-username"
                    placeholder="Enter GitHub username">

                <button id="search-dev-btn">
                    🔍 Lookup Developer
                </button>

            </div>

            <div id="dev-profile-card"></div>

        </section>

    `

};


// ======================================================
// ROUTER
// ======================================================

async function router() {

    let path =
        window.location.pathname;


    // Remove project folder from URL

    if (path.startsWith(BASE_PATH)) {

        path =
            path.substring(
                BASE_PATH.length
            );

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


    appRoot.innerHTML = view;


    // ==============================================
    // PAGE-SPECIFIC INITIALIZERS
    // ==============================================

    if (path === "/") {

        initHeroButton();
        initTestimonials();
        initKanbanBoard();
        initTaskTracker();
        initContactForm();
        initFormDraft();
        initGithubLookup();
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

        initScrollObserver();

    }


    if (path === "/github") {

        initGithubLookup();

    }

}


// ======================================================
// NAVIGATION EVENT DELEGATION
// ======================================================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "a.nav-link"
            );


        if (!link) return;


        const href =
            link.getAttribute("href");


        if (!href) return;


        // Only handle internal navigation

        if (
            href.startsWith(BASE_PATH)
        ) {

            event.preventDefault();


            window.history.pushState(
                {},
                "",
                href
            );


            router();

        }

    }
);


// ======================================================
// BACK / FORWARD BUTTON
// ======================================================

window.addEventListener(
    "popstate",
    router
);


// ======================================================
// INITIALIZATION
// ======================================================

function initApp() {

    // Global features
    // Run only once

    initThemeToggle();

    initMobileMenu();

    router();

}


// ======================================================
// START APPLICATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
