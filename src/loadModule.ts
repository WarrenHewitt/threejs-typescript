import { Scene, PlaneGeometry, MeshLambertMaterial, Mesh, WebGLRenderer, BoxGeometry, PerspectiveCamera, SpotLight } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class LoadModule {
    name: string

    constructor(name: string) {
        this.name = name
    }

    public init() {
        var windowW = 500
        var windowH = 500
        var camera:any = null;
        var spotLight = null;
        var plane:any = null;
        var sphere = null;
        var cube:any = null;

        // 创建场景
        var scene:any = new Scene()

        // 创建渲染器
        var renderer = new WebGLRenderer()
        renderer.setSize(windowW, windowH)
        renderer.shadowMap.enabled = true

        /* 创建平面 */
        function createPlane() {
            /* 着色器 */
            /* 参数：宽 高 x方向分段 y方向分段 分段是对六个面进行分段 */
            var planeGeometry = new PlaneGeometry(40, 40, 1, 1)

            /* 材质 */
            var planeMaterial = new MeshLambertMaterial({ color: 0xC1C1C1 })

            plane = new Mesh(planeGeometry, planeMaterial)
            /* 打开阴影效果 */
            plane.receiveShadow = true

            /* 设置平面体的位置 */
            plane.position.x = 10
            plane.position.y = 0
            plane.position.z = 0
            /* 可以用如下方式替代以上的方式 */
            // plane.position.set(16,0,0)

            /* 设置平面体的旋转 */
            plane.rotation.x = -1.6
            plane.rotation.z = 0.9
            /* 将平面体加入到场景中 */
            scene.add(plane)
        }

        /* 创建一个正方体 */
        function createCube() {
            /* 着色器 */
            var cubeGeometry = new BoxGeometry(4, 4, 4)

            /* 材质 */
            var cubeMaterial = new MeshLambertMaterial({ color: 0xA7A7A7 })

            cube = new Mesh(cubeGeometry, cubeMaterial)
            /* 打开阴影 */
            cube.castShadow = true

            /* 设置立方体的位置 */
            cube.position.x = 0
            cube.position.y = 10
            cube.position.z = 0

            /* 将立方体加入到场景 */
            scene.add(cube)
        }

        /* 创建一个球面体 */
        function createSphere() {
            // var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)

            /* 材质 */
            // var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xA7A7A7 })

            /* 生成球面体 */
            // sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

            /* 打开阴影效果 */
            // sphere.castShadow = true

            /* 设置球面体的位置 */
            // sphere.position.x = 10
            // sphere.position.y = 10
            // sphere.position.z = 5

            /* 将球面体加入到场景中 */
            // scene.add(sphere)
        }

        /* 创建透视相机 */
        function createCamera() {
            camera = new PerspectiveCamera(60, windowW / windowH, .1, 1000)
            /* 设置相机的位置 */
            camera.position.x = -40
            camera.position.y = 50
            camera.position.z = 30

            /* 设置镜头的位置 */
            camera.lookAt(scene.position)
        }

        /* 加入光源 */
        function createSpotLight() {
            spotLight = new SpotLight(0xffffff, 1)
            spotLight.position.set(0, 100, 100)
            spotLight.castShadow = true
            spotLight.shadow.mapSize.width = 2048
            spotLight.shadow.mapSize.height = 2048

            scene.add(spotLight)
        }

        const obj = <HTMLDivElement>document.querySelector('#cusThree')
        obj.appendChild(renderer.domElement)

        function render() {
            // cube.rotation.x += 0.01
            // cube.rotation.y += 0.01
            cube.rotation.z += 0.01

            plane.rotation.z += 0.01

            camera.position.z += 0.01

            // requestAnimationFrame(render)
            renderer.render(scene, camera)
        }

        const loader = new GLTFLoader();

        loader.load( '../snm.gltf', function ( obj ) {
            console.log(23333);

            scene.add(obj.scene);
            obj.scene.position.set(0,0,0);
            obj.scene.rotation.set(1.55,0,0);
            obj.scene.scale.set(1, 1, 1);

        }, undefined, function ( error ) {

            console.error('error', error );

        } );

        // createPlane()
        // createCube()
        // // createSphere()
        // createCamera()
        // createSpotLight()
        // render()
    }
}

export default LoadModule