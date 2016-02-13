/* some of this code was taken from
 * http://www.mrdoob.com/lab/javascript/webgl/city/01/
 * page 25 of game development with three.js book
 */
var camera, light, scene, renderer, geometry, material, mesh, lastTime;

setUpThreeJS ();
setUpWorld();
animate();

function setUpThreeJS () {
	document.body.style.backgroundColor = '#d7f0f7';
	
	//creates a scene
	scene = new THREE.Scene ();
	scene.fog = new THREE.FogExp2(0xd0e0f0, 0.0035);
	
	//ceates a light source
	light = new THREE.HemisphereLight(0xfffff0, 0x101020, 1.25);
	light.position.set(0.75, 1, 0.25);
	scene.add(light);
	
	//creates a camera and define its position
	camera = new THREE.PerspectiveCamera (75, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.x = -900;
	camera.position.y = 300;
	camera.position.z = 50;
	
	//creates first person control
	controls = new THREE.FirstPersonControls( camera );
	controls.movementSpeed = 50;
	controls.lookSpeed = .05;
	controls.lookVertical = true;
	
	//initialize initial time for control update later
	lastTime = performance.now() / 1000;
	
	//creates a renderer to render the scene and objects
	renderer = new THREE.WebGLRenderer ();
	renderer.setSize (window.innerWidth, window.innerHeight);
	document.body.appendChild (renderer.domElement); //append the renderer to the html document body
}

function setUpWorld() {
	//creates a floor and add it to scene
	geometry = new THREE.PlaneGeometry(2000, 2000);
	material = new THREE.MeshBasicMaterial({color : 0x9db3b5, overdraw : true});
	var floor = new THREE.Mesh(geometry, material);
	floor.rotation.x = -90 * Math.PI / 180;
	scene.add(floor);
	
	//create an ogirinal building to use for cloning
	geometry = new THREE.CubeGeometry(1, 1, 1); //creates an object's shape
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	var building = new THREE.Mesh(geometry); //the mesh will be the building
	
	//create a city object to merge each buulding into
	var city = new THREE.Geometry();
	
	//clone the buildings and add each one to the scene
	for (var i = 0; i < 20000; i++) {
		building.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;
		building.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
		building.rotation.y = Math.random();
		building.scale.x = building.scale.z = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
		building.scale.y = ( Math.random() * Math.random() * Math.random() * building.scale.x ) * 8 + 8;
		building.scale.z = building.scale.x;
		
		THREE.GeometryUtils.merge (city, building);
	}
	
	/*
	 * note: it is faster to to render a multiple static objects by merging them into a
	 * single Geometric object and add it to a scene than it is to add all the static
	 * objects to the scene
	 */
	material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors });
	var mesh = new THREE.Mesh(city, material);
	scene.add(mesh);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render (scene, camera);
	var time = performance.now() / 1000; //get current time
	controls.update( time - lastTime ); //use delta time to reduce movement drift!!! 
	lastTime = time; //update lastTime as current time
}
