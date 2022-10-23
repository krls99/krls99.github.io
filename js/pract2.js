var renderer, scene, camera;

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x0000AA),1.0);
    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene()
    var aspectRatio = window.innerWidth/window.innerHeight;

    camera = new THREE.PerspectiveCamera(75,aspectRatio,0.1,1000);
    camera.position.set(90, 200, 350);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function loadScene() {

    //Practica 2

    //Creo el nodo del grafo
    robot = new THREE.Object3D();
    //todo el robot tendra el siguiente material
    var material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
    //cilindro 
    var  base = new THREE.Mesh( new THREE.CylinderGeometry(50,50,15,32),material);
    base.position.set(0, 0, 0);
    //cilindro    
    var ejeBrazo = new THREE.Mesh(new THREE.CylinderGeometry(20,20,18,32),material);
    ejeBrazo.rotation.z = Math.PI/2;
    //esfera
    var rotula = new THREE.Mesh(new THREE.SphereGeometry(20,30,15),material);
    rotula.position.set(0,120,0);
    //Esparrago
    var esparrago = new THREE.Mesh(new THREE.BoxGeometry(18,120,12),material);
    esparrago.position.set(0,60,0);

    //cilindro
    var cilindroAntebrazo = new THREE.Mesh(new THREE.CylinderGeometry(22,22,6,32),material);

    var suelo = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 50, 50),material);
    suelo.rotation.x = -Math.PI / 2;

    //cilindro
    var cilindroMano = new THREE.Mesh(new THREE.CylinderGeometry(15,15,40),material);
    cilindroMano.position.set(0,80,0);
    cilindroMano.rotation.z = Math.PI/2;
    //Nervios cada uno en una posicion del espacio
    //Nervio 1
    var nervio1 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio1.position.set(8, 34, -4);
    //Nervio 2
    var nervio2 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio2.position.set(-8,34,4);
    //Nervio 3
    var nervio3 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio3.position.set(-8,34,-4);
    //Nervio 4
    var nervio4 = new THREE.Mesh(new THREE.BoxGeometry(4,80,4),material);
    nervio4.position.set(8,34,4);
     
/*
    points = []
    //triangulo 1
    points.push(new THREE.Vector3(0, 20, 0));
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(19, 0, 0));
    //triangulo 2
    points.push(new THREE.Vector3(19, 20, 0));
    points.push(new THREE.Vector3(0, 20, 0));
    points.push(new THREE.Vector3(19, 0, 0));
    //triangulo 3
    points.push(new THREE.Vector3(0, 20, 0));
    points.push(new THREE.Vector3(0, 0, 4));
    points.push(new THREE.Vector3(19, 0, 4));
    // triangulo 4
    points.push(new THREE.Vector3(19, 20, 4));
    points.push(new THREE.Vector3(0, 20, 4));
    points.push(new THREE.Vector3(19, 0, 4));
    // triangulo 5
    points.push(new THREE.Vector3(0, 20, 0));
    points.push(new THREE.Vector3(19, 20, 0));
    points.push(new THREE.Vector3(19, 20, 4));
    // triangulo 6
    points.push(new THREE.Vector3(0, 20, 4));
    points.push(new THREE.Vector3(0, 20, 0));
    points.push(new THREE.Vector3(19, 20, 4));
    // triangulo 7
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(19, 0, 0));
    points.push(new THREE.Vector3(19, 0, 4));
    // triangulo 8
    points.push(new THREE.Vector3(0, 0, 4));
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(19, 0, 4));
    //triangulo 9
    points.push(new THREE.Vector3(19, 0, 0));
    points.push(new THREE.Vector3(19, 20, 0));
    points.push(new THREE.Vector3(38, 0, 1));
    //triangulo 10
    points.push(new THREE.Vector3(19, 20, 0));
    points.push(new THREE.Vector3(38, 10, 1));
    points.push(new THREE.Vector3(38, 0, 1));
    //triangulo 11
    points.push(new THREE.Vector3(19, 0, 4));
    points.push(new THREE.Vector3(19, 20, 4));
    points.push(new THREE.Vector3(38, 0, 3));
    //triangulo 12
    points.push(new THREE.Vector3(19, 20, 4));
    points.push(new THREE.Vector3(38, 10, 3));
    points.push(new THREE.Vector3(38, 0, 3));
    //triangulo 13
    points.push(new THREE.Vector3(38, 0, 1));
    points.push(new THREE.Vector3(38, 0, 3));
    points.push(new THREE.Vector3(38, 10, 3));
    //triangulo 14
    points.push(new THREE.Vector3(38, 0, 1));
    points.push(new THREE.Vector3(38, 10, 3));
    points.push(new THREE.Vector3(38, 10, 1));
  
    let geometry = new THREE.BufferGeometry().setFromPoints(points)
*/

    var pinza = new THREE.BufferGeometry();
    
    const vertex = [
        0, -8, -10,
        19, -8, -10,
        0, -8, 10,
        19, -8, 10,
        0, -12, -10,
        19, -12, -10,
        0, -12, 10,
        19, -12, 10,
        38, -8, -5,
        38, -12, -5,
        38, -8, 5,
        38, -12, 5
    ];
    
    indices = [
        0, 3, 2,
        0, 1, 3,
        1, 7, 3,
        1, 5, 7,
        5, 6, 7,
        5, 4, 6,
        4, 2, 6,
        4, 0, 2,
        2, 7, 6,
        2, 3, 7,
        4, 1, 0,
        4, 5, 1,
        1, 10, 3,
        1, 8, 10,
        8, 11, 10,
        8, 9, 11,
        9, 7, 11,
        9, 5, 7,
        3, 11, 7,
        3, 10, 11,
        5, 8, 1,
        5, 9, 8
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
    objetoAntebrazo.position.set(0,120,0);
   
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
    scene.add(new THREE.AxesHelper(1000));
    
}

function render() {
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}

init();
loadScene();
render();
