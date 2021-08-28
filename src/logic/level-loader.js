function loadLevel(level) {
  return fetch(`/levels/level${level}.json`).then(r => {console.log(r); return Promise.resolve(r);}).then(r => r.json()).catch(console.log);
}
export {loadLevel};
