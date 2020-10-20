showPreviousVisitPage = () => {
    const cookies = document.cookie.split('; ')
    let previousVisitPage = null
    if (cookies) {
        const previousVisitPageCookie = cookies.find(row => row.startsWith('previousVisitPage'))
        if (previousVisitPageCookie) {
            previousVisitPage = Number.parseInt(previousVisitPageCookie.split('=')[1])
        }
    }
    if (previousVisitPage) {
        const firstPage = Number.parseInt(document.getElementById('new_adventure').href.replace(/^[^0-9]+/, ''))
        if (previousVisitPage === firstPage) {
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
        continueAnchor.href = `/${previousVisitPage}`
        continueContainer.classList.remove('hidden')
    }
}

showPreviousVisitPage()