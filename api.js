export async function fetchRepositories(
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

