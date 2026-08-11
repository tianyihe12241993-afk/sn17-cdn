export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornamental_red_vase";

  const red_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xc80b14,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const inner_red_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x8f060d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const white_ornamentMat = new THREE.MeshStandardMaterial({
    color: 0xf4f2ea,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const pedestal_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.42, 0.00),
    new THREE.Vector2(0.47, 0.015),
    new THREE.Vector2(0.50, 0.055),
    new THREE.Vector2(0.50, 0.105),
    new THREE.Vector2(0.47, 0.160),
    new THREE.Vector2(0.40, 0.215),
    new THREE.Vector2(0.35, 0.245),
    new THREE.Vector2(0.00, 0.245),
  ];
  const pedestal_footGeom = new THREE.LatheGeometry(pedestal_footProfile, 64);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeom, red_glazeMat);
  pedestal_foot.name = "pedestal_foot";
  root.add(pedestal_foot);

  const foot_lower_rimGeom = new THREE.TorusGeometry(0.465, 0.018, 12, 64);
  const foot_lower_rim = new THREE.Mesh(foot_lower_rimGeom, red_glazeMat);
  foot_lower_rim.name = "foot_lower_rim";
  foot_lower_rim.rotation.x = Math.PI / 2;
  foot_lower_rim.position.y = 0.026;
  root.add(foot_lower_rim);

  const foot_upper_collarGeom = new THREE.TorusGeometry(0.355, 0.024, 12, 64);
  const foot_upper_collar = new THREE.Mesh(foot_upper_collarGeom, red_glazeMat);
  foot_upper_collar.name = "foot_upper_collar";
  foot_upper_collar.rotation.x = Math.PI / 2;
  foot_upper_collar.position.y = 0.252;
  root.add(foot_upper_collar);

  const outer_bodyProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.35, 0.245),
    new THREE.Vector2(0.39, 0.320),
    new THREE.Vector2(0.44, 0.520),
    new THREE.Vector2(0.49, 0.820),
    new THREE.Vector2(0.525, 1.160),
    new THREE.Vector2(0.550, 1.500),
    new THREE.Vector2(0.575, 1.820),
    new THREE.Vector2(0.605, 2.100),
    new THREE.Vector2(0.650, 2.300),
  ]).getSpacedPoints(48);
  const outer_bodyGeom = new THREE.LatheGeometry(outer_bodyProfile, 64);
  const outer_body = new THREE.Mesh(outer_bodyGeom, red_glazeMat);
  outer_body.name = "outer_body";
  root.add(outer_body);

  const inner_wallProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.590, 2.315),
    new THREE.Vector2(0.570, 2.180),
    new THREE.Vector2(0.545, 2.020),
    new THREE.Vector2(0.515, 1.820),
    new THREE.Vector2(0.490, 1.600),
  ]).getSpacedPoints(28);
  const inner_wallGeom = new THREE.LatheGeometry(inner_wallProfile, 64);
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_red_glazeMat);
  inner_wall.name = "inner_wall";
  root.add(inner_wall);

  const inner_floorGeom = new THREE.CircleGeometry(0.49, 64);
  const inner_floor = new THREE.Mesh(inner_floorGeom, inner_red_glazeMat);
  inner_floor.name = "inner_floor";
  inner_floor.rotation.x = -Math.PI / 2;
  inner_floor.position.y = 1.602;
  root.add(inner_floor);

  const upper_rimGeom = new THREE.TorusGeometry(0.620, 0.060, 18, 72);
  const upper_rim = new THREE.Mesh(upper_rimGeom, red_glazeMat);
  upper_rim.name = "upper_rim";
  upper_rim.rotation.x = Math.PI / 2;
  upper_rim.position.y = 2.315;
  root.add(upper_rim);

  const rim_lower_bandGeom = new THREE.TorusGeometry(0.625, 0.018, 10, 64);
  const rim_lower_band = new THREE.Mesh(rim_lower_bandGeom, red_glazeMat);
  rim_lower_band.name = "rim_lower_band";
  rim_lower_band.rotation.x = Math.PI / 2;
  rim_lower_band.position.y = 2.235;
  root.add(rim_lower_band);

  const ornament_group = new THREE.Group();
  ornament_group.name = "ornament_group";
  root.add(ornament_group);

  function outerRadiusAt(y) {
    if (y <= 0.245) return 0.35;
    if (y <= 0.320) return 0.35 + (y - 0.245) / 0.075 * 0.04;
    if (y <= 0.520) return 0.39 + (y - 0.320) / 0.200 * 0.05;
    if (y <= 0.820) return 0.44 + (y - 0.520) / 0.300 * 0.05;
    if (y <= 1.160) return 0.49 + (y - 0.820) / 0.340 * 0.035;
    if (y <= 1.500) return 0.525 + (y - 1.160) / 0.340 * 0.025;
    if (y <= 1.820) return 0.550 + (y - 1.500) / 0.320 * 0.025;
    if (y <= 2.100) return 0.575 + (y - 1.820) / 0.280 * 0.030;
    return 0.605 + (y - 2.100) / 0.200 * 0.045;
  }

  function outerSurfacePoint(angle, y, extra) {
    const radius = outerRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function innerSurfacePoint(angle, y, extra) {
    const radius = outerRadiusAt(y) - 0.075 - extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addSurfaceTube(parent, name, pointFunction, samples, radius, material, closed) {
    const points = [];
    for (let i = 0; i < samples; i++) {
      points.push(pointFunction(i / samples));
    }
    if (closed) points.push(points[0].clone());
    const curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      samples * 2,
      radius,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const front = Math.PI / 2;
  const sectorCount = 8;
  const sectorAngle = Math.PI * 2 / sectorCount;

  for (let i = 0; i < sectorCount; i++) {
    const centerAngle = front + i * sectorAngle;

    const upper_arch = addSurfaceTube(
      ornament_group,
      "upper_arch_" + i,
      function (t) {
        const angle = centerAngle - sectorAngle * 0.5 + sectorAngle * t;
        const y = 2.185 + Math.sin(Math.PI * t) * 0.095;
        return outerSurfacePoint(angle, y, 0.010);
      },
      14,
      0.009,
      white_ornamentMat,
      false
    );

    const lower_garland = addSurfaceTube(
      ornament_group,
      "lower_garland_" + i,
      function (t) {
        const angle = centerAngle - sectorAngle * 0.5 + sectorAngle * t;
        const y = 2.015 - Math.sin(Math.PI * t) * 0.085;
        return outerSurfacePoint(angle, y, 0.011);
      },
      14,
      0.008,
      white_ornamentMat,
      false
    );

    const left_scroll = addSurfaceTube(
      ornament_group,
      "left_scroll_" + i,
      function (t) {
        const phi = Math.PI * 2 * t;
        const angle = centerAngle - sectorAngle * 0.5
          + 0.060 * Math.cos(phi)
          + 0.020 * Math.sin(phi * 2);
        const y = 2.075
          + 0.055 * Math.sin(phi)
          + 0.018 * Math.sin(phi * 2);
        return outerSurfacePoint(angle, y, 0.012);
      },
      20,
      0.0075,
      white_ornamentMat,
      true
    );

    const right_scroll = addSurfaceTube(
      ornament_group,
      "right_scroll_" + i,
      function (t) {
        const phi = Math.PI * 2 * t;
        const angle = centerAngle + sectorAngle * 0.5
          - 0.060 * Math.cos(phi)
          - 0.020 * Math.sin(phi * 2);
        const y = 2.075
          + 0.055 * Math.sin(phi)
          - 0.018 * Math.sin(phi * 2);
        return outerSurfacePoint(angle, y, 0.012);
      },
      20,
      0.0075,
      white_ornamentMat,
      true
    );

    const left_spray = addSurfaceTube(
      ornament_group,
      "left_spray_" + i,
      function (t) {
        const angle = centerAngle - 0.015
          + (-0.18 + 0.18 * t) * Math.PI
          + 0.025 * Math.sin(Math.PI * t);
        const y = 2.000 + 0.175 * t + 0.018 * Math.sin(Math.PI * t);
        return outerSurfacePoint(angle, y, 0.012);
      },
      12,
      0.0065,
      white_ornamentMat,
      false
    );

    const right_spray = addSurfaceTube(
      ornament_group,
      "right_spray_" + i,
      function (t) {
        const angle = centerAngle + 0.015
          + (0.18 - 0.18 * t) * Math.PI
          - 0.025 * Math.sin(Math.PI * t);
        const y = 2.000 + 0.175 * t + 0.018 * Math.sin(Math.PI * t);
        return outerSurfacePoint(angle, y, 0.012);
      },
      12,
      0.0065,
      white_ornamentMat,
      false
    );

    const left_tendril = addSurfaceTube(
      ornament_group,
      "left_tendril_" + i,
      function (t) {
        const angle = centerAngle - sectorAngle * 0.5
          + 0.050 * Math.sin(Math.PI * t * 2);
        const y = 2.015 - 0.175 * t + 0.018 * Math.sin(Math.PI * t);
        return outerSurfacePoint(angle, y, 0.011);
      },
      11,
      0.0065,
      white_ornamentMat,
      false
    );

    const right_tendril = addSurfaceTube(
      ornament_group,
      "right_tendril_" + i,
      function (t) {
        const angle = centerAngle + sectorAngle * 0.5
          - 0.050 * Math.sin(Math.PI * t * 2);
        const y = 2.015 - 0.175 * t + 0.018 * Math.sin(Math.PI * t);
        return outerSurfacePoint(angle, y, 0.011);
      },
      11,
      0.0065,
      white_ornamentMat,
      false
    );

    const inner_upper_arch = addSurfaceTube(
      ornament_group,
      "inner_upper_arch_" + i,
      function (t) {
        const angle = centerAngle - sectorAngle * 0.5 + sectorAngle * t;
        const y = 2.205 + Math.sin(Math.PI * t) * 0.075;
        return innerSurfacePoint(angle, y, 0.008);
      },
      14,
      0.007,
      white_ornamentMat,
      false
    );

    const inner_lower_arch = addSurfaceTube(
      ornament_group,
      "inner_lower_arch_" + i,
      function (t) {
        const angle = centerAngle - sectorAngle * 0.5 + sectorAngle * t;
        const y = 2.105 - Math.sin(Math.PI * t) * 0.065;
        return innerSurfacePoint(angle, y, 0.008);
      },
      14,
      0.0065,
      white_ornamentMat,
      false
    );
  }

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.070);
  leafShape.bezierCurveTo(0.050, -0.025, 0.045, 0.035, 0, 0.075);
  leafShape.bezierCurveTo(-0.045, 0.035, -0.050, -0.025, 0, -0.070);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 8);

  function createSurfaceLeaves(name, placements) {
    const leaves = new THREE.InstancedMesh(
      leafGeom,
      white_ornamentMat,
      placements.length
    );
    leaves.name = name;
    const dummy = new THREE.Object3D();
    const baseNormal = new THREE.Vector3(0, 0, 1);
    for (let i = 0; i < placements.length; i++) {
      const placement = placements[i];
      const angle = placement[0];
      const y = placement[1];
      const size = placement[2];
      const rotation = placement[3];
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      dummy.position.copy(outerSurfacePoint(angle, y, 0.014));
      dummy.quaternion.setFromUnitVectors(baseNormal, normal);
      dummy.rotateZ(rotation);
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      leaves.setMatrixAt(i, dummy.matrix);
    }
    leaves.instanceMatrix.needsUpdate = true;
    return leaves;
  }

  const upper_leaf_placements = [];
  const lower_leaf_placements = [];
  for (let i = 0; i < sectorCount; i++) {
    const centerAngle = front + i * sectorAngle;
    upper_leaf_placements.push(
      [centerAngle - sectorAngle * 0.25, 2.205, 0.62, -0.85],
      [centerAngle + sectorAngle * 0.25, 2.205, 0.62, 0.85]
    );
    lower_leaf_placements.push(
      [centerAngle - sectorAngle * 0.27, 1.910, 0.72, 2.35],
      [centerAngle + sectorAngle * 0.27, 1.910, 0.72, -2.35]
    );
  }

  const upper_leaf_sprays = createSurfaceLeaves(
    "upper_leaf_sprays",
    upper_leaf_placements
  );
  ornament_group.add(upper_leaf_sprays);

  const lower_dangling_leaves = createSurfaceLeaves(
    "lower_dangling_leaves",
    lower_leaf_placements
  );
  ornament_group.add(lower_dangling_leaves);

  const flower_petalGeom = new THREE.CircleGeometry(1, 16);
  const flower_centerGeom = new THREE.CircleGeometry(1, 18);

  function createSurfaceFlower(name, angle, y, petalCount, petalLength, petalWidth) {
    const flower = new THREE.Group();
    flower.name = name;

    const petals = new THREE.InstancedMesh(
      flower_petalGeom,
      white_ornamentMat,
      petalCount
    );
    petals.name = name + "_petals";

    const dummy = new THREE.Object3D();
    const localNormal = new THREE.Vector3(0, 0, 1);
    const surfaceNormal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const baseQuaternion = new THREE.Quaternion().setFromUnitVectors(
      localNormal,
      surfaceNormal
    );
    const centerPosition = outerSurfacePoint(angle, y, 0.015);

    for (let i = 0; i < petalCount; i++) {
      const petalAngle = Math.PI * 2 * i / petalCount;
      const tangentOffset = Math.cos(petalAngle) * petalLength * 0.48;
      const verticalOffset = Math.sin(petalAngle) * petalLength * 0.48;
      const petalSurfaceAngle = angle - tangentOffset / outerRadiusAt(y);
      const petalY = y + verticalOffset;

      dummy.position.copy(outerSurfacePoint(petalSurfaceAngle, petalY, 0.015));
      dummy.quaternion.copy(baseQuaternion);
      dummy.rotateZ(petalAngle);
      dummy.scale.set(petalLength * 0.55, petalWidth, 1);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    const center = new THREE.Mesh(flower_centerGeom, white_ornamentMat);
    center.name = name + "_center";
    center.position.copy(centerPosition);
    center.quaternion.copy(baseQuaternion);
    center.scale.setScalar(petalWidth * 1.35);
    flower.add(center);

    return flower;
  }

  const central_flower = createSurfaceFlower(
    "central_flower",
    front,
    2.075,
    8,
    0.075,
    0.024
  );
  ornament_group.add(central_flower);

  const side_flower_left = createSurfaceFlower(
    "side_flower_left",
    front + sectorAngle,
    2.075,
    7,
    0.065,
    0.022
  );
  ornament_group.add(side_flower_left);

  const side_flower_right = createSurfaceFlower(
    "side_flower_right",
    front - sectorAngle,
    2.075,
    7,
    0.065,
    0.022
  );
  ornament_group.add(side_flower_right);

  const ornament_beadGeom = new THREE.CircleGeometry(0.011, 12);
  const ornament_beads = new THREE.InstancedMesh(
    ornament_beadGeom,
    white_ornamentMat,
    sectorCount * 2
  );
  ornament_beads.name = "ornament_beads";
  const bead_dummy = new THREE.Object3D();
  const bead_normal = new THREE.Vector3();
  const bead_base_normal = new THREE.Vector3(0, 0, 1);
  let beadIndex = 0;
  for (let i = 0; i < sectorCount; i++) {
    const centerAngle = front + i * sectorAngle;
    for (const offset of [-sectorAngle * 0.39, sectorAngle * 0.39]) {
      const angle = centerAngle + offset;
      bead_normal.set(Math.cos(angle), 0, Math.sin(angle));
      bead_dummy.position.copy(outerSurfacePoint(angle, 1.945, 0.014));
      bead_dummy.quaternion.setFromUnitVectors(bead_base_normal, bead_normal);
      bead_dummy.scale.set(1, 1, 1);
      bead_dummy.updateMatrix();
      ornament_beads.setMatrixAt(beadIndex, bead_dummy.matrix);
      beadIndex++;
    }
  }
  ornament_beads.instanceMatrix.needsUpdate = true;
  ornament_group.add(ornament_beads);

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