export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const lampshadeMat = new THREE.MeshStandardMaterial({
    color: 0xe60086,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const lampshade_trimMat = new THREE.MeshStandardMaterial({
    color: 0xc90074,
    metalness: 0.0,
    roughness: 0.95,
  });
  const rubber_footMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const power_cordMat = new THREE.MeshStandardMaterial({
    color: 0x34383d,
    metalness: 0.0,
    roughness: 0.8,
  });

  const rubber_footGeom = new THREE.CylinderGeometry(0.635, 0.635, 0.025, 64);
  const rubber_foot = new THREE.Mesh(rubber_footGeom, rubber_footMat);
  rubber_foot.position.y = 0.0125;
  root.add(rubber_foot);

  const baseProfile = [
    new THREE.Vector2(0.000, 0.025),
    new THREE.Vector2(0.570, 0.025),
    new THREE.Vector2(0.625, 0.035),
    new THREE.Vector2(0.655, 0.055),
    new THREE.Vector2(0.660, 0.075),
    new THREE.Vector2(0.645, 0.098),
    new THREE.Vector2(0.605, 0.118),
    new THREE.Vector2(0.520, 0.130),
    new THREE.Vector2(0.000, 0.130),
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 64);
  const base = new THREE.Mesh(baseGeom, baseMat);
  root.add(base);

  const stem_base_collarGeom = new THREE.CylinderGeometry(0.058, 0.070, 0.045, 32);
  const stem_base_collar = new THREE.Mesh(stem_base_collarGeom, baseMat);
  stem_base_collar.position.y = 0.151;
  root.add(stem_base_collar);

  const stemGeom = new THREE.CylinderGeometry(0.036, 0.036, 1.66, 32);
  const stem = new THREE.Mesh(stemGeom, baseMat);
  stem.position.y = 0.995;
  root.add(stem);

  const shade_supportGeom = new THREE.CylinderGeometry(0.078, 0.092, 0.075, 32);
  const shade_support = new THREE.Mesh(shade_supportGeom, baseMat);
  shade_support.position.y = 1.855;
  root.add(shade_support);

  const shade_socketGeom = new THREE.CylinderGeometry(0.052, 0.064, 0.095, 32);
  const shade_socket = new THREE.Mesh(shade_socketGeom, baseMat);
  shade_socket.position.y = 1.925;
  root.add(shade_socket);

  const shadeBottomY = 1.890;
  const shadeTopY = 2.820;
  const shadeHeight = shadeTopY - shadeBottomY;
  const shadeBottomRadius = 0.820;
  const shadeTopRadius = 0.680;

  const lampshadeGeom = new THREE.CylinderGeometry(
    shadeTopRadius,
    shadeBottomRadius,
    shadeHeight,
    64,
    1,
    true
  );
  const lampshade = new THREE.Mesh(lampshadeGeom, lampshadeMat);
  lampshade.position.y = (shadeBottomY + shadeTopY) * 0.5;
  root.add(lampshade);

  const bottom_rimGeom = new THREE.TorusGeometry(
    shadeBottomRadius - 0.007,
    0.012,
    10,
    64
  );
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, lampshade_trimMat);
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = shadeBottomY;
  root.add(bottom_rim);

  const top_rimGeom = new THREE.TorusGeometry(
    shadeTopRadius - 0.006,
    0.011,
    10,
    64
  );
  const top_rim = new THREE.Mesh(top_rimGeom, lampshade_trimMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = shadeTopY;
  root.add(top_rim);

  const top_seamGeom = new THREE.TorusGeometry(
    shadeTopRadius - 0.003,
    0.004,
    8,
    64
  );
  const top_seam = new THREE.Mesh(top_seamGeom, lampshade_trimMat);
  top_seam.rotation.x = Math.PI / 2;
  top_seam.position.y = shadeTopY - 0.045;
  root.add(top_seam);

  const cord_grommetGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.115, 16);
  const cord_grommet = new THREE.Mesh(cord_grommetGeom, power_cordMat);
  cord_grommet.rotation.z = Math.PI / 2;
  cord_grommet.position.set(0.640, 0.055, -0.135);
  root.add(cord_grommet);

  const power_cordPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.620, 0.052, -0.135),
    new THREE.Vector3(0.760, 0.030, -0.145),
    new THREE.Vector3(1.000, 0.024, -0.175),
    new THREE.Vector3(1.250, 0.024, -0.235),
    new THREE.Vector3(1.500, 0.024, -0.300),
  ]);
  const power_cordGeom = new THREE.TubeGeometry(
    power_cordPath,
    48,
    0.016,
    10,
    false
  );
  const power_cord = new THREE.Mesh(power_cordGeom, power_cordMat);
  root.add(power_cord);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}