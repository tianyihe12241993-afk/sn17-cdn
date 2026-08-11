export default function generate(THREE) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.0, roughness: 0.6 })));
  return g;
}
