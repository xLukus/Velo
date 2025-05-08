import * as THREE from "three";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
gsap.registerPlugin(ScrollTrigger);
const loadingDiv = document.querySelector(".loadingDiv");

// /**
//  * Base
//  */
// // Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
); // or your local path to `draco_decoder.js`
dracoLoader.setDecoderConfig({ type: "js" });
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
let bike, object471, object279, mixer, clip;
let lastUpdateTime = 0;
loader.load(
  "/model/minimized_bike.glb",
  function (gltf) {
    bike = gltf.scene;
    object471 = gltf.scene.getObjectByName("ZB_VR_299");
    object279 = gltf.scene.getObjectByName("ZB_HR_6");
    mixer = new THREE.AnimationMixer(bike);
    const clips = gltf.animations;
    clip = THREE.AnimationClip.findByName(clips, "Explosion View");

    const action = mixer.clipAction(clip);
    action.play();

    tick();
    gsap.to(".loadingDiv", {
      y: -4000,
      duration: 0.5,
      opacity: 0,
      onComplete: startingAnim(),
    });
    bike.scale.set(1, 1, 1);
    scene.add(bike);
    bike.position.x = 2.6;
    bike.position.y = -0.4;
    bike.rotation.x = -0.2;
    // gui.add(bike.position, "x").min(-3).max(3).step(0.1);
    // gui.add(bike.position, "y").min(-3).max(3).step(0.1);
    // gui.add(bike.position, "z").min(-3).max(3).step(0.1);
    // gui.add(bike.rotation, "x").min(-3).max(3).step(0.1).name("rotationX");
    // gui.add(bike.rotation, "y").min(-3).max(3).step(0.1).name("rotationY");
    // gui.add(bike.rotation, "z").min(-3).max(3).step(0.1).name("rotationZ");

    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // wrapper that holds all 6 sections
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        // Optional: pins the container
      },
    });
    modelTimeline
      .to(
        bike.position,
        {
          x: 0.5,
          y: 1,
          z: 0.8,
          duration: 1,
        },
        0
      ) // Section 1
      .to(bike.position, { x: 0, y: -1, z: 0.7, duration: 1 }, 1) // Section 2
      .to(bike.rotation, { x: 0.1, y: 0.3, z: 1, duration: 1 }, 1) // Section 2
      .to(bike.position, { x: 1.3, y: 0.1, z: 0.3, pin: true, duration: 1 }, 2) // Section 3
      .to(
        bike.rotation,
        { x: -0.2, y: 3, z: -0.9, pin: true, duration: 0.5 },
        2
      ) // Section 3
      .to(bike.position, { x: -0.8, y: -0.2, z: 0.9, duration: 1 }, 3)
      .to(bike.rotation, { x: -0.2, y: -1, z: 1, duration: 1 }, 3) // Section 4
      .to(bike.position, { x: 0, y: -0.3, z: 0.5, duration: 1 }, 4)
      .to(bike.rotation, { x: 0.1, y: -0.2, z: 0.1, duration: 1 }, 4) // Section 5
      .to(bike.position, { x: 0, y: 1, z: 1, duration: 1 }, 5); // Section 5
  },
  function (xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      const now = performance.now();

      // Only update every ~16ms (60fps)
      if (now - lastUpdateTime > 16) {
        requestAnimationFrame(() => {
          loadingDiv.innerHTML = `Loading ${percentComplete.toFixed(2)}%`;
        });
        lastUpdateTime = now;
      }
    } else {
      console.log(`Loaded ${xhr.loaded} bytes`);
    }
  }
);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

////MODEL ANIMATIONNNN=-----------------------------------------------

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const delta = clock.getDelta();
  object279.rotation.y = elapsedTime;
  object471.rotation.y = elapsedTime;
  // Update controls
  if (mixer) mixer.update(0.01);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// /
//     /
//     /
//     /

// //
//     /

//     /
const startingAnim = () => {
  gsap.from(".nav", {
    y: -200,
    duration: 0.5,
  });
  gsap.from(".rock1", {
    x: 200,
    duration: 0.7,
  });
  gsap.from(".hero-intro", {
    y: 200,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
  });
  gsap.from(".scroll1", {
    y: 200,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".trigger1",
      start: "top center",
      end: "+=500px",
    },
  });
  gsap.from(".scroll2", {
    y: 200,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".trigger1",
      start: "top center-=200",
      end: "+=500px",
    },
  });
  gsap.from(".rock2", {
    x: -200,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".trigger1",
      start: "top top",
      end: "+=500px",
    },
  });
  gsap.from(".ride", {
    y: 200,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".ride-trigger",
      start: "top center",
      end: "+=500px",
    },
  });
  gsap.from(".ride-img", {
    x: 200,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".ride-trigger",
      start: "top center",
      end: "+=500px",
    },
  });
  gsap.from(".exp", {
    y: 200,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".expirience-trigger",
      start: "top center",
      end: "+=500px",
    },
  });
  gsap.from(".exp-rock", {
    x: -300,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".expirience-trigger",
      start: "top center",
      end: "+=500px",
    },
  });
  gsap.from(".speed", {
    y: 200,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".speed-trigger",
      start: "top center",
      end: "+=500px",
    },
  });
  gsap.from(".footer", {
    y: 200,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".footer-trigger",
      start: "top top+=500 ",
      end: "+=500px",
    },
  });
};
