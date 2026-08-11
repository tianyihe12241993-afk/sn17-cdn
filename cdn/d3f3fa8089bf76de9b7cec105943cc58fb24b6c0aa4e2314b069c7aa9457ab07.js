export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "protein_powder_jar";

  const jar_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe7d3a5,
    metalness: 0.0,
    roughness: 0.3,
  });
  const label_wrapMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f2,
    metalness: 0.0,
    roughness: 0.8,
  });
  const label_blue_bandMat = new THREE.MeshStandardMaterial({
    color: 0x0753a5,
    metalness: 0.0,
    roughness: 0.8,
  });
  const label_light_blue_bandMat = new THREE.MeshStandardMaterial({
    color: 0xaedce8,
    metalness: 0.0,
    roughness: 0.8,
  });
  const label_titleMat = new THREE.MeshStandardMaterial({
    color: 0xf8f8f4,
    metalness: 0.0,
    roughness: 0.8,
  });
  const label_textMat = new THREE.MeshStandardMaterial({
    color: 0x123f78,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lid_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const lid_topMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const lid_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const jar_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.46, 0.00),
    new THREE.Vector2(0.52, 0.025),
    new THREE.Vector2(0.56, 0.075),
    new THREE.Vector2(0.58, 0.16),
    new THREE.Vector2(0.58, 1.06),
    new THREE.Vector2(0.575, 1.14),
    new THREE.Vector2(0.555, 1.22),
    new THREE.Vector2(0.525, 1.30),
    new THREE.Vector2(0.49, 1.35),
    new THREE.Vector2(0.49, 1.38),
    new THREE.Vector2(0.00, 1.38),
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, jar_bodyMat);
  jar_body.name = "jar_body";
  root.add(jar_body);

  const neck_ringGeom = new THREE.TorusGeometry(0.495, 0.012, 8, 64);
  const neck_ring = new THREE.Mesh(neck_ringGeom, jar_bodyMat);
  neck_ring.name = "neck_ring";
  neck_ring.rotation.x = Math.PI / 2;
  neck_ring.position.y = 1.355;
  root.add(neck_ring);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  root.add(label_group);

  const labelR = 0.587;
  const label_wrapGeom = new THREE.CylinderGeometry(
    labelR,
    labelR,
    0.78,
    64,
    1,
    true
  );
  const label_wrap = new THREE.Mesh(label_wrapGeom, label_wrapMat);
  label_wrap.name = "label_wrap";
  label_wrap.position.y = 0.65;
  label_group.add(label_wrap);

  const label_blue_bandGeom = new THREE.CylinderGeometry(
    labelR + 0.003,
    labelR + 0.003,
    0.36,
    64,
    1,
    true
  );
  const label_blue_band = new THREE.Mesh(
    label_blue_bandGeom,
    label_blue_bandMat
  );
  label_blue_band.name = "label_blue_band";
  label_blue_band.position.y = 0.82;
  label_group.add(label_blue_band);

  const label_light_blue_bandGeom = new THREE.CylinderGeometry(
    labelR + 0.003,
    labelR + 0.003,
    0.36,
    64,
    1,
    true
  );
  const label_light_blue_band = new THREE.Mesh(
    label_light_blue_bandGeom,
    label_light_blue_bandMat
  );
  label_light_blue_band.name = "label_light_blue_band";
  label_light_blue_band.position.y = 0.46;
  label_group.add(label_light_blue_band);

  const label_titleGeom = new THREE.BoxGeometry(1, 1, 0.004);
  const glyphs = {
    A: [
      [-0.38, -0.5, 0.0, 0.5],
      [0.0, 0.5, 0.38, -0.5],
      [-0.22, -0.02, 0.22, -0.02],
    ],
    D: [
      [-0.36, -0.5, -0.36, 0.5],
      [-0.36, 0.5, 0.18, 0.5],
      [0.18, 0.5, 0.36, 0.28],
      [0.36, 0.28, 0.36, -0.28],
      [0.36, -0.28, 0.18, -0.5],
      [0.18, -0.5, -0.36, -0.5],
    ],
    E: [
      [-0.36, -0.5, -0.36, 0.5],
      [-0.36, 0.5, 0.36, 0.5],
      [-0.36, 0.0, 0.26, 0.0],
      [-0.36, -0.5, 0.36, -0.5],
    ],
    G: [
      [0.34, 0.5, -0.34, 0.5],
      [-0.34, 0.5, -0.34, -0.5],
      [-0.34, -0.5, 0.34, -0.5],
      [0.34, -0.5, 0.34, 0.0],
      [0.34, 0.0, 0.02, 0.0],
    ],
    I: [
      [-0.34, 0.5, 0.34, 0.5],
      [0.0, 0.5, 0.0, -0.5],
      [-0.34, -0.5, 0.34, -0.5],
    ],
    N: [
      [-0.36, -0.5, -0.36, 0.5],
      [-0.36, 0.5, 0.36, -0.5],
      [0.36, -0.5, 0.36, 0.5],
    ],
    O: [
      [-0.34, -0.5, -0.34, 0.5],
      [-0.34, 0.5, 0.34, 0.5],
      [0.34, 0.5, 0.34, -0.5],
      [0.34, -0.5, -0.34, -0.5],
    ],
    P: [
      [-0.36, -0.5, -0.36, 0.5],
      [-0.36, 0.5, 0.34, 0.5],
      [0.34, 0.5, 0.34, 0.0],
      [0.34, 0.0, -0.36, 0.0],
    ],
    R: [
      [-0.36, -0.5, -0.36, 0.5],
      [-0.36, 0.5, 0.34, 0.5],
      [0.34, 0.5, 0.34, 0.0],
      [0.34, 0.0, -0.36, 0.0],
      [0.02, 0.0, 0.38, -0.5],
    ],
    T: [
      [-0.4, 0.5, 0.4, 0.5],
      [0.0, 0.5, 0.0, -0.5],
    ],
    W: [
      [-0.4, 0.5, -0.22, -0.5],
      [-0.22, -0.5, 0.0, 0.08],
      [0.0, 0.08, 0.22, -0.5],
      [0.22, -0.5, 0.4, 0.5],
    ],
    Z: [
      [-0.38, 0.5, 0.38, 0.5],
      [0.38, 0.5, -0.38, -0.5],
      [-0.38, -0.5, 0.38, -0.5],
    ],
  };

  function createSurfaceText(
    text,
    centerY,
    totalWidth,
    charHeight,
    thickness,
    radius,
    material,
    nodeName
  ) {
    const placements = [];
    const gap = 0.16;
    const units = text.length + Math.max(0, text.length - 1) * gap;
    const unit = totalWidth / units;

    for (let ci = 0; ci < text.length; ci++) {
      const segments = glyphs[text[ci]] || [];
      const charCenter =
        -totalWidth / 2 + unit * (ci + 0.5 + ci * gap);

      for (const segment of segments) {
        const x1 = charCenter + segment[0] * unit;
        const y1 = centerY + segment[1] * charHeight;
        const x2 = charCenter + segment[2] * unit;
        const y2 = centerY + segment[3] * charHeight;
        const dx = x2 - x1;
        const dy = y2 - y1;

        placements.push({
          arc: (x1 + x2) * 0.5,
          y: (y1 + y2) * 0.5,
          length: Math.sqrt(dx * dx + dy * dy),
          rotation: Math.atan2(dy, dx),
        });
      }
    }

    const mesh = new THREE.InstancedMesh(
      label_titleGeom,
      material,
      placements.length
    );
    mesh.name = nodeName;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const surfaceQuat = new THREE.Quaternion();
    const strokeQuat = new THREE.Quaternion();
    const yAxis = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i < placements.length; i++) {
      const placement = placements[i];
      const angle = placement.arc / radius;

      position.set(
        Math.sin(angle) * radius,
        placement.y,
        Math.cos(angle) * radius
      );
      surfaceQuat.setFromAxisAngle(yAxis, angle);
      strokeQuat.setFromAxisAngle(zAxis, placement.rotation);
      surfaceQuat.multiply(strokeQuat);

      scale.set(placement.length + 0.004, thickness, 1);
      matrix.compose(position, surfaceQuat, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const label_title = createSurfaceText(
    "ZETAGANER",
    0.82,
    0.92,
    0.22,
    0.025,
    labelR + 0.009,
    label_titleMat,
    "label_title"
  );
  label_group.add(label_title);

  const label_subtitle = createSurfaceText(
    "PROTEIN POWDER",
    0.52,
    0.72,
    0.09,
    0.011,
    labelR + 0.009,
    label_textMat,
    "label_subtitle"
  );
  label_group.add(label_subtitle);

  const label_detail_line = createSurfaceText(
    "PROTEIN POWDER",
    0.405,
    0.48,
    0.055,
    0.007,
    labelR + 0.009,
    label_textMat,
    "label_detail_line"
  );
  label_group.add(label_detail_line);

  const label_bottom_line = createSurfaceText(
    "PROTEIN",
    0.31,
    0.34,
    0.045,
    0.006,
    labelR + 0.009,
    label_textMat,
    "label_bottom_line"
  );
  label_group.add(label_bottom_line);

  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  root.add(lid_group);

  const lid_bodyProfile = [
    new THREE.Vector2(0.00, 1.35),
    new THREE.Vector2(0.50, 1.35),
    new THREE.Vector2(0.56, 1.37),
    new THREE.Vector2(0.59, 1.405),
    new THREE.Vector2(0.59, 1.53),
    new THREE.Vector2(0.575, 1.575),
    new THREE.Vector2(0.54, 1.605),
    new THREE.Vector2(0.00, 1.605),
  ];
  const lid_bodyGeom = new THREE.LatheGeometry(lid_bodyProfile, 64);
  const lid_body = new THREE.Mesh(lid_bodyGeom, lid_bodyMat);
  lid_body.name = "lid_body";
  lid_group.add(lid_body);

  const lid_topGeom = new THREE.CylinderGeometry(0.54, 0.54, 0.014, 64);
  const lid_top = new THREE.Mesh(lid_topGeom, lid_topMat);
  lid_top.name = "lid_top";
  lid_top.position.y = 1.609;
  lid_group.add(lid_top);

  const lid_outer_rimGeom = new THREE.TorusGeometry(0.548, 0.018, 10, 64);
  const lid_outer_rim = new THREE.Mesh(lid_outer_rimGeom, lid_topMat);
  lid_outer_rim.name = "lid_outer_rim";
  lid_outer_rim.rotation.x = Math.PI / 2;
  lid_outer_rim.position.y = 1.615;
  lid_group.add(lid_outer_rim);

  const lid_inset_ringGeom = new THREE.TorusGeometry(0.445, 0.006, 8, 64);
  const lid_inset_ring = new THREE.Mesh(lid_inset_ringGeom, lid_grooveMat);
  lid_inset_ring.name = "lid_inset_ring";
  lid_inset_ring.rotation.x = Math.PI / 2;
  lid_inset_ring.position.y = 1.621;
  lid_group.add(lid_inset_ring);

  const lid_center_dimpleGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.006,
    20
  );
  const lid_center_dimple = new THREE.Mesh(
    lid_center_dimpleGeom,
    lid_grooveMat
  );
  lid_center_dimple.name = "lid_center_dimple";
  lid_center_dimple.position.y = 1.622;
  lid_group.add(lid_center_dimple);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  handle_group.position.set(0.48, 1.535, -0.08);
  handle_group.rotation.z = 0.29;
  lid_group.add(handle_group);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0.00, -0.11);
  handleShape.lineTo(0.78, -0.11);
  handleShape.bezierCurveTo(0.87, -0.11, 0.93, -0.065, 0.93, 0.0);
  handleShape.bezierCurveTo(0.93, 0.065, 0.87, 0.11, 0.78, 0.11);
  handleShape.lineTo(0.00, 0.11);
  handleShape.closePath();

  const handleHole = new THREE.Path();
  handleHole.absellipse(
    0.81,
    0.0,
    0.075,
    0.042,
    0,
    Math.PI * 2,
    true,
    0
  );
  handleShape.holes.push(handleHole);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 24,
  });
  const handle = new THREE.Mesh(handleGeom, lid_bodyMat);
  handle.name = "handle";
  handle.rotation.x = Math.PI / 2;
  handle_group.add(handle);

  const handle_hole_rimGeom = new THREE.TorusGeometry(
    0.061,
    0.006,
    8,
    32
  );
  const handle_hole_rim = new THREE.Mesh(
    handle_hole_rimGeom,
    lid_topMat
  );
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.rotation.x = Math.PI / 2;
  handle_hole_rim.scale.set(1.23, 0.67, 1);
  handle_hole_rim.position.set(0.81, 0.008, 0);
  handle_group.add(handle_hole_rim);

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

  fitToUnitCube(THREE, root);
  return root;
}