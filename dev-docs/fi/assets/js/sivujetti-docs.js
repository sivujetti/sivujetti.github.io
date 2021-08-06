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
    alterInstallationTutorialInstructionsFor(os) {
        if (this.currentOs === os)
            return;
        if (os === 'windows' || os === 'linux') {
            traverseContent(el => el.classList.add('d-none'));
            if (this.currentOs !== 'macos')
                document.querySelector(`.dynamic-message-${this.currentOs}`).classList.add('d-none');
            document.querySelector(`.dynamic-message-${os}`).classList.remove('d-none');
        } else if (os === 'macos') {
            traverseContent(el => el.classList.remove('d-none'));
            document.querySelector(`.dynamic-message-windows`).classList.add('d-none');
            document.querySelector(`.dynamic-message-linux`).classList.add('d-none');
        } else {
            throw new Error();
        }
        this.currentOs = os;
    }
};
}());