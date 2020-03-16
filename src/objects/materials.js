const {
  MeshStandardMaterial
} = THREE;

export default {
  LilyPetal: new MeshStandardMaterial({
    roughness: 0.8, metalness: 0.2, color: 0xffaaaa
  }),
  Lilypad: new MeshStandardMaterial({
    roughness: 0.8, metalness: 0.2, color: 0x4f8c00
  })
}
