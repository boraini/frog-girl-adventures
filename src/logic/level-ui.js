class UIManager {
	constructor(levelInfo, level, world) {
		this.transformOpportunitiesDisplay = document.getElementById("transform-opportunities");
		this.transformButton = document.getElementById("transform-button");
		this.retryButton = document.getElementById("retry-button");
		this.levelTitle = document.getElementById("level-title");
		this.levelDescription = document.getElementById("level-description");

		this.applyLevelInfo(levelInfo, level, world);

		world.renderer.domElement.addEventListener("click", e => this.handleCanvasClick(e));

		this.transformButton.addEventListener("click", e => this.handleTransformClick(e));
		this.retryButton.addEventListener("click", e => this.handleRetryClick(e));

		for (let node of this.transformOpportunitiesDisplay.childNodes) {
			if (node.nodeType == 3) this.transformOpportunitiesDisplay.removeChild(node);
		}
		this.updateTransformOpportunities(3);
	}

	applyLevelInfo(levelInfo, level, world) {
		this.levelInfo = levelInfo || this.levelInfo;
		this.level = level || this.level;
		this.world = world || this.world;

		this.levelTitle.textContent = this.levelInfo.title;
		if (this.levelInfo.description) {
			this.levelDescription.style.display = "block";
			this.levelDescription.textContent = this.levelInfo.description;
		} else {
			this.levelDescription.style.display = "none";
		}
	}
	
	handleCanvasClick(e) {
		const bcr = this.world.renderer.domElement.getBoundingClientRect();
		const node = this.level.raycast(
			(e.clientX - bcr.left) / bcr.width * 2 - 1,
			1 - (e.clientY - bcr.top) / bcr.height * 2
		);
		if (node) {
			this.level.interactWithNode(node, () => this.updateUI());
		}
	}

	handleTransformClick() {
		this.level.transform();
		this.updateUI();
	}

	handleRetryClick() {
		this.reset();
		this.updateUI();
	}
	
	reset() {
		this.level.reset();
		this.updateUI();
	}

	updateUI() {
		const maxN = this.levelInfo.numberOfTransforms[this.levelInfo.numberOfTransforms.length - 1];
		this.updateTransformOpportunities(maxN - this.level.numberOfTransforms);
		this.transformButton.disabled = !this.level.canTransform();

		if (this.level.finished) {
			this.level.finished = false;
			this.showFinishPopup();
		}
	}

	updateTransformOpportunities(n) {
		if (n < 0) n = 0;
		let currentElements = this.transformOpportunitiesDisplay.querySelectorAll("li");
		if (currentElements.length < n) {
			const el = document.createElement("li");
			this.transformOpportunitiesDisplay.insertBefore(el, currentElements[0]);
			setTimeout(() => el.classList.add("appear-growing"), 16);
			if (n - currentElements.length > 1) {
				setTimeout(() => this.updateTransformOpportunities(n), 200);
			}
		} else {
			for (let i = currentElements.length; i > n; i--) {
				const el = currentElements[currentElements.length - i];
				el.classList.replace("appear-growing", "disappear-shrinking");
				setTimeout(() => this.transformOpportunitiesDisplay.removeChild(el), 1000);
			}
		}
	}

	showFinishPopup() {
		console.log("game over");
		const popup = document.getElementById("finish-popup");
		popup.classList.add("shown");
		requestAnimationFrame(t => popup.classList.add("shown2"));
	}
}

export {UIManager};