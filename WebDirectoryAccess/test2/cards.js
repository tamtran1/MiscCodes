var menuHTML = "<button id = \"table\">TABLE</button>" +
			   "<button id = \"helix\">HELIX</button>" +
			   "<button id = \"grid\">GRID</button>" +
			   "<button id = \"rsetCam\">RESET CAM</button>" +
			   "<button id = \"shuffle\">SHUFFLE</button>";

var symbols = [
	"帥", "Shuài", "Tướng",
	"仕", "Shì", "Sĩ",
	"相", "Xiàng", "Tượng",
	"傌", "Mà", "Mã",
	"俥", "Jū", "Xe",
	"炮", "Pào", "Pháo",
	"兵", "Bīng", "Tốt",
	"將", "Jiàng", "Tướng",
	"士", "Shì", "Sĩ",
	"象", "Xiàng", "Tượng",
	"馬", "Mǎ", "Mã",
	"車", "Jū", "Xe",
	"砲", "Pào", "Pháo",
	"卒", "Zú", "Tốt"
];

Array.prototype.shuffle = function () {
	var i = this.length, j, temp;
	
	while (--i > 0) {
		j = Math.floor (Math.random () * (i + 1));
		temp = this [j];
		this [j] = this [i];
		this [i] = temp;
	}
	return this;
}

var camera, scene, renderer, controls;
var targets = {table: [], sphere: [], helix: [], grid: []};
var currentTarget; //stores the current target view
var cardDeck = [];

generateDeck (1);
init ();
animate ();

