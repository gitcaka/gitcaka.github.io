import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { RoomObjectId } from '@/content/room';

export interface RoomItem {
  group: THREE.Group;
  anchor: THREE.Vector3;
  home: THREE.Vector3;
  rotation: THREE.Quaternion;
  scale: THREE.Vector3;
}

export function buildRoom(scene: THREE.Scene, night: boolean) {
  const items = new Map<RoomObjectId, RoomItem>();
  const textures: THREE.Texture[] = [];
  const material = (color: number, roughness = 0.65, metalness = 0.05) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const ivory = material(0xf0eee5),
    wood = material(0xb38863),
    edge = material(0x754d3e),
    navy = material(0x263a48),
    mint = material(0x8fc9b6),
    purple = material(0x918bbd),
    brass = material(0xcea968, 0.3, 0.55),
    black = material(0x172730),
    white = material(0xffffff);
  const room = new THREE.Group();
  scene.add(room);
  const box = (
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    r = 0.04,
  ) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, r), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const cyl = (
    parent: THREE.Object3D,
    r: number,
    h: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    r2 = r,
  ) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r2, h, 40), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const sphere = (
    parent: THREE.Object3D,
    r: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
  ) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    parent.add(m);
    return m;
  };
  const labelTexture = (
    w: number,
    h: number,
    draw: (ctx: CanvasRenderingContext2D) => void,
  ) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d')!;
    draw(ctx);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    textures.push(t);
    return t;
  };
  const text = (
    ctx: CanvasRenderingContext2D,
    value: string,
    x: number,
    y: number,
    size: number,
    color = '#293d45',
    weight = 500,
  ) => {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.fillText(value, x, y);
  };
  const plane = (
    parent: THREE.Object3D,
    w: number,
    h: number,
    texture: THREE.Texture,
    x: number,
    y: number,
    z: number,
  ) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
    );
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const object = (
    id: RoomObjectId,
    x: number,
    y: number,
    z: number,
    anchor: THREE.Vector3,
  ) => {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.userData.roomId = id;
    room.add(group);
    items.set(id, {
      group,
      anchor,
      home: group.position.clone(),
      rotation: group.quaternion.clone(),
      scale: group.scale.clone(),
    });
    return group;
  };
  const remember = (id: RoomObjectId) => {
    const i = items.get(id)!;
    i.rotation.copy(i.group.quaternion);
    i.scale.copy(i.group.scale);
  };

  // A cutaway room, open toward the visitor. Furniture is also used for ray occlusion.
  box(room, 10.5, 0.35, 8.5, wood, 0, -0.25, 0, 0.13);
  box(room, 10.55, 0.11, 8.55, edge, 0, -0.43, 0, 0.1);
  const floor = material(0xd6b99a);
  for (let i = 0; i < 20; i++)
    box(room, 0.5, 0.025, 8.15, floor, -4.76 + i * 0.5, -0.055, 0, 0.012);
  box(room, 10.3, 5.1, 0.19, material(0xb9c9ca), 0, 2.48, -4.13, 0.07);
  box(room, 0.19, 5.1, 8.3, material(0xd8ddd4), -5.13, 2.48, 0, 0.07);
  box(room, 10.1, 0.18, 0.12, ivory, 0, 0.05, -3.98);
  box(room, 0.12, 0.18, 8.1, ivory, -4.98, 0.05, 0);
  box(room, 10.3, 0.12, 0.25, ivory, 0, 5.02, -4.1);
  box(room, 0.25, 0.12, 8.3, ivory, -5.1, 5.02, 0);
  // Window and skyline.
  const windowGroup = new THREE.Group();
  windowGroup.position.set(-5.0, 2.9, -0.75);
  windowGroup.rotation.y = Math.PI / 2;
  room.add(windowGroup);
  box(windowGroup, 2.8, 2.5, 0.16, wood, 0, 0, 0);
  const drawSky = (ctx: CanvasRenderingContext2D, dark: boolean) => {
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, dark ? '#182d49' : '#8dbad3');
    g.addColorStop(1, dark ? '#6d6387' : '#e6d7c0');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = dark ? '#f4e8be' : '#fff0d1';
    ctx.beginPath();
    ctx.arc(360, 110, 44, 0, Math.PI * 2);
    ctx.fill();
    if (dark) {
      ctx.fillStyle = '#ede6cc';
      for (let i = 0; i < 27; i++)
        ctx.fillRect(20 + ((i * 79) % 470), 18 + ((i * 47) % 260), 2, 2);
    }
    for (let j = 0; j < 12; j++) {
      ctx.fillStyle = j % 2 ? '#7b9398' : '#6e858c';
      const h = 70 + ((j * 71) % 150);
      ctx.fillRect(j * 46, 512 - h, 38, h);
      for (let k = 0; k < 6; k++) {
        ctx.fillStyle = '#e5d2a4';
        ctx.fillRect(j * 46 + 8, 520 - h + k * 24, 5, 8);
      }
    }
  };
  const skyTexture = labelTexture(512, 512, (ctx) => drawSky(ctx, night));
  plane(windowGroup, 2.57, 2.26, skyTexture, 0, 0, 0.09);
  box(windowGroup, 0.055, 2.3, 0.1, ivory, 0, 0, 0.15);
  box(windowGroup, 2.6, 0.055, 0.1, ivory, 0, 0, 0.15);
  box(windowGroup, 3.0, 0.12, 0.45, ivory, 0, -1.28, 0.2);
  // Desk and details.
  box(room, 4.65, 0.18, 2.35, wood, -1.6, 1.65, -1.15, 0.12);
  for (const x of [-3.55, 0.35])
    for (const z of [-2.0, -0.35])
      box(room, 0.13, 1.58, 0.13, navy, x, 0.79, z);
  box(room, 0.15, 0.12, 1.7, navy, -3.55, 0.4, -1.15);
  box(room, 0.15, 0.12, 1.7, navy, 0.35, 0.4, -1.15);
  box(room, 2.1, 0.035, 1.25, material(0x668881), -1.3, 1.76, -0.95, 0.12);
  box(room, 0.95, 0.045, 0.33, ivory, -1.5, 1.81, -0.75);
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 12; col++)
      box(
        room,
        0.055,
        0.014,
        0.06,
        navy,
        -1.9 + col * 0.069,
        1.84,
        -0.86 + row * 0.09,
        0.006,
      );
  box(room, 0.15, 0.07, 0.22, ivory, -0.75, 1.81, -0.65, 0.05);
  // Chair tucked at the front of the desk.
  box(room, 1.05, 0.17, 0.9, purple, -1.6, 0.97, 0.5, 0.16);
  box(room, 1.05, 1.0, 0.16, purple, -1.6, 1.55, 0.98, 0.16);
  cyl(room, 0.09, 0.85, navy, -1.6, 0.48, 0.5);
  for (let i = 0; i < 5; i++) {
    const leg = box(room, 0.08, 0.07, 0.68, navy, -1.6, 0.12, 0.5);
    leg.rotation.y = (i * Math.PI * 2) / 5;
    leg.translateZ(0.25);
  }
  // Monitor: original work is displayed as an actual screen texture.
  const monitor = object(
    'screen',
    -1.55,
    1.76,
    -1.9,
    new THREE.Vector3(0, 1.65, 0),
  );
  box(monitor, 2.05, 1.25, 0.13, navy, 0, 1.05, 0, 0.09);
  box(monitor, 0.16, 0.7, 0.16, navy, 0, 0.43, 0);
  box(monitor, 0.8, 0.055, 0.5, navy, 0, 0.04, 0.08);
  const screenTexture = labelTexture(800, 480, (ctx) => {
    ctx.fillStyle = '#152b36';
    ctx.fillRect(0, 0, 800, 480);
    text(ctx, 'gitcaka / selected work', 35, 55, 28, '#bde5d0');
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = ['#466876', '#5a526e', '#367175', '#4c6279'][i];
      ctx.fillRect(35 + (i % 2) * 385, 90 + Math.floor(i / 2) * 185, 355, 160);
      text(
        ctx,
        ['HIGHWAY VISION', 'HELMET VISION', 'VISION STREAM', 'VRU SAFETY'][i],
        55 + (i % 2) * 385,
        185 + Math.floor(i / 2) * 185,
        23,
        '#eaf1e9',
      );
    }
  });
  const screen = plane(monitor, 1.88, 1.08, screenTexture, 0, 1.06, 0.076);
  const loaded = new THREE.TextureLoader().load('/media/highway.png', (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    const m = screen.material as THREE.MeshBasicMaterial;
    m.map = t;
    m.needsUpdate = true;
  });
  textures.push(loaded);
  // Résumé can actually leave the desk and rotate toward the camera.
  const paper = object(
    'resume',
    -0.25,
    1.8,
    -0.1,
    new THREE.Vector3(0, 0.25, 0.2),
  );
  paper.rotation.x = -Math.PI / 2;
  paper.rotation.z = -0.15;
  box(paper, 1.06, 1.48, 0.035, ivory, 0, 0, 0, 0.012);
  const resumeTexture = labelTexture(600, 840, (ctx) => {
    ctx.fillStyle = '#fffdf4';
    ctx.fillRect(0, 0, 600, 840);
    ctx.fillStyle = '#537b70';
    ctx.fillRect(0, 0, 600, 15);
    text(ctx, 'RÉSUMÉ', 45, 65, 23, '#537b70', 700);
    text(ctx, 'WUKANG CAO', 45, 135, 43, '#203c41', 750);
    text(ctx, '曹武康', 45, 180, 28);
    text(ctx, 'AUTONOMOUS DRIVING / ROBOTICS', 45, 215, 17);
    ctx.fillStyle = '#cfdbd5';
    ctx.fillRect(45, 240, 510, 2);
    text(ctx, 'EDUCATION', 45, 285, 20, '#537b70', 700);
    text(ctx, 'Chongqing Jiaotong University', 45, 325, 23);
    text(ctx, 'M.Eng. · Transportation', 45, 360, 21);
    text(ctx, 'EXPERIENCE', 45, 420, 20, '#537b70', 700);
    [
      'Multimodal cooperative driving',
      'ROS mobile manipulation',
      'STM32 balancing robot',
      'Computer vision & simulation',
    ].forEach((s, i) => text(ctx, s, 45, 465 + i * 40, 21));
    text(ctx, 'gitcaka · caka152005@163.com', 45, 740, 20, '#537b70');
    text(ctx, 'UPDATED 2026.10.09', 45, 785, 17, '#85928b');
  });
  plane(paper, 1.035, 1.455, resumeTexture, 0, 0, 0.023);
  remember('resume');
  // A contact card beside a warm reading lamp.
  const card = object(
    'contact',
    -3.13,
    1.81,
    -0.5,
    new THREE.Vector3(0, 0.2, 0),
  );
  card.rotation.x = -Math.PI / 2;
  card.rotation.z = 0.22;
  box(card, 0.88, 0.52, 0.025, mint, 0, 0, 0, 0.035);
  const cardTexture = labelTexture(600, 340, (ctx) => {
    ctx.fillStyle = '#8fc9b6';
    ctx.fillRect(0, 0, 600, 340);
    text(ctx, 'LET’S TALK.', 35, 105, 48, '#183e3c', 750);
    text(ctx, '曹武康 / Wukang Cao', 35, 180, 26);
    text(ctx, 'caka152005@163.com', 35, 230, 25);
    text(ctx, 'github.com/gitcaka', 35, 275, 22);
  });
  plane(card, 0.85, 0.49, cardTexture, 0, 0, 0.018);
  remember('contact');
  cyl(room, 0.23, 0.07, brass, -3.35, 1.8, -1.95);
  const lampArm = box(room, 0.045, 0.95, 0.045, brass, -3.35, 2.27, -1.95);
  lampArm.rotation.z = -0.25;
  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 0.4, 32, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xe1b985, side: THREE.DoubleSide }),
  );
  shade.position.set(-3.2, 2.65, -1.95);
  room.add(shade);
  const lamp = new THREE.PointLight(0xffc68a, night ? 10 : 3, 5);
  lamp.position.set(-3.2, 2.45, -1.95);
  scene.add(lamp);
  cyl(room, 0.15, 0.27, ivory, -2.6, 1.9, -1.8);
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.025, 8, 20),
    ivory,
  );
  handle.position.set(-2.42, 1.93, -1.8);
  room.add(handle);
  // Workshop rug and mobile robot.
  box(room, 3.0, 0.02, 2.45, material(0x8faeaa), -2.6, 0.005, 2.15, 0.22);
  for (let i = 0; i < 6; i++)
    box(room, 2.75, 0.006, 0.018, ivory, -2.6, 0.023, 1.35 + i * 0.3, 0.003);
  const robot = object('robot', -3.0, 0.03, 2.1, new THREE.Vector3(0, 2.05, 0));
  box(robot, 1.05, 0.25, 0.82, navy, 0, 0.25, 0, 0.1);
  for (const x of [-0.55, 0.55]) {
    const w = cyl(robot, 0.22, 0.1, black, x, 0.23, 0);
    w.rotation.z = Math.PI / 2;
  }
  cyl(robot, 0.21, 0.55, ivory, 0, 0.65, 0);
  box(robot, 0.85, 0.72, 0.65, ivory, 0, 1.12, 0, 0.16);
  box(robot, 0.71, 0.39, 0.04, black, 0, 1.17, 0.34, 0.07);
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x9fe5cd,
    emissive: 0x4a947d,
    emissiveIntensity: 0.7,
  });
  for (const x of [-0.18, 0.18])
    box(robot, 0.07, 0.13, 0.035, eyeMat, x, 1.19, 0.37, 0.025);
  box(robot, 0.16, 0.025, 0.02, eyeMat, 0, 1.03, 0.37, 0.007);
  sphere(robot, 0.08, mint, 0, 1.65, 0);
  cyl(robot, 0.025, 0.2, navy, 0, 1.55, 0);
  for (const side of [-1, 1]) {
    box(robot, 0.17, 0.48, 0.21, purple, side * 0.58, 0.98, 0, 0.08);
    sphere(robot, 0.11, brass, side * 0.58, 0.7, 0.08);
  }
  // A miniature road island with a cooperative vehicle and safety cone.
  cyl(room, 1.85, 0.12, ivory, 2.15, 0.08, 1.9);
  cyl(room, 1.72, 0.025, navy, 2.15, 0.16, 1.9);
  const road = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.012, 6, 80),
    ivory,
  );
  road.rotation.x = Math.PI / 2;
  road.position.set(2.15, 0.18, 1.9);
  room.add(road);
  for (let i = 0; i < 24; i++) {
    const a = (i * Math.PI) / 12;
    const dash = box(
      room,
      0.055,
      0.008,
      0.12,
      ivory,
      2.15 + Math.sin(a) * 1.12,
      0.18,
      1.9 + Math.cos(a) * 1.12,
      0.005,
    );
    dash.rotation.y = a;
  }
  const car = object('car', 2.15, 0.22, 2.2, new THREE.Vector3(0, 1.5, 0));
  car.rotation.y = -0.3;
  box(car, 0.95, 0.35, 1.65, mint, 0, 0.3, 0, 0.14);
  box(car, 0.81, 0.34, 0.86, ivory, 0, 0.61, -0.11, 0.13);
  box(car, 0.69, 0.22, 0.035, black, 0, 0.64, 0.33, 0.04);
  box(car, 0.68, 0.2, 0.035, black, 0, 0.64, -0.55, 0.04);
  for (const x of [-0.49, 0.49])
    for (const z of [-0.48, 0.48]) {
      const w = cyl(car, 0.22, 0.13, black, x, 0.24, z);
      w.rotation.z = Math.PI / 2;
    }
  cyl(car, 0.15, 0.09, brass, 0, 0.86, -0.05);
  for (const x of [-0.3, 0.3])
    box(car, 0.15, 0.08, 0.035, white, x, 0.35, 0.83, 0.02);
  remember('car');
  const cone = object('cone', 3.4, 0.18, 0.75, new THREE.Vector3(0, 0.95, 0));
  box(cone, 0.5, 0.055, 0.5, navy, 0, 0.03, 0);
  cyl(cone, 0.065, 0.63, material(0xd99360), 0, 0.38, 0, 0.23);
  cyl(cone, 0.13, 0.12, ivory, 0, 0.38, 0, 0.16);
  // The bookshelf gives small projects their own physical objects.
  for (const x of [2.1, 4.7]) box(room, 0.12, 3.85, 0.75, wood, x, 1.92, -3.35);
  for (const y of [0.2, 1.35, 2.65, 3.85])
    box(room, 2.72, 0.13, 0.87, wood, 3.4, y, -3.35);
  box(room, 2.5, 3.5, 0.06, material(0xa7b7b3), 3.4, 1.95, -3.73);
  const rover = object(
    'rover',
    2.85,
    1.48,
    -3.25,
    new THREE.Vector3(0, 0.9, 0.15),
  );
  box(rover, 0.62, 0.25, 0.5, purple, 0, 0.3, 0);
  for (const x of [-0.37, 0.37]) {
    const w = cyl(rover, 0.26, 0.12, black, x, 0.27, 0);
    w.rotation.z = Math.PI / 2;
  }
  box(rover, 0.42, 0.48, 0.16, mint, 0, 0.6, 0);
  sphere(rover, 0.055, brass, -0.12, 0.68, 0.1);
  sphere(rover, 0.055, brass, 0.12, 0.68, 0.1);
  const cameraObj = object(
    'camera',
    4.05,
    2.76,
    -3.25,
    new THREE.Vector3(0, 0.7, 0.1),
  );
  box(cameraObj, 0.82, 0.45, 0.38, navy, 0, 0.25, 0, 0.08);
  box(cameraObj, 0.25, 0.1, 0.3, navy, -0.18, 0.52, 0);
  const lens = cyl(cameraObj, 0.22, 0.24, black, 0, 0.25, 0.3);
  lens.rotation.x = Math.PI / 2;
  const glass = cyl(
    cameraObj,
    0.16,
    0.02,
    new THREE.MeshStandardMaterial({
      color: 0x8fc9cb,
      metalness: 0.7,
      roughness: 0.15,
    }),
    0,
    0.25,
    0.43,
  );
  glass.rotation.x = Math.PI / 2;
  const books = object(
    'books',
    3.65,
    0.3,
    -3.25,
    new THREE.Vector3(0, 0.75, 0.2),
  );
  for (let i = 0; i < 6; i++)
    box(
      books,
      0.16,
      0.6 + (i % 3) * 0.14,
      0.45,
      [mint, purple, ivory, navy, brass][i % 5],
      -0.5 + i * 0.18,
      0.45,
      0,
      0.02,
    );
  const trophyBase = box(books, 0.35, 0.1, 0.32, navy, -0.9, 0.07, 0);
  cyl(books, 0.045, 0.38, brass, -0.9, 0.3, 0);
  sphere(books, 0.17, brass, -0.9, 0.57, 0);
  trophyBase.userData.decorative = true;
  const emotion = object(
    'emotion',
    2.8,
    2.79,
    -3.25,
    new THREE.Vector3(0, 0.8, 0),
  );
  box(emotion, 0.75, 0.65, 0.08, ivory, 0, 0.33, 0);
  const faceTexture = labelTexture(400, 320, (ctx) => {
    ctx.fillStyle = '#d2c5df';
    ctx.fillRect(0, 0, 400, 320);
    ctx.strokeStyle = '#4f5470';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(200, 145, 85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#4f5470';
    ctx.fillRect(163, 115, 12, 25);
    ctx.fillRect(226, 115, 12, 25);
    ctx.beginPath();
    ctx.arc(200, 155, 40, 0.2, Math.PI - 0.2);
    ctx.stroke();
    text(ctx, 'DER-NR', 128, 285, 27, '#4f5470', 700);
  });
  plane(emotion, 0.65, 0.55, faceTexture, 0, 0.34, 0.05);
  // Framed CARLA map above the desk, readable from the overview.
  const map = object('map', 0.7, 3.45, -3.94, new THREE.Vector3(0, 1.0, 0.15));
  box(map, 1.75, 1.25, 0.11, wood, 0, 0, 0, 0.04);
  const mapTexture = labelTexture(700, 480, (ctx) => {
    ctx.fillStyle = '#f0e8d5';
    ctx.fillRect(0, 0, 700, 480);
    ctx.strokeStyle = '#bdcbbc';
    ctx.lineWidth = 27;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 110, 0);
      ctx.lineTo(i * 110 - 170, 480);
      ctx.stroke();
    }
    for (let j = 0; j < 6; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * 90);
      ctx.lineTo(700, j * 90 + 75);
      ctx.stroke();
    }
    ctx.strokeStyle = '#d29762';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(80, 390);
    ctx.lineTo(250, 310);
    ctx.lineTo(320, 110);
    ctx.lineTo(570, 130);
    ctx.stroke();
    text(ctx, 'CARLA / CLOSED LOOP', 35, 445, 27, '#314e4f', 700);
  });
  plane(map, 1.58, 1.08, mapTexture, 0, 0, 0.065);
  // Wall identity, floor plant, and lived-in details.
  const sign = labelTexture(1000, 260, (ctx) => {
    ctx.fillStyle = '#b9c9ca';
    ctx.fillRect(0, 0, 1000, 260);
    text(ctx, 'WUKANG’S STUDIO', 30, 120, 65, '#38545a', 700);
    text(ctx, 'BUILD  /  EXPLORE  /  VALIDATE', 35, 190, 27, '#657e80');
  });
  plane(room, 3.6, 0.94, sign, -2.5, 4.0, -4.015);
  const potMat = material(0xc88f76);
  cyl(room, 0.38, 0.65, potMat, 4.45, 0.32, 3.25, 0.3);
  const leafMat = material(0x547d62);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), leafMat);
    leaf.scale.set(0.4, 2.8, 0.65);
    leaf.position.set(
      4.45 + Math.sin(a) * 0.19,
      1.0 + (i % 3) * 0.17,
      3.25 + Math.cos(a) * 0.19,
    );
    leaf.rotation.z = Math.sin(a) * 0.55;
    leaf.rotation.x = Math.cos(a) * 0.55;
    leaf.castShadow = true;
    room.add(leaf);
  }
  box(room, 0.7, 0.12, 0.42, purple, -4.38, 0.08, -3.1);
  box(room, 0.65, 0.12, 0.38, ivory, -4.38, 0.21, -3.1);

  const ambient = new THREE.HemisphereLight(
    night ? 0xc1d2ff : 0xe6f1ff,
    0x9d7959,
    night ? 0.8 : 2.6,
  );
  scene.add(ambient);
  const sunlight = new THREE.DirectionalLight(
    night ? 0xa8bdff : 0xffedce,
    night ? 0.9 : 3.4,
  );
  sunlight.position.set(-3, 9, 6);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048, 2048);
  sunlight.shadow.camera.left = -9;
  sunlight.shadow.camera.right = 9;
  sunlight.shadow.camera.top = 9;
  sunlight.shadow.camera.bottom = -9;
  sunlight.shadow.normalBias = 0.04;
  scene.add(sunlight);
  const fill = new THREE.DirectionalLight(0xd6d2ff, night ? 1.3 : 0.8);
  fill.position.set(6, 5, 1);
  scene.add(fill);
  return {
    items,
    room,
    setNight(value: boolean) {
      ambient.intensity = value ? 0.8 : 2.6;
      ambient.color.setHex(value ? 0xa4bcff : 0xe6f1ff);
      sunlight.intensity = value ? 0.9 : 3.4;
      sunlight.color.setHex(value ? 0x8aa9ff : 0xffedce);
      lamp.intensity = value ? 10 : 3;
      fill.intensity = value ? 1.3 : 0.8;
      drawSky((skyTexture.image as HTMLCanvasElement).getContext('2d')!, value);
      skyTexture.needsUpdate = true;
    },
    dispose() {
      textures.forEach((t) => t.dispose());
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          geometries.add(o.geometry);
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            materials.add(m),
          );
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}
