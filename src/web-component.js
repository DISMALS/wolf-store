window.customElements.define('custome-elements',
    class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            const textEle = document.createElement('b');
            textEle.innerText = this.getAttribute('textdom');
            const tContent = document.getElementById('customeDom').content;
            this.shadowRoot.appendChild(tContent.cloneNode(true));
            this.shadowRoot.appendChild(textEle);
            this.textContent

        }
    }
);