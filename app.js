// ======================================================
// SYNEXUS APP.JS
// DAY 28
// ======================================================


// ======================================================
// DEBOUNCE - DAY 28
// ======================================================

function debounce(func, delay) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}


// ======================================================
// GLOBAL FEATURES
// ======================================================


// -------------------------------
// DARK MODE
// -------------------------------

function initThemeToggle() {

    const themeButton =
        document.getElementById("theme-toggle");

    if (!themeButton) return;

    const savedTheme =
        localStorage.getItem("synexus_theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-theme");

    }


    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-theme"
            );


            if (
                document.body.classList.contains(
                    "dark-theme"
                )
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

        }
    );

}


// ======================================================
// MOBILE MENU
// ======================================================

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (!menuToggle || !navLinks) return;


    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "nav-active"
            );

        }
    );


    // Close mobile menu after clicking a link

    navLinks.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "nav-link"
                )
            ) {

                navLinks.classList.remove(
                    "nav-active"
                );

            }

        }
    );

}


// ======================================================
// HERO BUTTON
// ======================================================

function initHeroButton() {

    const heroTitle =
        document.getElementById("hero-title");

    const heroButton =
        document.getElementById("hero-btn");


    if (!heroTitle || !heroButton) return;


    heroButton.addEventListener(
        "click",
        function () {

            heroTitle.textContent =
                "Welcome to the Synexus Core!";

            heroTitle.classList.toggle(
                "active-state"
            );

        }
    );

}


// ======================================================
// CONTACT FORM
// ======================================================

function initContactForm() {

    const contactForm =
        document.getElementById("contact-form");


    if (!contactForm) return;


    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");


            const nameValue =
                nameInput.value.trim();

            const emailValue =
                emailInput.value.trim();


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
                "Message submitted successfully!"
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

            console.log(
                "Unable to restore form draft."
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
// PROJECTS
// ======================================================

function initProjects() {

    const gridContainer =
        document.getElementById(
            "dynamic-grid"
        );


    const searchInput =
        document.getElementById(
            "search-projects"
        );


    if (!gridContainer || !searchInput)
        return;


    function renderProjects(dataArray) {

        gridContainer.innerHTML = "";


        dataArray.forEach(
            function (project) {

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

            }
        );


        initScrollObserver();

    }


    function debounceSearch(
        func,
        delay
    ) {

        let timeout;


        return function (...args) {

            clearTimeout(timeout);


            timeout = setTimeout(
                () => {

                    func.apply(
                        this,
                        args
                    );

                },
                delay
            );

        };

    }


    const searchProjects =
        debounceSearch(
            function () {

                const searchTerm =
                    searchInput.value
                        .toLowerCase();


                const filteredProjects =
                    projectsData.filter(
                        function (project) {

                            return project.title
                                .toLowerCase()
                                .includes(
                                    searchTerm
                                );

                        }
                    );


                renderProjects(
                    filteredProjects
                );

            },
            300
        );


    searchInput.addEventListener(
        "input",
        searchProjects
    );


    renderProjects(
        projectsData
    );

}


// ======================================================
// MODAL
// ======================================================

function initModal() {

    const modal =
        document.getElementById("modal");


    const modalTitle =
        document.getElementById(
            "modal-title"
        );


    const closeModal =
        document.getElementById(
            "close-modal"
        );


    const gridContainer =
        document.getElementById(
            "dynamic-grid"
        );


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
        function (e) {

            if (
                e.target.classList.contains(
                    "view-btn"
                )
            ) {

                const title =
                    e.target.getAttribute(
                        "data-title"
                    );


                modalTitle.textContent =
                    title;


                modal.style.display =
                    "flex";

            }

        }
    );


    closeModal.addEventListener(
        "click",
        function () {

            modal.style.display =
                "none";

        }
    );


    window.addEventListener(
        "click",
        function (e) {

            if (e.target === modal) {

                modal.style.display =
                    "none";

            }

        }
    );

}


// ======================================================
// TESTIMONIALS
// ======================================================

function initTestimonials() {

    const memberName =
        document.getElementById(
            "member-name"
        );


    const memberQuote =
        document.getElementById(
            "member-quote"
        );


    if (!memberName || !memberQuote)
        return;


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
            testimonialsData[
                currentIndex
            ];


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
        document.getElementById(
            "task-input"
        );


    const addTaskBtn =
        document.getElementById(
            "add-task-btn"
        );


    const taskList =
        document.getElementById(
            "task-list"
        );


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
                e.target.classList.contains(
                    "delete-btn"
                )
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


// ======================================================
// SCROLL OBSERVER
// ======================================================

function initScrollObserver() {

    const hiddenElements =
        document.querySelectorAll(
            ".hidden"
        );


    if (!hiddenElements.length)
        return;


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList
                                .add("show");

                        }

                    }
                );

            }
        );


    hiddenElements.forEach(
        function (element) {

            observer.observe(
                element
            );

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

        }
    );

}


