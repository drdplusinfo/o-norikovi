{
    const previousVisitPage = Number.parseInt(location.pathname.replace(/^[/]/, ''))
    if (previousVisitPage) {
        document.cookie = "previousVisitPage=" + previousVisitPage
    }
}