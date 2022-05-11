const signal = document.createElement("template");

signal.innerHTML = `
  <div class="signal">
    <div class="signal-icon">    
    </div>
    <p class="content"></p>
  </div>
`;

const rememberIcon = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="192"
        height="192"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <path
          d="M208,40H91.3a7.9,7.9,0,0,0-5.6,2.3L42.3,85.7A7.9,7.9,0,0,0,40,91.3V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40ZM128,176a28,28,0,1,1,28-28A28,28,0,0,1,128,176Z"
          opacity="0.2"
        ></path>
        <path
          d="M40,91.3V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V48a8,8,0,0,0-8-8H91.3a7.9,7.9,0,0,0-5.6,2.3L42.3,85.7A7.9,7.9,0,0,0,40,91.3Z"
          fill="none"
          stroke="#ffffff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></path>
        <circle
          cx="128"
          cy="148"
          r="28"
          fill="none"
          stroke="#ffffff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></circle>
        <polyline
          points="96 80 160 80 160 40"
          fill="none"
          stroke="#ffffff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></polyline>
      </svg>`;

const warningIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z" opacity="0.2"></path><line x1="128" y1="112" x2="128" y2="144" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><circle cx="128" cy="180" r="12"></circle></svg>`;

class Signal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(signal.content.cloneNode(true));
  }

  get color() {
    return this.getAttribute("color");
  }

  get type() {
    return this.getAttribute("type");
  }

  connectedCallback() {
    const icon = this.type === "remember" ? rememberIcon : warningIcon;
    this._shadowRoot.querySelector(".content").innerText =
      this.type === "remember" ? "Remember this!" : "Here be dragons...";
    this._shadowRoot.querySelector(".signal-icon").innerHTML = icon;
    this._shadowRoot
      .querySelector(".signal")
      .classList.add(this.color || this.type);

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "dist/osm.css");
    this._shadowRoot.append(link);
  }
}

(() => {
  window.customElements.define("test-signal", Signal);
})();
