'use client';
import type { Vector3, Quaternion } from 'three';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { roomObjects, type RoomObjectId, type RoomView } from '@/content/room';
import { useSite } from './site-context';

export interface RoomControls {
  view: (view: RoomView) => void;
  zoom: (factor: number) => void;
}
interface Props {
  active: RoomObjectId | null;
  returning: boolean;
  night: boolean;
  showLabels: boolean;
  onPick: (id: RoomObjectId) => void;
  onInspectReady: () => void;
  onRestored: () => void;
  onStatus: (status: 'ready' | 'failed') => void;
}

export const RoomScene = forwardRef<RoomControls, Props>(function RoomScene(
  {
    active,
    returning,
    night,
    showLabels,
    onPick,
    onInspectReady,
    onRestored,
    onStatus,
  },
  ref,
) {
  const { language } = useSite();
  const host = useRef<HTMLDivElement>(null);
  const markers = useRef(new Map<RoomObjectId, HTMLButtonElement>());
  const actions = useRef<RoomControls | null>(null);
  const state = useRef({
    active,
    returning,
    night,
    onPick,
    onInspectReady,
    onRestored,
    onStatus,
  });
  const [hover, setHover] = useState<RoomObjectId | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    state.current = {
      active,
      returning,
      night,
      onPick,
      onInspectReady,
      onRestored,
      onStatus,
    };
  }, [active, returning, night, onPick, onInspectReady, onRestored, onStatus]);
  useImperativeHandle(
    ref,
    () => ({
      view: (v) => actions.current?.view(v),
      zoom: (f) => actions.current?.zoom(f),
    }),
    [],
  );

  useEffect(() => {
    let disposed = false,
      cleanup = () => {};
    async function initialize() {
      const THREE = await import('three');
      const { OrbitControls } =
        await import('three/addons/controls/OrbitControls.js');
      const { buildRoom } = await import('@/lib/room-world');
      if (disposed || !host.current) return;
      const container = host.current;
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.domElement.tabIndex = 0;
      renderer.domElement.setAttribute(
        'aria-label',
        '3D studio. Drag to orbit, scroll to zoom. Arrow keys rotate.',
      );
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-9, 9, 6, -6, 0.1, 100);
      camera.position.set(12, 10, 15);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 1.7, 0);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minPolarAngle = 0.5;
      controls.maxPolarAngle = 1.4;
      controls.minAzimuthAngle = 0.05;
      controls.maxAzimuthAngle = 1.45;
      controls.minZoom = 0.7;
      controls.maxZoom = 2.8;
      controls.rotateSpeed = 0.6;
      controls.zoomSpeed = 0.65;
      controls.update();
      const world = buildRoom(scene, state.current.night);
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ray = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let width = 1,
        height = 1,
        lastNight = state.current.night,
        frame = 0,
        previousActive: RoomObjectId | null = null;
      let transition: null | {
        start: number;
        duration: number;
        from: Vector3;
        to: Vector3;
        targetFrom: Vector3;
        targetTo: Vector3;
        zoomFrom: number;
        zoomTo: number;
        done?: () => void;
      } = null;
      let pickup: null | {
        id: RoomObjectId;
        start: number;
        returning: boolean;
        from: Vector3;
        to: Vector3;
        rotationFrom: Quaternion;
        rotationTo: Quaternion;
        scaleFrom: Vector3;
        scaleTo: Vector3;
        duration: number;
      } = null;
      let restore = {
        position: camera.position.clone(),
        target: controls.target.clone(),
        zoom: camera.zoom,
      };
      let returnReported = false;
      const finishReturn = () => {
        if (returnReported) return;
        returnReported = true;
        state.current.onRestored();
      };
      const tweenCamera = (
        position: Vector3,
        target: Vector3,
        zoom: number,
        done?: () => void,
      ) => {
        transition = {
          start: performance.now(),
          duration: reduced ? 20 : 700,
          from: camera.position.clone(),
          to: position,
          targetFrom: controls.target.clone(),
          targetTo: target,
          zoomFrom: camera.zoom,
          zoomTo: zoom,
          done,
        };
      };
      const views = {
        overview: {
          position: new THREE.Vector3(12, 10, 15),
          target: new THREE.Vector3(0, 1.7, 0),
          zoom: 1,
        },
        desk: {
          position: new THREE.Vector3(8, 7, 12),
          target: new THREE.Vector3(-1.6, 1.8, -0.8),
          zoom: 1.7,
        },
        garage: {
          position: new THREE.Vector3(10, 8, 14),
          target: new THREE.Vector3(-0.1, 0.9, 1.7),
          zoom: 1.6,
        },
        shelf: {
          position: new THREE.Vector3(10, 7, 12),
          target: new THREE.Vector3(3.15, 2, -3),
          zoom: 2,
        },
      };
      actions.current = {
        view(view) {
          if (state.current.active || state.current.returning) return;
          const v = views[view];
          tweenCamera(v.position, v.target, v.zoom);
        },
        zoom(f) {
          if (
            !state.current.active &&
            !state.current.returning &&
            !transition
          ) {
            camera.zoom = THREE.MathUtils.clamp(camera.zoom * f, 0.7, 2.8);
            camera.updateProjectionMatrix();
          }
        },
      };
      function hit(event: PointerEvent) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          (-(event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        ray.setFromCamera(pointer, camera);
        const first = ray.intersectObjects(world.room.children, true)[0];
        let o = first?.object;
        while (o && !o.userData.roomId) o = o.parent!;
        return (o?.userData.roomId ?? null) as RoomObjectId | null;
      }
      const pointers = new Set<number>();
      let gesture: {
        id: number;
        x: number;
        y: number;
        dragged: boolean;
      } | null = null;
      const down = (e: PointerEvent) => {
        pointers.add(e.pointerId);
        if (pointers.size > 1 && gesture) gesture.dragged = true;
        else
          gesture = {
            id: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            dragged: false,
          };
      };
      const move = (e: PointerEvent) => {
        if (
          gesture &&
          Math.hypot(e.clientX - gesture.x, e.clientY - gesture.y) > 7
        )
          gesture.dragged = true;
        if (state.current.active || state.current.returning || transition)
          return;
        const id = hit(e);
        setHover(id);
        renderer.domElement.style.cursor = gesture?.dragged
          ? 'grabbing'
          : id
            ? 'pointer'
            : 'grab';
      };
      const up = (e: PointerEvent) => {
        pointers.delete(e.pointerId);
        if (
          gesture?.id === e.pointerId &&
          !gesture.dragged &&
          !state.current.active &&
          !state.current.returning &&
          !transition &&
          pointers.size === 0
        ) {
          const id = hit(e);
          if (id) state.current.onPick(id);
        }
        if (pointers.size === 0) gesture = null;
      };
      const cancel = () => {
        pointers.clear();
        gesture = null;
        setHover(null);
      };
      const leave = () => setHover(null);
      const key = (e: KeyboardEvent) => {
        if (state.current.active || state.current.returning) return;
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          transition = null;
          const offset = camera.position.clone().sub(controls.target);
          offset.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            e.key === 'ArrowLeft' ? -0.12 : 0.12,
          );
          camera.position.copy(controls.target).add(offset);
        } else if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          actions.current?.zoom(1.15);
        } else if (e.key === '-') {
          e.preventDefault();
          actions.current?.zoom(0.87);
        }
      };
      const lost = (e: Event) => {
        e.preventDefault();
        state.current.onStatus('failed');
        setReady(false);
      };
      renderer.domElement.addEventListener('pointerdown', down);
      renderer.domElement.addEventListener('pointermove', move);
      renderer.domElement.addEventListener('pointerup', up);
      renderer.domElement.addEventListener('pointercancel', cancel);
      renderer.domElement.addEventListener('pointerleave', leave);
      renderer.domElement.addEventListener('keydown', key);
      renderer.domElement.addEventListener('webglcontextlost', lost);
      const resize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        const aspect = width / Math.max(height, 1);
        const viewHeight = Math.max(10.3, 14.3 / aspect);
        camera.left = (-viewHeight * aspect) / 2;
        camera.right = (viewHeight * aspect) / 2;
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const projected = new THREE.Vector3();
      function animate(now: number) {
        frame = requestAnimationFrame(animate);
        if (document.hidden) return;
        if (!state.current.returning) returnReported = false;
        if (lastNight !== state.current.night) {
          lastNight = state.current.night;
          world.setNight(lastNight);
        }
        if (state.current.active !== previousActive) {
          const id = state.current.active;
          if (id) {
            restore = {
              position: camera.position.clone(),
              target: controls.target.clone(),
              zoom: camera.zoom,
            };
            const item = world.items.get(id)!;
            if (id === 'resume' || id === 'contact') {
              const to = controls.target
                .clone()
                .add(new THREE.Vector3(0, 1.4, 0));
              pickup = {
                id,
                start: now,
                returning: false,
                from: item.group.position.clone(),
                to,
                rotationFrom: item.group.quaternion.clone(),
                rotationTo: camera.quaternion.clone(),
                scaleFrom: item.group.scale.clone(),
                scaleTo: new THREE.Vector3(3, 3, 3),
                duration: reduced ? 20 : 650,
              };
            } else {
              const target = item.home
                .clone()
                .add(item.anchor.clone().multiplyScalar(0.4));
              const offset = camera.position.clone().sub(controls.target);
              tweenCamera(
                target.clone().add(offset),
                target,
                Math.min(camera.zoom * 1.35, 2.4),
                () => state.current.onInspectReady(),
              );
            }
          } else if (previousActive) {
            const item = world.items.get(previousActive)!;
            if (previousActive === 'resume' || previousActive === 'contact')
              pickup = {
                id: previousActive,
                start: now,
                returning: true,
                from: item.group.position.clone(),
                to: item.home.clone(),
                rotationFrom: item.group.quaternion.clone(),
                rotationTo: item.rotation.clone(),
                scaleFrom: item.group.scale.clone(),
                scaleTo: item.scale.clone(),
                duration: reduced ? 20 : 500,
              };
            tweenCamera(
              restore.position,
              restore.target,
              restore.zoom,
              finishReturn,
            );
          }
          previousActive = id;
          setHover(null);
        }
        controls.enabled =
          !state.current.active &&
          !state.current.returning &&
          !transition &&
          !pickup;
        if (transition) {
          const t = Math.min((now - transition.start) / transition.duration, 1),
            s = ease(t);
          camera.position.lerpVectors(transition.from, transition.to, s);
          controls.target.lerpVectors(
            transition.targetFrom,
            transition.targetTo,
            s,
          );
          camera.zoom = THREE.MathUtils.lerp(
            transition.zoomFrom,
            transition.zoomTo,
            s,
          );
          camera.updateProjectionMatrix();
          if (t === 1) {
            const done = transition.done;
            transition = null;
            done?.();
          }
        }
        if (pickup) {
          const item = world.items.get(pickup.id)!;
          const t = Math.min((now - pickup.start) / pickup.duration, 1),
            s = ease(t);
          item.group.position.lerpVectors(pickup.from, pickup.to, s);
          item.group.quaternion.slerpQuaternions(
            pickup.rotationFrom,
            pickup.rotationTo,
            s,
          );
          item.group.scale.lerpVectors(pickup.scaleFrom, pickup.scaleTo, s);
          if (t === 1) {
            const opened = !pickup.returning;
            pickup = null;
            if (opened && state.current.active) state.current.onInspectReady();
          }
        }
        // A selection may be cancelled before its first animation frame.
        if (
          state.current.returning &&
          !previousActive &&
          !transition &&
          !pickup
        )
          finishReturn();
        controls.update();
        renderer.render(scene, camera);
        world.items.forEach((item, id) => {
          const button = markers.current.get(id);
          if (!button) return;
          projected.copy(item.anchor);
          item.group.localToWorld(projected);
          projected.project(camera);
          const x = (projected.x * 0.5 + 0.5) * width,
            y = (-projected.y * 0.5 + 0.5) * height;
          button.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
          button.style.visibility =
            projected.z > 1 ||
            x < 24 ||
            x > width - 24 ||
            y < 70 ||
            y > height - 96
              ? 'hidden'
              : 'visible';
        });
      }
      frame = requestAnimationFrame(animate);
      setReady(true);
      state.current.onStatus('ready');
      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        controls.dispose();
        world.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        actions.current = null;
      };
    }
    initialize().catch(() => {
      if (!disposed) state.current.onStatus('failed');
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const hovered = roomObjects.find((item) => item.id === hover);
  return (
    <>
      <div className="room-canvas" ref={host} data-ready={ready} />
      <div
        className="room-markers"
        data-visible={ready && showLabels && !active && !returning}
        aria-hidden={!ready || !showLabels || !!active || returning}
      >
        {roomObjects.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              if (el) markers.current.set(item.id, el);
              else markers.current.delete(item.id);
            }}
            type="button"
            className={`room-pin ${hover === item.id ? 'is-hovered' : ''}`}
            tabIndex={ready && showLabels && !active && !returning ? 0 : -1}
            aria-label={`${item.label[language]} · ${language === 'zh' ? '拿起查看' : 'Pick up and read'}`}
            data-object={item.id}
            onPointerEnter={() => setHover(item.id)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(item.id)}
            onBlur={() => setHover(null)}
            onClick={() => {
              if (!returning && !active) onPick(item.id);
            }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{item.label[language]}</b>
          </button>
        ))}
      </div>
      {hovered && !active && !returning && (
        <div className="room-object-tooltip" role="status">
          <strong>{hovered.label[language]}</strong>
          <span>{hovered.hint[language]}</span>
        </div>
      )}
    </>
  );
});
