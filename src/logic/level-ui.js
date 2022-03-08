class UIManager {
	constructor(levelInfo, level, world) {
		world.renderer.domElement.addEventListener("click", e => this.handleCanvasClick(e));
		
		this.level = level;
		this.world = world;
	}
	
	handleCanvasClick(e) {
		const bcr = this.world.renderer.domElement.getBoundingClientRect();
		const node = this.level.raycast(
			(e.clientX - bcr.left) / bcr.width * 2 - 1,
			1 - (e.clientY - bcr.top) / bcr.height * 2
		);
		if (node) {
			console.log(node);
			this.level.move(node);
		}
	}
}

export {UIManager};