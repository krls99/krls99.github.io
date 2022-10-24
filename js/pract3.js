var renderer, scene, camera, mini_camera, robot, cameraControls;

function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor ( new THREE.Color(0xFFFFFF), 1.0);
    document.body.appendChild( renderer.domElement);
    renderer.autoClear = false;

    scene = new THREE.Scene();

    var aspectRatio = window.innerWidth / window.innerHeight;

    setMiniCamera();

    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 10000);
    camera.position.set(50,300,150);

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0,100,0);

    window.addEventListener('resize', updateAspectRatio);

    scene.add(camera);    

}

function setMiniCamera(){
    var L = 150;
    var camaraOrtografica;

    // VIEWPORT MÁS ANCHO QUE ALTO
    camaraOrtografica = new THREE.OrthographicCamera(
        -L, L, L, -L, 0,300
    );
    planta = camaraOrtografica.clone();
    planta.position.set(0,250,0);
    planta.lookAt(0,0,0);
    planta.up = (0,0,-1);

    scene.add(planta);
}

function updateAspectRatio(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect =window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    planta.left = -L ;
    planta.right = L;
    planta.bottom = -L ;
    planta.top = L;

    planta.updateProjectionMatrix();
}

function loadScene() {

    robot = new THREE.Object3D();

    var material = new THREE.MeshNormalMaterial({ color: 'green', wireframe: false });

    var  base = new THREE.Mesh( new THREE.CylinderGeometry(50,50,15,20),material);
    base.position.set(0, 0, 0);
   
    var ejeBrazo = new THREE.Mesh(new THREE.CylinderGeometry(20,20,18,20),material);
    ejeBrazo.rotation.z = Math.PI/2;

    var rotula = new THREE.Mesh(new THREE.SphereGeometry(20,30,15),material);
    rotula.position.set(0,120,0);

    var esparrago = new THREE.Mesh(new THREE.BoxGeometry(18,120,12),material);
    esparrago.position.set(0,60,0);

    var cilindroAntebrazo = new THREE.Mesh(new THREE.CylinderGeometry(22,22,6,20),material);

    var suelo = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 50, 50),material);
    suelo.rotation.x = -Math.PI / 2;

    //cilindro
    var cilindroMano = new THREE.Mesh(new THREE.CylinderGeometry(15,15,40),material);
    cilindroMano.position.set(0,80,0);
    cilindroMano.rotation.z = Math.PI/2;
    //Nervios cada uno en una posicion del espacio
    //Nervio 1
    var nervio1 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio1.position.set(4, 34, -4);
    //Nervio 2
    var nervio2 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio2.position.set(-4,34,4);
    //Nervio 3
    var nervio3 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio3.position.set(-4,34,-4);
    //Nervio 4
    var nervio4 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio4.position.set(4,34,4);

    var pinza = new THREE.BufferGeometry();
    
    //const 
    vertex = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(4,0,0),
        new THREE.Vector3(4,20,0),

        new THREE.Vector3( 0,20,0),
        new THREE.Vector3(4,20,19),
        new THREE.Vector3(0,20,19),

        new THREE.Vector3(4,0,19),
        new THREE.Vector3(0,0,19),
        new THREE.Vector3(2,15,38),

        new THREE.Vector3(0,15,38),
        new THREE.Vector3(2,7,38),
        new THREE.Vector3(0,7,38),

    ];
    
    indices = new Float32Array(
        [
        4,2,3,
        5,4,3,
        3,2,0,
        2,1,0,
        2,4,1,
        4,6,1,
        5,3,7,
        3,0,7,
        0,1,7,
        1,6,7,
        5,4,9,
        4,8,9,
        5,9,7,
        9,11,7,
        4,10,8,
        4,6,10,
        6,7,10,
        7,11,10,
        11,9,8,
        11,8,10
    ];

    pinza.setFromPoints(vertex)
    pinza.setAttribute( 'normal', new THREE.BufferAttribute( indices, 3 ) );
    pinza.computeVertexNormals();
    
    //pinza.setIndex(indices);
    //pinza.setAttribute('position', new THREE.Float32BufferAttribute(vertex,3));
    //pinza.computeVertexNormals();

    var pinzaIz = new THREE.Mesh(pinza, material);
    pinzaIz.rotation.z = -Math.PI / 2;  
    pinzaIz.position.set(-10,-10,0);
    var pinzaDe = new THREE.Mesh(pinza, material);
    pinzaDe.rotation.z = - Math.PI / 2;
    pinzaDe.position.set(-10, 15, 0);

    //MANO
    cilindroMano.add(pinzaIz);
    cilindroMano.add(pinzaDe);

    //ANTEBRAZO
    objetoAntebrazo = new THREE.Object3D();
    objetoAntebrazo.add(cilindroAntebrazo);
    objetoAntebrazo.add(cilindroMano);
    objetoAntebrazo.add(nervio1);
    objetoAntebrazo.add(nervio2);
    objetoAntebrazo.add(nervio3);
    objetoAntebrazo.add(nervio4);
    //subo ese cilindro
    objetoAntebrazo.position.y = 120;
   
    //BRAZO
    objetoBrazo = new THREE.Object3D();
    objetoBrazo.add(ejeBrazo);
    objetoBrazo.add(rotula);
    objetoBrazo.add(esparrago);
    objetoBrazo.add(objetoAntebrazo);

    //GRAFO DE ESCENA
    robot.add(base)
    base.add(objetoBrazo)
    scene.add(robot)
    scene.add(suelo)
    
}
function update(){
    //Cambios entre frames
    cameraControls.update();
}

function render(){
    requestAnimationFrame(render);
    update();

    renderer.clear();
    //CAMARA GENERAL
    renderer.setViewport (0,0,window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    var aspectRatio = window.innerWidth / window.innerHeight;

    if(aspectRatio > 1){
        renderer.setViewport (0,0,window.innerHeight/4, window.innerHeight/4);
    }else{
        renderer.setViewport (0,0,window.innerWidth/4, window.innerWidth/4);
    }
    renderer.render(scene, planta);


}

init();
loadScene();
render();
