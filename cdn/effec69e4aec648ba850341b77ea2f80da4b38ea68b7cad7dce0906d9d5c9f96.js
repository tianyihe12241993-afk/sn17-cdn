export default function generate(THREE) {
  const root = new THREE.Group();
  const stem_group = new THREE.Group();
  const foliage_group = new THREE.Group();
  const bloom_group = new THREE.Group();
  bloom_group.position.y = 0.20;
  root.add(stem_group, foliage_group, bloom_group);

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x47752d,
    metalness: 0.0,
    roughness: 0.9,
    emissive: 0x17290d,
    emissiveIntensity: 0.18
  });
  const stemHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x73964b,
    metalness: 0.0,
    roughness: 0.9
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x557b35,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
    emissive: 0x17250e,
    emissiveIntensity: 0.22
  });
  const leafLightMat = new THREE.MeshStandardMaterial({
    color: 0x718f4b,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
    emissive: 0x1d2c12,
    emissiveIntensity: 0.2
  });
  const leafVeinMat = new THREE.MeshStandardMaterial({
    color: 0x92984e,
    metalness: 0.0,
    roughness: 0.9
  });
  const leafMidribMat = new THREE.LineBasicMaterial({
    color: 0xa0a65a
  });
  const leafVeinMatInstance = new THREE.LineBasicMaterial({
    color: 0x85914a
  });
  const thornMat = new THREE.MeshStandardMaterial({
    color: 0x66502a,
    metalness: 0.0,
    roughness: 0.9
  });

  const outerPetalMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1c9b2,
    metalness: 0.0,
    roughness: 0.72,
    transmission: 0.08,
    ior: 1.35,
    transparent: true,
    opacity: 0.98,
    side: THREE.DoubleSide,
    emissive: 0xe5a984,
    emissiveIntensity: 0.42
  });
  const lowerPetalMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3cbb8,
    metalness: 0.0,
    roughness: 0.72,
    transmission: 0.08,
    ior: 1.35,
    transparent: true,
    opacity: 0.98,
    side: THREE.DoubleSide,
    emissive: 0xe7aa88,
    emissiveIntensity: 0.42
  });
  const middlePetalMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4c6a8,
    metalness: 0.0,
    roughness: 0.72,
    transmission: 0.07,
    ior: 1.35,
    transparent: true,
    opacity: 0.98,
    side: THREE.DoubleSide,
    emissive: 0xedb28e,
    emissiveIntensity: 0.4
  });
  const innerPetalMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5c9a7,
    metalness: 0.0,
    roughness: 0.72,
    transmission: 0.06,
    ior: 1.35,
    transparent: true,
    opacity: 0.98,
    side: THREE.DoubleSide,
    emissive: 0xebb48f,
    emissiveIntensity: 0.38
  });
  const corePetalMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4c49f,
    metalness: 0.0,
    roughness: 0.72,
    transmission: 0.05,
    ior: 1.35,
    transparent: true,
    opacity: 0.98,
    side: THREE.DoubleSide,
    emissive: 0xe5a17a,
    emissiveIntensity: 0.36
  });
  const petalRimMat = new THREE.MeshStandardMaterial({
    color: 0xf7d8c6,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0xf0c2aa,
    emissiveIntensity: 0.25
  });
  const centerSpiralMat = new THREE.MeshStandardMaterial({
    color: 0xd98e62,
    metalness: 0.0,
    roughness: 0.75,
    emissive: 0xb86e48,
    emissiveIntensity: 0.2
  });

  function petalPoint(spec, u, v) {
    const widthFactor =
      0.10 + 0.90 * Math.pow(Math.sin(Math.PI * 0.82 * v), 0.52);
    const halfWidth = spec.halfWidth * widthFactor;
    const x = u * halfWidth;
    const y =
      spec.height * v -
      spec.edgeDrop * u * u * Math.pow(v, 4) -
      spec.cup * (1 - u * u) * Math.pow(v, 1.35);
    const z =
      spec.baseRadius +
      spec.flare * Math.pow(v, 1.38) +
      spec.cup * u * u * Math.pow(v, 1.12) -
      spec.fold * (1 - u * u) * Math.pow(v, 1.70) +
      spec.wave * Math.sin(u * Math.PI * 2.5) * Math.pow(v, 5);
    return new THREE.Vector3(x, y, z);
  }

  function createPetalGeometry(spec) {
    const segmentsU = 14;
    const segmentsV = 16;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= segmentsV; j++) {
      const v = j / segmentsV;
      for (let i = 0; i <= segmentsU; i++) {
        const u = -1 + 2 * i / segmentsU;
        const p = petalPoint(spec, u, v);
        positions.push(p.x, p.y, p.z);
      }
    }

    for (let j = 0; j < segmentsV; j++) {
      for (let i = 0; i < segmentsU; i++) {
        const a = j * (segmentsU + 1) + i;
        const b = a + 1;
        const d = (j + 1) * (segmentsU + 1) + i;
        const c = d + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPetalRimGeometry(spec, radius) {
    const points = [];
    for (let i = 0; i <= 24; i++) {
      const u = -1 + 2 * i / 24;
      const p = petalPoint(spec, u, 1);
      p.z += 0.004;
      points.push(p);
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 36, radius, 6, false);
  }

  function createLeafGeometry() {
    const segments = 20;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const envelope = Math.sin(Math.PI * t);
      const serration = 1 + 0.075 * Math.sin(i * Math.PI * 1.5);
      const halfWidth = 0.23 * Math.pow(envelope, 0.72) * serration;
      const ridge = 0.035 * envelope;
      positions.push(-halfWidth, t, 0);
      positions.push(0, t, ridge);
      positions.push(halfWidth, t, 0);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 3;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      const e = a + 4;
      const f = a + 5;
      indices.push(a, d, b, b, d, e);
      indices.push(b, e, c, c, e, f);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createLeafMidribGeometry() {
    const positions = [];
    for (let i = 0; i < 18; i++) {
      const t0 = 0.03 + i * 0.05;
      const t1 = t0 + 0.052;
      const z0 = 0.035 * Math.sin(Math.PI * t0) + 0.006;
      const z1 = 0.035 * Math.sin(Math.PI * t1) + 0.006;
      positions.push(0, t0, z0, 0, t1, z1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  function createLeafVeinGeometry() {
    const positions = [];
    for (let i = 0; i < 6; i++) {
      const t0 = 0.18 + i * 0.115;
      const t1 = Math.min(0.94, t0 + 0.13);
      const envelope = Math.sin(Math.PI * t1);
      const width = 0.17 * Math.pow(envelope, 0.72);
      const ridge = 0.035 * envelope;
      positions.push(
        0,
        t0,
        0.035 * Math.sin(Math.PI * t0) + 0.007,
        -width,
        t1,
        0.007
      );
      positions.push(
        0,
        t0,
        0.035 * Math.sin(Math.PI * t0) + 0.007,
        width,
        t1,
        0.007
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  const stemPoints = [
    new THREE.Vector3(0.00, -1.55, 0.00),
    new THREE.Vector3(0.00, -1.10, 0.005),
    new THREE.Vector3(-0.025, -0.62, 0.012),
    new THREE.Vector3(-0.015, -0.15, 0.008),
    new THREE.Vector3(0.00, 0.30, 0.00),
    new THREE.Vector3(0.00, 0.72, -0.015),
    new THREE.Vector3(0.00, 1.08, -0.035)
  ];
  const stemCurve = new THREE.CatmullRomCurve3(
    stemPoints,
    false,
    "centripetal"
  );
  const stemGeom = new THREE.TubeGeometry(stemCurve, 48, 0.06, 12, false);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem_group.add(stem);

  const stemHighlightPoints = stemPoints.map(
    (p) => new THREE.Vector3(p.x - 0.018, p.y, p.z + 0.052)
  );
  const stemHighlightCurve = new THREE.CatmullRomCurve3(
    stemHighlightPoints,
    false,
    "centripetal"
  );
  const stemHighlightGeom = new THREE.TubeGeometry(
    stemHighlightCurve,
    40,
    0.009,
    6,
    false
  );
  const stem_highlight = new THREE.Mesh(
    stemHighlightGeom,
    stemHighlightMat
  );
  stem_group.add(stem_highlight);

  const stemNodeGeom = new THREE.SphereGeometry(1, 14, 8);
  const stem_node = new THREE.Mesh(stemNodeGeom, stemMat);
  stem_node.position.set(-0.025, -0.58, 0.012);
  stem_node.scale.set(0.075, 0.045, 0.065);
  stem_group.add(stem_node);

  const thornBase = new THREE.Vector3(-0.035, -0.58, 0.015);
  const thornTip = new THREE.Vector3(-0.145, -0.48, 0.055);
  const thornDirection = new THREE.Vector3().subVectors(
    thornTip,
    thornBase
  );
  const thornLength = thornDirection.length();
  const thornGeom = new THREE.ConeGeometry(0.038, thornLength, 8);
  const thorn = new THREE.Mesh(thornGeom, thornMat);
  thorn.position.copy(thornBase).add(thornTip).multiplyScalar(0.5);
  thorn.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    thornDirection.normalize()
  );
  stem_group.add(thorn);

  const leafGeom = createLeafGeometry();
  const leafMidribGeom = createLeafMidribGeometry();
  const leafVeinGeom = createLeafVeinGeometry();
  const leafBase = new THREE.Vector3(0, 0.73, -0.06);

  const leftLeafQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-0.08, 0.04, 1.12)
  );
  const left_leaf = new THREE.Mesh(leafGeom, leafMat);
  left_leaf.position.copy(leafBase);
  left_leaf.quaternion.copy(leftLeafQuaternion);
  left_leaf.scale.set(1.12, 1.05, 1);
  foliage_group.add(left_leaf);

  const left_leaf_midrib = new THREE.LineSegments(
    leafMidribGeom,
    leafMidribMat
  );
  left_leaf_midrib.position.copy(leafBase);
  left_leaf_midrib.quaternion.copy(leftLeafQuaternion);
  left_leaf_midrib.scale.set(1.12, 1.05, 1);
  foliage_group.add(left_leaf_midrib);

  const left_leaf_veins = new THREE.LineSegments(
    leafVeinGeom,
    leafVeinMatInstance
  );
  left_leaf_veins.position.copy(leafBase);
  left_leaf_veins.quaternion.copy(leftLeafQuaternion);
  left_leaf_veins.scale.set(1.12, 1.05, 1);
  foliage_group.add(left_leaf_veins);

  const rightLeafQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0.08, -0.05, -1.12)
  );
  const right_leaf = new THREE.Mesh(leafGeom, leafMat);
  right_leaf.position.copy(leafBase);
  right_leaf.quaternion.copy(rightLeafQuaternion);
  right_leaf.scale.set(1.08, 1.02, 1);
  foliage_group.add(right_leaf);

  const right_leaf_midrib = new THREE.LineSegments(
    leafMidribGeom,
    leafMidribMat
  );
  right_leaf_midrib.position.copy(leafBase);
  right_leaf_midrib.quaternion.copy(rightLeafQuaternion);
  right_leaf_midrib.scale.set(1.08, 1.02, 1);
  foliage_group.add(right_leaf_midrib);

  const right_leaf_veins = new THREE.LineSegments(
    leafVeinGeom,
    leafVeinMatInstance
  );
  right_leaf_veins.position.copy(leafBase);
  right_leaf_veins.quaternion.copy(rightLeafQuaternion);
  right_leaf_veins.scale.set(1.08, 1.02, 1);
  foliage_group.add(right_leaf_veins);

  const lowerLeafQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0.12, 0.08, 2.30)
  );
  const lower_leaf = new THREE.Mesh(leafGeom, leafLightMat);
  lower_leaf.position.set(0.01, 0.72, -0.045);
  lower_leaf.quaternion.copy(lowerLeafQuaternion);
  lower_leaf.scale.set(0.62, 0.72, 0.8);
  foliage_group.add(lower_leaf);

  const lower_leaf_midrib = new THREE.LineSegments(
    leafMidribGeom,
    leafMidribMat
  );
  lower_leaf_midrib.position.set(0.01, 0.72, -0.045);
  lower_leaf_midrib.quaternion.copy(lowerLeafQuaternion);
  lower_leaf_midrib.scale.set(0.62, 0.72, 0.8);
  foliage_group.add(lower_leaf_midrib);

  const lower_leaf_veins = new THREE.LineSegments(
    leafVeinGeom,
    leafVeinMatInstance
  );
  lower_leaf_veins.position.set(0.01, 0.72, -0.045);
  lower_leaf_veins.quaternion.copy(lowerLeafQuaternion);
  lower_leaf_veins.scale.set(0.62, 0.72, 0.8);
  foliage_group.add(lower_leaf_veins);

  const receptacleGeom = new THREE.SphereGeometry(1, 24, 14);
  const receptacle = new THREE.Mesh(receptacleGeom, leafMat);
  receptacle.position.set(0, 0.75, -0.015);
  receptacle.scale.set(0.28, 0.18, 0.25);
  foliage_group.add(receptacle);

  const sepalSpec = {
    height: 0.48,
    halfWidth: 0.105,
    baseRadius: 0.025,
    flare: 0.30,
    cup: 0.045,
    fold: 0.025,
    edgeDrop: 0.025,
    wave: 0.008
  };
  const sepalsGeom = createPetalGeometry(sepalSpec);
  const sepals = new THREE.InstancedMesh(sepalsGeom, leafMat, 5);
  const sepalDummy = new THREE.Object3D();
  const sepalAngles = [0.35, 1.55, 2.75, 3.95, 5.15];

  for (let i = 0; i < sepalAngles.length; i++) {
    sepalDummy.position.set(0, 0.68, -0.015);
    sepalDummy.rotation.set(0, sepalAngles[i], 0);
    sepalDummy.scale.set(
      0.92 + 0.04 * (i % 2),
      0.94 + 0.03 * (i % 3),
      1
    );
    sepalDummy.updateMatrix();
    sepals.setMatrixAt(i, sepalDummy.matrix);
  }
  sepals.instanceMatrix.needsUpdate = true;
  foliage_group.add(sepals);

  const outerSpec = {
    height: 0.94,
    halfWidth: 0.54,
    baseRadius: 0.025,
    flare: 0.62,
    cup: 0.12,
    fold: 0.075,
    edgeDrop: 0.075,
    wave: 0.022
  };
  const outer_petalsGeom = createPetalGeometry(outerSpec);
  const outer_petal_rimsGeom = createPetalRimGeometry(outerSpec, 0.012);
  const outer_petals = new THREE.InstancedMesh(
    outer_petalsGeom,
    outerPetalMat,
    8
  );
  const outer_petal_rims = new THREE.InstancedMesh(
    outer_petal_rimsGeom,
    petalRimMat,
    8
  );
  const outerDummy = new THREE.Object3D();
  const outerAngles = [0.12, 0.88, 1.65, 2.35, 3.12, 3.90, 4.65, 5.45];
  const outerScales = [
    [1.04, 0.94, 1.02],
    [0.96, 1.02, 0.96],
    [1.08, 0.98, 1.05],
    [0.98, 1.03, 0.98],
    [1.05, 0.96, 1.02],
    [0.95, 1.01, 0.96],
    [1.07, 0.97, 1.04],
    [0.99, 1.02, 0.98]
  ];

  for (let i = 0; i < outerAngles.length; i++) {
    outerDummy.position.set(0, 0.68 + 0.012 * (i % 2), -0.005);
    outerDummy.rotation.set(0, outerAngles[i], 0);
    outerDummy.scale.set(
      outerScales[i][0],
      outerScales[i][1],
      outerScales[i][2]
    );
    outerDummy.updateMatrix();
    outer_petals.setMatrixAt(i, outerDummy.matrix);
    outer_petal_rims.setMatrixAt(i, outerDummy.matrix);
  }
  outer_petals.instanceMatrix.needsUpdate = true;
  outer_petal_rims.instanceMatrix.needsUpdate = true;
  bloom_group.add(outer_petals, outer_petal_rims);

  const lowerSpec = {
    height: 1.00,
    halfWidth: 0.42,
    baseRadius: 0.02,
    flare: 0.42,
    cup: 0.105,
    fold: 0.075,
    edgeDrop: 0.06,
    wave: 0.016
  };
  const lower_petalsGeom = createPetalGeometry(lowerSpec);
  const lower_petal_rimsGeom = createPetalRimGeometry(lowerSpec, 0.010);
  const lower_petals = new THREE.InstancedMesh(
    lower_petalsGeom,
    lowerPetalMat,
    7
  );
  const lower_petal_rims = new THREE.InstancedMesh(
    lower_petal_rimsGeom,
    petalRimMat,
    7
  );
  const lowerDummy = new THREE.Object3D();
  const lowerAngles = [0.32, 1.12, 1.91, 2.72, 3.52, 4.34, 5.18];
  const lowerScales = [
    [1.02, 0.97, 1.00],
    [0.96, 1.02, 0.96],
    [1.05, 0.98, 1.03],
    [0.98, 1.01, 0.98],
    [1.03, 0.96, 1.02],
    [0.97, 1.02, 0.97],
    [1.04, 0.98, 1.01]
  ];

  for (let i = 0; i < lowerAngles.length; i++) {
    lowerDummy.position.set(0, 0.70 + 0.008 * (i % 2), 0);
    lowerDummy.rotation.set(0, lowerAngles[i], 0);
    lowerDummy.scale.set(
      lowerScales[i][0],
      lowerScales[i][1],
      lowerScales[i][2]
    );
    lowerDummy.updateMatrix();
    lower_petals.setMatrixAt(i, lowerDummy.matrix);
    lower_petal_rims.setMatrixAt(i, lowerDummy.matrix);
  }
  lower_petals.instanceMatrix.needsUpdate = true;
  lower_petal_rims.instanceMatrix.needsUpdate = true;
  bloom_group.add(lower_petals, lower_petal_rims);

  const middleSpec = {
    height: 0.96,
    halfWidth: 0.30,
    baseRadius: 0.015,
    flare: 0.29,
    cup: 0.085,
    fold: 0.06,
    edgeDrop: 0.045,
    wave: 0.012
  };
  const middle_petalsGeom = createPetalGeometry(middleSpec);
  const middle_petal_rimsGeom = createPetalRimGeometry(
    middleSpec,
    0.009
  );
  const middle_petals = new THREE.InstancedMesh(
    middle_petalsGeom,
    middlePetalMat,
    6
  );
  const middle_petal_rims = new THREE.InstancedMesh(
    middle_petal_rimsGeom,
    petalRimMat,
    6
  );
  const middleDummy = new THREE.Object3D();
  const middleAngles = [0.18, 1.12, 2.06, 3.14, 4.18, 5.22];

  for (let i = 0; i < middleAngles.length; i++) {
    middleDummy.position.set(0, 0.73, 0.005);
    middleDummy.rotation.set(0, middleAngles[i], 0);
    middleDummy.scale.set(
      0.97 + 0.025 * (i % 3),
      0.97 + 0.018 * (i % 2),
      1
    );
    middleDummy.updateMatrix();
    middle_petals.setMatrixAt(i, middleDummy.matrix);
    middle_petal_rims.setMatrixAt(i, middleDummy.matrix);
  }
  middle_petals.instanceMatrix.needsUpdate = true;
  middle_petal_rims.instanceMatrix.needsUpdate = true;
  bloom_group.add(middle_petals, middle_petal_rims);

  const innerSpec = {
    height: 0.78,
    halfWidth: 0.215,
    baseRadius: 0.01,
    flare: 0.20,
    cup: 0.065,
    fold: 0.045,
    edgeDrop: 0.032,
    wave: 0.008
  };
  const inner_petalsGeom = createPetalGeometry(innerSpec);
  const inner_petal_rimsGeom = createPetalRimGeometry(innerSpec, 0.008);
  const inner_petals = new THREE.InstancedMesh(
    inner_petalsGeom,
    innerPetalMat,
    5
  );
  const inner_petal_rims = new THREE.InstancedMesh(
    inner_petal_rimsGeom,
    petalRimMat,
    5
  );
  const innerDummy = new THREE.Object3D();
  const innerAngles = [0.28, 1.42, 2.57, 3.72, 4.90];

  for (let i = 0; i < innerAngles.length; i++) {
    innerDummy.position.set(0, 0.77, 0.01);
    innerDummy.rotation.set(0, innerAngles[i], 0);
    innerDummy.scale.set(
      0.98 + 0.02 * (i % 2),
      0.98 + 0.015 * (i % 3),
      1
    );
    innerDummy.updateMatrix();
    inner_petals.setMatrixAt(i, innerDummy.matrix);
    inner_petal_rims.setMatrixAt(i, innerDummy.matrix);
  }
  inner_petals.instanceMatrix.needsUpdate = true;
  inner_petal_rims.instanceMatrix.needsUpdate = true;
  bloom_group.add(inner_petals, inner_petal_rims);

  const coreSpec = {
    height: 0.58,
    halfWidth: 0.145,
    baseRadius: 0.005,
    flare: 0.13,
    cup: 0.045,
    fold: 0.032,
    edgeDrop: 0.022,
    wave: 0.006
  };
  const core_petalsGeom = createPetalGeometry(coreSpec);
  const core_petal_rimsGeom = createPetalRimGeometry(coreSpec, 0.007);
  const core_petals = new THREE.InstancedMesh(
    core_petalsGeom,
    corePetalMat,
    4
  );
  const core_petal_rims = new THREE.InstancedMesh(
    core_petal_rimsGeom,
    petalRimMat,
    4
  );
  const coreDummy = new THREE.Object3D();
  const coreAngles = [0.35, 1.72, 3.08, 4.48];

  for (let i = 0; i < coreAngles.length; i++) {
    coreDummy.position.set(0, 0.80, 0.012);
    coreDummy.rotation.set(0, coreAngles[i], 0);
    coreDummy.scale.set(1, 0.98 + 0.015 * (i % 2), 1);
    coreDummy.updateMatrix();
    core_petals.setMatrixAt(i, coreDummy.matrix);
    core_petal_rims.setMatrixAt(i, coreDummy.matrix);
  }
  core_petals.instanceMatrix.needsUpdate = true;
  core_petal_rims.instanceMatrix.needsUpdate = true;
  bloom_group.add(core_petals, core_petal_rims);

  const centerSpiralPoints = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    const angle = 0.35 + t * Math.PI * 4.2;
    const radius = 0.105 * (1 - t) + 0.018;
    centerSpiralPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        1.365 + 0.012 * t,
        0.012 + Math.sin(angle) * radius
      )
    );
  }
  const centerSpiralCurve = new THREE.CatmullRomCurve3(
    centerSpiralPoints,
    false,
    "centripetal"
  );
  const centerSpiralGeom = new THREE.TubeGeometry(
    centerSpiralCurve,
    42,
    0.012,
    6,
    false
  );
  const center_spiral = new THREE.Mesh(
    centerSpiralGeom,
    centerSpiralMat
  );
  bloom_group.add(center_spiral);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}