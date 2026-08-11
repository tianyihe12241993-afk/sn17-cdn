export default function generate(THREE) {
  const root = new THREE.Group();

  const tooth_count = 16;
  const root_radius = 0.82;
  const tip_radius = 1.0;
  const bore_radius = 0.39;
  const gear_thickness = 0.30;

  const gear_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const gear_bodyShape = new THREE.Shape();
  const pitch = Math.PI * 2 / tooth_count;
  const tooth_profile = [
    [-0.50, root_radius],
    [-0.36, root_radius],
    [-0.29, 0.855],
    [-0.235, 0.955],
    [-0.185, 0.992],
    [-0.105, tip_radius],
    [0.105, tip_radius],
    [0.185, 0.992],
    [0.235, 0.955],
    [0.29, 0.855],
    [0.36, root_radius],
    [0.50, root_radius],
  ];

  let is_first_segment = true;
  for (let tooth_index = 0; tooth_index < tooth_count; tooth_index++) {
    const center_angle = tooth_index * pitch;
    for (let point_index = 0; point_index < tooth_profile.length; point_index++) {
      const profile_point = tooth_profile[point_index];
      const angle = center_angle + profile_point[0] * pitch;
      const radius = profile_point[1];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (is_first_segment) {
        gear_bodyShape.moveTo(x, y);
        is_first_segment = false;
      } else {
        gear_bodyShape.lineTo(x, y);
      }
    }
  }
  gear_bodyShape.closePath();

  const gear_bodyHole = new THREE.Path();
  gear_bodyHole.moveTo(bore_radius, 0);
  gear_bodyHole.absarc(0, 0, bore_radius, 0, Math.PI * 2, true);
  gear_bodyHole.closePath();
  gear_bodyShape.holes.push(gear_bodyHole);

  const gear_bodyGeom = new THREE.ExtrudeGeometry(gear_bodyShape, {
    depth: gear_thickness,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  gear_bodyGeom.translate(0, 0, -gear_thickness / 2);
  gear_bodyGeom.computeVertexNormals();

  const gear_body = new THREE.Mesh(gear_bodyGeom, gear_bodyMat);
  root.add(gear_body);

  const machining_groovesMat = new THREE.LineBasicMaterial({
    color: 0x747779,
    transparent: true,
    opacity: 0.38,
  });

  const groove_positions = [];
  const groove_count = 26;
  const groove_segments = 10;
  const inner_groove_radius = bore_radius + 0.065;
  const outer_groove_radius = 0.805;

  for (let groove_index = 0; groove_index < groove_count; groove_index++) {
    const base_angle =
      groove_index / groove_count * Math.PI * 2 +
      Math.sin(groove_index * 1.73) * 0.018;
    const start_radius =
      inner_groove_radius +
      (groove_index % 5) * 0.007 +
      Math.sin(groove_index * 0.91) * 0.008;
    const end_radius =
      outer_groove_radius -
      ((groove_index * 3) % 6) * 0.008 +
      Math.sin(groove_index * 1.31) * 0.012;

    for (let segment_index = 0; segment_index < groove_segments; segment_index++) {
      const t0 = segment_index / groove_segments;
      const t1 = (segment_index + 1) / groove_segments;
      const r0 = start_radius + (end_radius - start_radius) * t0;
      const r1 = start_radius + (end_radius - start_radius) * t1;
      const a0 =
        base_angle +
        Math.sin(t0 * Math.PI * 2 + groove_index * 0.47) * 0.004;
      const a1 =
        base_angle +
        Math.sin(t1 * Math.PI * 2 + groove_index * 0.47) * 0.004;

      groove_positions.push(
        Math.cos(a0) * r0,
        Math.sin(a0) * r0,
        gear_thickness / 2 + 0.002,
        Math.cos(a1) * r1,
        Math.sin(a1) * r1,
        gear_thickness / 2 + 0.002
      );
    }
  }

  const machining_groovesGeom = new THREE.BufferGeometry();
  machining_groovesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(groove_positions, 3)
  );
  const machining_grooves = new THREE.LineSegments(
    machining_groovesGeom,
    machining_groovesMat
  );
  root.add(machining_grooves);

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