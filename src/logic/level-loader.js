function loadLevel(level) {
	return fetch(level).then(r => r.json()).catch(console.log);
}

function getStoryModeLevels() {
	return fetch("story-mode-levels.json").then(r => r.json()).catch(console.log);
}

export {getStoryModeLevels, loadLevel};