function init () {
	document.getElementById ('menu').innerHTML = menuHTML;	
	scene = new THREE.Scene ();
	camera = new THREE.PerspectiveCamera (75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1400;	
	camera.position.y = 700;
	camera.position.x = 1100;	
	
	for (var i = 0; i < cardDeck.length; i ++) //add each cards to the scene
		scene.add (cardDeck [i]);

// ========================================================================== this plane is for debug !!!
	var plane = document.createElement ('div');
	plane.className = 'plane';
	var planeObj = new THREE.CSS3DObject (plane);
	planeObj.position.x = 0;
	planeObj.position.y = 0;
	planeObj.position.z = 0;
	scene.add (planeObj);
	
	var stick = document.createElement ('div');
	stick.className = 'stick';
	var stickObj = new THREE.CSS3DObject (stick);
	stickObj.position.z = 250;
	stickObj.rotation.x = 1.57;
	scene.add (stickObj);
	
	var stick2 = document.createElement ('div');
	stick2.className = 'stick';
	var stickObj2 = new THREE.CSS3DObject (stick2);
	stickObj2.position.z = 250;
	stickObj2.rotation.x = 1.57;
	stickObj2.rotation.y = 1.5;
	scene.add (stickObj2);
	
// ======================================================================== consider making this plane into table later !!!
	
	// table
	var row = col = 0;
	for (var i = 0; i < cardDeck.length; i ++) { //push each card coordinades position into table layout 
		var card = new THREE.Object3D ();
		if (i % 28 == 0) { //adjust row and collumn position of cards when listing on table 
			col = 1;
			row ++;
		}
		card.position.x = (col ++ * 120) - 1730;
		card.position.y = -(row * 335) + 400;
		card.position.z = 10; //===============================temp value for debug, z position originally 0 !!!
		targets.table.push (card);
	}

	// helix
	var vector = new THREE.Vector3 ();
	for (var i = 0, l = cardDeck.length; i < l; i ++ ) {
		var phi = i * 0.17 + Math.PI;
		var card = new THREE.Object3D ();

		card.position.x = 700 * Math.sin (phi);
		card.position.y = -(i * 9.1) + 850;
		card.position.z = 700 * Math.cos (phi);

		vector.x = card.position.x * 2;
		vector.y = card.position.y;
		vector.z = card.position.z * 2;

		card.lookAt (vector);
		targets.helix.push (card);
	}

	// grid
	for (var i = 0; i < cardDeck.length; i ++) {
		var card = new THREE.Object3D ();
		card.position.x = ((i % 5) * 400) - 800;
		card.position.y = (-( Math.floor (i / 5) % 5) * 600) + 1200;
		card.position.z = (Math.floor(i / 25)) * 400 - 100;

		targets.grid.push (card);
	}

	renderer = new THREE.CSS3DRenderer ();
	renderer.setSize (window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';
	document.getElementById ('container').appendChild (renderer.domElement);
	
	controls = new THREE.TrackballControls (camera, renderer.domElement);
	controls.rotateSpeed = 5;
	controls.minDistance = 150;
	controls.maxDistance = 6000;
	controls.addEventListener ('change', render);

	var button = document.getElementById ('table');
	button.addEventListener ('click', function (event) {
		currentTarget = "table";
		transform (cardDeck, targets.table);});

	var button = document.getElementById ( 'helix' );
	button.addEventListener ('click', function (event) {
		currentTarget = "helix";
		transform (cardDeck, targets.helix);});

	var button = document.getElementById ('grid');
	button.addEventListener ('click', function (event) {
		currentTarget = "grid";
		transform (cardDeck, targets.grid)});
	
	var button = document.getElementById ('rsetCam');
	button.addEventListener ('click', rsetCam);	

	var button = document.getElementById ('shuffle');
	button.addEventListener ('click', shuffleDeck);
	
	transform (cardDeck, cardDeck); //arrange cardDeck into table format
	//currentTarget = "table";
	
	window.addEventListener ('resize', onWindowResize, false);
}

function generateDeck (sets) {
	var color = 'rgb(190, 0, 0)', cardIdx = 1, colorIdx = 1; //initial color is red
	
	for (var i = 0; i < symbols.length * 2 * sets; i += 3) {
		var faceFront = document.createElement ('div');
		faceFront.className = 'front face';
		faceFront.id = "card" + cardIdx;
		faceFront.style.backgroundColor = color;
		faceFront.onclick = function (value) { //make faceFront clickable
			return function () { //creating closure for onclick
				cardClick (value); //this is nessary when 
			}
		} (faceFront.id);
		
		var symbolTop = document.createElement ('div');
		symbolTop.className = 'symbol top';
		symbolTop.textContent = symbols [i % 42];
		faceFront.appendChild (symbolTop);
		
		var details = document.createElement ('div');
		details.className = 'mid details';
		details.innerHTML = symbols [i % 42 + 1] + '<br>' + symbols [i % 42 + 2];
		faceFront.appendChild (details);
		
		var number = document.createElement ('div'); // this is for debug, might remove later !!!
		number.className = 'mid number';
		number.textContent = cardIdx;
		faceFront.appendChild (number);
		
		var symbolBottom = document.createElement ('div');
		symbolBottom.className = 'symbol bottom';
		symbolBottom.textContent = symbols [i % 42];
		faceFront.appendChild (symbolBottom);
		
		var card = document.createElement ('div');
		card.className = 'card';
		card.appendChild (faceFront);
		
		var faceBack = document.createElement ('div');
		faceBack.className = 'back face';
		card.appendChild (faceBack);
		
		var cardObj = new THREE.CSS3DObject (card); //initial position before settle in table 
		cardObj.position.z += cardIdx;
		
		cardObj.idx = cardIdx;
		
		cardDeck.push (cardObj); //push individual card into the list of cardDeck
		
		if (cardIdx % 7 == 0) { //switches the color of the cards
			if (colorIdx == 4)
				colorIdx = 0;
			colorIdx ++;
		}
		
		if (colorIdx == 1)
			color = 'rgb(190, 0, 0)'; //red
		if (colorIdx == 2)
			color = 'rgb(200, 200, 0)'; //yellow
		if (colorIdx == 3)
			color = 'rgb(0, 190, 0)'; //green
		if (colorIdx == 4)
			color = 'rgb(200, 200, 200)'; //white
		
		cardIdx ++; //increases the card index value
	}
	
	document.getElementById ('info1').innerHTML = cardDeck.length + " cards generated to deck";
	document.getElementById ('info2').innerHTML = (cardDeck.length / 28) + " sets";		
}

function shuffleDeck () {
	cardDeck.shuffle ();
	
	if (currentTarget == "table")
			document.getElementById('table').click();
	else if (currentTarget == "helix")
		document.getElementById('helix').click();
	else if (currentTarget == "grid")
		document.getElementById('grid').click();
}

function cardClick (value) {
	document.getElementById (value).style.backgroundColor = 'rgb(200, 200, 200)';
}

function rsetCam () {
	TWEEN.removeAll ();
	var transDuration = 500;
	
	new TWEEN.Tween (controls.target)
		.to ({x: controls.target0.x, y: controls.target0.y, z: controls.target0.z}, transDuration)
		.easing (TWEEN.Easing.Exponential.InOut)
		.start ();
	
	new TWEEN.Tween (controls.object.position)
		.to ({x: controls.position0.x, y: controls.position0.y, z: controls.position0.z}, transDuration)
		.easing (TWEEN.Easing.Exponential.InOut)
		.start ();
	
	new TWEEN.Tween (controls.object.up)
		.to ({x: controls.up0.x, y: controls.up0.y, z: controls.up0.z}, transDuration)
		.easing (TWEEN.Easing.Exponential.InOut)
		.start ();
	
	new TWEEN.Tween (this)
		.to ({}, transDuration * 2)
		.onUpdate (render)
		.start ();
}

function transform (currents, targets) {
	TWEEN.removeAll ();
	var transDuration = 500;
	for (var i = 0; i < currents.length; i ++) {
		var current = currents [i];
		var target = targets [i];
		
		new TWEEN.Tween (current.position)
			.to ({x: target.position.x, y: target.position.y, z: target.position.z}, Math.random () * transDuration + transDuration)
			.easing (TWEEN.Easing.Exponential.InOut)
			.start ();

		new TWEEN.Tween (current.rotation)
			.to ({x: target.rotation.x, y: target.rotation.y, z: target.rotation.z}, Math.random () * transDuration + transDuration)
			.easing (TWEEN.Easing.Exponential.InOut)
			.start ();
	}

	new TWEEN.Tween (this)
		.to ({}, transDuration * 2)
		.onUpdate (render)
		.start ();

}

function onWindowResize () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix ();

	renderer.setSize (window.innerWidth, window.innerHeight);
	render ();
}

function animate () {
	requestAnimationFrame (animate);
	TWEEN.update ();
	controls.update ();
}

function render () {
	renderer.render (scene, camera);
}

/*
document.getElementById ('info1').innerHTML = 
document.getElementById ('info2').innerHTML = 
document.getElementById ('info3').innerHTML = 
document.getElementById ('info4').innerHTML = 
document.getElementById ('info5').innerHTML = 
document.getElementById ('info6').innerHTML = 
document.getElementById ('info7').innerHTML = 
document.getElementById ('info8').innerHTML = 
*/