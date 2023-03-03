import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";


  
const pict = new URL('../assets/GiacobeTime.jpg', import.meta.url).href;

export class ProfessorCard extends LitElement {
  static properties = {
      name: {
        type: String,
        reflect: true
      },
      position: {
        type: String,
      },
      top: {type: String},
      bottom: {type: String},
      accentColor: {
        type: String,
        reflect: true,
        attribute: "accent-color"
      },
      opening: {
        type: Boolean,
        reflect: true
    },
      changeFont: {
        type: Boolean,
        reflect: true
      },
      detailLabel: {type: String},
      picture: {type: String}
  }

  static get styles() {
    return css`
    
    :host{
      display: inline-block;
    }
    :host([changeFont]){
      font-family: var(--professor-card-changeFont-font-family, Courier, monospace);
    }
    :host([accent-color="purple"]) .wrapper{
        background-color: var(--professor-card-accent-color, purple); 
        color: white;
    }

    :host([accent-color="orange"]) .wrapper{
      background-color: var(--professor-card-accent-color, orange);        color: white;
    }

    :host([accent-color="blue"]) .wrapper{
      background-color: var(--professor-card-accent-color, blue);        color: red;
    }
      .wrapper {
  width: 400px;
  border: 2px solid black;
  display: inline-flex;
}
.image {
  width: 400px;
}
.header {
  text-align: var(--professor-card-header-text-align, center);
  font-weight: bold;
  font-size: 2rem;
}
.header h3:hover {
  font-style: italic;
  font-size: 1.1em;
}
.header h3,
.header h4 {
  transition: .3s ease-in-out all;
  margin: 16px;
  font-style: normal;
}
.buttons button:focus,
.buttons button:hover {
  background-color: rgba(200,0,50,.5);
}
.buttons button:active {
  background-color: rgba(50,0,200,.5);
}
.buttons {
  display: block;
}
button {
  padding: 12px;
  font-size: 32px;
}
details {
  margin-left: 24px;
  padding: var(--professor-card-details-padding, 50px);
}
.details summary {
  font-size: 20px;
  font-weight: bold;
}
@media only screen and (max-width: 1200px){
  .wrapper {
    background-color: green;
  }
}
@media only screen and (max-width: 600px){
  .wrapper {
    background-color: yellow;
  }
}
@media only screen and (max-width: 425px){
  .wrapper {
    font-weight: normal;
  }
  .wrapper .header h3 {
    font-size: 12px;
  }
  .wrapper .header h4 {
    font-size: 10px !important;
  }
  details {
    display: none;
  }
}
    `;
  }

  constructor() {
    super();
    this.accentColor = null;
    this.name = "Professor Giacobe";
    this.position = "Chad of IST";
    this.top = "GOD KING"
    this.bottom = "OF IST"
    this.opening=false;
    this.detailLabel= "Professor Info";
    this.picture="https://cdn.discordapp.com/attachments/703281782111338586/1076698279712137346/unknown.png"
  }

  ToggleEvent() {
     const state = this.shadowRoot.querySelector('details').getAttribute('open') === "" ? true : false;
     this.opening = state;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName)=> {
      if (propName === "opening"){
        this.dispatchEvent(new CustomEvent('opened-changed', {
          composed: true,
          bubbles: true,
          cancelable: false,
          detail:{
            value: this[propName]
          }
        }));
        console.log(`${propName} changed. oldValue: ${oldValue}`);
      }
    });
  }

  render() {
    return html`
  
    <div class="wrapper" part="wrapper">
      <div class="container">
        <div class="image"> 
          <meme-maker 
          part="meme"
          image-url="${this.picture}"
          top-text="${this.top}"
          bottom-text="${this.bottom}">
          </meme-maker>
        </div>
        <div class="header">
          <h3>${this.name}</h3>
          <h4>${this.position}</h4>
        </div>
        <details class="details" .open="${this.opening}" @toggle="${this.ToggleEvent}">
          <summary>${this.detailLabel}</summary>
          <div>
           <slot></slot>
          </div>
        </details>
      </div>
    </div>`;
  }
}

customElements.define('professor-card', ProfessorCard);