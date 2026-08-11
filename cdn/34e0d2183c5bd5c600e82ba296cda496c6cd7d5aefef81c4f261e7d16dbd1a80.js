export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "necklace";

  const polished_silver_mat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x686868,
    emissiveIntensity: 0.55,
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    emissive: 0x606060,
    emissiveIntensity: 0.5,
  });
  const dark_silver_mat = new THREE.MeshStandardMaterial({
    color: 0x55585c,
    metalness: 0.5,
    roughness: 0.25,
  });
  const gemstone_mat = new THREE.MeshPhysicalMaterial({
    color: 0x168fd0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    ior: 1.6,
    transparent: true,
    opacity: 0.98,
    thickness: 0.08,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
    emissive: 0x062b4b,
    emissiveIntensity: 0.18,
  });
  const gemstone_facets_mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0x073b63,
    emissiveIntensity: 0.18,
    side: THREE.DoubleSide,
  });

  const chain_group = new THREE.Group();
  chain_group.name = "chain_group";
  root.add(chain_group);

  const chain_links_geom = new THREE.TorusGeometry(0.044, 0.008, 10, 24);
  const chain_links = new THREE.InstancedMesh(
    chain_links_geom,
    polished_silver_mat,
    24
  );
  chain_links.name = "chain_links";

  const chain_dummy = new THREE.Object3D();
  const chain_z_axis = new THREE.Vector3(0, 0, 1);
  const chain_y_axis = new THREE.Vector3(0, 1, 0);
  const chain_branches = [
    {
      start: new THREE.Vector3(-0.075, 0.475, -0.025),
      control: new THREE.Vector3(-0.39, 0.83, -0.025),
      end: new THREE.Vector3(-0.75, 1.34, -0.025),
    },
    {
      start: new THREE.Vector3(0.075, 0.475, -0.025),
      control: new THREE.Vector3(0.39, 0.83, -0.025),
      end: new THREE.Vector3(0.75, 1.34, -0.025),
    },
  ];

  let chain_index = 0;
  for (const branch of chain_branches) {
    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      const u = 1 - t;
      const x =
        u * u * branch.start.x +
        2 * u * t * branch.control.x +
        t * t * branch.end.x;
      const y =
        u * u * branch.start.y +
        2 * u * t * branch.control.y +
        t * t * branch.end.y;
      const dx =
        2 * u * (branch.control.x - branch.start.x) +
        2 * t * (branch.end.x - branch.control.x);
      const dy =
        2 * u * (branch.control.y - branch.start.y) +
        2 * t * (branch.end.y - branch.control.y);
      const path_angle = Math.atan2(-dx, dy);
      const link_tilt = i % 2 === 0 ? 0.08 : 1.08;

      const path_quaternion = new THREE.Quaternion().setFromAxisAngle(
        chain_z_axis,
        path_angle
      );
      const tilt_quaternion = new THREE.Quaternion().setFromAxisAngle(
        chain_y_axis,
        link_tilt
      );
      path_quaternion.multiply(tilt_quaternion);

      chain_dummy.position.set(
        x,
        y,
        i % 2 === 0 ? -0.016 : -0.006
      );
      chain_dummy.quaternion.copy(path_quaternion);
      chain_dummy.scale.set(0.72, 1.25, 1);
      chain_dummy.updateMatrix();
      chain_links.setMatrixAt(chain_index++, chain_dummy.matrix);
    }
  }
  chain_links.instanceMatrix.needsUpdate = true;
  chain_links.computeBoundingBox();
  chain_links.computeBoundingSphere();
  chain_group.add(chain_links);

  const pendant_group = new THREE.Group();
  pendant_group.name = "pendant_group";
  root.add(pendant_group);

  const pendant_bail_shape = new THREE.Shape();
  pendant_bail_shape.moveTo(0, 0.22);
  pendant_bail_shape.bezierCurveTo(-0.055, 0.22, -0.075, 0.27, -0.085, 0.35);
  pendant_bail_shape.bezierCurveTo(-0.105, 0.50, -0.145, 0.69, -0.16, 0.77);
  pendant_bail_shape.bezierCurveTo(-0.17, 0.84, -0.10, 0.88, 0, 0.88);
  pendant_bail_shape.bezierCurveTo(0.10, 0.88, 0.17, 0.84, 0.16, 0.77);
  pendant_bail_shape.bezierCurveTo(0.145, 0.69, 0.105, 0.50, 0.085, 0.35);
  pendant_bail_shape.bezierCurveTo(0.075, 0.27, 0.055, 0.22, 0, 0.22);
  pendant_bail_shape.closePath();

  const pendant_bail_hole = new THREE.Path();
  pendant_bail_hole.moveTo(0, 0.35);
  pendant_bail_hole.bezierCurveTo(0.032, 0.35, 0.046, 0.41, 0.05, 0.49);
  pendant_bail_hole.bezierCurveTo(0.055, 0.59, 0.05, 0.69, 0.035, 0.73);
  pendant_bail_hole.bezierCurveTo(0.025, 0.755, -0.025, 0.755, -0.035, 0.73);
  pendant_bail_hole.bezierCurveTo(-0.05, 0.69, -0.055, 0.59, -0.05, 0.49);
  pendant_bail_hole.bezierCurveTo(-0.046, 0.41, -0.032, 0.35, 0, 0.35);
  pendant_bail_hole.closePath();
  pendant_bail_shape.holes.push(pendant_bail_hole);

  const pendant_bail_geom = new THREE.ExtrudeGeometry(pendant_bail_shape, {
    depth: 0.065,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.009,
    bevelSegments: 3,
    curveSegments: 24,
  });
  const pendant_bail = new THREE.Mesh(
    pendant_bail_geom,
    polished_silver_mat
  );
  pendant_bail.name = "pendant_bail";
  pendant_bail.position.z = -0.035;
  pendant_group.add(pendant_bail);

  const bail_reflection_shape = new THREE.Shape();
  bail_reflection_shape.moveTo(-0.038, 0.555);
  bail_reflection_shape.lineTo(0.038, 0.555);
  bail_reflection_shape.bezierCurveTo(0.047, 0.57, 0.047, 0.61, 0.038, 0.625);
  bail_reflection_shape.lineTo(-0.038, 0.625);
  bail_reflection_shape.bezierCurveTo(-0.047, 0.61, -0.047, 0.57, -0.038, 0.555);
  bail_reflection_shape.closePath();

  const bail_reflection_geom = new THREE.ShapeGeometry(
    bail_reflection_shape,
    16
  );
  const bail_reflection = new THREE.Mesh(
    bail_reflection_geom,
    dark_silver_mat
  );
  bail_reflection.name = "bail_reflection";
  bail_reflection.position.z = 0.045;
  pendant_group.add(bail_reflection);

  const connector_ring_geom = new THREE.TorusGeometry(0.068, 0.011, 10, 28);
  const connector_ring = new THREE.Mesh(
    connector_ring_geom,
    polished_silver_mat
  );
  connector_ring.name = "connector_ring";
  connector_ring.position.set(0, 0.205, 0.005);
  connector_ring.scale.set(0.82, 1.12, 1);
  pendant_group.add(connector_ring);

  const pendant_backing_shape = new THREE.Shape();
  pendant_backing_shape.moveTo(0, 0.13);
  pendant_backing_shape.bezierCurveTo(-0.12, 0.02, -0.35, -0.25, -0.43, -0.55);
  pendant_backing_shape.bezierCurveTo(-0.50, -0.82, -0.34, -1.06, 0, -1.14);
  pendant_backing_shape.bezierCurveTo(0.34, -1.06, 0.50, -0.82, 0.43, -0.55);
  pendant_backing_shape.bezierCurveTo(0.35, -0.25, 0.12, 0.02, 0, 0.13);
  pendant_backing_shape.closePath();

  const pendant_backing_geom = new THREE.ExtrudeGeometry(
    pendant_backing_shape,
    {
      depth: 0.07,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3,
      curveSegments: 32,
    }
  );
  const pendant_backing = new THREE.Mesh(
    pendant_backing_geom,
    silver_mat
  );
  pendant_backing.name = "pendant_backing";
  pendant_backing.position.z = -0.045;
  pendant_group.add(pendant_backing);

  const outer_bezel_shape = new THREE.Shape();
  outer_bezel_shape.moveTo(0, 0.105);
  outer_bezel_shape.bezierCurveTo(-0.12, 0.0, -0.32, -0.27, -0.39, -0.54);
  outer_bezel_shape.bezierCurveTo(-0.44, -0.77, -0.29, -0.99, 0, -1.075);
  outer_bezel_shape.bezierCurveTo(0.29, -0.99, 0.44, -0.77, 0.39, -0.54);
  outer_bezel_shape.bezierCurveTo(0.32, -0.27, 0.12, 0.0, 0, 0.105);
  outer_bezel_shape.closePath();

  const outer_bezel_hole = new THREE.Path();
  outer_bezel_hole.moveTo(0, 0.055);
  outer_bezel_hole.bezierCurveTo(0.10, -0.04, 0.27, -0.29, 0.33, -0.53);
  outer_bezel_hole.bezierCurveTo(0.37, -0.72, 0.24, -0.91, 0, -0.985);
  outer_bezel_hole.bezierCurveTo(-0.24, -0.91, -0.37, -0.72, -0.33, -0.53);
  outer_bezel_hole.bezierCurveTo(-0.27, -0.29, -0.10, -0.04, 0, 0.055);
  outer_bezel_hole.closePath();
  outer_bezel_shape.holes.push(outer_bezel_hole);

  const outer_bezel_geom = new THREE.ExtrudeGeometry(outer_bezel_shape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 3,
    curveSegments: 32,
  });
  const outer_bezel = new THREE.Mesh(
    outer_bezel_geom,
    polished_silver_mat
  );
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = -0.025;
  pendant_group.add(outer_bezel);

  const gemstone_shape = new THREE.Shape();
  gemstone_shape.moveTo(0, 0.055);
  gemstone_shape.bezierCurveTo(-0.10, -0.04, -0.27, -0.29, -0.33, -0.53);
  gemstone_shape.bezierCurveTo(-0.37, -0.72, -0.24, -0.91, 0, -0.985);
  gemstone_shape.bezierCurveTo(0.24, -0.91, 0.37, -0.72, 0.33, -0.53);
  gemstone_shape.bezierCurveTo(0.27, -0.29, 0.10, -0.04, 0, 0.055);
  gemstone_shape.closePath();

  const gemstone_geom = new THREE.ExtrudeGeometry(gemstone_shape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 32,
  });
  const gemstone = new THREE.Mesh(gemstone_geom, gemstone_mat);
  gemstone.name = "gemstone";
  gemstone.position.z = 0.025;
  pendant_group.add(gemstone);

  const gemstone_facet_boundary = [
    new THREE.Vector2(0.0, 0.045),
    new THREE.Vector2(-0.08, -0.05),
    new THREE.Vector2(-0.17, -0.18),
    new THREE.Vector2(-0.25, -0.34),
    new THREE.Vector2(-0.30, -0.51),
    new THREE.Vector2(-0.31, -0.64),
    new THREE.Vector2(-0.27, -0.77),
    new THREE.Vector2(-0.18, -0.88),
    new THREE.Vector2(0.0, -0.955),
    new THREE.Vector2(0.18, -0.88),
    new THREE.Vector2(0.27, -0.77),
    new THREE.Vector2(0.31, -0.64),
    new THREE.Vector2(0.30, -0.51),
    new THREE.Vector2(0.25, -0.34),
    new THREE.Vector2(0.17, -0.18),
    new THREE.Vector2(0.08, -0.05),
  ];

  const gemstone_facet_center = new THREE.Vector3(0.005, -0.47, 0.128);
  const gemstone_inner_ring = gemstone_facet_boundary.map(
    (point, index) =>
      new THREE.Vector3(
        gemstone_facet_center.x +
          (point.x - gemstone_facet_center.x) * 0.48,
        gemstone_facet_center.y +
          (point.y - gemstone_facet_center.y) * 0.48,
        0.108 + (index % 3) * 0.006
      )
  );
  const gemstone_outer_ring = gemstone_facet_boundary.map(
    (point) => new THREE.Vector3(point.x, point.y, 0.092)
  );

  const facet_positions = [];
  const facet_colors = [];
  const facet_palette = [
    0x073b83,
    0x0d67b8,
    0x168fd0,
    0x42bdf1,
    0x8adcf5,
    0x174f95,
    0x0a2e69,
    0x287fc2,
    0x63c9f4,
    0x0b5aa5,
  ];

  function add_facet_triangle(a, b, c, color_value) {
    facet_positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = new THREE.Color(color_value);
    for (let i = 0; i < 3; i++) {
      facet_colors.push(color.r, color.g, color.b);
    }
  }

  const facet_count = gemstone_facet_boundary.length;
  for (let i = 0; i < facet_count; i++) {
    const next = (i + 1) % facet_count;
    add_facet_triangle(
      gemstone_facet_center,
      gemstone_inner_ring[i],
      gemstone_inner_ring[next],
      facet_palette[(i * 3 + 2) % facet_palette.length]
    );
    add_facet_triangle(
      gemstone_inner_ring[i],
      gemstone_outer_ring[i],
      gemstone_outer_ring[next],
      facet_palette[(i * 5 + 1) % facet_palette.length]
    );
    add_facet_triangle(
      gemstone_inner_ring[i],
      gemstone_outer_ring[next],
      gemstone_inner_ring[next],
      facet_palette[(i * 7 + 4) % facet_palette.length]
    );
  }

  const gemstone_facets_geom = new THREE.BufferGeometry();
  gemstone_facets_geom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facet_positions, 3)
  );
  gemstone_facets_geom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(facet_colors, 3)
  );
  gemstone_facets_geom.computeVertexNormals();
  gemstone_facets_geom.computeBoundingBox();
  gemstone_facets_geom.computeBoundingSphere();

  const gemstone_facets = new THREE.Mesh(
    gemstone_facets_geom,
    gemstone_facets_mat
  );
  gemstone_facets.name = "gemstone_facets";
  pendant_group.add(gemstone_facets);

  const inner_bezel_shape = new THREE.Shape();
  inner_bezel_shape.moveTo(0, 0.075);
  inner_bezel_shape.bezierCurveTo(-0.105, -0.02, -0.285, -0.28, -0.345, -0.53);
  inner_bezel_shape.bezierCurveTo(-0.385, -0.73, -0.245, -0.925, 0, -1.0);
  inner_bezel_shape.bezierCurveTo(0.245, -0.925, 0.385, -0.73, 0.345, -0.53);
  inner_bezel_shape.bezierCurveTo(0.285, -0.28, 0.105, -0.02, 0, 0.075);
  inner_bezel_shape.closePath();

  const inner_bezel_hole = new THREE.Path();
  inner_bezel_hole.moveTo(0, 0.052);
  inner_bezel_hole.bezierCurveTo(0.09, -0.04, 0.255, -0.29, 0.315, -0.53);
  inner_bezel_hole.bezierCurveTo(0.35, -0.71, 0.22, -0.89, 0, -0.97);
  inner_bezel_hole.bezierCurveTo(-0.22, -0.89, -0.35, -0.71, -0.315, -0.53);
  inner_bezel_hole.bezierCurveTo(-0.255, -0.29, -0.09, -0.04, 0, 0.052);
  inner_bezel_hole.closePath();
  inner_bezel_shape.holes.push(inner_bezel_hole);

  const inner_bezel_geom = new THREE.ExtrudeGeometry(inner_bezel_shape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 32,
  });
  const inner_bezel = new THREE.Mesh(
    inner_bezel_geom,
    polished_silver_mat
  );
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.058;
  pendant_group.add(inner_bezel);

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