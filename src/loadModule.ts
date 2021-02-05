// import { Scene, PlaneGeometry, MeshLambertMaterial, Mesh, WebGLRenderer, BoxGeometry, PerspectiveCamera, SpotLight } from 'three'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// import { OrbitControls } from './jsm/controls/OrbitControls.js';
// import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from './jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from './jsm/utils/RoughnessMipmapper.js';

class LoadModule {
    name: string
    
    constructor(name: string) {
        this.name = name
    }
    
    public init() {
        let scene:any
        let camera :any
        let renderer:any
        let controls:any

        function getAspectRatio() {
        const {innerWidth, innerHeight} = window;
        return innerWidth / innerHeight;
        }

        function onResize() {
        camera.aspect = getAspectRatio();
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, getAspectRatio(), 0.1, 1000);
        camera.position.z = 3;

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x222222);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.autoRotate = true;

        const ambientLight = new THREE.AmbientLight( 0xffffff, .5 );
        scene.add(ambientLight);
        
        const lights = [
            new THREE.SpotLight(0x2363D0, 2, 0),
            new THREE.SpotLight(0xCC3F4A, .6, 0),
            new THREE.SpotLight(0x5342A0, 1, 0),
        ];
        
        lights[0].position.set(2, 1, 1);
        lights[1].position.set(-2, -1, -1);
        lights[2].position.set(-1, 1, 3);
        
        lights.forEach(light => {
            scene.add(light)
            //scene.add(new THREE.SpotLightHelper(light))
        });
        
        return new Promise((resolve, reject) => {
            const loader = new THREE.GLTFLoader();
            loader.crossOrigin = '';
            
            loader.load('https://static.radulescu.me/codepen/fridge/scene.gltf', gltf => {
            scene.add(gltf.scene);
            window.addEventListener('resize', onResize);
            resolve();
            }, undefined, reject);
        });
        }

        function render() {
        controls.update();
        
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        }

        init().then(render);
        
    }
}

export default LoadModule