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
   const base = "/50-days-web-dev-challenge-";
const currentPath = window.location.pathname;

const path = currentPath.startsWith(base)
    ? currentPath.slice(base.length) || "/"
    : currentPath;

    const route = routes[path] || "home";

    const appRoot = document.getElementById("app-root");

    if (!appRoot) return;

  const sections = document.querySelectorAll("#app-root > section");

sections.forEach(section => {
    section.classList.add("route-hidden");
});

const activeSection = document.getElementById(route);

if (activeSection) {
   activeSection.classList.remove("route-hidden");
}
}

export function navigateTo(url) {
    const base = "/50-days-web-dev-challenge-";
    const newUrl = url === "/" ? base + "/" : base + url;

    history.pushState(null, null, newUrl);
    router();
}


window.addEventListener("popstate", router);
document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    const url = link.getAttribute("href");

    if (!url || !url.startsWith("/")) return;

    event.preventDefault();

    navigateTo(url);
});
