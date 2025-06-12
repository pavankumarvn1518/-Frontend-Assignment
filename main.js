// import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";


// let scene, camera, renderer,controls,skybox;
// let planet_sun,planet_mercury,planet_venus,planet_earth,planet_mars,planet_jupiter, planet_uranus,planet_neptune;


// let mercury_orbit_radius = 50
// let venus_orbit_radius = 60
// let earth_orbit_radius = 70
// let mars_orbit_radius = 80
// let jupiter_orbit_radius = 100
// let saturn_orbit_radius = 120
// let uranus_orbit_radius = 140
// let neptune_orbit_radius = 160


// let mercury_revolution_speed = 2.0
// let venus_revolution_speed = 1.5
// let earth_revolution_speed = 1
// let mars_revolution_speed = 0.8
// let jupiter_revolution_speed = 0.7
// let saturn_revolution_speed = 0.6
// let uranus_revolution_speed = 0.5
// let neptune_revolution_speed = 0.4



// function  createMatrixArray(){
//   const skyboxImagepaths = [
//     './img/skybox/space_ft.png',
//      './img/skybox/space_bk.png', 
//      './img/skybox/space_up.png',
//       './img/skybox/space_dn.png',
//        './img/skybox/space_rt.png',
//         './img/skybox/space_lf.png'
//     ]
//   const materialArray= skyboxImagepaths.map((image)=>{
//     let texture=new THREE.TextureLoader().load(image)
//     return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide})

//   })
//   return materialArray;
// }
//   function setSkyBox(){
//     const materialArray = createMatrixArray()
//     let skyboxGeo =new THREE.BoxGeometry(1000,1000,1000);
//      skybox  = new THREE.Mesh(skyboxGeo,materialArray)
//      scene.add(skybox)

//   }
//   function init(){
//     scene = new THREE.Scene();
//     camera = new  THREE.PerspectiveCamera(
//         85,
//          window.innerWidth / window.innerHeight,
//          0.1,
//          1000
//     )
// setSkyBox();

//   planet_earth =  loadPlanetTexture("./img/earth_hd.jpg", 4, 100, 100, 'standard');
//   planet_sun =  loadPlanetTexture("./img/sun_hd.jpg", 20, 100, 100, 'basic');
//   planet_mercury =  loadPlanetTexture("./img/mercury_hd.jpg", 2, 100, 100, 'standard');
//   planet_venus =  loadPlanetTexture("./img/venus_hd.jpg", 3, 100, 100, 'standard');
//   planet_mars =  loadPlanetTexture("./img/mars_hd.jpg", 3.5, 100, 100, 'standard');
//   planet_jupiter =  loadPlanetTexture("./img/jupiter_hd.jpg", 10, 100, 100, 'standard');
//   planet_saturn =  loadPlanetTexture("./img/saturn_hd.jpg", 8, 100, 100, 'standard');
//   planet_uranus =  loadPlanetTexture("./img/uranus_hd.jpg", 6, 100, 100, 'standard');
//   planet_neptune =  loadPlanetTexture("./img/neptune_hd.jpg", 5, 100, 100, 'standard');

// // ADD PLANETS TO THE SCENE
//   scene.add(planet_earth);
// //   scene.add(planet_sun);
// //   scene.add(planet_mercury);
// //   scene.add(planet_venus);
// //   scene.add(planet_mars);
// //   scene.add(planet_jupiter);
// //   scene.add(planet_saturn);
// //   scene.add(planet_uranus);
// //   scene.add(planet_neptune);

//   renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true});
//   renderer.setSize(window.innerWidth, window.innerHeight);
//    document.body.appendChild(renderer.domElement);
//    renderer.domElement.id="c";
//    controls=new OrbitControls(camera,renderer.domElement);
//    controls.minDistance= 12;

//  camera.position.z=100;
//   }
  
//   function  loadPlanetTexture(texture,radius,widthSegments,heightSegments,meshType){
//     const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments);
//     const loader= new THREE.TextureLoader();
//     const planetTexture = loader.load(texture);
//     const material = new THREE.MeshBasicMaterial({map:  planetTexture})



//     const planet = new THREE.Mesh(geometry,material)
//     return planet;


//   }

//    function animate(time){
//     requestAnimationFrame(animate);
//      controls.update();
//     renderer.render(scene,camera);

//    }
//   init();
//   animate(0)



// main.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls, skybox;
let planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune;

