'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Plus, Minus, Move, Box } from 'lucide-react';
import { useSite } from './site-context';

export type SceneTopic = 'robotics' | 'perception' | 'engineering';
export function PortfolioScene({
  selected,
  onSelect,
}: {
  selected: SceneTopic;
  onSelect: (topic: SceneTopic) => void;
}) {
  const { language } = useSite();
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({ selected, paused: false, onSelect });
  useEffect(() => {
    state.current.selected = selected;
    state.current.onSelect = onSelect;
  }, [selected, onSelect]);
  const actions = useRef<{
    reset: () => void;
    zoom: (factor: number) => void;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState<SceneTopic | null>(null);

  useEffect(() => {
    let disposed = false;
    let teardown = () => {};
    async function init() {
      const THREE = await import('three');
      const { OrbitControls } =
        await import('three/addons/controls/OrbitControls.js');
      const { RoundedBoxGeometry } =
        await import('three/addons/geometries/RoundedBoxGeometry.js');
      if (disposed || !host.current) return;
      const container = host.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
      camera.position.set(7.2, 6.7, 9.8);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.domElement.setAttribute(
        'aria-label',
        'Interactive 3D robotics and autonomous driving studio',
      );
      renderer.domElement.tabIndex = 0;
      container.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0.85, 0);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minPolarAngle = 0.38;
      controls.maxPolarAngle = 1.38;
      controls.autoRotateSpeed = 0.45;
      controls.update();
      controls.saveState();
      actions.current = {
        reset: () => controls.reset(),
        zoom: (factor) => {
          camera.position.sub(controls.target).multiplyScalar(factor);
          camera.position.clampLength(7, 22).add(controls.target);
        },
      };
      scene.add(new THREE.HemisphereLight(0xd1e7ff, 0x34345e, 2.6));
      const key = new THREE.DirectionalLight(0xeafaff, 4.8);
      key.position.set(5, 9, 6);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -7;
      key.shadow.camera.right = 7;
      key.shadow.camera.top = 7;
      key.shadow.camera.bottom = -7;
      key.shadow.normalBias = 0.04;
      scene.add(key);
      const rim = new THREE.PointLight(0x9f7bff, 30, 15);
      rim.position.set(-4, 4, -3);
      scene.add(rim);
      const cyanLight = new THREE.PointLight(0x65ffd6, 15, 12);
      cyanLight.position.set(4, 2, -2);
      scene.add(cyanLight);
      const mat = (color: number, metalness = 0.25, roughness = 0.4) =>
        new THREE.MeshStandardMaterial({ color, metalness, roughness });
      const ivory = mat(0xe6edf7, 0.3, 0.26),
        navy = mat(0x17243b, 0.55),
        purple = mat(0x9b7bfa, 0.5),
        mint = mat(0x6effcf, 0.5),
        dark = mat(0x070e20, 0.3);
      const glow = new THREE.MeshStandardMaterial({
        color: 0x78ffe0,
        emissive: 0x3fffc6,
        emissiveIntensity: 2,
      });
      const world = new THREE.Group();
      scene.add(world);
      const box = (
        parent: import('three').Object3D,
        w: number,
        h: number,
        d: number,
        material: import('three').Material,
        x: number,
        y: number,
        z: number,
        radius = 0.08,
      ) => {
        const mesh = new THREE.Mesh(
          new RoundedBoxGeometry(w, h, d, 3, radius),
          material,
        );
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      };
      const cylinder = (
        parent: import('three').Object3D,
        r: number,
        height: number,
        material: import('three').Material,
        y: number,
        x = 0,
        z = 0,
      ) => {
        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(r, r, height, 80),
          material,
        );
        mesh.position.set(x, y, z);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        parent.add(mesh);
        return mesh;
      };
      cylinder(world, 4.15, 0.38, navy, -0.4);
      cylinder(world, 4.19, 0.055, purple, -0.25);
      cylinder(world, 4.12, 0.22, mat(0x273750), -0.12);
      for (const radius of [2.75, 3.7]) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.018, 8, 120),
          glow,
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.025;
        world.add(ring);
      }
      for (let i = 0; i < 48; i++) {
        const angle = (i * Math.PI) / 24;
        const dash = box(
          world,
          0.035,
          0.014,
          0.12,
          ivory,
          Math.sin(angle) * 3.2,
          0.02,
          Math.cos(angle) * 3.2,
          0.005,
        );
        dash.rotation.y = angle;
      }
      const robot = new THREE.Group();
      robot.position.set(-0.5, 0, 0.45);
      robot.userData.topic = 'robotics';
      world.add(robot);
      cylinder(robot, 1.12, 0.15, dark, 0.12);
      cylinder(robot, 1.15, 0.035, glow, 0.2);
      const torso = box(robot, 1.25, 1.15, 0.85, ivory, 0, 1.28, 0, 0.2);
      box(robot, 0.6, 0.25, 0.025, navy, 0, 1.35, 0.44);
      box(robot, 0.12, 0.12, 0.035, glow, 0.17, 1.36, 0.46);
      const head = new THREE.Group();
      head.position.y = 2.35;
      robot.add(head);
      box(head, 1.7, 1.2, 1.08, ivory, 0, 0, 0, 0.28);
      box(head, 1.48, 0.68, 0.15, dark, 0, -0.025, 0.51, 0.2);
      for (const x of [-0.37, 0.37])
        box(head, 0.16, 0.26, 0.08, glow, x, 0.025, 0.61, 0.07);
      box(head, 0.22, 0.035, 0.07, glow, 0, -0.2, 0.61, 0.012);
      cylinder(head, 0.05, 0.32, navy, 0.7);
      const antenna = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        mint,
      );
      antenna.position.y = 0.9;
      head.add(antenna);
      for (const side of [-1, 1]) {
        box(robot, 0.38, 0.58, 0.48, navy, side * 0.39, 0.55, 0, 0.1);
        box(robot, 0.5, 0.22, 0.65, ivory, side * 0.39, 0.31, 0.1, 0.1);
        const arm = box(
          robot,
          0.34,
          0.88,
          0.4,
          purple,
          side * 0.88,
          1.35,
          0,
          0.15,
        );
        arm.rotation.z = side * -0.25;
        box(robot, 0.35, 0.27, 0.4, ivory, side * 1, 0.87, 0, 0.1);
      }
      const monitor = new THREE.Group();
      monitor.position.set(1.4, 0, -1.25);
      monitor.rotation.y = -0.22;
      monitor.userData.topic = 'engineering';
      world.add(monitor);
      box(monitor, 0.9, 0.08, 0.65, navy, 0, 0.12, 0);
      box(monitor, 0.16, 0.95, 0.16, purple, 0, 0.63, 0);
      box(monitor, 2.45, 1.55, 0.18, navy, 0, 1.65, 0, 0.12);
      const screen = document.createElement('canvas');
      screen.width = 768;
      screen.height = 448;
      const ctx = screen.getContext('2d')!;
      ctx.fillStyle = '#0d1830';
      ctx.fillRect(0, 0, 768, 448);
      ctx.fillStyle = '#7cfedb';
      ctx.font = '26px monospace';
      ctx.fillText('~/gitcaka   /   workspace', 32, 50);
      const codeLines = [
        'const future = build({',
        '  perception: "beyond sight",',
        '  systems: "ready to run",',
        '  curiosity: Infinity',
        '});',
        '> hello, world_',
      ];
      codeLines.forEach((line, i) => {
        ctx.fillStyle = i === 5 ? '#7cfedb' : i % 2 ? '#bdabff' : '#e3eaff';
        ctx.font = '23px monospace';
        ctx.fillText(line, 32, 115 + i * 48);
      });
      const texture = new THREE.CanvasTexture(screen);
      texture.colorSpace = THREE.SRGBColorSpace;
      const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.24, 1.31),
        new THREE.MeshBasicMaterial({ map: texture }),
      );
      screenMesh.position.set(0, 1.65, 0.1);
      monitor.add(screenMesh);
      box(monitor, 1.45, 0.075, 0.5, ivory, 0, 0.2, 0.75);
      box(monitor, 0.8, 0.01, 0.25, navy, -0.15, 0.24, 0.72);
      const car = new THREE.Group();
      car.userData.topic = 'perception';
      world.add(car);
      box(car, 0.72, 0.27, 1.2, mint, 0, 0.3, 0, 0.11);
      box(car, 0.6, 0.25, 0.64, ivory, 0, 0.54, -0.08, 0.1);
      box(car, 0.53, 0.17, 0.02, dark, 0, 0.55, 0.25);
      for (const x of [-0.37, 0.37])
        for (const z of [-0.36, 0.36]) {
          const wheel = cylinder(car, 0.16, 0.1, dark, 0.19, x, z);
          wheel.rotation.z = Math.PI / 2;
        }
      cylinder(car, 0.11, 0.07, purple, 0.72);
      for (const x of [-0.23, 0.23])
        box(car, 0.13, 0.055, 0.04, glow, x, 0.34, 0.6, 0.01);
      const lidar = new THREE.Group();
      car.add(lidar);
      for (let i = 1; i <= 3; i++) {
        const beam = new THREE.Mesh(
          new THREE.TorusGeometry(i * 0.32, 0.009, 6, 56),
          new THREE.MeshBasicMaterial({
            color: 0x78ffe0,
            transparent: true,
            opacity: 0.55 / i,
          }),
        );
        beam.rotation.x = Math.PI / 2;
        beam.position.y = 0.72;
        lidar.add(beam);
      }
      const satellite = new THREE.Group();
      satellite.position.set(-2, 2.8, -1.4);
      world.add(satellite);
      const cube = box(satellite, 0.6, 0.6, 0.6, purple, 0, 0, 0, 0.09);
      cube.rotation.set(0.4, 0.4, 0.2);
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(0.68, 0.018, 8, 60),
        mint,
      );
      orbit.rotation.x = 0.6;
      satellite.add(orbit);
      const stars = new THREE.BufferGeometry();
      const positions = new Float32Array(100 * 3);
      for (let i = 0; i < 100; i++) {
        positions[i * 3] = Math.sin(i * 127.1) * 6;
        positions[i * 3 + 1] = (Math.cos(i * 37.3) + 1) * 2.8;
        positions[i * 3 + 2] = Math.sin(i * 73.8) * 6;
      }
      stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      scene.add(
        new THREE.Points(
          stars,
          new THREE.PointsMaterial({
            color: 0xb5b8ff,
            size: 0.025,
            transparent: true,
            opacity: 0.5,
          }),
        ),
      );
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let down = { x: 0, y: 0 };
      const hitTest = (event: PointerEvent): SceneTopic | null => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects([robot, monitor, car], true)[0];
        let object = hit?.object;
        while (object && !object.userData.topic) object = object.parent!;
        return object?.userData.topic ?? null;
      };
      const pointerDown = (e: PointerEvent) => {
        down = { x: e.clientX, y: e.clientY };
      };
      const pointerMove = (e: PointerEvent) => {
        const topic = hitTest(e);
        setHover(topic);
        renderer.domElement.style.cursor = topic ? 'pointer' : 'grab';
      };
      const pointerUp = (e: PointerEvent) => {
        if (Math.hypot(e.clientX - down.x, e.clientY - down.y) < 6) {
          const topic = hitTest(e);
          if (topic) state.current.onSelect(topic);
        }
      };
      const keydown = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          const offset = camera.position.clone().sub(controls.target);
          offset.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            e.key === 'ArrowLeft' ? -0.15 : 0.15,
          );
          camera.position.copy(controls.target).add(offset);
        }
      };
      const contextLost = (e: Event) => {
        e.preventDefault();
        setFailed(true);
      };
      renderer.domElement.addEventListener('pointerdown', pointerDown);
      renderer.domElement.addEventListener('pointermove', pointerMove);
      renderer.domElement.addEventListener('pointerup', pointerUp);
      renderer.domElement.addEventListener('keydown', keydown);
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      const resize = () => {
        const w = container.clientWidth,
          h = container.clientHeight;
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (reduced) {
        state.current.paused = true;
        setPaused(true);
      }
      let visible = true;
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibility.observe(container);
      let frame = 0,
        time = 0,
        last = performance.now();
      function animate(now: number) {
        frame = requestAnimationFrame(animate);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible || document.hidden) return;
        if (!state.current.paused) time += dt;
        controls.autoRotate = !state.current.paused;
        head.rotation.y = Math.sin(time * 0.65) * 0.15;
        torso.position.y = 1.28 + Math.sin(time * 1.5) * 0.025;
        satellite.position.y = 2.8 + Math.sin(time) * 0.14;
        cube.rotation.y = time * 0.25;
        const angle = time * 0.19 + 1.1;
        car.position.set(Math.sin(angle) * 3.2, 0.05, Math.cos(angle) * 3.2);
        car.rotation.y = angle + Math.PI / 2;
        lidar.rotation.y = time;
        lidar.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
        robot.scale.setScalar(state.current.selected === 'robotics' ? 1.04 : 1);
        monitor.scale.setScalar(
          state.current.selected === 'engineering' ? 1.06 : 1,
        );
        car.scale.setScalar(state.current.selected === 'perception' ? 1.15 : 1);
        controls.update(dt);
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(animate);
      setReady(true);
      teardown = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        visibility.disconnect();
        controls.dispose();
        texture.dispose();
        renderer.domElement.removeEventListener('pointerdown', pointerDown);
        renderer.domElement.removeEventListener('pointermove', pointerMove);
        renderer.domElement.removeEventListener('pointerup', pointerUp);
        renderer.domElement.removeEventListener('keydown', keydown);
        renderer.domElement.removeEventListener(
          'webglcontextlost',
          contextLost,
        );
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
        actions.current = null;
      };
    }
    init().catch(() => {
      if (!disposed) setFailed(true);
    });
    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  const labels =
    language === 'zh'
      ? {
          robotics: '机器人系统',
          perception: '自动驾驶感知',
          engineering: '软件与作品',
        }
      : {
          robotics: 'Robotics',
          perception: 'Perception',
          engineering: 'Software',
        };
  return (
    <div
      className="studio-scene"
      aria-label={
        language === 'zh' ? '可互动 3D 作品展台' : 'Interactive 3D portfolio'
      }
    >
      <div className="studio-scene-label">
        <span className="live-dot" /> LIVE PLAYGROUND{' '}
        <span>
          0{['robotics', 'perception', 'engineering'].indexOf(selected) + 1} /
          03
        </span>
      </div>
      <div className="scene-canvas" ref={host} data-ready={ready} />
      {(!ready || failed) && (
        <div className="scene-fallback">
          <Box />
          <p>
            {failed
              ? language === 'zh'
                ? '设备暂不支持 3D，仍可使用下方作品入口。'
                : '3D is unavailable. Explore the projects below.'
              : language === 'zh'
                ? '正在搭建我的小小世界…'
                : 'Building my little world…'}
          </p>
        </div>
      )}
      <div className="scene-hover" aria-live="polite">
        {hover
          ? `↗ ${labels[hover]}`
          : language === 'zh'
            ? '点击机器人、车辆或屏幕，发现我的作品'
            : 'Click the robot, vehicle, or screen to explore'}
      </div>
      <div className="scene-tools">
        <span>
          <Move size={14} />{' '}
          {language === 'zh'
            ? '拖动旋转 · 点击探索'
            : 'Drag to rotate · Click to explore'}
        </span>
        <div>
          <button
            type="button"
            aria-label={language === 'zh' ? '缩小 3D 视图' : 'Zoom out'}
            disabled={!ready || failed}
            onClick={() => actions.current?.zoom(1.15)}
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            aria-label={language === 'zh' ? '放大 3D 视图' : 'Zoom in'}
            disabled={!ready || failed}
            onClick={() => actions.current?.zoom(0.87)}
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            aria-label={language === 'zh' ? '重置视角' : 'Reset view'}
            disabled={!ready || failed}
            onClick={() => actions.current?.reset()}
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            aria-label={
              paused
                ? language === 'zh'
                  ? '播放动画'
                  : 'Play animation'
                : language === 'zh'
                  ? '暂停动画'
                  : 'Pause animation'
            }
            aria-pressed={paused}
            disabled={!ready || failed}
            onClick={() => {
              state.current.paused = !paused;
              setPaused(!paused);
            }}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
