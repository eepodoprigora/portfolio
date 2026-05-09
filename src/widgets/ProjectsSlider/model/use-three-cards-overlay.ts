import { RefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../shaders";

type Params = {
    hostRef: RefObject<HTMLElement | null>;
    mediaRefs: RefObject<HTMLElement[]>;
    imageUrls: string[];
    progressPx: number;
    enabled?: boolean;

    maxDpr?: number;
    segX?: number;
    segY?: number;
};

const getViewSize = (camera: THREE.PerspectiveCamera) => {
    const dist = camera.position.z;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const h = 2 * Math.tan(vFov / 2) * dist;
    return { width: h * camera.aspect, height: h };
};

export const useThreeProjectsOverlay = ({
    hostRef,
    mediaRefs,
    imageUrls,
    progressPx,
    enabled = true,

    maxDpr = 1.25,
    segX = 20,
    segY = 32,
}: Params) => {
    const urlsKey = useMemo(() => imageUrls.join("|"), [imageUrls]);

    const targetRef = useRef(progressPx);
    const currentRef = useRef(progressPx);

    const dirtyRef = useRef(true);
    const needsResizeRef = useRef(true);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        targetRef.current = progressPx;
    }, [progressPx]);

    useEffect(() => {
        const host = hostRef.current;
        if (!enabled || !host) return;
        if (!imageUrls.length) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
        renderer.setClearAlpha(0);
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
        camera.position.set(0, 0, 6);

        const group = new THREE.Group();
        scene.add(group);

        const geometry = new THREE.PlaneGeometry(1, 1, segX, segY);
        const loader = new THREE.TextureLoader();

        const textures: THREE.Texture[] = [];
        const materials: THREE.ShaderMaterial[] = [];
        const meshes: THREE.Mesh[] = [];

        for (let i = 0; i < imageUrls.length; i++) {
            const tex = loader.load(imageUrls[i]);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;

            const mat = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                uniforms: {
                    uAlpha: { value: 1 },
                    tMap: { value: tex },

                    uTime: { value: 0 },
                    uSpeed: { value: 0 },

                    uViewportSizes: { value: new THREE.Vector2(1, 1) },
                    uStrength: { value: 0 },
                    uMobile: { value: Math.PI * Math.PI * 1.3 },
                },
                vertexShader,
                fragmentShader,
            });

            const mesh = new THREE.Mesh(geometry, mat);
            mesh.frustumCulled = false;
            group.add(mesh);

            textures.push(tex);
            materials.push(mat);
            meshes.push(mesh);
        }

        let sizes = getViewSize(camera);

        const setSize = () => {
            const w = host.clientWidth;
            const h = host.clientHeight;
            if (!w || !h) return;

            renderer.setSize(w, h, false);

            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            sizes = getViewSize(camera);

            for (const mat of materials) {
                mat.uniforms.uViewportSizes.value.set(sizes.width, sizes.height);
            }

            dirtyRef.current = true;
        };

        const syncRects = () => {
            const baseRect = host.getBoundingClientRect();
            const baseW = baseRect.width || 1;
            const baseH = baseRect.height || 1;

            const els = mediaRefs.current;

            for (let i = 0; i < meshes.length; i++) {
                const el = els[i];
                if (!el) continue;

                const r = el.getBoundingClientRect();
                if (!r.width || !r.height) continue;

                const mesh = meshes[i];

                mesh.scale.x = sizes.width * (r.width / baseW);
                mesh.scale.y = sizes.height * (r.height / baseH);

                const xNorm = (r.left - baseRect.left) / baseW;
                const yNorm = (r.top - baseRect.top) / baseH;

                mesh.position.x = -sizes.width / 2 + mesh.scale.x / 2 + xNorm * sizes.width;
                mesh.position.y = sizes.height / 2 - mesh.scale.y / 2 - yNorm * sizes.height;

                mesh.position.z = 0;
                mesh.rotation.set(0, 0, 0);
            }
        };

        const ro = new ResizeObserver(() => {
            needsResizeRef.current = true;
        });
        ro.observe(host);

        const clock = new THREE.Clock();

        needsResizeRef.current = true;
        dirtyRef.current = true;

        const tick = () => {
            if (needsResizeRef.current) {
                needsResizeRef.current = false;
                setSize();
            }

            const target = targetRef.current;
            const cur = currentRef.current;
            const next = cur + (target - cur) * 0.1;
            currentRef.current = next;

            const strength = 0.0018 * (target - next);
            const speed = Math.min(1, Math.abs(strength));

            const t = clock.getElapsedTime();

            for (const mat of materials) {
                mat.uniforms.uTime.value = t;
                mat.uniforms.uSpeed.value = speed;
                mat.uniforms.uStrength.value = strength;
            }

            const moving = Math.abs(target - next) > 0.25;

            if (dirtyRef.current || moving) {
                syncRects();
                dirtyRef.current = false;
            }

            renderer.render(scene, camera);
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            ro.disconnect();

            meshes.forEach((m) => group.remove(m));
            materials.forEach((m) => m.dispose());
            textures.forEach((t) => t.dispose());
            geometry.dispose();

            renderer.dispose();
            if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        };
    }, [enabled, hostRef, mediaRefs, urlsKey, maxDpr, segX, segY]);

    return null;
};