let orbitRadii = {
  mercury: 50,
  venus: 60,
  earth: 70,
  mars: 80,
  jupiter: 100,
  saturn: 120,
  uranus: 140,
  neptune: 160
};

let revolutionSpeeds = {
  mercury: 2,
  venus: 1.5,
  earth: 1,
  mars: 0.8,
  jupiter: 0.7,
  saturn: 0.6,
  uranus: 0.5,
  neptune: 0.4
};

function createMaterialArray() {
  const paths = ['../img/skybox/space_ft.png', '../img/skybox/space_bk.png', '../img/skybox/space_up.png', '../img/skybox/space_dn.png', '../img/skybox/space_rt.png', '../img/skybox/space_lf.png'];
  return paths.map(image => {
    const texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
}

function setSkyBox() {
  const materials = createMaterialArray();
  const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  skybox = new THREE.Mesh(skyboxGeo, materials);
  scene.add(skybox);
}

function loadPlanetTexture(texture, radius, widthSegments, heightSegments, meshType) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const loader = new THREE.TextureLoader();
  const planetTexture = loader.load(texture);
  const material = meshType === 'standard' ? new THREE.MeshStandardMaterial({ map: planetTexture }) : new THREE.MeshBasicMaterial({ map: planetTexture });
  return new THREE.Mesh(geometry, material);
}

function createRing(innerRadius) {
  const outerRadius = innerRadius - 0.1;
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 100);
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

  setSkyBox();

  planet_sun = loadPlanetTexture("./img/sun_hd.jpg", 20, 100, 100, 'basic');
  planet_mercury = loadPlanetTexture("./img/mercury_hd.jpg", 2, 100, 100, 'standard');
  planet_venus = loadPlanetTexture("./img/venus_hd.jpg", 3, 100, 100, 'standard');
  planet_earth = loadPlanetTexture("./img/earth_hd.jpg", 4, 100, 100, 'standard');
  planet_mars = loadPlanetTexture("./img/mars_hd.jpg", 3.5, 100, 100, 'standard');
  planet_jupiter = loadPlanetTexture("./img/jupiter_hd.jpg", 10, 100, 100, 'standard');
  planet_saturn = loadPlanetTexture("./img/saturn_hd.jpg", 8, 100, 100, 'standard');
  planet_uranus = loadPlanetTexture("./img/uranus_hd.jpg", 6, 100, 100, 'standard');
  planet_neptune = loadPlanetTexture("./img/neptune_hd.jpg", 5, 100, 100, 'standard');

  scene.add(planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune);

  const sunLight = new THREE.PointLight(0xffffff, 1, 0);
  sunLight.position.copy(planet_sun.position);
  scene.add(sunLight);

  Object.values(orbitRadii).forEach(radius => createRing(radius));

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 12;
  controls.maxDistance = 1000;
  camera.position.z = 100;
}

function planetRevolver(time, speed, planet, orbitRadius) {
  const orbitSpeedMultiplier = 0.001;
  const angle = time * orbitSpeedMultiplier * speed;
  planet.position.x = planet_sun.position.x + orbitRadius * Math.cos(angle);
  planet.position.z = planet_sun.position.z + orbitRadius * Math.sin(angle);
}

function updateSpeedsFromSliders() {
  for (let key in revolutionSpeeds) {
    const input = document.getElementById(`speed-${key}`);
    if (input) {
      revolutionSpeeds[key] = parseFloat(input.value);
    }
  }
}

function animate(time) {
  requestAnimationFrame(animate);
  updateSpeedsFromSliders();

  [planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune].forEach(planet => planet.rotation.y += 0.005);

  planetRevolver(time, revolutionSpeeds.mercury, planet_mercury, orbitRadii.mercury);
  planetRevolver(time, revolutionSpeeds.venus, planet_venus, orbitRadii.venus);
  planetRevolver(time, revolutionSpeeds.earth, planet_earth, orbitRadii.earth);
  planetRevolver(time, revolutionSpeeds.mars, planet_mars, orbitRadii.mars);
  planetRevolver(time, revolutionSpeeds.jupiter, planet_jupiter, orbitRadii.jupiter);
  planetRevolver(time, revolutionSpeeds.saturn, planet_saturn, orbitRadii.saturn);
  planetRevolver(time, revolutionSpeeds.uranus, planet_uranus, orbitRadii.uranus);
  planetRevolver(time, revolutionSpeeds.neptune, planet_neptune, orbitRadii.neptune);

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);
init();
animate(0);