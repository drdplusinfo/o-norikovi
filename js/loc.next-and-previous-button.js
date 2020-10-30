{
    if (location.hostname.match(/[.]loc$/)) {
        document.addEventListener('DOMContentLoaded', function () {
            const pathname = location.pathname.replace(/^[/]/, '')
            const currentPage = Number.parseInt(pathname) || 0
            const nextPage = currentPage + 1
            let previousPage = currentPage - 1
            if (previousPage === 0) {
                previousPage = ''
            } else if (previousPage < 0) {
                previousPage = 1041
            }

            const nextPageAnchor = document.createElement('a')
            nextPageAnchor.innerText = '>>'
            nextPageAnchor.setAttribute('href', '/' + nextPage)
            nextPageAnchor.style.position = 'absolute'
            nextPageAnchor.style.top = '2em'
            nextPageAnchor.style.right = 'calc(50% - 300px)'
            nextPageAnchor.style.fontSize = '40px'
            nextPageAnchor.id = 'toNextPage'
            document.body.appendChild(nextPageAnchor)

            const previousPageAnchor = document.createElement('a')
            previousPageAnchor.setAttribute('href', '/' + previousPage)
            previousPageAnchor.innerText = '<<'
            previousPageAnchor.style.position = 'absolute'
            previousPageAnchor.style.top = '2em'
            previousPageAnchor.style.left = 'calc(50% - 300px)'
            previousPageAnchor.style.fontSize = '40px'
            previousPageAnchor.id = 'toPreviousPage'
            document.body.appendChild(previousPageAnchor)

            document.addEventListener("keydown", event => {
                if (event.code === 'ArrowRight' || event.code === 'KeyD') {
                    document.getElementById('toNextPage').click()
                } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
                    document.getElementById('toPreviousPage').click()
                }
            })
        })
    }
}
