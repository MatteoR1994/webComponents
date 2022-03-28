class PippoTag extends HTMLElement {

    // styleTemplate = `
    // .par {
    //     color: green;
    // }`;

    styleUrl = './work-style.css';

    htmlTemplate = `
        <h2>#USERNAME</h2>
        <h2>#MAIL</h2>
    `;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.getAttributes();
        this.initStyle();
        this.initTag();
    }

    attributeChangedCallback() {
        this.getAttributes();
        this.initTag();
    }

    static get observedAttributes() {
        return ['pippo-user', 'has-button'];
    }
 
    getAttributes() {
        if (this.getAttribute('pippo-user')) {
            this.user = JSON.parse(this.getAttribute('pippo-user'));
            console.log(this.user);
        }
        if (this.getAttribute('has-button')) {
            this.hasButton = this.getAttribute('has-button') === 'true';
            
        }
    }

    initStyle() {
        // const style = document.createElement('style');
        // style.innerText = this.styleTemplate;
        // this.shadowRoot.appendChild(style);
        fetch(this.styleUrl)
            .then(resp => resp.text())
            .then(myStyle => {
                const style = document.createElement('style');
                style.innerText = myStyle;
                this.shadowRoot.appendChild(style);
            })
    }

    initTag() {
        // const node = document.createTextNode('pippo');
        // const p = document.createElement('p');
        // p.className = 'par';
        // p.appendChild(node);
        // this.shadowRoot.appendChild(p);

        if (this.user) {
            this.htmlTemplate = this.htmlTemplate.replace('#USERNAME', this.user.name);
            this.htmlTemplate = this.htmlTemplate.replace('#MAIL', this.user.mail);

            this.shadowRoot.innerHTML = this.htmlTemplate;
        }

        if (this.hasButton) {
            const button = document.createElement('button');
            const node = document.createTextNode('select user');
            button.appendChild(node);
            button.onclick = () => this.buttonClicked();
            this.shadowRoot.appendChild(button);
        }

        const button = document.createElement('button');
        const node = document.createTextNode('select user');
        button.appendChild(node);
        button.onclick = () => this.buttonClicked();
        this.shadowRoot.appendChild(button);
    }

    buttonClicked() {
        const event = new CustomEvent('user-selected', {
            bubbles: true,
            detail: this.user
        });
        this.dispatchEvent(event);
    }

}

window.customElements.define('pippo-tag', PippoTag);