// ======================================================
// GITHUB - DAY 26 + DAY 27 + DAY 28
// ======================================================


// -------------------------------
// FETCH GITHUB PROFILE
// -------------------------------

async function getDeveloperProfile(
    username
) {

    const profileCard =
        document.getElementById(
            "dev-profile-card"
        );


    if (!profileCard) return;


    // DAY 28:
    // Empty username check

    if (username === "") {

        profileCard.innerHTML = "";

        const reposGrid =
            document.getElementById(
                "repos-grid"
            );

        if (reposGrid) {

            reposGrid.innerHTML = "";

        }

        return;

    }


    profileCard.innerHTML =
        "<p>Fetching GitHub profile...</p>";


    try {

        const response =
            await fetch(
                `https://api.github.com/users/${username}`
            );


        // DAY 28:
        // Rate limit handling

        if (
            response.status === 403 ||
            response.status === 429
        ) {

            throw new Error(
                "API Rate Limit exceeded. Please wait a moment."
            );

        }


        // User not found

        if (!response.ok) {

            throw new Error(
                "GitHub user not found."
            );

        }


        const data =
            await response.json();


        profileCard.innerHTML = `

            <div class="github-profile-card">

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


        // DAY 27:
        // Fetch repositories

        fetchRepositories(username);


    } catch (error) {

        profileCard.innerHTML = `

            <p>
                ${error.message}
            </p>

        `;


        const reposGrid =
            document.getElementById(
                "repos-grid"
            );


        if (reposGrid) {

            reposGrid.innerHTML = "";

        }

    }

}


// -------------------------------
// FETCH REPOSITORIES
// -------------------------------

async function fetchRepositories(
    username
) {

    const reposGrid =
        document.getElementById(
            "repos-grid"
        );


    if (!reposGrid) return;


    reposGrid.innerHTML =
        "<p>Loading repositories...</p>";


    try {

        const response =
            await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch repositories."
            );

        }


        const data =
            await response.json();


        // DAY 27:
        // Clear canvas before rendering

        reposGrid.innerHTML = "";


        // Empty state

        if (data.length === 0) {

            reposGrid.innerHTML =
                "<p>No public repositories found.</p>";

            return;

        }


        // Render repositories

        data.forEach(
            function (repo) {

                reposGrid.innerHTML += `

                    <div class="initiative-card">

                        <h3>
                            ${repo.name}
                        </h3>

                        <p>
                            ${
                                repo.description ||
                                "No description provided."
                            }
                        </p>

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer">
                            View Repository
                        </a>

                    </div>

                `;

            }
        );


    } catch (error) {

        reposGrid.innerHTML = `

            <p>
                Unable to load repositories.
            </p>

        `;

    }

}


// ======================================================
// GITHUB INPUT - DAY 28
// ======================================================

function initGithubLookup() {

    const usernameInput =
        document.getElementById(
            "github-username"
        );


    if (!usernameInput) return;


    // Day 28:
    // Search automatically while typing
    // after 500 milliseconds.

    const searchUser =
        debounce(
            function () {

                const username =
                    usernameInput.value.trim();


                getDeveloperProfile(
                    username
                );

            },
            500
        );


    usernameInput.addEventListener(
        "input",
        searchUser
    );

}
async function submitProposal(newInitiative) {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            },

            body: JSON.stringify(newInitiative)
        }
    );

    const data = await response.json();

    if (response.status !== 201) {
        throw new Error("Failed to submit proposal.");
    }

    return data;
}
function initProposalForm() {

    const proposalForm =
        document.getElementById("proposal-form");

    const proposalMessage =
        document.getElementById("proposal-message");

    const submitButton =
        document.getElementById("proposal-submit-btn");

    if (
        !proposalForm ||
        !proposalMessage ||
        !submitButton
    ) {
        return;
    }

    proposalForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const titleInput =
                document.getElementById(
                    "proposal-title"
                ).value.trim();

            const descInput =
                document.getElementById(
                    "proposal-description"
                ).value.trim();

            const newInitiative = {

                title: titleInput,

                body: descInput,

                userId: 1

            };

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";

            proposalMessage.textContent =
                "Sending proposal...";

            try {

                const data =
                    await submitProposal(
                        newInitiative
                    );

                proposalMessage.textContent =
                    "✅ Initiative submitted successfully!";

                proposalForm.reset();

                console.log(
                    "Created proposal:",
                    data
                );

            } catch (error) {

                proposalMessage.textContent =
                    "❌ Failed to submit proposal. Please try again.";

                console.error(error);

            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Submit Proposal";

            }

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initThemeToggle();

        initMobileMenu();

        initHeroButton();

        initContactForm();

        initFormDraft();

        initProjects();

        initModal();

        initTestimonials();

        initTaskTracker();

        initScrollObserver();

        initKanbanBoard();

        initGithubLookup();

        initProposalForm();

    }
);
