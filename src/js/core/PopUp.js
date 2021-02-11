import { DomClass, createElementWithHtmlText } from 'paella/core/dom';

import 'styles/PopUp.css';

const g_popUps = [];

export default class PopUp extends DomClass {
	static GetPopUps() {
		return g_popUps;
	}
	
	static IsSomePopUpVisible() {
		return g_popUps.some(p => p.isVisible);
	}
	
	static GetPopUp(id) {
		return g_popUps.find(p => p.id === id);
	}
	
	static HideAllPopUps() {
		g_popUps.forEach(p => p.hide());
	}
	
	constructor(player, parent, anchorElement = null) {
		const attributes = {
			"class": "popup-container"
		};
		
		const children = `
		<div class="popup-content"></div>
		`;
		super(player,{ attributes, children, parent });
		
		this._id = Symbol(this);
		g_popUps.push(this);
		
		this.element.addEventListener("click", () => {
			this.hide();	
		});
		
		this._contentElement = this.element.getElementsByClassName("popup-content")[0];
		
		this._anchorElement = anchorElement; 
		if (anchorElement) {
			const { top, left, width, height } = anchorElement.getBoundingClientRect();
			const centerX = left + width / 2;
			const centerY = top + height / 2;
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const viewportCenterX = window.innerWidth / 2;
			const viewportCenterY = window.innerHeight / 2;

			
			// Decide where to attach the popup depending on the anchor position
			if (viewportCenterX>centerX && viewportCenterY<=centerY) {
				// bottom left
				console.log("bottom left");
				this.contentElement.style.left = `${ left }px`;
				this.contentElement.style.bottom = `${ viewportHeight - top }px`;
			}
			else if (viewportCenterX>centerX && viewportCenterY>centerY) {
				// top left quadrant
				console.log("top left");
			}
			else if (viewportCenterX<=centerX && viewportCenterY>centerY) {
				// top right quadrant
				console.log("top right");
			}
			else if (viewportCenterX<=centerX && viewportCenterY<=centerY) {
				// bottom right quadrant
				console.log("bottom right");
			}
		}
	}
	
	get id() {
		return this._id;
	}
	
	// This is the popup window
	get contentElement() {
		return this._contentElement;
	}
		
	// This is the content element you set with setContent()
	get content() {
		return this._popupContent;
	}
	
	setContent(domElement) {
		this.contentElement.innerHTML = "";
		if (typeof(domElement) === "string") {
			this._popupContent = createElementWithHtmlText(domElement, this.contentElement);
		}
		else {
			this._popupContent = domElement;
			this.contentElement.appendChild(domElement);	
		}
	}
}