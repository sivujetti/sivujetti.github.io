window.sivujettiDocs = (function () {
function traverseContent(fn) {
    let el = document.getElementById('tutorial-os-selector').nextElementSibling;
    while (el && el.tagName !== 'SCRIPT') {
        fn(el);
        el = el.nextElementSibling;
    }
}
return {
    currentOs: 'macos',
    currentState: 'single-visible',
    /**
     * @param {'windows'|'macos'|'linux'|String} os
     */
    hideAllExceptFirst(os) {
        if (this.currentOs === os)
            return;
        if (this.currentState === 'all-hidden')
            traverseContent(el => el.classList.remove('d-none'));

        traverseContent(el => el.classList.add('d-none'));
        document.querySelector(`.dm-${os}`).classList.remove('d-none');
        this.currentOs = os;
        this.currentState = 'all-hidden';
    },
    /**
     * @param {Event} e
     * @param {'windows'|'macos'|'linux'|String} os
     */
    showInstallationTutorialInstructionsFor(e, os) {
        if (this.currentOs === os)
            return;
        if (os !== 'windows' && os !== 'linux' && os !== 'macos') {
            throw new Error();
        }
        Array.from(document.querySelectorAll(`.d-none:not([class$=dm-${os}])`))
            .forEach(el => { if (el.className !== 'd-none') el.classList.remove('d-none'); });
        Array.from(document.querySelectorAll(`.dm-${this.currentOs}`))
            .forEach(el => el.classList.add('d-none'));
        e.target.parentElement.querySelector('.btn.selected').classList.remove('selected');
        e.target.classList.add('selected');
        this.currentOs = os;
    },
    /**
     */
    interactifyTabs() {
        Array.from(document.querySelectorAll('.tabs')).forEach(el => {
            const contentEls = Array.from(el.nextElementSibling.querySelectorAll(':scope div'));
            const btns = Array.from(el.querySelectorAll(':scope button'));
            const state = {currentIndex: 0};
            btns.forEach((btnEl, i) => {
                btnEl.addEventListener('click', () => {
                    if (state.currentIndex === i) return;
                    //
                    btns[state.currentIndex].classList.remove('current');
                    contentEls[state.currentIndex].classList.add('d-none');
                    //
                    state.currentIndex = i;
                    btns[state.currentIndex].classList.add('current');
                    contentEls[state.currentIndex].classList.remove('d-none');
                });
            });
        });
    },
    /**
     */
    colorCodeMenusAndHeadings() {
        // side menu
        const sideMenuLis = [...document.querySelectorAll('ul.nav-list ul.nav-list li a')];
        sideMenuLis.forEach(colorCodeTextIn);
        // breadcrumbs
        const breadcrumbLis = [...document.querySelectorAll('ol.breadcrumb-nav-list li')];
        breadcrumbLis.forEach(colorCodeTextIn);

        window.addEventListener('load', () => {
            // table of contents
            const tocLis = [...document.querySelectorAll('hr + h2 + ul li')];
            tocLis.forEach(colorCodeTextIn);
        });
    }
};
/**
 * @param {HTMLElement} el
 */
function colorCodeTextIn(el) {
    if (el.textContent.indexOf('(Theme.php)') > -1)
        el.innerHTML = el.innerHTML.replace('(Theme.php)', '<span class="text-green-200">(Theme.php)</span>');
    else if (el.textContent.indexOf('(Site.php)') > -1)
        el.innerHTML = el.innerHTML.replace('(Site.php)', '<span class="text-blue-200">(Site.php)</span>');
    else if (el.textContent.indexOf('(lisäosat)') > -1)
        el.innerHTML = el.innerHTML.replace('(lisäosat)', '<span class="text-yellow-300">(lisäosat)</span>');
}
}());