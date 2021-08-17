let scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    container,
    controls,
    gLtfLoader,
    HEIGHT = window.innerHeight,
    WIDTH = window.innerWidth,
    boxW = 160,
    boxH = 200,
    // 文字框分组
    group = null;

const createAxesHelper = () => {
    // 坐标轴辅助  红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    var axes = new THREE.AxesHelper(500);
    // axes.center()
    scene.add(axes);
}

/* 创建帧数统计 */
function createStats() {
    document.body.appendChild(new Stats().dom)
}

/**
 * 创建灯光
 */
    const createLight = () => {
    
    const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // light.position(0,1,0)
    scene.add(light)
    // const light = new THREE.DirectionalLight(0xffffff);
    // light.castShadow = true
    // light.position.set(2000, 2000, 2000);
    // scene.add(light);
}

/**
 * 创建场景
 */
const createScene = () => {
    scene = new THREE.Scene();
    // scene.rotateY(0);
}

/**
 * 创建相机
 */
const createCamera = () => {
    fieldOfView = 50;
    aspectRatio = WIDTH / HEIGHT;
    nearPlane = 1;
    farPlane = 10000;

    /* 创建透视相机 */
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    const camNum = 100
    camera.position.x = 500
    camera.position.y = 500
    camera.position.z = 1000
    // camera.position.set(camNum, camNum, camNum);
    // 相机默认是由正z轴看像-z轴（相机镜头对着-z轴方向拍）
    camera.lookAt(0,0,0)
}  

/**
 * 创建渲染器
 */
const createRender = () => {
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.setClearColor(0x011339,1.0)
    renderer.render(scene, camera);

    /* 渲染到浏览器 */
    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);
}

/* 控制器 */
const createControl = () => {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

/* 创建gLTF加载器 */
const createGLtfLoader = () => {
    gLtfLoader = new THREE.GLTFLoader();
}

/* 装载模型 */
const loadModule = (url, loader) => {
    loader.load(url, (obj) => {
        // obj.scene.traverse(function (node) {
        //     if ( node.isMesh ) { 
        //         node.castShadow = true; 
        //         node.material.emissiveIntensity=1;
        //         node.material.emissive = node.material.color;
        //         node.material.emissiveMap = node.material.map;
        //         obj.receiveShadow = true;
        //     }
        // });

        // obj.castShadow = true;
        rocket = obj.scene;
        // rocket.position.x = 100;
        // rocket.position.y = 0;
        // rocket.position.z = 0;
        // /* 初始化设置模型的大小 */
        // rocket.scale.set(0.55,0.55,0.55);
        scene.add(rocket);
    });
}
