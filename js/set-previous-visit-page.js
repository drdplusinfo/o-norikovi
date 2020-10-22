{
    const currentPage = Number.parseInt(location.pathname.replace(/^[/]/, ''))
    if (currentPage) {
        const somethingLikeYearInSeconds = 31536000
        document.cookie = "previouslyVisitedPage=" + currentPage + ";max-age=" + somethingLikeYearInSeconds
    }
}