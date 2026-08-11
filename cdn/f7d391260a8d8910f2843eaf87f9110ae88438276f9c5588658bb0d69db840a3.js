export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hanging_wind_chime";

  const canopyR = 1.55;
  const canopyRise = 1.25;
  const canopyBaseY = 1.22;
  const domeCenterY = canopyBaseY + canopyRise;

  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0xb94326,
    metalness: 0.0,
    roughness: 0.3,
  });
  const canopySeamMat = new THREE.MeshStandardMaterial({
    color: 0x762518,
    metalness: 0.0,
    roughness: 0.3,
  });
  const canopyFoldMat = new THREE.MeshStandardMaterial({
    color: 0x922d1c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const canopyCapMat = new THREE.MeshStandardMaterial({
    color: 0xa93822,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xb58b46,
    metalness: 0.0,
    roughness: 0.95,
  });
  const ropeDarkMat = new THREE.MeshStandardMaterial({
    color: 0x76552c,
    metalness: 0.0,
    roughness: 0.95,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b281d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const walnutWoodMat = new THREE.MeshStandardMaterial({
    color: 0x653820,
    metalness: 0.0,
    roughness: 0.6,
  });
  const goldenWoodMat = new THREE.MeshStandardMaterial({
    color: 0xa97835,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc18b43,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x351c13,
    metalness: 0.0,
    roughness: 0.6,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const redBeadMat = new THREE.MeshStandardMaterial({
    color: 0x8e2d25,
    metalness: 0.0,
    roughness: 0.3,
  });
  const creamFabricMat = new THREE.MeshStandardMaterial({
    color: 0xc9b17b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const navyFabricMat = new THREE.MeshStandardMaterial({
    color: 0x17263a,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const embroideryMat = new THREE.MeshStandardMaterial({
    color: 0xe1d3a4,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  function makeTube(points, radius, material, tubularSegments, radialSegments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      radius,
      radialSegments,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  function makeTwistCurve(x, yTop, yBottom, z, amplitude, turns, steps) {
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * turns * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          x + Math.cos(angle) * amplitude,
          yTop + (yBottom - yTop) * t,
          z + Math.sin(angle) * amplitude
        )
      );
    }
    return new THREE.CatmullRomCurve3(points, false, "centripetal");
  }

  function canopyYAtRadius(radius) {
    const t = Math.max(0, 1 - radius / canopyR);
    return canopyBaseY + canopyRise * Math.pow(t, 0.55);
  }

  const canopy_assembly = new THREE.Group();
  canopy_assembly.name = "canopy_assembly";
  root.add(canopy_assembly);

  const canopyProfile = [new THREE.Vector2(0, canopyBaseY)];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const radius = canopyR * t;
    const y = canopyBaseY + canopyRise * Math.pow(1 - t, 0.55);
    canopyProfile.push(new THREE.Vector2(radius, y));
  }

  const canopyGeom = new THREE.LatheGeometry(canopyProfile, 64);
  const canopy = new THREE.Mesh(canopyGeom, canopyMat);
  canopy.name = "canopy";
  canopy_assembly.add(canopy);

  const canopy_ribs = new THREE.Group();
  canopy_ribs.name = "canopy_ribs";
  canopy_assembly.add(canopy_ribs);

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const ribPoints = [];
    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const radius = 0.055 + t * (canopyR - 0.055);
      const y = canopyYAtRadius(radius) + 0.012;
      ribPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    const rib = makeTube(ribPoints, 0.009, canopySeamMat, 24, 6);
    rib.name = "canopy_rib_" + i;
    canopy_ribs.add(rib);
  }

  const canopy_lower_rimGeom = new THREE.TorusGeometry(
    canopyR,
    0.025,
    10,
    64
  );
  const canopy_lower_rim = new THREE.Mesh(
    canopy_lower_rimGeom,
    canopySeamMat
  );
  canopy_lower_rim.name = "canopy_lower_rim";
  canopy_lower_rim.rotation.x = Math.PI / 2;
  canopy_lower_rim.position.y = canopyBaseY;
  canopy_assembly.add(canopy_lower_rim);

  const canopy_inner_rimGeom = new THREE.TorusGeometry(
    canopyR * 0.965,
    0.014,
    8,
    64
  );
  const canopy_inner_rim = new THREE.Mesh(
    canopy_inner_rimGeom,
    canopyFoldMat
  );
  canopy_inner_rim.name = "canopy_inner_rim";
  canopy_inner_rim.rotation.x = Math.PI / 2;
  canopy_inner_rim.position.y = canopyBaseY - 0.025;
  canopy_assembly.add(canopy_inner_rim);

  const canopy_scallopsGeom = new THREE.SphereGeometry(1, 16, 10);
  const canopy_scallops = new THREE.InstancedMesh(
    canopy_scallopsGeom,
    canopyFoldMat,
    12
  );
  canopy_scallops.name = "canopy_scallops";

  const scallopDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    scallopDummy.position.set(
      Math.cos(angle) * canopyR,
      canopyBaseY - 0.055,
      Math.sin(angle) * canopyR
    );
    scallopDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    scallopDummy.scale.set(0.22, 0.075, 0.065);
    scallopDummy.updateMatrix();
    canopy_scallops.setMatrixAt(i, scallopDummy.matrix);
  }
  canopy_scallops.instanceMatrix.needsUpdate = true;
  canopy_assembly.add(canopy_scallops);

  const canopy_gathersGeom = new THREE.CylinderGeometry(
    0.008,
    0.012,
    0.23,
    7
  );
  const canopy_gathers = new THREE.InstancedMesh(
    canopy_gathersGeom,
    canopySeamMat,
    12
  );
  canopy_gathers.name = "canopy_gathers";

  const gatherDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    gatherDummy.position.set(
      Math.cos(angle) * (canopyR + 0.008),
      canopyBaseY - 0.075,
      Math.sin(angle) * (canopyR + 0.008)
    );
    gatherDummy.rotation.set(0, 0, 0);
    gatherDummy.scale.set(1, 1, 1);
    gatherDummy.updateMatrix();
    canopy_gathers.setMatrixAt(i, gatherDummy.matrix);
  }
  canopy_gathers.instanceMatrix.needsUpdate = true;
  canopy_assembly.add(canopy_gathers);

  const canopy_capGeom = new THREE.ConeGeometry(0.22, 0.18, 16);
  const canopy_cap = new THREE.Mesh(canopy_capGeom, canopyCapMat);
  canopy_cap.name = "canopy_cap";
  canopy_cap.position.y = domeCenterY + 0.055;
  canopy_assembly.add(canopy_cap);

  const canopy_cap_bandGeom = new THREE.TorusGeometry(
    0.18,
    0.022,
    8,
    32
  );
  const canopy_cap_band = new THREE.Mesh(
    canopy_cap_bandGeom,
    canopySeamMat
  );
  canopy_cap_band.name = "canopy_cap_band";
  canopy_cap_band.rotation.x = Math.PI / 2;
  canopy_cap_band.position.y = domeCenterY - 0.025;
  canopy_assembly.add(canopy_cap_band);

  const hanging_loopPoints = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    hanging_loopPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.075,
        2.78 + Math.sin(angle) * 0.27,
        0
      )
    );
  }

  const hanging_loopCurve = new THREE.CatmullRomCurve3(
    hanging_loopPoints,
    true,
    "centripetal"
  );
  const hanging_loopGeom = new THREE.TubeGeometry(
    hanging_loopCurve,
    48,
    0.022,
    8,
    true
  );
  const hanging_loop = new THREE.Mesh(hanging_loopGeom, ropeMat);
  hanging_loop.name = "hanging_loop";
  canopy_assembly.add(hanging_loop);

  const hanging_loop_coreGeom = new THREE.TubeGeometry(
    hanging_loopCurve,
    48,
    0.007,
    6,
    true
  );
  const hanging_loop_core = new THREE.Mesh(
    hanging_loop_coreGeom,
    ropeDarkMat
  );
  hanging_loop_core.name = "hanging_loop_core";
  canopy_assembly.add(hanging_loop_core);

  const loop_knotGeom = new THREE.SphereGeometry(0.06, 16, 10);
  const loop_knot = new THREE.Mesh(loop_knotGeom, ropeMat);
  loop_knot.name = "loop_knot";
  loop_knot.position.set(0, 2.51, 0);
  loop_knot.scale.set(1, 0.65, 0.85);
  canopy_assembly.add(loop_knot);

  const chime_assembly = new THREE.Group();
  chime_assembly.name = "chime_assembly";
  root.add(chime_assembly);

  const tubeData = [
    { x: -1.05, z: -0.08, y: 0.16, length: 1.5, radius: 0.09, material: goldenWoodMat },
    { x: -0.62, z: 0.08, y: 0.11, length: 1.6, radius: 0.105, material: walnutWoodMat },
    { x: -0.15, z: -0.03, y: 0.15, length: 1.52, radius: 0.1, material: lightWoodMat },
    { x: 0.31, z: -0.08, y: 0.1, length: 1.62, radius: 0.095, material: darkWoodMat },
    { x: 0.67, z: 0.1, y: 0.14, length: 1.54, radius: 0.105, material: walnutWoodMat },
    { x: 1.08, z: -0.05, y: 0.2, length: 1.42, radius: 0.09, material: goldenWoodMat },
  ];

  const chime_tubeGeom = new THREE.CylinderGeometry(1, 1, 1, 24);
  const chime_tubes = new THREE.Group();
  chime_tubes.name = "chime_tubes";
  chime_assembly.add(chime_tubes);

  for (let i = 0; i < tubeData.length; i++) {
    const data = tubeData[i];
    const chime_tube = new THREE.Mesh(chime_tubeGeom, data.material);
    chime_tube.name = "chime_tube_" + i;
    chime_tube.position.set(data.x, data.y, data.z);
    chime_tube.scale.set(data.radius, data.length, data.radius);
    chime_tubes.add(chime_tube);
  }

  const tube_top_rimsGeom = new THREE.TorusGeometry(1, 0.065, 6, 24);
  const tube_top_rims = new THREE.InstancedMesh(
    tube_top_rimsGeom,
    darkWoodMat,
    tubeData.length
  );
  tube_top_rims.name = "tube_top_rims";

  const tube_bottom_rims = new THREE.InstancedMesh(
    tube_top_rimsGeom,
    darkWoodMat,
    tubeData.length
  );
  tube_bottom_rims.name = "tube_bottom_rims";

  const rimDummy = new THREE.Object3D();
  for (let i = 0; i < tubeData.length; i++) {
    const data = tubeData[i];
    const rimScale = data.radius * 1.02;

    rimDummy.position.set(
      data.x,
      data.y + data.length / 2,
      data.z
    );
    rimDummy.rotation.set(Math.PI / 2, 0, 0);
    rimDummy.scale.setScalar(rimScale);
    rimDummy.updateMatrix();
    tube_top_rims.setMatrixAt(i, rimDummy.matrix);

    rimDummy.position.set(
      data.x,
      data.y - data.length / 2,
      data.z
    );
    rimDummy.updateMatrix();
    tube_bottom_rims.setMatrixAt(i, rimDummy.matrix);
  }
  tube_top_rims.instanceMatrix.needsUpdate = true;
  tube_bottom_rims.instanceMatrix.needsUpdate = true;
  chime_assembly.add(tube_top_rims, tube_bottom_rims);

  const wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const wood_grain = new THREE.InstancedMesh(
    wood_grainGeom,
    woodGrainMat,
    tubeData.length * 2
  );
  wood_grain.name = "wood_grain";

  const grainDummy = new THREE.Object3D();
  let grainIndex = 0;
  for (let i = 0; i < tubeData.length; i++) {
    const data = tubeData[i];
    for (let j = 0; j < 2; j++) {
      const xOffset = (j === 0 ? -0.24 : 0.28) * data.radius;
      const frontZ =
        data.z +
        Math.sqrt(
          Math.max(0, data.radius * data.radius - xOffset * xOffset)
        ) +
        0.003;

      grainDummy.position.set(
        data.x + xOffset,
        data.y + (j === 0 ? 0.12 : -0.16),
        frontZ
      );
      grainDummy.rotation.set(0, 0, j === 0 ? 0.025 : -0.018);
      grainDummy.scale.set(
        0.007,
        data.length * (j === 0 ? 0.72 : 0.58),
        0.005
      );
      grainDummy.updateMatrix();
      wood_grain.setMatrixAt(grainIndex, grainDummy.matrix);
      grainIndex++;
    }
  }
  wood_grain.instanceMatrix.needsUpdate = true;
  chime_assembly.add(wood_grain);

  const tube_fastenersGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.014,
    12
  );
  const tube_fasteners = new THREE.InstancedMesh(
    tube_fastenersGeom,
    darkMetalMat,
    4
  );
  tube_fasteners.name = "tube_fasteners";

  const fastenerIndices = [0, 1, 4, 5];
  const fastenerDummy = new THREE.Object3D();
  for (let i = 0; i < fastenerIndices.length; i++) {
    const data = tubeData[fastenerIndices[i]];
    fastenerDummy.position.set(
      data.x,
      data.y + data.length * 0.3,
      data.z + data.radius + 0.007
    );
    fastenerDummy.rotation.set(Math.PI / 2, 0, 0);
    fastenerDummy.scale.set(1, 1, 1);
    fastenerDummy.updateMatrix();
    tube_fasteners.setMatrixAt(i, fastenerDummy.matrix);
  }
  tube_fasteners.instanceMatrix.needsUpdate = true;
  chime_assembly.add(tube_fasteners);

  const suspension_cords = new THREE.Group();
  suspension_cords.name = "suspension_cords";
  chime_assembly.add(suspension_cords);

  for (let i = 0; i < tubeData.length; i++) {
    const data = tubeData[i];
    const tubeTop = data.y + data.length / 2;
    const suspension_cord = makeTube(
      [
        new THREE.Vector3(data.x, canopyBaseY - 0.015, data.z),
        new THREE.Vector3(
          data.x + (i % 2 === 0 ? -0.012 : 0.012),
          (canopyBaseY + tubeTop) / 2,
          data.z
        ),
        new THREE.Vector3(data.x, tubeTop + 0.012, data.z),
      ],
      0.011,
      ropeDarkMat,
      12,
      6
    );
    suspension_cord.name = "suspension_cord_" + i;
    suspension_cords.add(suspension_cord);
  }

  const suspension_knotsGeom = new THREE.SphereGeometry(0.035, 10, 7);
  const suspension_knots = new THREE.InstancedMesh(
    suspension_knotsGeom,
    ropeDarkMat,
    tubeData.length
  );
  suspension_knots.name = "suspension_knots";

  const suspensionKnotDummy = new THREE.Object3D();
  for (let i = 0; i < tubeData.length; i++) {
    const data = tubeData[i];
    suspensionKnotDummy.position.set(
      data.x,
      data.y + data.length / 2 + 0.015,
      data.z
    );
    suspensionKnotDummy.rotation.set(0, 0, 0);
    suspensionKnotDummy.scale.set(1, 0.8, 1);
    suspensionKnotDummy.updateMatrix();
    suspension_knots.setMatrixAt(i, suspensionKnotDummy.matrix);
  }
  suspension_knots.instanceMatrix.needsUpdate = true;
  chime_assembly.add(suspension_knots);

  const left_drop_cordCurve = makeTwistCurve(
    -0.62,
    -0.69,
    -1.5,
    0.08,
    0.006,
    7,
    28
  );
  const left_drop_cordGeom = new THREE.TubeGeometry(
    left_drop_cordCurve,
    36,
    0.009,
    6,
    false
  );
  const left_drop_cord = new THREE.Mesh(
    left_drop_cordGeom,
    ropeDarkMat
  );
  left_drop_cord.name = "left_drop_cord";
  chime_assembly.add(left_drop_cord);

  const center_drop_cordCurve = makeTwistCurve(
    -0.15,
    -0.61,
    -2.45,
    -0.03,
    0.007,
    13,
    52
  );
  const center_drop_cordGeom = new THREE.TubeGeometry(
    center_drop_cordCurve,
    64,
    0.011,
    7,
    false
  );
  const center_drop_cord = new THREE.Mesh(
    center_drop_cordGeom,
    ropeMat
  );
  center_drop_cord.name = "center_drop_cord";
  chime_assembly.add(center_drop_cord);

  const right_drop_cordCurve = makeTwistCurve(
    0.67,
    -0.57,
    -1.34,
    0.1,
    0.006,
    6,
    24
  );
  const right_drop_cordGeom = new THREE.TubeGeometry(
    right_drop_cordCurve,
    32,
    0.009,
    6,
    false
  );
  const right_drop_cord = new THREE.Mesh(
    right_drop_cordGeom,
    ropeDarkMat
  );
  right_drop_cord.name = "right_drop_cord";
  chime_assembly.add(right_drop_cord);

  const central_bead_group = new THREE.Group();
  central_bead_group.name = "central_bead_group";
  central_bead_group.position.set(-0.15, 0, -0.03);
  chime_assembly.add(central_bead_group);

  const central_bead_capGeom = new THREE.CylinderGeometry(
    0.035,
    0.05,
    0.07,
    12
  );
  const central_bead_cap = new THREE.Mesh(
    central_bead_capGeom,
    ropeDarkMat
  );
  central_bead_cap.name = "central_bead_cap";
  central_bead_cap.position.y = -0.64;
  central_bead_group.add(central_bead_cap);

  const central_bead_spacerGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.08,
    12
  );
  const central_bead_spacer = new THREE.Mesh(
    central_bead_spacerGeom,
    brassMat
  );
  central_bead_spacer.name = "central_bead_spacer";
  central_bead_spacer.position.y = -0.72;
  central_bead_group.add(central_bead_spacer);

  const central_red_beadGeom = new THREE.SphereGeometry(
    0.09,
    20,
    12
  );
  const central_red_bead = new THREE.Mesh(
    central_red_beadGeom,
    redBeadMat
  );
  central_red_bead.name = "central_red_bead";
  central_red_bead.position.y = -0.84;
  central_red_bead.scale.set(0.85, 1.15, 0.85);
  central_bead_group.add(central_red_bead);

  const left_end_ringGeom = new THREE.TorusGeometry(
    0.075,
    0.014,
    8,
    28
  );
  const left_end_ring = new THREE.Mesh(left_end_ringGeom, brassMat);
  left_end_ring.name = "left_end_ring";
  left_end_ring.position.set(-0.62, -1.58, 0.08);
  chime_assembly.add(left_end_ring);

  const left_ring_centerGeom = new THREE.CircleGeometry(0.058, 24);
  const left_ring_center = new THREE.Mesh(
    left_ring_centerGeom,
    creamFabricMat
  );
  left_ring_center.name = "left_ring_center";
  left_ring_center.position.set(-0.62, -1.58, 0.081);
  chime_assembly.add(left_ring_center);

  const left_tassel_capGeom = new THREE.CylinderGeometry(
    0.055,
    0.075,
    0.18,
    16
  );
  const left_tassel_cap = new THREE.Mesh(
    left_tassel_capGeom,
    ropeMat
  );
  left_tassel_cap.name = "left_tassel_cap";
  left_tassel_cap.position.set(-0.62, -1.79, 0.08);
  chime_assembly.add(left_tassel_cap);

  const left_tassel_bundleGeom = new THREE.CylinderGeometry(
    0.055,
    0.105,
    0.4,
    16
  );
  const left_tassel_bundle = new THREE.Mesh(
    left_tassel_bundleGeom,
    ropeMat
  );
  left_tassel_bundle.name = "left_tassel_bundle";
  left_tassel_bundle.position.set(-0.62, -2.1, 0.08);
  chime_assembly.add(left_tassel_bundle);

  const left_tassel_strandsGeom = new THREE.CylinderGeometry(
    0.005,
    0.008,
    1,
    6
  );
  const left_tassel_strands = new THREE.InstancedMesh(
    left_tassel_strandsGeom,
    ropeMat,
    12
  );
  left_tassel_strands.name = "left_tassel_strands";

  const leftStrandDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const spread = 0.07 + (i % 3) * 0.012;
    const start = new THREE.Vector3(
      -0.62 + Math.cos(angle) * 0.025,
      -2.28,
      0.08 + Math.sin(angle) * 0.025
    );
    const end = new THREE.Vector3(
      -0.62 + Math.cos(angle) * spread,
      -2.43 - (i % 2) * 0.025,
      0.08 + Math.sin(angle) * spread
    );
    const direction = end.clone().sub(start);
    const length = direction.length();

    leftStrandDummy.position.copy(start).add(end).multiplyScalar(0.5);
    leftStrandDummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    leftStrandDummy.scale.set(1, length, 1);
    leftStrandDummy.updateMatrix();
    left_tassel_strands.setMatrixAt(i, leftStrandDummy.matrix);
  }
  left_tassel_strands.instanceMatrix.needsUpdate = true;
  chime_assembly.add(left_tassel_strands);

  const right_end_ringGeom = new THREE.TorusGeometry(
    0.075,
    0.014,
    8,
    28
  );
  const right_end_ring = new THREE.Mesh(right_end_ringGeom, brassMat);
  right_end_ring.name = "right_end_ring";
  right_end_ring.position.set(0.67, -1.42, 0.1);
  chime_assembly.add(right_end_ring);

  const right_pendant = new THREE.Group();
  right_pendant.name = "right_pendant";
  right_pendant.position.set(0.67, -1.48, 0.1);
  right_pendant.rotation.z = -0.08;
  chime_assembly.add(right_pendant);

  const right_pendant_bodyGeom = new THREE.CylinderGeometry(
    0.09,
    0.145,
    0.38,
    20
  );
  const right_pendant_body = new THREE.Mesh(
    right_pendant_bodyGeom,
    creamFabricMat
  );
  right_pendant_body.name = "right_pendant_body";
  right_pendant_body.position.y = -0.22;
  right_pendant.add(right_pendant_body);

  const right_pendant_capGeom = new THREE.CylinderGeometry(
    0.07,
    0.1,
    0.1,
    16
  );
  const right_pendant_cap = new THREE.Mesh(
    right_pendant_capGeom,
    ropeMat
  );
  right_pendant_cap.name = "right_pendant_cap";
  right_pendant_cap.position.y = -0.015;
  right_pendant.add(right_pendant_cap);

  const right_pendant_bandGeom = new THREE.TorusGeometry(
    0.105,
    0.012,
    7,
    28
  );
  const right_pendant_band = new THREE.Mesh(
    right_pendant_bandGeom,
    ropeDarkMat
  );
  right_pendant_band.name = "right_pendant_band";
  right_pendant_band.rotation.x = Math.PI / 2;
  right_pendant_band.position.y = -0.08;
  right_pendant.add(right_pendant_band);

  const right_pendant_medallionGeom = new THREE.CircleGeometry(
    0.105,
    28
  );
  const right_pendant_medallion = new THREE.Mesh(
    right_pendant_medallionGeom,
    navyFabricMat
  );
  right_pendant_medallion.name = "right_pendant_medallion";
  right_pendant_medallion.position.set(0, -0.24, 0.143);
  right_pendant.add(right_pendant_medallion);

  const right_pendant_medallion_ringGeom =
    new THREE.TorusGeometry(0.105, 0.012, 7, 28);
  const right_pendant_medallion_ring = new THREE.Mesh(
    right_pendant_medallion_ringGeom,
    embroideryMat
  );
  right_pendant_medallion_ring.name =
    "right_pendant_medallion_ring";
  right_pendant_medallion_ring.position.set(
    0,
    -0.24,
    0.15
  );
  right_pendant.add(right_pendant_medallion_ring);

  const right_pendant_emblemGeom = new THREE.CircleGeometry(
    0.035,
    20
  );
  const right_pendant_emblem = new THREE.Mesh(
    right_pendant_emblemGeom,
    embroideryMat
  );
  right_pendant_emblem.name = "right_pendant_emblem";
  right_pendant_emblem.position.set(0, -0.24, 0.153);
  right_pendant.add(right_pendant_emblem);

  const right_pendant_tasselsGeom = new THREE.CylinderGeometry(
    0.005,
    0.008,
    1,
    6
  );
  const right_pendant_tassels = new THREE.InstancedMesh(
    right_pendant_tasselsGeom,
    ropeMat,
    10
  );
  right_pendant_tassels.name = "right_pendant_tassels";

  const rightTasselDummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const spread = 0.09 + (i % 2) * 0.02;
    const start = new THREE.Vector3(
      Math.cos(angle) * 0.03,
      -0.4,
      Math.sin(angle) * 0.03
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * spread,
      -0.57 - (i % 3) * 0.012,
      Math.sin(angle) * spread
    );
    const direction = end.clone().sub(start);
    const length = direction.length();

    rightTasselDummy.position
      .copy(start)
      .add(end)
      .multiplyScalar(0.5);
    rightTasselDummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    rightTasselDummy.scale.set(1, length, 1);
    rightTasselDummy.updateMatrix();
    right_pendant_tassels.setMatrixAt(i, rightTasselDummy.matrix);
  }
  right_pendant_tassels.instanceMatrix.needsUpdate = true;
  right_pendant.add(right_pendant_tassels);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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
}