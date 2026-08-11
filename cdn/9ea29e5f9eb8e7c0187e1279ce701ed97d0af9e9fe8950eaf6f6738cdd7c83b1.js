export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hourglass";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const glass_assembly = new THREE.Group();
  glass_assembly.name = "glass_assembly";
  root.add(glass_assembly);

  const sand_assembly = new THREE.Group();
  sand_assembly.name = "sand_assembly";
  root.add(sand_assembly);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0f0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glassEdgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xd5dfdf,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const sandMat = new THREE.MeshStandardMaterial({
    color: 0xcbb994,
    metalness: 0.0,
    roughness: 0.9
  });

  const sandGrainMat = new THREE.MeshStandardMaterial({
    color: 0xb9a582,
    metalness: 0.0,
    roughness: 0.9
  });

  const base_frameProfile = [
    new THREE.Vector2(0.00, -0.100),
    new THREE.Vector2(0.34, -0.100),
    new THREE.Vector2(0.43, -0.085),
    new THREE.Vector2(0.50, -0.040),
    new THREE.Vector2(0.54, 0.025),
    new THREE.Vector2(0.55, 0.080),
    new THREE.Vector2(0.53, 0.140),
    new THREE.Vector2(0.48, 0.195),
    new THREE.Vector2(0.40, 0.230),
    new THREE.Vector2(0.00, 0.230)
  ];
  const base_frameGeom = new THREE.LatheGeometry(base_frameProfile, 64);
  const base_frame = new THREE.Mesh(base_frameGeom, copperMat);
  base_frame.name = "base_frame";
  base_frame.position.y = 0.10;
  base_assembly.add(base_frame);

  const base_glass_sealGeom = new THREE.TorusGeometry(0.425, 0.012, 10, 64);
  const base_glass_seal = new THREE.Mesh(base_glass_sealGeom, glassEdgeMat);
  base_glass_seal.name = "base_glass_seal";
  base_glass_seal.rotation.x = Math.PI / 2;
  base_glass_seal.position.y = 0.335;
  base_assembly.add(base_glass_seal);

  const glass_bodyProfile = [
    new THREE.Vector2(0.445, 0.320),
    new THREE.Vector2(0.438, 0.380),
    new THREE.Vector2(0.410, 0.520),
    new THREE.Vector2(0.370, 0.680),
    new THREE.Vector2(0.310, 0.860),
    new THREE.Vector2(0.230, 1.030),
    new THREE.Vector2(0.140, 1.150),
    new THREE.Vector2(0.064, 1.230),
    new THREE.Vector2(0.064, 1.430),
    new THREE.Vector2(0.140, 1.510),
    new THREE.Vector2(0.230, 1.630),
    new THREE.Vector2(0.310, 1.780),
    new THREE.Vector2(0.370, 1.960),
    new THREE.Vector2(0.410, 2.140),
    new THREE.Vector2(0.438, 2.280),
    new THREE.Vector2(0.445, 2.340)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.name = "glass_body";
  glass_body.renderOrder = 2;
  glass_assembly.add(glass_body);

  const glass_rimGeom = new THREE.TorusGeometry(0.445, 0.013, 10, 64);

  const lower_glass_rim = new THREE.Mesh(glass_rimGeom, glassEdgeMat);
  lower_glass_rim.name = "lower_glass_rim";
  lower_glass_rim.rotation.x = Math.PI / 2;
  lower_glass_rim.position.y = 0.330;
  glass_assembly.add(lower_glass_rim);

  const upper_glass_rim = new THREE.Mesh(glass_rimGeom, glassEdgeMat);
  upper_glass_rim.name = "upper_glass_rim";
  upper_glass_rim.rotation.x = Math.PI / 2;
  upper_glass_rim.position.y = 2.335;
  glass_assembly.add(upper_glass_rim);

  const upper_sandProfile = [
    new THREE.Vector2(0.000, 1.225),
    new THREE.Vector2(0.025, 1.240),
    new THREE.Vector2(0.060, 1.280),
    new THREE.Vector2(0.105, 1.340),
    new THREE.Vector2(0.165, 1.420),
    new THREE.Vector2(0.225, 1.520),
    new THREE.Vector2(0.280, 1.620),
    new THREE.Vector2(0.320, 1.720),
    new THREE.Vector2(0.340, 1.800),
    new THREE.Vector2(0.000, 1.800)
  ];
  const upper_sandGeom = new THREE.LatheGeometry(upper_sandProfile, 64);
  const upper_sand = new THREE.Mesh(upper_sandGeom, sandMat);
  upper_sand.name = "upper_sand";
  sand_assembly.add(upper_sand);

  const lower_sandProfile = [
    new THREE.Vector2(0.000, 0.330),
    new THREE.Vector2(0.380, 0.330),
    new THREE.Vector2(0.370, 0.370),
    new THREE.Vector2(0.330, 0.420),
    new THREE.Vector2(0.280, 0.470),
    new THREE.Vector2(0.220, 0.520),
    new THREE.Vector2(0.150, 0.570),
    new THREE.Vector2(0.075, 0.610),
    new THREE.Vector2(0.000, 0.625)
  ];
  const lower_sandGeom = new THREE.LatheGeometry(lower_sandProfile, 64);
  const lower_sand = new THREE.Mesh(lower_sandGeom, sandMat);
  lower_sand.name = "lower_sand";
  sand_assembly.add(lower_sand);

  const falling_sand_streamGeom = new THREE.CylinderGeometry(
    0.006,
    0.008,
    0.635,
    8
  );
  const falling_sand_stream = new THREE.Mesh(
    falling_sand_streamGeom,
    sandMat
  );
  falling_sand_stream.name = "falling_sand_stream";
  falling_sand_stream.position.y = 0.9125;
  sand_assembly.add(falling_sand_stream);

  const grainGeom = new THREE.SphereGeometry(0.006, 6, 4);
  const grain_dummy = new THREE.Object3D();

  const upper_sand_grains = new THREE.InstancedMesh(
    grainGeom,
    sandGrainMat,
    120
  );
  upper_sand_grains.name = "upper_sand_grains";
  for (let i = 0; i < 120; i++) {
    const fraction = (i + 0.5) / 120;
    const angle = i * 2.399963229728653;
    const radius = 0.325 * Math.sqrt(fraction);
    const grainScale = 0.72 + (i % 5) * 0.07;
    grain_dummy.position.set(
      Math.cos(angle) * radius,
      1.804 + (1 - radius / 0.325) * 0.0015,
      Math.sin(angle) * radius
    );
    grain_dummy.rotation.set(0, angle, 0);
    grain_dummy.scale.setScalar(grainScale);
    grain_dummy.updateMatrix();
    upper_sand_grains.setMatrixAt(i, grain_dummy.matrix);
  }
  upper_sand_grains.instanceMatrix.needsUpdate = true;
  sand_assembly.add(upper_sand_grains);

  const lower_sand_grains = new THREE.InstancedMesh(
    grainGeom,
    sandGrainMat,
    100
  );
  lower_sand_grains.name = "lower_sand_grains";
  for (let i = 0; i < 100; i++) {
    const fraction = (i + 0.5) / 100;
    const angle = i * 2.399963229728653 + 0.45;
    const radius = 0.355 * Math.sqrt(fraction);
    const grainScale = 0.70 + (i % 4) * 0.08;
    grain_dummy.position.set(
      Math.cos(angle) * radius,
      0.626 - (radius / 0.355) * 0.285,
      Math.sin(angle) * radius
    );
    grain_dummy.rotation.set(0, angle, 0);
    grain_dummy.scale.setScalar(grainScale);
    grain_dummy.updateMatrix();
    lower_sand_grains.setMatrixAt(i, grain_dummy.matrix);
  }
  lower_sand_grains.instanceMatrix.needsUpdate = true;
  sand_assembly.add(lower_sand_grains);

  const falling_sand_grains = new THREE.InstancedMesh(
    grainGeom,
    sandGrainMat,
    36
  );
  falling_sand_grains.name = "falling_sand_grains";
  for (let i = 0; i < 36; i++) {
    const fraction = i / 35;
    const grainScale = 0.58 + (i % 4) * 0.06;
    grain_dummy.position.set(
      Math.sin(i * 1.7) * 0.0025,
      0.605 + fraction * 0.615,
      Math.cos(i * 1.3) * 0.0025
    );
    grain_dummy.rotation.set(0, i * 0.8, 0);
    grain_dummy.scale.setScalar(grainScale);
    grain_dummy.updateMatrix();
    falling_sand_grains.setMatrixAt(i, grain_dummy.matrix);
  }
  falling_sand_grains.instanceMatrix.needsUpdate = true;
  sand_assembly.add(falling_sand_grains);

  const top_frameProfile = [
    new THREE.Vector2(0.00, -0.180),
    new THREE.Vector2(0.39, -0.180),
    new THREE.Vector2(0.47, -0.150),
    new THREE.Vector2(0.52, -0.100),
    new THREE.Vector2(0.55, -0.040),
    new THREE.Vector2(0.55, 0.020),
    new THREE.Vector2(0.53, 0.080),
    new THREE.Vector2(0.49, 0.130),
    new THREE.Vector2(0.42, 0.160),
    new THREE.Vector2(0.00, 0.160)
  ];
  const top_frameGeom = new THREE.LatheGeometry(top_frameProfile, 64);
  const top_frame = new THREE.Mesh(top_frameGeom, copperMat);
  top_frame.name = "top_frame";
  top_frame.position.y = 2.49;
  top_assembly.add(top_frame);

  const top_glass_sealGeom = new THREE.TorusGeometry(0.425, 0.012, 10, 64);
  const top_glass_seal = new THREE.Mesh(top_glass_sealGeom, glassEdgeMat);
  top_glass_seal.name = "top_glass_seal";
  top_glass_seal.rotation.x = Math.PI / 2;
  top_glass_seal.position.y = 2.335;
  top_assembly.add(top_glass_seal);

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