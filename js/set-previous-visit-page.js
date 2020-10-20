{
    const previouslyVisitedPage = Number.parseInt(location.pathname.replace(/^[/]/, ''))
    if (previouslyVisitedPage) {
        const somethingLikeYearInSeconds = 31536000
        document.cookie = "previouslyVisitedPage=" + previouslyVisitedPage + ";max-age=" + somethingLikeYearInSeconds
    }
}