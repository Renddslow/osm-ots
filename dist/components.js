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

const prophet = document.createElement("template");
prophet.innerHTML = `
    <div class="prophet">
      <div class="top-row">
        <div class="cell prophet-name">
            <p class="cell-title">Book Name</p>
            <p class="cell-content"></p>
        </div>
        <div class="cell era">
            <p class="cell-title">Era</p>
            <p class="cell-content"></p>
        </div>
        <div class="cell message">
            <p class="cell-title">Message</p>
            <p class="cell-content"></p>
        </div>
        <div class="cell contemporaries">
            <p class="cell-title">Contemporaries</p>
            <p class="cell-content"></p>
        </div>
        <div class="cell styles">
            <p class="cell-title">Styles</p>
            <p class="cell-content"></p>
        </div>
      </div>
      <div class="cell tray">
        <p class="cell-title">Test Notes ${rememberIcon}</p>
        <p class="cell-content"></p>
      </div>
    </div>
`;

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

class Prophet extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(prophet.content.cloneNode(true));
  }

  get name() {
    return this.getAttribute("name");
  }

  get era() {
    return this.getAttribute("era");
  }

  get message() {
    return this.getAttribute("message");
  }

  get contemporary() {
    return this.getAttribute("contemporary");
  }

  get literaryStyles() {
    return this.getAttribute("literaryStyles");
  }

  get testNotes() {
    return this.getAttribute("testNotes");
  }

  connectedCallback() {
    this._shadowRoot.querySelector(".prophet-name .cell-content").innerText =
      this.name || "";
    this._shadowRoot.querySelector(".era .cell-content").innerText =
      this.era || "";
    this._shadowRoot.querySelector(".message .cell-content").innerText =
      this.message || "";
    this._shadowRoot.querySelector(".contemporaries .cell-content").innerText =
      this.contemporary || "";
    this._shadowRoot.querySelector(".styles .cell-content").innerText =
      this.literaryStyles || "";
    if (this.testNotes) {
      this._shadowRoot.querySelector(".tray .cell-content").innerHTML =
        this.testNotes || "";
    } else {
      this._shadowRoot.querySelector(".tray").remove();
    }

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "dist/osm.css");
    this._shadowRoot.append(link);
  }
}

(() => {
  window.customElements.define("test-signal", Signal);
  window.customElements.define("prophet-table", Prophet);
})();
