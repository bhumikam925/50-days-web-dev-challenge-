// ======================================================
// SYNEXUS SPA ROUTER
// DAY 49 - DATA STREAMS & ROUTING
// ======================================================

const routes = {
    "/": "home",
    "/about": "about",
    "/initiatives": "initiatives",
    "/team": "team",
    "/contact": "contact"
};

export function router() {
    const path = window.location.pathname;

    const route = routes[path] || "home";

    const appRoot = document.getElementById("app-root");

    if (!appRoot) return;

    console.log("Current route:", route);
}

export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

window.addEventListener("popstate", router);
