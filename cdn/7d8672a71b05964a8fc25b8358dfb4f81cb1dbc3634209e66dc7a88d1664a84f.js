export default function generate(THREE) {
  const root = new THREE.Group();

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_recessMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });

  const base_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.43, 0.00),
    new THREE.Vector2(0.48, 0.015),
    new THREE.Vector2(0.515, 0.065),
    new THREE.Vector2(0.53, 0.15),
    new THREE.Vector2(0.53, 0.43),
    new THREE.Vector2(0.515, 0.51),
    new THREE.Vector2(0.48, 0.555),
    new THREE.Vector2(0.00, 0.555),
  ];
  const base_bodyGeom = new THREE.LatheGeometry(base_bodyProfile, 64);
  const base_body = new THREE.Mesh(base_bodyGeom, brushed_metalMat);
  root.add(base_body);

  const base_top_rimGeom = new THREE.TorusGeometry(0.492, 0.014, 10, 64);
  const base_top_rim = new THREE.Mesh(base_top_rimGeom, polished_metalMat);
  base_top_rim.rotation.x = Math.PI / 2;
  base_top_rim.position.y = 0.55;
  root.add(base_top_rim);

  const main_bodyProfile = [
    new THREE.Vector2(0.00, 0.535),
    new THREE.Vector2(0.46, 0.535),
    new THREE.Vector2(0.49, 0.575),
    new THREE.Vector2(0.50, 0.65),
    new THREE.Vector2(0.49, 0.75),
    new THREE.Vector2(0.47, 0.88),
    new THREE.Vector2(0.44, 1.02),
    new THREE.Vector2(0.40, 1.15),
    new THREE.Vector2(0.35, 1.25),
    new THREE.Vector2(0.31, 1.315),
    new THREE.Vector2(0.00, 1.315),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, brushed_metalMat);
  root.add(main_body);

  const body_seamGeom = new THREE.TorusGeometry(0.486, 0.012, 10, 64);
  const body_seam = new THREE.Mesh(body_seamGeom, dark_recessMat);
  body_seam.rotation.x = Math.PI / 2;
  body_seam.position.y = 0.565;
  root.add(body_seam);

  const collar_shadowGeom = new THREE.TorusGeometry(0.307, 0.018, 10, 64);
  const collar_shadow = new THREE.Mesh(collar_shadowGeom, dark_recessMat);
  collar_shadow.rotation.x = Math.PI / 2;
  collar_shadow.position.y = 1.305;
  root.add(collar_shadow);

  const lid_collarGeom = new THREE.CylinderGeometry(0.315, 0.325, 0.065, 64);
  const lid_collar = new THREE.Mesh(lid_collarGeom, polished_metalMat);
  lid_collar.position.y = 1.33;
  root.add(lid_collar);

  const lid_lower_rimGeom = new THREE.TorusGeometry(0.307, 0.014, 10, 64);
  const lid_lower_rim = new THREE.Mesh(lid_lower_rimGeom, polished_metalMat);
  lid_lower_rim.rotation.x = Math.PI / 2;
  lid_lower_rim.position.y = 1.345;
  root.add(lid_lower_rim);

  const domeRadius = 0.30;
  const domeScaleY = 0.80;
  const domeBaseY = 1.355;
  const perforated_domeGeom = new THREE.SphereGeometry(
    domeRadius,
    64,
    28,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const perforated_dome = new THREE.Mesh(perforated_domeGeom, brushed_metalMat);
  perforated_dome.position.y = domeBaseY;
  perforated_dome.scale.y = domeScaleY;
  root.add(perforated_dome);

  const lid_upper_rimGeom = new THREE.TorusGeometry(0.302, 0.013, 10, 64);
  const lid_upper_rim = new THREE.Mesh(lid_upper_rimGeom, polished_metalMat);
  lid_upper_rim.rotation.x = Math.PI / 2;
  lid_upper_rim.position.y = domeBaseY;
  root.add(lid_upper_rim);

  const holeRows = [
    { theta: 0.18, count: 5 },
    { theta: 0.36, count: 8 },
    { theta: 0.54, count: 11 },
    { theta: 0.72, count: 14 },
    { theta: 0.90, count: 16 },
    { theta: 1.08, count: 18 },
    { theta: 1.26, count: 20 },
    { theta: 1.42, count: 20 },
  ];
  let holeCount = 0;
  for (const row of holeRows) holeCount += row.count;

  const dome_holesGeom = new THREE.CircleGeometry(0.019, 14);
  const dome_holes = new THREE.InstancedMesh(
    dome_holesGeom,
    dark_recessMat,
    holeCount
  );
  const dome_hole_rimsGeom = new THREE.RingGeometry(0.019, 0.025, 14);
  const dome_hole_rims = new THREE.InstancedMesh(
    dome_hole_rimsGeom,
    polished_metalMat,
    holeCount
  );

  const hole_dummy = new THREE.Object3D();
  const rim_dummy = new THREE.Object3D();
  const localNormal = new THREE.Vector3(0, 0, 1);
  const surfaceNormal = new THREE.Vector3();
  const surfacePoint = new THREE.Vector3();
  let holeIndex = 0;

  for (let rowIndex = 0; rowIndex < holeRows.length; rowIndex++) {
    const row = holeRows[rowIndex];
    const sinTheta = Math.sin(row.theta);
    const cosTheta = Math.cos(row.theta);
    const phase = rowIndex % 2 === 0 ? 0 : Math.PI / row.count;

    for (let i = 0; i < row.count; i++) {
      const angle = i / row.count * Math.PI * 2 + phase;
      surfaceNormal.set(
        sinTheta * Math.cos(angle),
        cosTheta / domeScaleY,
        sinTheta * Math.sin(angle)
      ).normalize();

      surfacePoint.set(
        domeRadius * sinTheta * Math.cos(angle),
        domeBaseY + domeRadius * domeScaleY * cosTheta,
        domeRadius * sinTheta * Math.sin(angle)
      );

      const scaleVariation = 0.88 + ((i * 5 + rowIndex * 3) % 4) * 0.07;
      const aspectVariation = 0.92 + ((i + rowIndex) % 3) * 0.04;

      hole_dummy.position.copy(surfacePoint).addScaledVector(surfaceNormal, 0.004);
      hole_dummy.quaternion.setFromUnitVectors(localNormal, surfaceNormal);
      hole_dummy.scale.set(scaleVariation, scaleVariation * aspectVariation, 1);
      hole_dummy.updateMatrix();
      dome_holes.setMatrixAt(holeIndex, hole_dummy.matrix);

      rim_dummy.position.copy(surfacePoint).addScaledVector(surfaceNormal, 0.006);
      rim_dummy.quaternion.copy(hole_dummy.quaternion);
      rim_dummy.scale.set(scaleVariation, scaleVariation * aspectVariation, 1);
      rim_dummy.updateMatrix();
      dome_hole_rims.setMatrixAt(holeIndex, rim_dummy.matrix);

      holeIndex++;
    }
  }
  dome_holes.instanceMatrix.needsUpdate = true;
  dome_hole_rims.instanceMatrix.needsUpdate = true;
  root.add(dome_holes, dome_hole_rims);

  const left_handle_mountGeom = new THREE.CylinderGeometry(0.045, 0.068, 0.15, 24);
  const left_handle_mount = new THREE.Mesh(left_handle_mountGeom, polished_metalMat);
  left_handle_mount.rotation.z = Math.PI / 2;
  left_handle_mount.position.set(-0.49, 0.65, 0.08);
  root.add(left_handle_mount);

  const left_handle_rodGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.38, 24);
  const left_handle_rod = new THREE.Mesh(left_handle_rodGeom, polished_metalMat);
  left_handle_rod.rotation.z = Math.PI / 2;
  left_handle_rod.position.set(-0.72, 0.65, 0.08);
  root.add(left_handle_rod);

  const left_handle_discGeom = new THREE.CylinderGeometry(0.122, 0.122, 0.038, 40);
  const left_handle_disc = new THREE.Mesh(left_handle_discGeom, brushed_metalMat);
  left_handle_disc.rotation.z = Math.PI / 2;
  left_handle_disc.position.set(-0.94, 0.65, 0.08);
  root.add(left_handle_disc);

  const left_handle_disc_rimGeom = new THREE.TorusGeometry(0.113, 0.009, 8, 40);
  const left_handle_disc_rim = new THREE.Mesh(left_handle_disc_rimGeom, polished_metalMat);
  left_handle_disc_rim.rotation.y = Math.PI / 2;
  left_handle_disc_rim.position.set(-0.961, 0.65, 0.08);
  root.add(left_handle_disc_rim);

  const right_handle_mountGeom = new THREE.CylinderGeometry(0.055, 0.075, 0.17, 24);
  const right_handle_mount = new THREE.Mesh(right_handle_mountGeom, polished_metalMat);
  right_handle_mount.rotation.z = -Math.PI / 2;
  right_handle_mount.position.set(0.46, 1.075, -0.08);
  root.add(right_handle_mount);

  const right_handle_barGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.70, 32);
  const right_handle_bar = new THREE.Mesh(right_handle_barGeom, brushed_metalMat);
  right_handle_bar.rotation.z = -Math.PI / 2;
  right_handle_bar.position.set(0.77, 1.075, -0.08);
  root.add(right_handle_bar);

  const right_handle_end_capGeom = new THREE.SphereGeometry(0.075, 28, 16);
  const right_handle_end_cap = new THREE.Mesh(right_handle_end_capGeom, brushed_metalMat);
  right_handle_end_cap.position.set(1.12, 1.075, -0.08);
  right_handle_end_cap.scale.set(1.05, 1, 1);
  root.add(right_handle_end_cap);

  const plunger_baseGeom = new THREE.CylinderGeometry(0.052, 0.065, 0.075, 28);
  const plunger_base = new THREE.Mesh(plunger_baseGeom, polished_metalMat);
  plunger_base.position.set(1.12, 1.16, -0.08);
  root.add(plunger_base);

  const plunger_stemGeom = new THREE.CylinderGeometry(0.043, 0.047, 0.18, 28);
  const plunger_stem = new THREE.Mesh(plunger_stemGeom, polished_metalMat);
  plunger_stem.position.set(1.12, 1.285, -0.08);
  root.add(plunger_stem);

  const plunger_knobGeom = new THREE.CylinderGeometry(0.076, 0.066, 0.055, 36);
  const plunger_knob = new THREE.Mesh(plunger_knobGeom, polished_metalMat);
  plunger_knob.position.set(1.12, 1.405, -0.08);
  root.add(plunger_knob);

  const plunger_top_insetGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.006, 20);
  const plunger_top_inset = new THREE.Mesh(plunger_top_insetGeom, dark_recessMat);
  plunger_top_inset.position.set(1.12, 1.436, -0.08);
  root.add(plunger_top_inset);

  fitToUnitCube(root);
  return root;

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
}