export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bottle_with_cork";

  const bottle_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.4,
  });

  const cork_stopperMat = new THREE.MeshStandardMaterial({
    color: 0xc9925f,
    metalness: 0.0,
    roughness: 0.9,
  });

  const cork_topMat = new THREE.MeshStandardMaterial({
    color: 0xd7a66f,
    metalness: 0.0,
    roughness: 0.9,
  });

  const cork_grainMat = new THREE.MeshStandardMaterial({
    color: 0x684126,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.50, 0.00),
    new THREE.Vector2(0.59, 0.02),
    new THREE.Vector2(0.66, 0.07),
    new THREE.Vector2(0.70, 0.15),
    new THREE.Vector2(0.72, 0.27),
    new THREE.Vector2(0.72, 2.10),
    new THREE.Vector2(0.715, 2.20),
    new THREE.Vector2(0.69, 2.31),
    new THREE.Vector2(0.64, 2.43),
    new THREE.Vector2(0.57, 2.54),
    new THREE.Vector2(0.48, 2.64),
    new THREE.Vector2(0.39, 2.72),
    new THREE.Vector2(0.34, 2.81),
    new THREE.Vector2(0.32, 2.92),
    new THREE.Vector2(0.32, 3.12),
    new THREE.Vector2(0.00, 3.12),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.name = "bottle_body";
  root.add(bottle_body);

  const bottle_lipProfile = [
    new THREE.Vector2(0.30, 3.07),
    new THREE.Vector2(0.39, 3.07),
    new THREE.Vector2(0.44, 3.09),
    new THREE.Vector2(0.47, 3.13),
    new THREE.Vector2(0.47, 3.20),
    new THREE.Vector2(0.45, 3.24),
    new THREE.Vector2(0.40, 3.27),
    new THREE.Vector2(0.31, 3.27),
    new THREE.Vector2(0.30, 3.24),
    new THREE.Vector2(0.30, 3.10),
    new THREE.Vector2(0.30, 3.07),
  ];
  const bottle_lipGeom = new THREE.LatheGeometry(bottle_lipProfile, 64);
  const bottle_lip = new THREE.Mesh(bottle_lipGeom, bottle_bodyMat);
  bottle_lip.name = "bottle_lip";
  root.add(bottle_lip);

  const corkHeight = 0.68;
  const corkBottomY = 3.12;
  const corkTopY = corkBottomY + corkHeight;
  const corkBottomRadius = 0.32;
  const corkTopRadius = 0.39;

  const cork_stopperGeom = new THREE.CylinderGeometry(
    corkTopRadius,
    corkBottomRadius,
    corkHeight,
    48,
    1,
    false
  );
  const cork_stopper = new THREE.Mesh(cork_stopperGeom, cork_stopperMat);
  cork_stopper.name = "cork_stopper";
  cork_stopper.position.y = corkBottomY + corkHeight * 0.5;
  root.add(cork_stopper);

  const cork_topGeom = new THREE.CircleGeometry(corkTopRadius - 0.007, 48);
  const cork_top = new THREE.Mesh(cork_topGeom, cork_topMat);
  cork_top.name = "cork_top";
  cork_top.rotation.x = -Math.PI / 2;
  cork_top.position.y = corkTopY + 0.002;
  root.add(cork_top);

  const cork_grain = new THREE.Group();
  cork_grain.name = "cork_grain";
  root.add(cork_grain);

  function corkRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - corkBottomY) / corkHeight));
    return corkBottomRadius + (corkTopRadius - corkBottomRadius) * t;
  }

  function corkSurfacePoint(angle, y, offset) {
    const radius = corkRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  const sidePatchCount = 48;
  const cork_side_patchGeom = new THREE.CircleGeometry(1, 7);
  const cork_side_patches = new THREE.InstancedMesh(
    cork_side_patchGeom,
    cork_grainMat,
    sidePatchCount
  );
  cork_side_patches.name = "cork_side_patches";

  const patchMatrix = new THREE.Matrix4();
  const patchPosition = new THREE.Vector3();
  const patchQuaternion = new THREE.Quaternion();
  const patchScale = new THREE.Vector3();
  const patchNormal = new THREE.Vector3();
  const patchForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < sidePatchCount; i++) {
    const angle = i * 2.399963229728653 + (i % 4) * 0.11;
    const verticalIndex = (i * 17) % sidePatchCount;
    const t = (verticalIndex + 0.5) / sidePatchCount;
    const y = corkBottomY + 0.025 + t * (corkHeight - 0.05);
    const radius = corkRadiusAt(y) + 0.004;

    patchNormal.set(Math.cos(angle), 0, Math.sin(angle));
    patchPosition.set(
      patchNormal.x * radius,
      y,
      patchNormal.z * radius
    );
    patchQuaternion.setFromUnitVectors(patchForward, patchNormal);
    patchScale.set(
      0.026 + (i % 5) * 0.006,
      0.014 + ((i * 3) % 5) * 0.004,
      1
    );
    patchMatrix.compose(patchPosition, patchQuaternion, patchScale);
    cork_side_patches.setMatrixAt(i, patchMatrix);
  }
  cork_side_patches.instanceMatrix.needsUpdate = true;
  cork_grain.add(cork_side_patches);

  const cork_side_crackGeom = new THREE.PlaneGeometry(1, 1);
  const cork_side_cracks = new THREE.InstancedMesh(
    cork_side_crackGeom,
    cork_grainMat,
    sidePatchCount
  );
  cork_side_cracks.name = "cork_side_cracks";

  const crackMatrix = new THREE.Matrix4();
  const crackPosition = new THREE.Vector3();
  const crackQuaternion = new THREE.Quaternion();
  const crackScale = new THREE.Vector3();
  const crackNormal = new THREE.Vector3();
  const localRotation = new THREE.Quaternion();

  for (let i = 0; i < sidePatchCount; i++) {
    const angle = i * 2.399963229728653 + 0.18;
    const verticalIndex = (i * 19) % sidePatchCount;
    const t = (verticalIndex + 0.5) / sidePatchCount;
    const y = corkBottomY + 0.025 + t * (corkHeight - 0.05);
    const radius = corkRadiusAt(y) + 0.006;

    crackNormal.set(Math.cos(angle), 0, Math.sin(angle));
    crackPosition.set(
      crackNormal.x * radius,
      y,
      crackNormal.z * radius
    );
    crackQuaternion.setFromUnitVectors(patchForward, crackNormal);
    localRotation.setFromAxisAngle(
      patchForward,
      -0.7 + (i % 7) * 0.22
    );
    crackQuaternion.multiply(localRotation);
    crackScale.set(
      0.004 + (i % 3) * 0.001,
      0.025 + (i % 5) * 0.006,
      1
    );
    crackMatrix.compose(crackPosition, crackQuaternion, crackScale);
    cork_side_cracks.setMatrixAt(i, crackMatrix);
  }
  cork_side_cracks.instanceMatrix.needsUpdate = true;
  cork_grain.add(cork_side_cracks);

  const cork_side_flecks = new THREE.InstancedMesh(
    cork_side_crackGeom,
    cork_grainMat,
    sidePatchCount
  );
  cork_side_flecks.name = "cork_side_flecks";

  const fleckMatrix = new THREE.Matrix4();
  const fleckPosition = new THREE.Vector3();
  const fleckQuaternion = new THREE.Quaternion();
  const fleckScale = new THREE.Vector3();
  const fleckNormal = new THREE.Vector3();

  for (let i = 0; i < sidePatchCount; i++) {
    const angle = i * 2.399963229728653 + 0.47;
    const verticalIndex = (i * 23) % sidePatchCount;
    const t = (verticalIndex + 0.5) / sidePatchCount;
    const y = corkBottomY + 0.025 + t * (corkHeight - 0.05);
    const radius = corkRadiusAt(y) + 0.0065;

    fleckNormal.set(Math.cos(angle), 0, Math.sin(angle));
    fleckPosition.set(
      fleckNormal.x * radius,
      y,
      fleckNormal.z * radius
    );
    fleckQuaternion.setFromUnitVectors(patchForward, fleckNormal);
    fleckScale.set(
      0.006 + (i % 4) * 0.002,
      0.006 + ((i * 2) % 4) * 0.002,
      1
    );
    fleckMatrix.compose(fleckPosition, fleckQuaternion, fleckScale);
    cork_side_flecks.setMatrixAt(i, fleckMatrix);
  }
  cork_side_flecks.instanceMatrix.needsUpdate = true;
  cork_grain.add(cork_side_flecks);

  const cork_side_veins = new THREE.Group();
  cork_side_veins.name = "cork_side_veins";
  cork_grain.add(cork_side_veins);

  for (let i = 0; i < 8; i++) {
    const baseAngle = i / 8 * Math.PI * 2 + 0.16;
    const baseY = 3.20 + (i % 4) * 0.105;
    const direction = i % 2 === 0 ? 1 : -1;
    const veinPoints = [
      corkSurfacePoint(baseAngle, baseY, 0.007),
      corkSurfacePoint(
        baseAngle + direction * 0.055,
        baseY + 0.045,
        0.007
      ),
      corkSurfacePoint(
        baseAngle - direction * 0.035,
        baseY + 0.095,
        0.007
      ),
      corkSurfacePoint(
        baseAngle + direction * 0.075,
        baseY + 0.145,
        0.007
      ),
    ];
    const veinCurve = new THREE.CatmullRomCurve3(
      veinPoints,
      false,
      "centripetal"
    );
    const veinGeom = new THREE.TubeGeometry(
      veinCurve,
      10,
      0.004,
      5,
      false
    );
    const vein = new THREE.Mesh(veinGeom, cork_grainMat);
    vein.name = "cork_side_vein";
    cork_side_veins.add(vein);
  }

  const topPatchCount = 14;
  const cork_top_patchGeom = new THREE.CircleGeometry(1, 7);
  const cork_top_patches = new THREE.InstancedMesh(
    cork_top_patchGeom,
    cork_grainMat,
    topPatchCount
  );
  cork_top_patches.name = "cork_top_patches";

  const topPatchMatrix = new THREE.Matrix4();
  const topPatchPosition = new THREE.Vector3();
  const topPatchQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );
  const topPatchScale = new THREE.Vector3();

  for (let i = 0; i < topPatchCount; i++) {
    const angle = i * 2.399963229728653;
    const radialIndex = (i * 5) % topPatchCount;
    const radius =
      0.025 + 0.27 * Math.sqrt((radialIndex + 0.5) / topPatchCount);

    topPatchPosition.set(
      Math.cos(angle) * radius,
      corkTopY + 0.005,
      Math.sin(angle) * radius
    );
    topPatchScale.set(
      0.018 + (i % 4) * 0.005,
      0.012 + ((i * 3) % 4) * 0.004,
      1
    );
    topPatchMatrix.compose(
      topPatchPosition,
      topPatchQuaternion,
      topPatchScale
    );
    cork_top_patches.setMatrixAt(i, topPatchMatrix);
  }
  cork_top_patches.instanceMatrix.needsUpdate = true;
  cork_grain.add(cork_top_patches);

  const cork_top_cracks = new THREE.Group();
  cork_top_cracks.name = "cork_top_cracks";
  cork_grain.add(cork_top_cracks);

  for (let i = 0; i < 5; i++) {
    const angle = i / 5 * Math.PI * 2 + 0.25;
    const direction = i % 2 === 0 ? 1 : -1;
    const topCrackPoints = [
      new THREE.Vector3(
        Math.cos(angle) * 0.035,
        corkTopY + 0.008,
        Math.sin(angle) * 0.035
      ),
      new THREE.Vector3(
        Math.cos(angle + direction * 0.12) * 0.11,
        corkTopY + 0.008,
        Math.sin(angle + direction * 0.12) * 0.11
      ),
      new THREE.Vector3(
        Math.cos(angle - direction * 0.08) * 0.20,
        corkTopY + 0.008,
        Math.sin(angle - direction * 0.08) * 0.20
      ),
      new THREE.Vector3(
        Math.cos(angle + direction * 0.10) * 0.31,
        corkTopY + 0.008,
        Math.sin(angle + direction * 0.10) * 0.31
      ),
    ];
    const topCrackCurve = new THREE.CatmullRomCurve3(
      topCrackPoints,
      false,
      "centripetal"
    );
    const topCrackGeom = new THREE.TubeGeometry(
      topCrackCurve,
      10,
      0.0035,
      5,
      false
    );
    const topCrack = new THREE.Mesh(topCrackGeom, cork_grainMat);
    topCrack.name = "cork_top_crack";
    cork_top_cracks.add(topCrack);
  }

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