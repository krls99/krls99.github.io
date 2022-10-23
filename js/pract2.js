var renderer, scene, camera;

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xFFFFFF),1.0);
    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.set(-10, 200, 350);
    camera.lookAt(new THREE.Vector3(0, 100, 0));
}

function loadScene() {

    robot = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true });

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
    
    const vertex = [
        0, 0, 0, // 1 0, 1, 2,
        4, 0, 0, // 2 3, 4, 5,
        4, 10, 0, // 3 6, 7, 8,
        0, 10, 0  // 4 9, 10, 11,

        0, 0, 19, // 5 12, 13, 14,
        2, 0, 19, // 6 15, 16, 17,
        2, 10 / 2, 19, // 7 18, 19, 20,
        0, 10 / 2, 19  // 8 21, 22, 23,
    ];
    
    indices = [
        7, 3, 4, // 2
        3, 8, 4, // 2
        2, 6, 1, // 1
        6, 5, 1, // 1
        2, 3, 6, // 3
        3, 7, 6, // 3
        6, 7, 5, // 4
        7, 4, 5, // 4
        8, 1, 4, // 5
        4, 1, 5, // 5
        3, 2, 1, // 6
        3, 1, 8  // 6
    ];

    pinza.setIndex(indices);
    pinza.setAttribute('position', new THREE.Float32BufferAttribute(vertex,3));

    var pinzaIz = new THREE.Mesh(pinza, material);
    pinzaIz.rotation.y = Math.PI / 2;  

    var pinzaDe = new THREE.Mesh(pinza, material);
    pinzaDe.rotation.y = Math.PI / 2;
    pinzaDe.position.set(0, 20, 0);

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

function render() {
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}

init();
loadScene();
render();
