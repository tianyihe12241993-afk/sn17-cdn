export default function generate(THREE) {
  const root = new THREE.Group();
  const crystal = new THREE.Group();
  root.add(crystal);

  const side_count = 6;
  const body_radius = 0.52;
  const body_half_length = 0.80;
  const bevel_length = 0.23;
  const bevel_radius = 0.34;
  const lower_bevel_length = 0.20;
  const lower_bevel_radius = 0.35;
  const cap_radius = 0.30;

  const base_colors = [
    0x662080,
    0x7d2695,
    0x9130aa,
    0x5b1c72,
    0x84289e,
    0x6b207f
  ];

  function makeRing(radius, y, x_offset, x_scale, y_scale, z_scale) {
    const ring = [];
    for (let i = 0; i < side_count; i++) {
      const angle = i / side_count * Math.PI * 2;
      ring.push(new THREE.Vector3(
        x_offset + Math.cos(angle) * radius * x_scale,
        y,
        Math.sin(angle) * radius * z_scale * y_scale
      ));
    }
    return ring;
  }

  function addTriangle(positions, colors, a, b, c, color_hex) {
    positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = new THREE.Color(color_hex);
    for (let i = 0; i < 3; i++) {
      colors.push(color.r, color.g, color.b);
    }
  }

  function addBand(positions, colors, lower_ring, upper_ring, palette_offset) {
    for (let i = 0; i < side_count; i++) {
      const next = (i + 1) % side_count;
      const color_hex = base_colors[(i + palette_offset) % side_count];

      addTriangle(
        positions, colors,
        lower_ring[i], lower_ring[next], upper_ring[next],
        color_hex
      );
      addTriangle(
        positions, colors,
        lower_ring[i], upper_ring[next], upper_ring[i],
        color_hex
      );
    }
  }

  function makeGeometry(positions, colors) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const lower_bevel_ring = makeRing(
    lower_bevel_radius,
    -body_half_length,
    0.025,
    1.04,
    1.0,
    0.88
  );
  const lower_body_ring = makeRing(
    body_radius,
    -body_half_length + lower_bevel_length,
    0.0,
    1.0,
    1.0,
    0.90
  );
  const upper_body_ring = makeRing(
    body_radius,
    body_half_length - bevel_length,
    0.0,
    1.0,
    1.0,
    0.90
  );
  const upper_bevel_ring = makeRing(
    bevel_radius,
    body_half_length,
    -0.018,
    0.96,
    0.92,
    0.84
  );

  const lower_bevel_positions = [];
  const lower_bevel_colors = [];
  addBand(
    lower_bevel_positions,
    lower_bevel_colors,
    lower_bevel_ring,
    lower_body_ring,
    2
  );
  const lower_bevelGeom = makeGeometry(
    lower_bevel_positions,
    lower_bevel_colors
  );
  const lower_bevelMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.68,
    ior: 1.5,
    transparent: true,
    opacity: 0.98,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const lower_bevel = new THREE.Mesh(lower_bevelGeom, lower_bevelMat);
  crystal.add(lower_bevel);

  const main_faceted_body_positions = [];
  const main_faceted_body_colors = [];
  addBand(
    main_faceted_body_positions,
    main_faceted_body_colors,
    lower_body_ring,
    upper_body_ring,
    0
  );
  const main_faceted_bodyGeom = makeGeometry(
    main_faceted_body_positions,
    main_faceted_body_colors
  );
  const main_faceted_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.76,
    ior: 1.5,
    transparent: true,
    opacity: 0.97,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const main_faceted_body = new THREE.Mesh(
    main_faceted_bodyGeom,
    main_faceted_bodyMat
  );
  crystal.add(main_faceted_body);

  const upper_bevel_positions = [];
  const upper_bevel_colors = [];
  addBand(
    upper_bevel_positions,
    upper_bevel_colors,
    upper_body_ring,
    upper_bevel_ring,
    3
  );
  const upper_bevelGeom = makeGeometry(
    upper_bevel_positions,
    upper_bevel_colors
  );
  const upper_bevelMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.62,
    ior: 1.5,
    transparent: true,
    opacity: 0.98,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const upper_bevel = new THREE.Mesh(upper_bevelGeom, upper_bevelMat);
  crystal.add(upper_bevel);

  const lower_cap_center = new THREE.Vector3(0.025, -1.0, 0);
  const lower_end_cap_positions = [];
  const lower_end_cap_colors = [];
  for (let i = 0; i < side_count; i++) {
    const next = (i + 1) % side_count;
    addTriangle(
      lower_end_cap_positions,
      lower_end_cap_colors,
      lower_cap_center,
      lower_bevel_ring[next],
      lower_bevel_ring[i],
      base_colors[(i + 4) % side_count]
    );
  }
  const lower_end_capGeom = makeGeometry(
    lower_end_cap_positions,
    lower_end_cap_colors
  );
  const lower_end_capMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.58,
    ior: 1.5,
    transparent: true,
    opacity: 0.98,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const lower_end_cap = new THREE.Mesh(
    lower_end_capGeom,
    lower_end_capMat
  );
  crystal.add(lower_end_cap);

  const top_cap_center = new THREE.Vector3(-0.018, 1.03, 0);
  const top_end_cap_positions = [];
  const top_end_cap_colors = [];
  for (let i = 0; i < side_count; i++) {
    const next = (i + 1) % side_count;
    addTriangle(
      top_end_cap_positions,
      top_end_cap_colors,
      top_cap_center,
      upper_bevel_ring[i],
      upper_bevel_ring[next],
      base_colors[(i + 1) % side_count]
    );
  }
  const top_end_capGeom = makeGeometry(
    top_end_cap_positions,
    top_end_cap_colors
  );
  const top_end_capMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.52,
    ior: 1.5,
    transparent: true,
    opacity: 0.98,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const top_end_cap = new THREE.Mesh(top_end_capGeom, top_end_capMat);
  crystal.add(top_end_cap);

  const inner_depth_coreGeom = new THREE.CylinderGeometry(
    0.20,
    0.24,
    1.30,
    6,
    1,
    false
  );
  const inner_depth_coreMat = new THREE.MeshStandardMaterial({
    color: 0x330044,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.16,
    flatShading: true
  });
  const inner_depth_core = new THREE.Mesh(
    inner_depth_coreGeom,
    inner_depth_coreMat
  );
  inner_depth_core.position.set(0.015, -0.02, -0.015);
  inner_depth_core.rotation.y = Math.PI / 6;
  crystal.add(inner_depth_core);

  const internal_inclusionsGeom = new THREE.SphereGeometry(0.014, 8, 6);
  const internal_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0xd9a0f2,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.32
  });
  const internal_inclusions = new THREE.InstancedMesh(
    internal_inclusionsGeom,
    internal_inclusionsMat,
    12
  );
  const inclusion_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const x = Math.sin(i * 2.17) * 0.105;
    const y = -0.61 + t * 1.22;
    const z = Math.cos(i * 1.43) * 0.085;
    const scale = 0.55 + (i % 4) * 0.18;
    inclusion_transform.position.set(x, y, z);
    inclusion_transform.rotation.set(
      i * 0.31,
      i * 0.47,
      i * 0.23
    );
    inclusion_transform.scale.set(
      scale * 0.7,
      scale * 1.4,
      scale * 0.7
    );
    inclusion_transform.updateMatrix();
    internal_inclusions.setMatrixAt(i, inclusion_transform.matrix);
  }
  internal_inclusions.instanceMatrix.needsUpdate = true;
  crystal.add(internal_inclusions);

  crystal.rotation.set(0.12, -0.16, -0.72);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}