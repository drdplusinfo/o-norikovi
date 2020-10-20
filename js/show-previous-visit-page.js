showPreviousVisitPage = () => {
    const cookies = document.cookie.split('; ')
    let previouslyVisitedPage = null
    if (cookies) {
        const previouslyVisitedPageCookie = cookies.find(row => row.startsWith('previouslyVisitedPage'))
        if (previouslyVisitedPageCookie) {
            previouslyVisitedPage = Number.parseInt(previouslyVisitedPageCookie.split('=')[1])
        }
    }
    if (previouslyVisitedPage) {
        const firstPage = Number.parseInt(document.getElementById('new_adventure').href.replace(/^[^0-9]+/, ''))
        if (previouslyVisitedPage === firstPage) {
            return
        }
        const continueContainer = document.getElementById('continue_from_previous_visit_page')
        if (!continueContainer) {
            console.warn("Can not found element with ID 'continue_from_previous_visit_page_element'")
            return
        }
        const continueAnchor = continueContainer.getElementsByTagName('a').item(0)
        if (!continueAnchor) {
            console.warn("Can not found anchor in element with ID 'continue_from_previous_visit_page_element'")
            return
        }
        continueAnchor.href = `/${previouslyVisitedPage}`
        continueContainer.classList.remove('hidden')
    }
}

showPreviousVisitPage()