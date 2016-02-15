var menuHTML = "<button id = \"table\">TABLE</button>" +
			   "<button id = \"helix\">HELIX</button>" +
			   "<button id = \"grid\">GRID</button>" +
			   "<button id = \"rsetCam\">RESET CAM</button>" +
			   "<button id = \"shuffle\">SHUFFLE</button>" +
			   "<button id = \"topView\">TOP VIEW</button>" +
			   "<button id = \"bottomView\">BOTOM VIEW</button>" +
			   "<button id = \"player1\">PLAYER 1</button>" +
			   "<button id = \"player2\">PLAYER 2</button>" +
			   "<button id = \"player3\">PLAYER 3</button>" +
			   "<button id = \"player4\">PLAYER 4</button>";

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

var camera, scene, renderer, controls;
var targets = {table: [], sphere: [], helix: [], grid: []};
var currentTarget; //stores the current target view
var cardDeck = [], players = [];
var cardColorVal = {0: "rgb(190, 0, 0)", 1: "rgb(200, 200, 0)", 2: "rgb(0, 190, 0)", 3: "rgb(200, 200, 200)"};
var cardColorName = {0: "red", 1: "white", 2: "green", 3: "yellow"};

generateDeck (2);
init ();
animate ();

function init () {
	document.getElementById ('menu').innerHTML = menuHTML;	
	scene = new THREE.Scene ();
	camera = new THREE.PerspectiveCamera (75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1700; // camera values are for debug, keep z position when done !!!

	for (var i = 0; i < cardDeck.length; i ++) //add each cards to the scene
		scene.add (cardDeck [i]);
	
// ========================================================================== this part is for debug !!!
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
	stickObj2.rotation.y = 1.57;
	scene.add (stickObj2);
	
// ======================================================================== consider making this plane into table later !!!
	
	for (var i = 0; i < 4; i ++) { //creating player objects
		var player = document.createElement ('div');
		player.className = 'player one';
		player.textContent = "player " + (i + 1);
		players.push (new THREE.CSS3DObject (player));
		
		players[i].position.z = 350;
		if (i == 0) {
			players[i].position.y = -550;
			players[i].rotation.x = 45 * Math.PI / 180;
		} else if (i == 1) {
			players[i].position.x = 550;
			players[i].rotation.y = 45 * Math.PI / 180;
			players[i].rotation.z = 90 * Math.PI / 180;
		} else if (i == 2) {
			players[i].position.y = 550;
			players[i].rotation.x = -45 * Math.PI / 180;
			players[i].rotation.z = 180 * Math.PI / 180;
		} else if (i == 3) {
			players[i].position.x = -550;
			players[i].rotation.y = -45 * Math.PI / 180;
			players[i].rotation.z = -90 * Math.PI / 180;
		}
		
		scene.add (players [i]);
	}
	
	// table
	var row = col = 0;
	for (var i = 0; i < cardDeck.length; i ++) { //push each card coordinades position into table layout 
		targets.table.push (new THREE.Object3D ());
		
		if (i % 28 == 0) //adjust row and collumn position of cards when listing on table 
			row += (col = 1);
		
		targets.table [i].position.x = (col ++ * 119.4) - 1730;
		targets.table [i].position.y = -(row * 335) + 335;
		targets.table [i].position.z = 10; //===============================temp value for debug, z position originally 0 !!!
	}
	
	// helix
	var vector = new THREE.Vector3 ();
	for (var i = 0, l = cardDeck.length; i < l; i ++ ) {
		targets.helix.push (new THREE.Object3D ());
		
		var phi = i * 0.17 + Math.PI;
		
		targets.helix [i].position.x = 700 * Math.sin (phi);
		targets.helix [i].position.y = -(i * 9.1) + 850;
		targets.helix [i].position.z = 700 * Math.cos (phi);

		vector.x = targets.helix [i].position.x * 2;
		vector.y = targets.helix [i].position.y;
		vector.z = targets.helix [i].position.z * 2;

		targets.helix [i].lookAt (vector);
	}

	// grid
	for (var i = 0; i < cardDeck.length; i ++) {
		targets.grid.push (new THREE.Object3D ());
		
		targets.grid [i].position.x = ((i % 5) * 400) - 800;
		targets.grid [i].position.y = (-( Math.floor (i / 5) % 5) * 600) + 1200;
		targets.grid [i].position.z = (Math.floor(i / 25)) * 400 - 100;
	}

	renderer = new THREE.CSS3DRenderer ();
	renderer.setSize (window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';
	document.getElementById ('container').appendChild (renderer.domElement);
	
	var menuBtn = document.getElementById ('container'); // the event listener for the menu buttons
	menuBtn.addEventListener ('click', cardHandler, false);
	
	var menuBtn = document.getElementById ('menu'); // the event listener for the menu buttons
	menuBtn.addEventListener ('click', buttonHandler, false);
	
	/* //temporary commented out for debugging purposes, do not delete
	controls = new THREE.TrackballControls (camera, renderer.domElement);
	controls.rotateSpeed = 2;
	controls.minDistance = 150;
	controls.maxDistance = 6000;
	controls.addEventListener ('change', render);
	*/
	
	transform (cardDeck, cardDeck); //arrange cardDeck into table format
	//currentTarget = "table";
	
	window.addEventListener ('resize', onWindowResize, false);
}

function buttonHandler (event) {
	if (event.target != event.currentTarget) //event.target is clicked item, event.currentTarget is id="menu" assigned to eventListener  
		var clickedItem = event.target.id; //catch event at parent element, the menu element 
	event.stopPropagation (); //stop the DOM event propagation. source: https://www.kirupa.com/html5/handling_events_for_many_elements.htm

	var target = new THREE.Object3D ();
	
	switch (clickedItem) {
		case "table":
			currentTarget = "table";
			transform (cardDeck, targets.table);
			return;
		
		case "helix":
			currentTarget = "helix";
			transform (cardDeck, targets.helix);
			return;
		
		case "grid":
			currentTarget = "grid";
			transform (cardDeck, targets.grid);
			return;
		
		case "rsetCam":
			rsetCam ();
			return;
		
		case "shuffle":
			shuffleDeck ();
			return;
		
		case "topView":
			target.rotation.x = 0; // positive for clockwise
			target.rotation.y = 0;
			target.rotation.z = 0;
			break;
		
		case "bottomView":
			target.rotation.y = 180 * Math.PI / 180;
			break;
		
		case "player1":
			target.rotation.x = -65 * Math.PI / 180; // positive for clockwise
			break;
		
		case "player2":
			target.rotation.x = -65 * Math.PI / 180; // positive for clockwise
			target.rotation.z = -90 * Math.PI / 180;
			break;
		
		case "player3":
			target.rotation.x = -65 * Math.PI / 180; // positive for clockwise
			target.rotation.z = -180 * Math.PI / 180;
			break;
		
		case "player4":
			target.rotation.x = -65 * Math.PI / 180;
			target.rotation.z = -270 * Math.PI / 180;
			break;
			
		default:
			return;
	}
	
	document.getElementById ('info3').innerHTML = clickedItem + " view"; // for debuging purposes !!!
	transform ([scene], [target]);
}

function generateDeck (sets) {
	var color = 'rgb(190, 0, 0)', cardIdx = 0; //initial color is red
	
	for (var i = 0; i < symbols.length * 2 * sets; i += 3) {
		var faceFront = document.createElement ('div');
		faceFront.className = 'front face';
		faceFront.style.backgroundColor = cardColorVal [i % 4];
		
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
		
		var overlayFace = document.createElement ('div');
		overlayFace.className = "overlay face";
		overlayFace.id = "card" + cardIdx;
		card.appendChild (overlayFace);
		
		var faceBack = document.createElement ('div');
		faceBack.className = 'back face';
		card.appendChild (faceBack);
		
		var cardObj = new THREE.CSS3DObject (card); //initial position before settle in table 
		cardObj.position.z += cardIdx;
		
		cardObj.name = "card" + cardIdx; //alternative id for card object within scene beside div ElementId
		
		cardDeck.push (cardObj); //push individual card into the list of cardDeck
		
		cardIdx ++; //increases the card index value
	}
	
	document.getElementById ('info1').innerHTML = cardDeck.length + " cards generated to deck";
	document.getElementById ('info2').innerHTML = (cardDeck.length / 28) + " sets deck";		
}

function shuffleDeck () {
	var i = cardDeck.length, j, temp;
	while (--i > 0) {
		j = Math.floor (Math.random () * (i + 1));		
		temp1 = cardDeck [j];
		cardDeck [j] = cardDeck [i];
		cardDeck [i] = temp1;
	}
	
	if (currentTarget == "table")
		document.getElementById('table').click();
	else if (currentTarget == "helix")
		document.getElementById('helix').click();
	else if (currentTarget == "grid")
		document.getElementById('grid').click();	
}

function cardHandler (cardId) {
	if (event.target != event.currentTarget) //event.target is clicked item, event.currentTarget is id="menu" assigned to eventListener  
		var clickedCard = event.target.id; //catch event at parent element, the menu element 
	event.stopPropagation (); //stop the DOM event propagation. source: https://www.kirupa.com/html5/handling_events_for_many_elements.htm
	
	if (clickedCard.substr (0, 4) == "card") { // check if this is a card		
		var obj = cardDeck [clickedCard.substr (4)]; //remove card from this
		obj = scene.getObjectByName (clickedCard); //this example shows how to access an object in scene
		
		scene.remove (obj); //there were issue removing card after shuffle
		render ();
		
		document.getElementById ('info3').innerHTML = clickedCard; //accessing card's index value
		
		var color = cardColorName [clickedCard.substr (4) % 4]; 
		document.getElementById ('info4').innerHTML = color; //accessing cards color name
		
		//document.getElementById (clickedCard).style.backgroundColor = 'rgba(200, 200, 200, .5)'; //change cards overlay color
	}
}
/*
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
*/

/*
 * this function takes in array of THREE.Object3D 
 * for both of its parameters
 */
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
	//controls.update ();
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