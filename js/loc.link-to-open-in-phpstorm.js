{
    if (location.hostname.match(/[.]loc$/)) {
        document.addEventListener('DOMContentLoaded', function () {

            let targetFile = 'cover.html'
            const urlPath = location.pathname.replace(/^[/]+/, '')
            if (urlPath) {
                targetFile = urlPath + '/' + urlPath + '.html'
            }

            const wrappingDiv = document.createElement('div')
            wrappingDiv.style.textAlign = 'center'
            wrappingDiv.style.width = '100%'
            wrappingDiv.style.position = 'absolute'
            wrappingDiv.style.bottom = '0'

            const openLink = document.createElement('a')
            openLink.setAttribute('href', 'phpstorm://' + targetFile)
            openLink.innerText = targetFile
            openLink.style.fontSize = '40px'
            openLink.id = 'openLink'

            wrappingDiv.appendChild(openLink)
            document.body.getElementsByClassName('main')[0].appendChild(wrappingDiv)

            document.addEventListener("keydown", event => {
                if (event.code === 'KeyO') {
                    document.getElementById('openLink').click()
                }
            })
        })
    }
}
