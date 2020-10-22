getNumericCookie = (name) => {
    const cookies = document.cookie.split('; ')
    if (!cookies) {
        return null
    }
    let value = null
    const cookie = cookies.find(row => row.startsWith(name))
    if (!cookie) {
        return null
    }
    value = Number.parseInt(cookie.split('=')[1])
    if (Number.isNaN(value)) {
        return null
    }
    return value
}

getPreviouslyVisitedPage = () => {
    return getNumericCookie('previouslyVisitedPage')
}

getPreviouslyPreviouslyVisitedPage = () => {
    return getNumericCookie('previouslyPreviouslyVisitedPage')
}

setPreviouslyVisitedPage = () => {
    const previouslyVisitedPage = getPreviouslyVisitedPage()
    const currentPage = Number.parseInt(location.pathname.replace(/^[/]/, ''))
    if (currentPage) {
        if (currentPage === previouslyVisitedPage) {
            return
        }
        const somethingLikeYearInSeconds = 31536000
        document.cookie = "previouslyVisitedPage=" + currentPage + ";max-age=" + somethingLikeYearInSeconds
        if (previouslyVisitedPage !== currentPage) {
            document.cookie = "previouslyPreviouslyVisitedPage=" + previouslyVisitedPage + ";max-age=" + somethingLikeYearInSeconds
        }
    }
}

setPreviouslyVisitedPage()

document.addEventListener('DOMContentLoaded', function () {
    const previousPageNode = document.getElementById('previous_page')
    if (!previousPageNode) {
        return
    }
    const previouslyPreviouslyVisitedPage = getPreviouslyPreviouslyVisitedPage()
    if (!previouslyPreviouslyVisitedPage) {
        return
    }
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '../' + previouslyPreviouslyVisitedPage)

    const bold = document.createElement('b')
    bold.innerText = previouslyPreviouslyVisitedPage
    anchor.appendChild(bold)

    const space = document.createTextNode(' ')
    previousPageNode.appendChild(space)

    previousPageNode.appendChild(anchor)
    // previousPageNode.textContent = previousPageNode.innerText.replace('%previousPage%', previouslyPreviouslyVisitedPage)
    previousPageNode.classList.remove('hidden')
})