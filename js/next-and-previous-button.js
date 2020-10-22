{
    if (location.hostname.match(/[.]loc$/)) {
        document.addEventListener('DOMContentLoaded', function () {
            const pathname = location.pathname.replace(/^[/]/, '')
            const currentPage = Number.parseInt(pathname) || 0
            const nextPage = currentPage + 1
            const previousPage = currentPage - 1

            const nextPageAnchor = document.createElement('a')
            nextPageAnchor.innerText = '>>'
            nextPageAnchor.setAttribute('href', '/' + nextPage)
            nextPageAnchor.style.position = 'absolute'
            nextPageAnchor.style.top = '2em'
            nextPageAnchor.style.right = 'calc(50% - 300px)'
            nextPageAnchor.style.fontSize = '40px'
            document.body.appendChild(nextPageAnchor)

            if (previousPage > 0) {
                const previousPageAnchor = document.createElement('a')
                previousPageAnchor.setAttribute('href', '/' + previousPage)
                previousPageAnchor.innerText = '<<'
                previousPageAnchor.style.position = 'absolute'
                previousPageAnchor.style.top = '2em'
                previousPageAnchor.style.left = 'calc(50% - 300px)'
                previousPageAnchor.style.fontSize = '40px'
                document.body.appendChild(previousPageAnchor)
            }

        })
    }
}