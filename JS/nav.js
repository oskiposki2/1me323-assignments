export function createNavigation(assignments, nav, isSubpage = false) {
    const currentAssignment = document.body.id;

    let prefix = isSubpage ? "../" : "";

    let navHTML = "<ul>"

    assignments.forEach(assignment => {
        let activeClass;
        if (assignment.id === currentAssignment) {
            activeClass = "active";
        } else {
            "";
        }

        navHTML +=
            `
    <li>
    <a href="${prefix}${assignment.link}" class="${activeClass}">
            ${assignment.title}</a>
    </li>`

    })

    navHTML += "</ul>"
    nav.innerHTML = navHTML
}