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

getLastPage = () => {
    return getNumericCookie('lastVisitedPage')
}

getPreviouslyVisitedPage = () => {
    return getNumericCookie('previouslyVisitedPage')
}

setLastVisitedPage = () => {
    const previouslyVisitedPage = getLastPage()
    const currentPage = Number.parseInt(location.pathname.replace(/^[/]/, ''))
    if (currentPage) {
        if (currentPage === previouslyVisitedPage) {
            return
        }
        const somethingLikeYearInSeconds = 31536000
        document.cookie = "lastVisitedPage=" + currentPage + ";max-age=" + somethingLikeYearInSeconds
        if (previouslyVisitedPage !== currentPage) {
            document.cookie = "previouslyVisitedPage=" + previouslyVisitedPage + ";max-age=" + somethingLikeYearInSeconds
        }
    }
}

setLastVisitedPage()

document.addEventListener('DOMContentLoaded', function () {
    const previousPageNode = document.getElementById('previous_page')
    if (!previousPageNode) {
        return
    }
    const previouslyVisitedPage = getPreviouslyVisitedPage()
    if (!previouslyVisitedPage) {
        return
    }
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '../' + previouslyVisitedPage)

    const bold = document.createElement('b')
    bold.innerText = previouslyVisitedPage
    anchor.appendChild(bold)

    const space = document.createTextNode(' ')
    previousPageNode.appendChild(space)

    previousPageNode.appendChild(anchor)
    previousPageNode.classList.remove('hidden')
})