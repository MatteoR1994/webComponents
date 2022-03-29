class SuperHeader extends HTMLHeadingElement { // HTMLHeadingElement -> prende tutti gli h, da h1 a h6.

    constructor() {
        super();
    }

    attributeChangedCallback(){ // Viene chiamato ogni volta che cambia un attributo
        this.getAttributes();
        this.initTag()
    }

    static get observedAttributes() { return ['user-count']; }

    getAttributes(){
        if (this.getAttribute('user-count')) {
            this.userCount = parseInt(this.getAttribute('user-count'));
        }
    }

    initTag() {
        this.style.background = 'green';
        let container;
        if (document.getElementById('additional-content')) {
            container = document.getElementById('additional-content');
            container.innerHTML = '';
        } else {
            container = document.createElement('div');
            container.id = 'additional-content';
        }
        const span = document.createElement('span');
        const node = document.createTextNode('count: ' + this.userCount);
        span.appendChild(node);
        container.appendChild(span);
        this.appendChild(container);
    }

}

window.customElements.define('super-header', SuperHeader, { extends: 'h1' });