document.addEventListener('DOMContentLoaded', function () {
    let previouslyVisitedPage = getLastPage()
    if (!previouslyVisitedPage) {
        previouslyVisitedPage = getPreviouslyVisitedPage() // backward compatibility after cookies renaming
    }
    if (!previouslyVisitedPage) {
        return
    }
    const newAdventureElement = document.getElementById('new_adventure')
    if (!newAdventureElement) {
        return
    }
    const firstPage = Number.parseInt(newAdventureElement.href.replace(/^[^0-9]+/, ''))
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
})