export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "butterfly_greenhouse";

  const width = 2.4;
  const length = 3.0;
  const half_width = width / 2;
  const half_length = length / 2;
  const wall_height = 1.35;
  const ridge_height = 2.08;
  const roof_rise = ridge_height - wall_height;
  const roof_angle = Math.atan2(roof_rise, half_width);
  const roof_slope_length = Math.sqrt(half_width * half_width + roof_rise * roof_rise);
  const frame_thickness = 0.075;

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x4b5153,
    metalness: 0.6,
    roughness: 0.5
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfe5df,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const sky_paneMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8edf0,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lavender_paneMat = new THREE.MeshPhysicalMaterial({
    color: 0xded6e8,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const warm_paneMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0dfc8,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const mint_paneMat = new THREE.MeshPhysicalMaterial({
    color: 0xcde5d6,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const orange_printMat = new THREE.MeshStandardMaterial({
    color: 0xe87825,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const yellow_printMat = new THREE.MeshStandardMaterial({
    color: 0xe6b72d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const red_printMat = new THREE.MeshStandardMaterial({
    color: 0xc94232,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const blue_printMat = new THREE.MeshStandardMaterial({
    color: 0x258fc8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const pink_printMat = new THREE.MeshStandardMaterial({
    color: 0xd95f91,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const purple_printMat = new THREE.MeshStandardMaterial({
    color: 0x9164b7,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const green_printMat = new THREE.MeshStandardMaterial({
    color: 0x3f8b54,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const dark_green_printMat = new THREE.MeshStandardMaterial({
    color: 0x275f45,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const dark_printMat = new THREE.MeshStandardMaterial({
    color: 0x25232d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const white_printMat = new THREE.MeshStandardMaterial({
    color: 0xf2eee0,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const unit_boxGeom = new THREE.BoxGeometry(1, 1, 1);

  function addBox(name, material, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(unit_boxGeom, material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    root.add(mesh);
    return mesh;
  }

  function addBeamBetween(name, start, end, thickness, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const beam_length = direction.length();
    const beam = new THREE.Mesh(unit_boxGeom, material);
    beam.name = name;
    beam.position.copy(start).add(end).multiplyScalar(0.5);
    beam.scale.set(thickness, beam_length, thickness);
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    root.add(beam);
    return beam;
  }

  function createPanel(name, points, material) {
    const positions = [];
    for (const point of points) {
      positions.push(point.x, point.y, point.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    if (points.length === 4) {
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
    } else {
      geometry.setIndex([0, 1, 2]);
    }
    geometry.computeVertexNormals();
    const panel = new THREE.Mesh(geometry, material);
    panel.name = name;
    root.add(panel);
    return panel;
  }

  const front_base_rail = addBox(
    "front_base_rail",
    frameMat,
    0,
    0.07,
    half_length,
    width + 0.12,
    0.14,
    0.12
  );
  const rear_base_rail = addBox(
    "rear_base_rail",
    frameMat,
    0,
    0.07,
    -half_length,
    width + 0.12,
    0.14,
    0.12
  );
  const left_base_rail = addBox(
    "left_base_rail",
    frameMat,
    -half_width,
    0.07,
    0,
    0.12,
    0.14,
    length
  );
  const right_base_rail = addBox(
    "right_base_rail",
    frameMat,
    half_width,
    0.07,
    0,
    0.12,
    0.14,
    length
  );

  const front_eave_beam = addBox(
    "front_eave_beam",
    frameMat,
    0,
    wall_height,
    half_length,
    width + 0.08,
    0.09,
    0.09
  );
  const rear_eave_beam = addBox(
    "rear_eave_beam",
    frameMat,
    0,
    wall_height,
    -half_length,
    width + 0.08,
    0.09,
    0.09
  );
  const ridge_beam = addBox(
    "ridge_beam",
    frameMat,
    0,
    ridge_height,
    0,
    0.09,
    0.09,
    length + 0.12
  );

  const corner_postGeom = new THREE.BoxGeometry(0.09, wall_height, 0.09);
  const corner_posts = new THREE.InstancedMesh(corner_postGeom, frameMat, 4);
  corner_posts.name = "corner_posts";
  const corner_dummy = new THREE.Object3D();
  const corner_positions = [
    [-half_width, wall_height / 2, half_length],
    [half_width, wall_height / 2, half_length],
    [-half_width, wall_height / 2, -half_length],
    [half_width, wall_height / 2, -half_length]
  ];
  for (let i = 0; i < corner_positions.length; i++) {
    corner_dummy.position.set(
      corner_positions[i][0],
      corner_positions[i][1],
      corner_positions[i][2]
    );
    corner_dummy.updateMatrix();
    corner_posts.setMatrixAt(i, corner_dummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const front_mullion_z = half_length + 0.012;
  const front_wall_mullionGeom = new THREE.BoxGeometry(
    0.07,
    wall_height - 0.1,
    0.075
  );
  const front_wall_mullions = new THREE.InstancedMesh(
    front_wall_mullionGeom,
    frameMat,
    3
  );
  front_wall_mullions.name = "front_wall_mullions";
  const front_mullion_dummy = new THREE.Object3D();
  const front_mullion_x = [-0.4, 0.4, 1.05];
  for (let i = 0; i < front_mullion_x.length; i++) {
    front_mullion_dummy.position.set(
      front_mullion_x[i],
      wall_height / 2 + 0.01,
      front_mullion_z
    );
    front_mullion_dummy.updateMatrix();
    front_wall_mullions.setMatrixAt(i, front_mullion_dummy.matrix);
  }
  front_wall_mullions.instanceMatrix.needsUpdate = true;
  root.add(front_wall_mullions);

  const rear_wall_mullions = new THREE.InstancedMesh(
    front_wall_mullionGeom,
    frameMat,
    3
  );
  rear_wall_mullions.name = "rear_wall_mullions";
  const rear_mullion_dummy = new THREE.Object3D();
  for (let i = 0; i < front_mullion_x.length; i++) {
    rear_mullion_dummy.position.set(
      front_mullion_x[i],
      wall_height / 2 + 0.01,
      -half_length - 0.012
    );
    rear_mullion_dummy.updateMatrix();
    rear_wall_mullions.setMatrixAt(i, rear_mullion_dummy.matrix);
  }
  rear_wall_mullions.instanceMatrix.needsUpdate = true;
  root.add(rear_wall_mullions);

  const side_mullionGeom = new THREE.BoxGeometry(
    0.075,
    wall_height - 0.1,
    0.07
  );
  const side_wall_mullions = new THREE.InstancedMesh(
    side_mullionGeom,
    frameMat,
    6
  );
  side_wall_mullions.name = "side_wall_mullions";
  const side_mullion_dummy = new THREE.Object3D();
  const side_mullion_z = [-0.65, 0.1, 0.85];
  let side_mullion_index = 0;
  for (const side of [-1, 1]) {
    for (const z of side_mullion_z) {
      side_mullion_dummy.position.set(
        side * (half_width + 0.012),
        wall_height / 2 + 0.01,
        z
      );
      side_mullion_dummy.updateMatrix();
      side_wall_mullions.setMatrixAt(
        side_mullion_index++,
        side_mullion_dummy.matrix
      );
    }
  }
  side_wall_mullions.instanceMatrix.needsUpdate = true;
  root.add(side_wall_mullions);

  const gable_mullionGeom = new THREE.BoxGeometry(0.07, 1, 0.075);

  function addGableMullion(name, x, z) {
    const top_y =
      ridge_height - Math.abs(x) / half_width * roof_rise;
    const mesh = new THREE.Mesh(gable_mullionGeom, frameMat);
    mesh.name = name;
    mesh.position.set(
      x,
      wall_height + (top_y - wall_height) / 2,
      z
    );
    mesh.scale.y = top_y - wall_height;
    root.add(mesh);
    return mesh;
  }

  const front_left_gable_mullion = addGableMullion(
    "front_left_gable_mullion",
    -0.62,
    half_length + 0.012
  );
  const front_right_gable_mullion = addGableMullion(
    "front_right_gable_mullion",
    0.62,
    half_length + 0.012
  );
  const rear_left_gable_mullion = addGableMullion(
    "rear_left_gable_mullion",
    -0.62,
    -half_length - 0.012
  );
  const rear_right_gable_mullion = addGableMullion(
    "rear_right_gable_mullion",
    0.62,
    -half_length - 0.012
  );

  const roof_raftersGeom = new THREE.BoxGeometry(
    roof_slope_length + 0.04,
    0.075,
    0.075
  );
  const roof_rafters = new THREE.InstancedMesh(
    roof_raftersGeom,
    frameMat,
    10
  );
  roof_rafters.name = "roof_rafters";
  const rafter_dummy = new THREE.Object3D();
  const rafter_z = [-1.5, -0.75, 0, 0.75, 1.5];
  let rafter_index = 0;
  for (const z of rafter_z) {
    for (const side of [-1, 1]) {
      rafter_dummy.position.set(
        side * half_width / 2,
        wall_height + roof_rise / 2,
        z
      );
      rafter_dummy.rotation.set(0, 0, -side * roof_angle);
      rafter_dummy.scale.set(1, 1, 1);
      rafter_dummy.updateMatrix();
      roof_rafters.setMatrixAt(rafter_index++, rafter_dummy.matrix);
    }
  }
  roof_rafters.instanceMatrix.needsUpdate = true;
  root.add(roof_rafters);

  const front_left_roof_glass = createPanel(
    "front_left_roof_glass",
    [
      new THREE.Vector3(-half_width, wall_height, half_length - 0.025),
      new THREE.Vector3(0, ridge_height, half_length - 0.025),
      new THREE.Vector3(0, ridge_height, half_length - 0.58)
    ],
    glassMat
  );
  const front_right_roof_glass = createPanel(
    "front_right_roof_glass",
    [
      new THREE.Vector3(0, ridge_height, half_length - 0.025),
      new THREE.Vector3(half_width, wall_height, half_length - 0.025),
      new THREE.Vector3(half_width, wall_height, half_length - 0.58)
    ],
    glassMat
  );
  const front_center_roof_glass = createPanel(
    "front_center_roof_glass",
    [
      new THREE.Vector3(0, ridge_height, half_length - 0.58),
      new THREE.Vector3(half_width, wall_height, half_length - 0.58),
      new THREE.Vector3(half_width, wall_height, 0.2)
    ],
    glassMat
  );
  const middle_left_roof_glass = createPanel(
    "middle_left_roof_glass",
    [
      new THREE.Vector3(-half_width, wall_height, half_length - 0.58),
      new THREE.Vector3(0, ridge_height, half_length - 0.58),
      new THREE.Vector3(0, ridge_height, 0.2)
    ],
    glassMat
  );
  const middle_right_roof_glass = createPanel(
    "middle_right_roof_glass",
    [
      new THREE.Vector3(0, ridge_height, 0.2),
      new THREE.Vector3(half_width, wall_height, 0.2),
      new THREE.Vector3(half_width, wall_height, -0.72)
    ],
    glassMat
  );
  const rear_left_roof_glass = createPanel(
    "rear_left_roof_glass",
    [
      new THREE.Vector3(-half_width, wall_height, 0.2),
      new THREE.Vector3(0, ridge_height, 0.2),
      new THREE.Vector3(0, ridge_height, -0.72)
    ],
    glassMat
  );
  const rear_right_roof_glass = createPanel(
    "rear_right_roof_glass",
    [
      new THREE.Vector3(0, ridge_height, -0.72),
      new THREE.Vector3(half_width, wall_height, -0.72),
      new THREE.Vector3(half_width, wall_height, -half_length + 0.025)
    ],
    glassMat
  );
  const rear_left_end_roof_glass = createPanel(
    "rear_left_end_roof_glass",
    [
      new THREE.Vector3(-half_width, wall_height, -0.72),
      new THREE.Vector3(0, ridge_height, -0.72),
      new THREE.Vector3(0, ridge_height, -half_length + 0.025)
    ],
    glassMat
  );

  const door_center_x = -0.35;
  const door_width = 0.72;
  const door_height = 1.22;
  const door_bottom = 0.12;
  const door_top = door_bottom + door_height;
  const front_glass_z = half_length + 0.008;

  const left_wall_front_glass = createPanel(
    "left_wall_front_glass",
    [
      new THREE.Vector3(-1.16, 0.14, front_glass_z),
      new THREE.Vector3(door_center_x - door_width / 2 - 0.04, 0.14, front_glass_z),
      new THREE.Vector3(door_center_x - door_width / 2 - 0.04, 1.31, front_glass_z),
      new THREE.Vector3(-1.16, 1.31, front_glass_z)
    ],
    sky_paneMat
  );
  const right_wall_front_glass = createPanel(
    "right_wall_front_glass",
    [
      new THREE.Vector3(door_center_x + door_width / 2 + 0.04, 0.14, front_glass_z),
      new THREE.Vector3(1.16, 0.14, front_glass_z),
      new THREE.Vector3(1.16, 1.31, front_glass_z),
      new THREE.Vector3(door_center_x + door_width / 2 + 0.04, 1.31, front_glass_z)
    ],
    lavender_paneMat
  );
  const left_gable_glass = createPanel(
    "left_gable_glass",
    [
      new THREE.Vector3(-1.16, 1.36, front_glass_z),
      new THREE.Vector3(door_center_x - door_width / 2 - 0.04, 1.36, front_glass_z),
      new THREE.Vector3(-0.72, 1.76, front_glass_z)
    ],
    mint_paneMat
  );
  const right_gable_glass = createPanel(
    "right_gable_glass",
    [
      new THREE.Vector3(door_center_x + door_width / 2 + 0.04, 1.36, front_glass_z),
      new THREE.Vector3(1.16, 1.36, front_glass_z),
      new THREE.Vector3(0.72, 1.76, front_glass_z)
    ],
    sky_paneMat
  );

  const right_front_glass = createPanel(
    "right_front_glass",
    [
      new THREE.Vector3(half_width + 0.008, 0.14, 0.91),
      new THREE.Vector3(half_width + 0.008, 0.14, 1.45),
      new THREE.Vector3(half_width + 0.008, 1.31, 1.45),
      new THREE.Vector3(half_width + 0.008, 1.31, 0.91)
    ],
    sky_paneMat
  );
  const right_middle_glass = createPanel(
    "right_middle_glass",
    [
      new THREE.Vector3(half_width + 0.008, 0.14, -0.61),
      new THREE.Vector3(half_width + 0.008, 0.14, 0.85),
      new THREE.Vector3(half_width + 0.008, 1.31, 0.85),
      new THREE.Vector3(half_width + 0.008, 1.31, -0.61)
    ],
    lavender_paneMat
  );
  const right_rear_glass = createPanel(
    "right_rear_glass",
    [
      new THREE.Vector3(half_width + 0.008, 0.14, -1.45),
      new THREE.Vector3(half_width + 0.008, 0.14, -0.67),
      new THREE.Vector3(half_width + 0.008, 1.31, -0.67),
      new THREE.Vector3(half_width + 0.008, 1.31, -1.45)
    ],
    warm_paneMat
  );

  const left_front_glass = createPanel(
    "left_front_glass",
    [
      new THREE.Vector3(-half_width - 0.008, 0.14, 0.91),
      new THREE.Vector3(-half_width - 0.008, 0.14, 1.45),
      new THREE.Vector3(-half_width - 0.008, 1.31, 1.45),
      new THREE.Vector3(-half_width - 0.008, 1.31, 0.91)
    ],
    mint_paneMat
  );
  const left_middle_glass = createPanel(
    "left_middle_glass",
    [
      new THREE.Vector3(-half_width - 0.008, 0.14, -0.61),
      new THREE.Vector3(-half_width - 0.008, 0.14, 0.85),
      new THREE.Vector3(-half_width - 0.008, 1.31, 0.85),
      new THREE.Vector3(-half_width - 0.008, 1.31, -0.61)
    ],
    sky_paneMat
  );
  const left_rear_glass = createPanel(
    "left_rear_glass",
    [
      new THREE.Vector3(-half_width - 0.008, 0.14, -1.45),
      new THREE.Vector3(-half_width - 0.008, 0.14, -0.67),
      new THREE.Vector3(-half_width - 0.008, 1.31, -0.67),
      new THREE.Vector3(-half_width - 0.008, 1.31, -1.45)
    ],
    lavender_paneMat
  );

  const rear_wall_glass = createPanel(
    "rear_wall_glass",
    [
      new THREE.Vector3(-1.16, 0.14, -half_length - 0.008),
      new THREE.Vector3(1.16, 0.14, -half_length - 0.008),
      new THREE.Vector3(1.16, 1.31, -half_length - 0.008),
      new THREE.Vector3(-1.16, 1.31, -half_length - 0.008)
    ],
    sky_paneMat
  );

  const door_group = new THREE.Group();
  door_group.name = "front_door";
  door_group.position.set(door_center_x, 0, half_length + 0.035);
  root.add(door_group);

  const door_glassGeom = new THREE.BoxGeometry(
    door_width - 0.1,
    door_height - 0.1,
    0.014
  );
  const door_glass = new THREE.Mesh(door_glassGeom, mint_paneMat);
  door_glass.name = "door_glass";
  door_glass.position.set(0, door_bottom + door_height / 2, 0);
  door_group.add(door_glass);

  const door_left_jamb = addBox(
    "door_left_jamb",
    frameMat,
    -door_width / 2,
    door_bottom + door_height / 2,
    0.025,
    0.075,
    door_height + 0.08,
    0.075
  );
  door_group.add(door_left_jamb);

  const door_right_jamb = addBox(
    "door_right_jamb",
    frameMat,
    door_width / 2,
    door_bottom + door_height / 2,
    0.025,
    0.075,
    door_height + 0.08,
    0.075
  );
  door_group.add(door_right_jamb);

  const door_top_rail = addBox(
    "door_top_rail",
    frameMat,
    0,
    door_top + 0.025,
    0.025,
    door_width + 0.08,
    0.075,
    0.075
  );
  door_group.add(door_top_rail);

  const door_bottom_rail = addBox(
    "door_bottom_rail",
    frameMat,
    0,
    door_bottom - 0.025,
    0.025,
    door_width + 0.08,
    0.075,
    0.075
  );
  door_group.add(door_bottom_rail);

  const door_handleGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.19,
    12
  );
  const door_handle = new THREE.Mesh(door_handleGeom, handleMat);
  door_handle.name = "door_handle";
  door_handle.position.set(0.25, 0.72, 0.095);
  door_group.add(door_handle);

  const door_handle_mountGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.055,
    12
  );
  const door_handle_mount = new THREE.Mesh(
    door_handle_mountGeom,
    handleMat
  );
  door_handle_mount.name = "door_handle_mount";
  door_handle_mount.rotation.x = Math.PI / 2;
  door_handle_mount.position.set(0.25, 0.72, 0.07);
  door_group.add(door_handle_mount);

  const door_hingeGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.045,
    12
  );
  const door_hinges = new THREE.InstancedMesh(
    door_hingeGeom,
    frameMat,
    3
  );
  door_hinges.name = "door_hinges";
  const hinge_dummy = new THREE.Object3D();
  const hinge_y = [0.34, 0.73, 1.12];
  for (let i = 0; i < hinge_y.length; i++) {
    hinge_dummy.position.set(-door_width / 2 - 0.045, hinge_y[i], 0.07);
    hinge_dummy.updateMatrix();
    door_hinges.setMatrixAt(i, hinge_dummy.matrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  door_group.add(door_hinges);

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0, 0);
  leaf_shape.bezierCurveTo(-0.12, 0.18, -0.16, 0.68, 0, 1);
  leaf_shape.bezierCurveTo(0.16, 0.68, 0.12, 0.18, 0, 0);
  const leafGeom = new THREE.ShapeGeometry(leaf_shape);

  const grass_shape = new THREE.Shape();
  grass_shape.moveTo(-0.08, 0);
  grass_shape.lineTo(0, 1);
  grass_shape.lineTo(0.08, 0);
  grass_shape.closePath();
  const grassGeom = new THREE.ShapeGeometry(grass_shape);

  const butterfly_wing_shape = new THREE.Shape();
  butterfly_wing_shape.moveTo(0.025, 0.025);
  butterfly_wing_shape.bezierCurveTo(
    0.12,
    0.08,
    0.29,
    0.34,
    0.25,
    0.57
  );
  butterfly_wing_shape.bezierCurveTo(
    0.22,
    0.78,
    0.06,
    0.72,
    0.015,
    0.48
  );
  butterfly_wing_shape.bezierCurveTo(
    -0.01,
    0.28,
    0.01,
    0.1,
    0.025,
    0.025
  );
  butterfly_wing_shape.closePath();
  const butterfly_wingGeom = new THREE.ShapeGeometry(
    butterfly_wing_shape
  );

  const butterfly_spotGeom = new THREE.CircleGeometry(0.035, 12);
  const butterfly_bodyGeom = new THREE.BoxGeometry(0.045, 0.38, 0.012);

  function createButterfly(name, material, spots_material) {
    const group = new THREE.Group();
    group.name = name;

    const right_wing = new THREE.Mesh(butterfly_wingGeom, material);
    right_wing.name = name + "_right_wing";
    right_wing.position.z = 0.004;
    group.add(right_wing);

    const left_wing = new THREE.Mesh(butterfly_wingGeom, material);
    left_wing.name = name + "_left_wing";
    left_wing.scale.x = -1;
    left_wing.position.z = 0.004;
    group.add(left_wing);

    const body = new THREE.Mesh(butterfly_bodyGeom, dark_printMat);
    body.name = name + "_body";
    body.position.set(0, 0.22, 0.018);
    group.add(body);

    const spots = new THREE.InstancedMesh(
      butterfly_spotGeom,
      spots_material,
      6
    );
    spots.name = name + "_wing_spots";
    const spot_dummy = new THREE.Object3D();
    const spot_data = [
      [0.18, 0.56, 1.0],
      [0.1, 0.47, 0.72],
      [0.055, 0.34, 0.58]
    ];
    let spot_index = 0;
    for (const side of [-1, 1]) {
      for (const data of spot_data) {
        spot_dummy.position.set(side * data[0], data[1], 0.022);
        spot_dummy.scale.set(data[2], data[2], 1);
        spot_dummy.updateMatrix();
        spots.setMatrixAt(spot_index++, spot_dummy.matrix);
      }
    }
    spots.instanceMatrix.needsUpdate = true;
    group.add(spots);

    return group;
  }

  function addButterfly(
    name,
    material,
    spots_material,
    x,
    y,
    z,
    scale,
    rotation_y,
    rotation_z
  ) {
    const butterfly = createButterfly(name, material, spots_material);
    butterfly.position.set(x, y, z);
    butterfly.rotation.set(0, rotation_y, rotation_z);
    butterfly.scale.setScalar(scale);
    root.add(butterfly);
    return butterfly;
  }

  function addLeaf(
    name,
    material,
    x,
    y,
    z,
    scale_x,
    scale_y,
    rotation_z,
    rotation_y
  ) {
    const leaf = new THREE.Mesh(leafGeom, material);
    leaf.name = name;
    leaf.position.set(x, y, z);
    leaf.scale.set(scale_x, scale_y, 1);
    leaf.rotation.set(0, rotation_y, rotation_z);
    root.add(leaf);
    return leaf;
  }

  function addGrass(name, material, x, y, z, scale_x, scale_y, rotation_z) {
    const grass = new THREE.Mesh(grassGeom, material);
    grass.name = name;
    grass.position.set(x, y, z);
    grass.scale.set(scale_x, scale_y, 1);
    grass.rotation.set(0, 0, rotation_z);
    root.add(grass);
    return grass;
  }

  function addFlower(name, petal_material, center_material, x, y, z) {
    const flower = new THREE.Group();
    flower.name = name;
    flower.position.set(x, y, z);

    const petalGeom = new THREE.CircleGeometry(0.055, 14);
    const petals = new THREE.InstancedMesh(petalGeom, petal_material, 5);
    petals.name = name + "_petals";
    const petal_dummy = new THREE.Object3D();
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      petal_dummy.position.set(
        Math.cos(angle) * 0.075,
        Math.sin(angle) * 0.075,
        0
      );
      petal_dummy.rotation.set(0, 0, angle - Math.PI / 2);
      petal_dummy.scale.set(0.65, 1.15, 1);
      petal_dummy.updateMatrix();
      petals.setMatrixAt(i, petal_dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    const center = new THREE.Mesh(
      new THREE.CircleGeometry(0.035, 14),
      center_material
    );
    center.name = name + "_center";
    center.position.z = 0.008;
    flower.add(center);

    root.add(flower);
    return flower;
  }

  const front_grass_cluster_1 = addGrass(
    "front_grass_cluster_1",
    dark_green_printMat,
    -1.08,
    0.14,
    half_length + 0.023,
    1.3,
    0.42,
    -0.18
  );
  const front_grass_cluster_2 = addGrass(
    "front_grass_cluster_2",
    green_printMat,
    -0.94,
    0.14,
    half_length + 0.024,
    1.1,
    0.55,
    0.12
  );
  const front_grass_cluster_3 = addGrass(
    "front_grass_cluster_3",
    dark_green_printMat,
    0.78,
    0.14,
    half_length + 0.023,
    1.2,
    0.48,
    -0.12
  );
  const front_grass_cluster_4 = addGrass(
    "front_grass_cluster_4",
    green_printMat,
    0.96,
    0.14,
    half_length + 0.024,
    1.1,
    0.62,
    0.16
  );
  const front_grass_cluster_5 = addGrass(
    "front_grass_cluster_5",
    dark_green_printMat,
    1.12,
    0.14,
    half_length + 0.025,
    0.9,
    0.4,
    -0.08
  );

  const front_leaf_1 = addLeaf(
    "front_leaf_1",
    green_printMat,
    -1.08,
    0.16,
    half_length + 0.027,
    0.7,
    0.48,
    -0.55,
    0
  );
  const front_leaf_2 = addLeaf(
    "front_leaf_2",
    dark_green_printMat,
    -0.98,
    0.16,
    half_length + 0.028,
    0.62,
    0.62,
    -0.15,
    0
  );
  const front_leaf_3 = addLeaf(
    "front_leaf_3",
    green_printMat,
    0.82,
    0.16,
    half_length + 0.027,
    0.68,
    0.55,
    0.42,
    0
  );
  const front_leaf_4 = addLeaf(
    "front_leaf_4",
    dark_green_printMat,
    0.98,
    0.16,
    half_length + 0.028,
    0.62,
    0.68,
    0.12,
    0
  );

  const front_pink_flower = addFlower(
    "front_pink_flower",
    pink_printMat,
    yellow_printMat,
    -1.0,
    0.46,
    half_length + 0.031
  );
  const front_purple_flower = addFlower(
    "front_purple_flower",
    purple_printMat,
    yellow_printMat,
    0.78,
    0.36,
    half_length + 0.031
  );
  const front_yellow_flower = addFlower(
    "front_yellow_flower",
    yellow_printMat,
    orange_printMat,
    1.06,
    0.57,
    half_length + 0.031
  );

  const front_orange_butterfly = addButterfly(
    "front_orange_butterfly",
    orange_printMat,
    white_printMat,
    0.72,
    0.65,
    half_length + 0.038,
    0.78,
    0,
    -0.12
  );
  const front_blue_butterfly = addButterfly(
    "front_blue_butterfly",
    blue_printMat,
    dark_printMat,
    0.22,
    0.62,
    half_length + 0.039,
    0.68,
    0,
    0.18
  );
  const front_red_butterfly = addButterfly(
    "front_red_butterfly",
    red_printMat,
    dark_printMat,
    1.02,
    1.02,
    half_length + 0.039,
    0.48,
    0,
    -0.2
  );
  const front_small_yellow_butterfly = addButterfly(
    "front_small_yellow_butterfly",
    yellow_printMat,
    dark_printMat,
    0.55,
    0.31,
    half_length + 0.04,
    0.3,
    0,
    0.1
  );
  const left_panel_blue_butterfly = addButterfly(
    "left_panel_blue_butterfly",
    blue_printMat,
    dark_printMat,
    -1.04,
    0.76,
    half_length + 0.039,
    0.43,
    0,
    0.18
  );
  const left_panel_orange_butterfly = addButterfly(
    "left_panel_orange_butterfly",
    orange_printMat,
    dark_printMat,
    -1.0,
    0.38,
    half_length + 0.04,
    0.34,
    0,
    -0.16
  );
  const right_panel_pink_butterfly = addButterfly(
    "right_panel_pink_butterfly",
    pink_printMat,
    dark_printMat,
    0.98,
    0.72,
    half_length + 0.04,
    0.4,
    0,
    0.12
  );

  const door_orange_butterfly = addButterfly(
    "door_orange_butterfly",
    orange_printMat,
    white_printMat,
    -0.08,
    0.54,
    0.055,
    0.58,
    0,
    -0.1
  );
  const door_red_butterfly = addButterfly(
    "door_red_butterfly",
    red_printMat,
    dark_printMat,
    0.16,
    0.91,
    0.056,
    0.34,
    0,
    0.22
  );
  const door_small_butterfly = addButterfly(
    "door_small_butterfly",
    yellow_printMat,
    dark_printMat,
    -0.17,
    0.31,
    0.056,
    0.24,
    0,
    -0.18
  );
  const door_leaf = addLeaf(
    "door_leaf",
    green_printMat,
    -0.25,
    0.16,
    0.052,
    0.45,
    0.42,
    -0.2,
    0
  );

  const right_grass_cluster_1 = addGrass(
    "right_grass_cluster_1",
    dark_green_printMat,
    half_width + 0.023,
    0.14,
    1.25,
    1.1,
    0.5,
    -0.18
  );
  const right_grass_cluster_2 = addGrass(
    "right_grass_cluster_2",
    green_printMat,
    half_width + 0.024,
    0.14,
    0.3,
    1.2,
    0.58,
    0.12
  );
  const right_grass_cluster_3 = addGrass(
    "right_grass_cluster_3",
    dark_green_printMat,
    half_width + 0.023,
    0.14,
    -0.45,
    1.0,
    0.45,
    -0.1
  );
  const right_grass_cluster_4 = addGrass(
    "right_grass_cluster_4",
    green_printMat,
    half_width + 0.024,
    0.14,
    -1.25,
    1.1,
    0.56,
    0.16
  );

  const right_leaf_1 = addLeaf(
    "right_leaf_1",
    green_printMat,
    half_width + 0.028,
    0.16,
    1.08,
    0.65,
    0.56,
    -0.42,
    Math.PI / 2
  );
  const right_leaf_2 = addLeaf(
    "right_leaf_2",
    dark_green_printMat,
    half_width + 0.028,
    0.16,
    0.08,
    0.62,
    0.68,
    0.18,
    Math.PI / 2
  );
  const right_leaf_3 = addLeaf(
    "right_leaf_3",
    green_printMat,
    half_width + 0.028,
    0.16,
    -0.72,
    0.68,
    0.54,
    -0.3,
    Math.PI / 2
  );
  const right_leaf_4 = addLeaf(
    "right_leaf_4",
    dark_green_printMat,
    half_width + 0.028,
    0.16,
    -1.18,
    0.58,
    0.6,
    0.38,
    Math.PI / 2
  );

  const right_pink_flower = addFlower(
    "right_pink_flower",
    pink_printMat,
    yellow_printMat,
    half_width + 0.034,
    0.42,
    0.68
  );
  const right_purple_flower = addFlower(
    "right_purple_flower",
    purple_printMat,
    yellow_printMat,
    half_width + 0.034,
    0.34,
    -0.18
  );
  const right_yellow_flower = addFlower(
    "right_yellow_flower",
    yellow_printMat,
    orange_printMat,
    half_width + 0.034,
    0.58,
    -1.02
  );

  const right_large_orange_butterfly = addButterfly(
    "right_large_orange_butterfly",
    orange_printMat,
    white_printMat,
    half_width + 0.041,
    0.61,
    0.48,
    0.82,
    Math.PI / 2,
    -0.12
  );
  const right_yellow_butterfly = addButterfly(
    "right_yellow_butterfly",
    yellow_printMat,
    dark_printMat,
    half_width + 0.042,
    0.98,
    0.02,
    0.45,
    Math.PI / 2,
    0.18
  );
  const right_red_butterfly = addButterfly(
    "right_red_butterfly",
    red_printMat,
    dark_printMat,
    half_width + 0.042,
    0.72,
    -0.62,
    0.58,
    Math.PI / 2,
    -0.18
  );
  const right_pink_butterfly = addButterfly(
    "right_pink_butterfly",
    pink_printMat,
    dark_printMat,
    half_width + 0.042,
    0.91,
    -1.18,
    0.52,
    Math.PI / 2,
    0.12
  );
  const right_small_orange_butterfly = addButterfly(
    "right_small_orange_butterfly",
    orange_printMat,
    dark_printMat,
    half_width + 0.043,
    0.38,
    -0.28,
    0.3,
    Math.PI / 2,
    -0.1
  );

  const left_grass_cluster_1 = addGrass(
    "left_grass_cluster_1",
    dark_green_printMat,
    -half_width - 0.023,
    0.14,
    1.18,
    1.1,
    0.5,
    -0.14
  );
  const left_grass_cluster_2 = addGrass(
    "left_grass_cluster_2",
    green_printMat,
    -half_width - 0.024,
    0.14,
    0.12,
    1.2,
    0.58,
    0.12
  );
  const left_grass_cluster_3 = addGrass(
    "left_grass_cluster_3",
    dark_green_printMat,
    -half_width - 0.023,
    0.14,
    -0.72,
    1.0,
    0.48,
    -0.1
  );
  const left_grass_cluster_4 = addGrass(
    "left_grass_cluster_4",
    green_printMat,
    -half_width - 0.024,
    0.14,
    -1.25,
    1.1,
    0.55,
    0.16
  );

  const left_blue_butterfly = addButterfly(
    "left_blue_butterfly",
    blue_printMat,
    dark_printMat,
    -half_width - 0.041,
    0.7,
    0.65,
    0.58,
    -Math.PI / 2,
    0.12
  );
  const left_orange_butterfly = addButterfly(
    "left_orange_butterfly",
    orange_printMat,
    white_printMat,
    -half_width - 0.042,
    0.62,
    -0.2,
    0.72,
    -Math.PI / 2,
    -0.16
  );
  const left_pink_butterfly = addButterfly(
    "left_pink_butterfly",
    pink_printMat,
    dark_printMat,
    -half_width - 0.042,
    0.88,
    -1.08,
    0.48,
    -Math.PI / 2,
    0.18
  );
  const left_small_yellow_butterfly = addButterfly(
    "left_small_yellow_butterfly",
    yellow_printMat,
    dark_printMat,
    -half_width - 0.043,
    0.36,
    0.02,
    0.3,
    -Math.PI / 2,
    -0.1
  );

  const rear_grass_cluster_1 = addGrass(
    "rear_grass_cluster_1",
    dark_green_printMat,
    -0.9,
    0.14,
    -half_length - 0.024,
    1.1,
    0.5,
    -0.16
  );
  const rear_grass_cluster_2 = addGrass(
    "rear_grass_cluster_2",
    green_printMat,
    0,
    0.14,
    -half_length - 0.024,
    1.2,
    0.6,
    0.1
  );
  const rear_grass_cluster_3 = addGrass(
    "rear_grass_cluster_3",
    dark_green_printMat,
    0.9,
    0.14,
    -half_length - 0.024,
    1.1,
    0.52,
    0.16
  );
  const rear_orange_butterfly = addButterfly(
    "rear_orange_butterfly",
    orange_printMat,
    white_printMat,
    -0.55,
    0.68,
    -half_length - 0.038,
    0.7,
    Math.PI,
    -0.12
  );
  const rear_blue_butterfly = addButterfly(
    "rear_blue_butterfly",
    blue_printMat,
    dark_printMat,
    0.55,
    0.74,
    -half_length - 0.039,
    0.62,
    Math.PI,
    0.16
  );

  const roof_grass_1 = addGrass(
    "roof_grass_1",
    green_printMat,
    -0.65,
    1.47,
    1.36,
    0.72,
    0.28,
    -0.35
  );
  const roof_grass_2 = addGrass(
    "roof_grass_2",
    dark_green_printMat,
    0.68,
    1.47,
    0.52,
    0.7,
    0.3,
    0.35
  );
  const roof_grass_3 = addGrass(
    "roof_grass_3",
    green_printMat,
    -0.62,
    1.48,
    -0.42,
    0.68,
    0.26,
    -0.28
  );
  const roof_grass_4 = addGrass(
    "roof_grass_4",
    dark_green_printMat,
    0.66,
    1.48,
    -1.18,
    0.7,
    0.28,
    0.3
  );

  const roof_orange_butterfly = addButterfly(
    "roof_orange_butterfly",
    orange_printMat,
    white_printMat,
    -0.52,
    1.62,
    1.08,
    0.48,
    0,
    -0.16
  );
  const roof_yellow_butterfly = addButterfly(
    "roof_yellow_butterfly",
    yellow_printMat,
    dark_printMat,
    0.56,
    1.68,
    0.48,
    0.42,
    0,
    0.18
  );
  const roof_blue_butterfly = addButterfly(
    "roof_blue_butterfly",
    blue_printMat,
    dark_printMat,
    -0.58,
    1.66,
    -0.34,
    0.42,
    0,
    -0.12
  );
  const roof_pink_butterfly = addButterfly(
    "roof_pink_butterfly",
    pink_printMat,
    dark_printMat,
    0.52,
    1.63,
    -1.02,
    0.45,
    0,
    0.16
  );

  const front_left_gable_leaf = addLeaf(
    "front_left_gable_leaf",
    green_printMat,
    -0.92,
    1.43,
    half_length + 0.03,
    0.42,
    0.34,
    -0.25,
    0
  );
  const front_right_gable_leaf = addLeaf(
    "front_right_gable_leaf",
    dark_green_printMat,
    0.92,
    1.43,
    half_length + 0.03,
    0.42,
    0.34,
    0.25,
    0
  );
  const front_left_gable_butterfly = addButterfly(
    "front_left_gable_butterfly",
    orange_printMat,
    dark_printMat,
    -0.88,
    1.55,
    half_length + 0.038,
    0.28,
    0,
    -0.16
  );
  const front_right_gable_butterfly = addButterfly(
    "front_right_gable_butterfly",
    yellow_printMat,
    dark_printMat,
    0.88,
    1.57,
    half_length + 0.038,
    0.27,
    0,
    0.18
  );

  fitToUnitCube(THREE, root);
  return root;

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
}