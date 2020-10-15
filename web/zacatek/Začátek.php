<?php
include __DIR__ . '/../autori/autoři.html';
?>

<div class="za-dobrodružstvím">
  <a href="./../595" id="new_adventure">Hurá za novým dobrodružstvím!</a>

  <div id="continue_from_previous_visit_page" class="hidden pokračovat">
    <a href="">Nebo pokračovat od minula >>></a>
  </div>
</div>

<script type="text/javascript">
    showPreviousVisitPage = () => {
        const previousVisitPage = Number.parseInt(
            document.cookie
                .split('; ')
                .find(row => row.startsWith('previousVisitPage'))
                .split('=')[1]
        )
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
</script>