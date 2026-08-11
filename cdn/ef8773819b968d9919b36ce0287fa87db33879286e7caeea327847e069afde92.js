export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_compass";

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const hands_group = new THREE.Group();
  hands_group.name = "hands_group";
  root.add(hands_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb58a43,
    metalness: 0.55,
    roughness: 0.5
  });
  const polishedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd2aa55,
    metalness: 0.6,
    roughness: 0.25
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xc8aa61,
    metalness: 0.35,
    roughness: 0.55
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x74572d,
    metalness: 0.4,
    roughness: 0.65
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x20252a,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x555954,
    metalness: 0.55,
    roughness: 0.35
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6f0ed,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const case_bodyGeom = new THREE.CylinderGeometry(1.54, 1.47, 0.42, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, brassMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  case_body.position.z = -0.11;
  case_group.add(case_body);

  const rear_case_capGeom = new THREE.CylinderGeometry(1.47, 1.43, 0.08, 64);
  const rear_case_cap = new THREE.Mesh(rear_case_capGeom, darkBrassMat);
  rear_case_cap.name = "rear_case_cap";
  rear_case_cap.rotation.x = Math.PI / 2;
  rear_case_cap.position.z = -0.34;
  case_group.add(rear_case_cap);

  const case_side_bandGeom = new THREE.TorusGeometry(1.49, 0.045, 10, 64);
  const case_side_band = new THREE.Mesh(case_side_bandGeom, darkBrassMat);
  case_side_band.name = "case_side_band";
  case_side_band.position.z = -0.25;
  case_group.add(case_side_band);

  const bezel_supportGeom = new THREE.RingGeometry(1.18, 1.54, 64);
  const bezel_support = new THREE.Mesh(bezel_supportGeom, brassMat);
  bezel_support.name = "bezel_support";
  bezel_support.position.z = 0.105;
  case_group.add(bezel_support);

  const outer_bezelGeom = new THREE.TorusGeometry(1.48, 0.075, 12, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polishedBrassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.14;
  case_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(1.205, 0.035, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polishedBrassMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.15;
  case_group.add(inner_bezel);

  const dial_faceGeom = new THREE.CircleGeometry(1.18, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.z = 0.116;
  dial_group.add(dial_face);

  const dial_groove_innerGeom = new THREE.TorusGeometry(0.58, 0.006, 6, 64);
  const dial_groove_inner = new THREE.Mesh(dial_groove_innerGeom, darkBrassMat);
  dial_groove_inner.name = "dial_groove_inner";
  dial_groove_inner.position.z = 0.124;
  dial_group.add(dial_groove_inner);

  const dial_groove_middleGeom = new THREE.TorusGeometry(0.79, 0.005, 6, 64);
  const dial_groove_middle = new THREE.Mesh(dial_groove_middleGeom, darkBrassMat);
  dial_groove_middle.name = "dial_groove_middle";
  dial_groove_middle.position.z = 0.124;
  dial_group.add(dial_groove_middle);

  const dial_groove_outerGeom = new THREE.TorusGeometry(1.03, 0.006, 6, 64);
  const dial_groove_outer = new THREE.Mesh(dial_groove_outerGeom, darkBrassMat);
  dial_groove_outer.name = "dial_groove_outer";
  dial_groove_outer.position.z = 0.124;
  dial_group.add(dial_groove_outer);

  const dummy = new THREE.Object3D();

  const dial_ticksGeom = new THREE.BoxGeometry(0.018, 0.17, 0.012);
  const dial_ticks = new THREE.InstancedMesh(dial_ticksGeom, inkMat, 60);
  dial_ticks.name = "dial_ticks";
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const major = i % 5 === 0;
    const radius = major ? 0.99 : 1.035;
    const length = major ? 0.22 : 0.105;
    dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0.133);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(major ? 1.35 : 0.75, length / 0.17, 1);
    dummy.updateMatrix();
    dial_ticks.setMatrixAt(i, dummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_ticks);

  const bezel_ticksGeom = new THREE.BoxGeometry(0.014, 0.09, 0.01);
  const bezel_ticks = new THREE.InstancedMesh(bezel_ticksGeom, inkMat, 24);
  bezel_ticks.name = "bezel_ticks";
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    const major = i % 3 === 0;
    const radius = major ? 1.405 : 1.425;
    const length = major ? 0.12 : 0.075;
    dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0.158);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(major ? 1.25 : 0.75, length / 0.09, 1);
    dummy.updateMatrix();
    bezel_ticks.setMatrixAt(i, dummy.matrix);
  }
  bezel_ticks.instanceMatrix.needsUpdate = true;
  case_group.add(bezel_ticks);

  const segmentDefs = {
    a: [0, 0.5, 0.52, 0.11],
    b: [0.28, 0.25, 0.11, 0.42],
    c: [0.28, -0.25, 0.11, 0.42],
    d: [0, -0.5, 0.52, 0.11],
    e: [-0.28, -0.25, 0.11, 0.42],
    f: [-0.28, 0.25, 0.11, 0.42],
    g: [0, 0, 0.52, 0.11],
    i: [0, 0, 0.11, 1.0],
    q: [0.17, -0.25, 0.11, 0.55, -0.62],
    v: [0, 0, 0.11, 1.0, -0.58]
  };
  const glyphMap = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
    N: ["f", "b", "i"],
    E: ["a", "g", "d", "f", "e"],
    S: ["a", "f", "g", "c", "d"],
    W: ["f", "e", "b", "c", "v"]
  };

  function createStrokeMesh(strokes, geometry, material, z, name) {
    const mesh = new THREE.InstancedMesh(geometry, material, strokes.length);
    mesh.name = name;
    for (let i = 0; i < strokes.length; i++) {
      const stroke = strokes[i];
      dummy.position.set(stroke.x, stroke.y, z);
      dummy.rotation.set(0, 0, stroke.r);
      dummy.scale.set(stroke.w, stroke.h, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  function appendGlyph(strokes, symbol, cx, cy, sx, sy, rotation, z) {
    const keys = glyphMap[symbol] || [];
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    for (const key of keys) {
      const def = segmentDefs[key];
      const lx = def[0] * sx;
      const ly = def[1] * sy;
      strokes.push({
        x: cx + lx * cos - ly * sin,
        y: cy + lx * sin + ly * cos,
        w: def[2] * sx,
        h: def[3] * sy,
        r: rotation + (def[4] || 0),
        z: z
      });
    }
  }

  function appendLabel(strokes, text, cx, cy, sx, sy, rotation, z) {
    const spacing = sx * 0.82;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    for (let i = 0; i < text.length; i++) {
      const offset = (i - (text.length - 1) / 2) * spacing;
      appendGlyph(
        strokes,
        text[i],
        cx + offset * cos,
        cy + offset * sin,
        sx,
        sy,
        rotation,
        z
      );
    }
  }

  const dialStrokeGeom = new THREE.BoxGeometry(1, 1, 0.009);
  const dialTextStrokes = [];
  appendLabel(dialTextStrokes, "N", 0, 0.72, 0.15, 0.16, 0, 0.141);
  appendLabel(dialTextStrokes, "E", 0.72, 0, 0.15, 0.16, 0, 0.141);
  appendLabel(dialTextStrokes, "S", 0, -0.72, 0.15, 0.16, 0, 0.141);
  appendLabel(dialTextStrokes, "W", -0.72, 0, 0.15, 0.16, 0, 0.141);
  appendLabel(dialTextStrokes, "10", -0.58, 0.42, 0.085, 0.105, -0.55, 0.141);
  appendLabel(dialTextStrokes, "20", 0.56, 0.43, 0.085, 0.105, 0.55, 0.141);
  appendLabel(dialTextStrokes, "30", 0.59, -0.39, 0.085, 0.105, -0.55, 0.141);
  appendLabel(dialTextStrokes, "40", -0.58, -0.40, 0.085, 0.105, 0.55, 0.141);
  const dial_text = createStrokeMesh(
    dialTextStrokes,
    dialStrokeGeom,
    inkMat,
    0.141,
    "dial_text"
  );
  dial_group.add(dial_text);

  const bezelStrokeGeom = new THREE.BoxGeometry(1, 1, 0.009);
  const bezelTextStrokes = [];
  const bezelLabels = ["N", "1", "2", "E", "4", "5", "S", "6", "7", "W", "2", "1"];
  for (let i = 0; i < bezelLabels.length; i++) {
    const angle = i / bezelLabels.length * Math.PI * 2;
    const radius = 1.305;
    appendGlyph(
      bezelTextStrokes,
      bezelLabels[i],
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.105,
      0.12,
      -angle,
      0.166
    );
  }
  const bezel_text = createStrokeMesh(
    bezelTextStrokes,
    bezelStrokeGeom,
    inkMat,
    0.166,
    "bezel_text"
  );
  case_group.add(bezel_text);

  const north_needleShape = new THREE.Shape();
  north_needleShape.moveTo(-0.075, -0.045);
  north_needleShape.lineTo(0.075, -0.045);
  north_needleShape.lineTo(0.035, 0.82);
  north_needleShape.lineTo(0, 1.03);
  north_needleShape.lineTo(-0.035, 0.82);
  north_needleShape.closePath();
  const north_needleGeom = new THREE.ExtrudeGeometry(north_needleShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  const north_needle = new THREE.Mesh(north_needleGeom, silverMat);
  north_needle.name = "north_needle";
  north_needle.position.z = 0.151;
  north_needle.rotation.z = Math.PI * 0.75;
  hands_group.add(north_needle);

  const south_needleShape = new THREE.Shape();
  south_needleShape.moveTo(-0.09, -0.045);
  south_needleShape.lineTo(0.09, -0.045);
  south_needleShape.lineTo(0.045, 0.78);
  south_needleShape.lineTo(0, 0.99);
  south_needleShape.lineTo(-0.045, 0.78);
  south_needleShape.closePath();
  const south_needleGeom = new THREE.ExtrudeGeometry(south_needleShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  const south_needle = new THREE.Mesh(south_needleGeom, brassMat);
  south_needle.name = "south_needle";
  south_needle.position.z = 0.151;
  south_needle.rotation.z = Math.PI * 1.25;
  hands_group.add(south_needle);

  const indicator_handShape = new THREE.Shape();
  indicator_handShape.moveTo(-0.065, -0.16);
  indicator_handShape.lineTo(0.065, -0.16);
  indicator_handShape.lineTo(0.045, 0.82);
  indicator_handShape.lineTo(0, 1.04);
  indicator_handShape.lineTo(-0.045, 0.82);
  indicator_handShape.closePath();
  const indicator_handGeom = new THREE.ExtrudeGeometry(indicator_handShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  const indicator_hand = new THREE.Mesh(indicator_handGeom, darkSteelMat);
  indicator_hand.name = "indicator_hand";
  indicator_hand.position.z = 0.174;
  indicator_hand.rotation.z = -Math.PI / 4;
  hands_group.add(indicator_hand);

  const center_washerGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.04, 32);
  const center_washer = new THREE.Mesh(center_washerGeom, darkSteelMat);
  center_washer.name = "center_washer";
  center_washer.rotation.x = Math.PI / 2;
  center_washer.position.z = 0.185;
  hands_group.add(center_washer);

  const center_brass_ringGeom = new THREE.TorusGeometry(0.17, 0.026, 8, 32);
  const center_brass_ring = new THREE.Mesh(center_brass_ringGeom, polishedBrassMat);
  center_brass_ring.name = "center_brass_ring";
  center_brass_ring.position.z = 0.208;
  hands_group.add(center_brass_ring);

  const center_hubGeom = new THREE.CylinderGeometry(0.135, 0.145, 0.085, 32);
  const center_hub = new THREE.Mesh(center_hubGeom, silverMat);
  center_hub.name = "center_hub";
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.235;
  hands_group.add(center_hub);

  const center_capGeom = new THREE.CylinderGeometry(0.105, 0.115, 0.045, 32);
  const center_cap = new THREE.Mesh(center_capGeom, polishedBrassMat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.292;
  hands_group.add(center_cap);

  const center_screwGeom = new THREE.CylinderGeometry(0.075, 0.082, 0.026, 24);
  const center_screw = new THREE.Mesh(center_screwGeom, darkSteelMat);
  center_screw.name = "center_screw";
  center_screw.rotation.x = Math.PI / 2;
  center_screw.position.z = 0.33;
  hands_group.add(center_screw);

  const center_screw_slotGeom = new THREE.BoxGeometry(0.105, 0.018, 0.009);
  const center_screw_slot = new THREE.Mesh(center_screw_slotGeom, inkMat);
  center_screw_slot.name = "center_screw_slot";
  center_screw_slot.position.z = 0.347;
  center_screw_slot.rotation.z = 0.35;
  hands_group.add(center_screw_slot);

  const glass_coverGeom = new THREE.CircleGeometry(1.17, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.355;
  glass_cover.renderOrder = 2;
  case_group.add(glass_cover);

  const crownAngle = Math.PI / 5;
  const crownDir = new THREE.Vector3(
    Math.sin(crownAngle),
    Math.cos(crownAngle),
    0
  ).normalize();
  const crownQuat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    crownDir
  );

  const crown_stemGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.22, 20);
  const crown_stem = new THREE.Mesh(crown_stemGeom, darkBrassMat);
  crown_stem.name = "crown_stem";
  crown_stem.quaternion.copy(crownQuat);
  crown_stem.position.copy(crownDir).multiplyScalar(1.57);
  crown_stem.position.z = -0.08;
  crown_group.add(crown_stem);

  const crown_knobGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.17, 32);
  const crown_knob = new THREE.Mesh(crown_knobGeom, brassMat);
  crown_knob.name = "crown_knob";
  crown_knob.quaternion.copy(crownQuat);
  crown_knob.position.copy(crownDir).multiplyScalar(1.75);
  crown_knob.position.z = -0.08;
  crown_group.add(crown_knob);

  const crown_knurlGeom = new THREE.BoxGeometry(0.026, 0.18, 0.026);
  const crown_knurl = new THREE.InstancedMesh(crown_knurlGeom, polishedBrassMat, 20);
  crown_knurl.name = "crown_knurl";
  const crownTangent = new THREE.Vector3(crownDir.y, -crownDir.x, 0);
  const crownBack = new THREE.Vector3(0, 0, 1);
  const crownAxis = new THREE.Vector3(0, 1, 0);
  const crownBasis = new THREE.Matrix4().makeBasis(
    crownTangent,
    crownAxis,
    crownBack
  );
  const crownQuaternion = new THREE.Quaternion().setFromRotationMatrix(crownBasis);
  const crownCenter = crownDir.clone().multiplyScalar(1.75);
  crownCenter.z = -0.08;
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    const offset = new THREE.Vector3(
      Math.cos(angle) * 0.184,
      0,
      Math.sin(angle) * 0.184
    ).applyQuaternion(crownQuaternion);
    dummy.position.copy(crownCenter).add(offset);
    dummy.quaternion.copy(crownQuaternion);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    crown_knurl.setMatrixAt(i, dummy.matrix);
  }
  crown_knurl.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_knurl);

  const crown_capGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.025, 32);
  const crown_cap = new THREE.Mesh(crown_capGeom, polishedBrassMat);
  crown_cap.name = "crown_cap";
  crown_cap.quaternion.copy(crownQuat);
  crown_cap.position.copy(crownDir).multiplyScalar(1.85);
  crown_cap.position.z = -0.08;
  crown_group.add(crown_cap);

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