export function createNavigation(assignments, nav) {

    let navHTML = "<ul>"

    assignments.forEach(assignment => {
        navHTML +=
            `
    <li>
    <a href="${assignment.link}">${assignment.title}</a>
    </li>`

    })

    navHTML += "</ul>"
    nav.innerHTML = navHTML
}