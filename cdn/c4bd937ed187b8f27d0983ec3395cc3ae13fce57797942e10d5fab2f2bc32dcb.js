export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "pineapple_slice";

  const slice_group = new THREE.Group();
  slice_group.name = "slice_group";
  slice_group.scale.x = 1.035;
  root.add(slice_group);

  const rind_group = new THREE.Group();
  rind_group.name = "rind_group";
  slice_group.add(rind_group);

  const flesh_group = new THREE.Group();
  flesh_group.name = "flesh_group";
  slice_group.add(flesh_group);

  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  slice_group.add(detail_group);

  const outer_rindMat = new THREE.MeshStandardMaterial({
    color: 0x59612b,
    metalness: 0.0,
    roughness: 0.9
  });
  const rind_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x8a6728,
    metalness: 0.0,
    roughness: 0.9
  });
  const yellow_rindMat = new THREE.MeshStandardMaterial({
    color: 0xd9ad20,
    metalness: 0.0,
    roughness: 0.6
  });
  const fleshMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe77a,
    metalness: 0.0,
    roughness: 0.16,
    transmission: 0.06,
    ior: 1.38,
    thickness: 0.08,
    transparent: true,
    opacity: 1.0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.12,
    emissive: 0x806000,
    emissiveIntensity: 0.2
  });
  const central_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffef9d,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const fiber_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0xfff5bd,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const radial_groovesMat = new THREE.MeshStandardMaterial({
    color: 0xd5a716,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide
  });
  const juice_highlightsMat = new THREE.MeshStandardMaterial({
    color: 0xfffbe2,
    metalness: 0.0,
    roughness: 0.12,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const rind_spikesMat = new THREE.MeshStandardMaterial({
    color: 0x8c6938,
    metalness: 0.0,
    roughness: 0.9
  });
  const rind_eye_scarsMat = new THREE.MeshStandardMaterial({
    color: 0x60401f,
    metalness: 0.0,
    roughness: 0.9
  });
  const rind_eye_centersMat = new THREE.MeshStandardMaterial({
    color: 0x302219,
    metalness: 0.0,
    roughness: 0.9
  });

  function makeRadialShape(radius, waves, phase, amount) {
    const points = [];
    const count = 72;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const wave =
        Math.sin(angle * waves + phase) * amount +
        Math.sin(angle * (waves + 7) - phase * 0.7) * amount * 0.42;
      const scale = 1 + wave;
      points.push(new THREE.Vector2(
        Math.cos(angle) * radius * scale,
        Math.sin(angle) * radius * scale
      ));
    }
    return new THREE.Shape(points);
  }

  const outer_rindShape = makeRadialShape(0.510, 9, 0.35, 0.014);
  const outer_rindGeom = new THREE.ExtrudeGeometry(outer_rindShape, {
    depth: 0.072,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 2
  });
  const outer_rind = new THREE.Mesh(outer_rindGeom, outer_rindMat);
  outer_rind.name = "outer_rind";
  outer_rind.position.z = -0.052;
  rind_group.add(outer_rind);

  const rind_edgeShape = makeRadialShape(0.503, 11, 1.1, 0.011);
  const rind_edgeGeom = new THREE.ExtrudeGeometry(rind_edgeShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 2
  });
  const rind_edge = new THREE.Mesh(rind_edgeGeom, rind_edgeMat);
  rind_edge.name = "rind_edge";
  rind_edge.position.z = 0.014;
  rind_group.add(rind_edge);

  const yellow_rindShape = makeRadialShape(0.486, 10, 0.8, 0.009);
  const yellow_rindGeom = new THREE.ExtrudeGeometry(yellow_rindShape, {
    depth: 0.010,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 2
  });
  const yellow_rind = new THREE.Mesh(yellow_rindGeom, yellow_rindMat);
  yellow_rind.name = "yellow_rind";
  yellow_rind.position.z = 0.025;
  rind_group.add(yellow_rind);

  const fleshShape = makeRadialShape(0.463, 12, 1.45, 0.007);
  const fleshGeom = new THREE.ExtrudeGeometry(fleshShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.005,
    bevelSegments: 3,
    curveSegments: 2
  });
  const flesh = new THREE.Mesh(fleshGeom, fleshMat);
  flesh.name = "flesh";
  flesh.position.z = 0.035;
  flesh_group.add(flesh);

  const central_coreShape = makeRadialShape(0.158, 7, 0.5, 0.008);
  const central_coreGeom = new THREE.ShapeGeometry(central_coreShape, 2);
  const central_core = new THREE.Mesh(central_coreGeom, central_coreMat);
  central_core.name = "central_core";
  central_core.position.z = 0.053;
  detail_group.add(central_core);

  const fiber_ridgesShape = new THREE.Shape();
  fiber_ridgesShape.moveTo(-0.0025, 0);
  fiber_ridgesShape.bezierCurveTo(-0.004, 0.32, -0.011, 0.72, -0.008, 1);
  fiber_ridgesShape.lineTo(0.008, 1);
  fiber_ridgesShape.bezierCurveTo(0.011, 0.72, 0.004, 0.32, 0.0025, 0);
  fiber_ridgesShape.closePath();

  const fiber_ridgesGeom = new THREE.ShapeGeometry(fiber_ridgesShape, 2);
  const fiberCount = 42;
  const fiber_ridges = new THREE.InstancedMesh(
    fiber_ridgesGeom,
    fiber_ridgesMat,
    fiberCount
  );
  fiber_ridges.name = "fiber_ridges";

  const z_axis = new THREE.Vector3(0, 0, 1);
  const instance_position = new THREE.Vector3();
  const instance_quaternion = new THREE.Quaternion();
  const instance_scale = new THREE.Vector3();
  const instance_matrix = new THREE.Matrix4();

  for (let i = 0; i < fiberCount; i++) {
    const angle =
      i / fiberCount * Math.PI * 2 +
      Math.sin(i * 1.73) * 0.018;
    const startRadius = 0.095 + ((i * 7) % 5) * 0.008;
    const length = 0.285 + ((i * 11) % 8) * 0.008;
    const width = 0.72 + ((i * 5) % 7) * 0.08;

    instance_position.set(
      Math.cos(angle) * startRadius,
      Math.sin(angle) * startRadius,
      0.054
    );
    instance_quaternion.setFromAxisAngle(z_axis, angle - Math.PI / 2);
    instance_scale.set(width, length, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    fiber_ridges.setMatrixAt(i, instance_matrix);
  }
  fiber_ridges.instanceMatrix.needsUpdate = true;
  detail_group.add(fiber_ridges);

  const radial_groovesShape = new THREE.Shape();
  radial_groovesShape.moveTo(-0.003, 0);
  radial_groovesShape.bezierCurveTo(-0.006, 0.35, -0.012, 0.76, -0.008, 1);
  radial_groovesShape.lineTo(0.008, 1);
  radial_groovesShape.bezierCurveTo(0.012, 0.76, 0.006, 0.35, 0.003, 0);
  radial_groovesShape.closePath();

  const radial_groovesGeom = new THREE.ShapeGeometry(radial_groovesShape, 2);
  const grooveCount = 28;
  const radial_grooves = new THREE.InstancedMesh(
    radial_groovesGeom,
    radial_groovesMat,
    grooveCount
  );
  radial_grooves.name = "radial_grooves";

  for (let i = 0; i < grooveCount; i++) {
    const angle =
      i / grooveCount * Math.PI * 2 +
      0.055 +
      Math.sin(i * 2.11) * 0.026;
    const startRadius = 0.145 + ((i * 5) % 7) * 0.006;
    const length = 0.245 + ((i * 9) % 10) * 0.008;
    const width = 0.62 + ((i * 3) % 6) * 0.10;

    instance_position.set(
      Math.cos(angle) * startRadius,
      Math.sin(angle) * startRadius,
      0.055
    );
    instance_quaternion.setFromAxisAngle(z_axis, angle - Math.PI / 2);
    instance_scale.set(width, length, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    radial_grooves.setMatrixAt(i, instance_matrix);
  }
  radial_grooves.instanceMatrix.needsUpdate = true;
  detail_group.add(radial_grooves);

  const juice_highlightsGeom = new THREE.CircleGeometry(1, 10);
  const highlightCount = 112;
  const juice_highlights = new THREE.InstancedMesh(
    juice_highlightsGeom,
    juice_highlightsMat,
    highlightCount
  );
  juice_highlights.name = "juice_highlights";

  for (let i = 0; i < highlightCount; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.045 + ((i * 17) % 37) / 37 * 0.375;
    const length = 0.009 + ((i * 7) % 8) * 0.0018;
    const width = 0.0018 + ((i * 5) % 5) * 0.00045;

    instance_position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.056
    );
    instance_quaternion.setFromAxisAngle(z_axis, angle - Math.PI / 2);
    instance_scale.set(width, length, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    juice_highlights.setMatrixAt(i, instance_matrix);
  }
  juice_highlights.instanceMatrix.needsUpdate = true;
  detail_group.add(juice_highlights);

  const rind_spikesShape = new THREE.Shape();
  rind_spikesShape.moveTo(-0.020, -0.006);
  rind_spikesShape.lineTo(0.020, -0.006);
  rind_spikesShape.lineTo(0.006, 0.060);
  rind_spikesShape.lineTo(-0.004, 0.043);
  rind_spikesShape.closePath();

  const rind_spikesGeom = new THREE.ExtrudeGeometry(rind_spikesShape, {
    depth: 0.007,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.001,
    bevelSize: 0.001,
    bevelSegments: 1
  });
  const spikeCount = 14;
  const rind_spikes = new THREE.InstancedMesh(
    rind_spikesGeom,
    rind_spikesMat,
    spikeCount
  );
  rind_spikes.name = "rind_spikes";

  for (let i = 0; i < spikeCount; i++) {
    const angle =
      i / spikeCount * Math.PI * 2 +
      Math.sin(i * 1.37) * 0.09;
    const radius = 0.497 + ((i * 3) % 4) * 0.004;
    const widthScale = 0.72 + ((i * 5) % 6) * 0.09;
    const lengthScale = 0.72 + ((i * 7) % 8) * 0.08;

    instance_position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      -0.004
    );
    instance_quaternion.setFromAxisAngle(z_axis, angle - Math.PI / 2);
    instance_scale.set(widthScale, lengthScale, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    rind_spikes.setMatrixAt(i, instance_matrix);
  }
  rind_spikes.instanceMatrix.needsUpdate = true;
  rind_group.add(rind_spikes);

  const rind_eye_scarsGeom = new THREE.CircleGeometry(0.014, 12);
  const rind_eye_centersGeom = new THREE.CircleGeometry(0.006, 10);
  const eyeCount = 10;
  const rind_eye_scars = new THREE.InstancedMesh(
    rind_eye_scarsGeom,
    rind_eye_scarsMat,
    eyeCount
  );
  rind_eye_scars.name = "rind_eye_scars";
  const rind_eye_centers = new THREE.InstancedMesh(
    rind_eye_centersGeom,
    rind_eye_centersMat,
    eyeCount
  );
  rind_eye_centers.name = "rind_eye_centers";

  for (let i = 0; i < eyeCount; i++) {
    const angle =
      i / eyeCount * Math.PI * 2 +
      0.19 +
      Math.sin(i * 1.91) * 0.06;
    const radius = 0.478 + ((i * 3) % 3) * 0.004;
    const scale = 0.78 + ((i * 7) % 5) * 0.09;

    instance_position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.049
    );
    instance_quaternion.setFromAxisAngle(z_axis, angle - Math.PI / 2);
    instance_scale.set(scale * 0.72, scale * 1.25, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    rind_eye_scars.setMatrixAt(i, instance_matrix);

    instance_position.z = 0.050;
    instance_scale.set(scale * 0.42, scale * 0.62, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    rind_eye_centers.setMatrixAt(i, instance_matrix);
  }
  rind_eye_scars.instanceMatrix.needsUpdate = true;
  rind_eye_centers.instanceMatrix.needsUpdate = true;
  rind_group.add(rind_eye_scars, rind_eye_centers);

  const juice_dropletsGeom = new THREE.CircleGeometry(0.006, 12);
  const dropletCount = 18;
  const juice_droplets = new THREE.InstancedMesh(
    juice_dropletsGeom,
    juice_highlightsMat,
    dropletCount
  );
  juice_droplets.name = "juice_droplets";

  for (let i = 0; i < dropletCount; i++) {
    const angle = i * 2.399963229728653 + 0.31;
    const radius = 0.105 + ((i * 13) % 23) / 23 * 0.31;
    const scale = 0.55 + ((i * 5) % 7) * 0.11;

    instance_position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.057
    );
    instance_quaternion.setFromAxisAngle(z_axis, angle);
    instance_scale.set(scale * 0.72, scale * 1.25, 1);
    instance_matrix.compose(
      instance_position,
      instance_quaternion,
      instance_scale
    );
    juice_droplets.setMatrixAt(i, instance_matrix);
  }
  juice_droplets.instanceMatrix.needsUpdate = true;
  detail_group.add(juice_droplets);

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