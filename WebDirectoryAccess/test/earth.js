var camera, scene, renderer, geometry, material, mesh;

init();
THREE.ImageUtils.loadTexture('earth.jpg', undefined, render); //load the texture and perform a callback to the init function
animate();

function init() {
	scene = new THREE.Scene(); //creates a scene
	
	renderer = new THREE.CanvasRenderer(); //creates a renderer
	renderer.setSize(window.innerWidth, window.innerHeight); //set the renderer size
	document.body.appendChild(renderer.domElement); //appends the renderer to the html body
	
	geometry = new THREE.SphereGeometry(250, 40, 40); //create the object shape
	material = new THREE.MeshBasicMaterial({map : null, overdraw : true}); //create the material for the shape
	mesh = new THREE.Mesh(geometry, material);
	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000); //creates a perspective camera
	camera.position.z = 500; //sets camera position
	
	scene.add(mesh);
}

/*
 * note: there were difficulty in loading texture if renderer is not executed as callback,
 * since loading texture is accessed from disk which will take too long and renderer will 
 * be executed before texture has finished loading, thus renderer will render nothing!
 * therefore renderer has to be executed as part of callback
 */
function render (texture) {
	document.getElementById ('label').innerHTML = "texture loaded";
	material.map = texture;
	renderer.render(scene, camera); //renders the scene and camera
}

function animate() {
	requestAnimationFrame(animate);
	
	//mesh.rotation.x = Date.now() * .00005; //updating the mesh that 
	mesh.rotation.y = Date.now() * .0003; //was already in the scene
	//document.getElementById ('label').innerHTML = mesh.position.x;
	
	renderer.render(scene, camera);
}