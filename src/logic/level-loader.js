function loadLevel(level) {
	return fetch(`levels/level${level}.json`).then(r => r.json()).catch(console.log);
}
export {loadLevel};
