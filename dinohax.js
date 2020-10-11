if (document.title != "chrome://dino/") {
        alert('You need to be on chrome://dino to execute this script.');
        throw new Error('Wrong webpage');
}
document.title = "chrome://dino";
document
.evaluate('//*[text()="ERR_INTERNET_DISCONNECTED"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
.snapshotItem(0)
// begin html
.innerHTML = "<body><a>Thank you for using SamHack</a><br><br><a>Invincibility</a><input type=\"checkbox\"id=\"invin\"><br><br><a>Set Speed			</a><input type=\"text\" id=\"spd\" name=\"spd\"><br><button onclick=\"setspd()\"id=\"setspd\">Set Speed</button><br><br><br><a>Set High Score			</a><input type=\"text\" id=\"scr\" name=\"scr\"><br><button onclick=\"setshs()\"id=\"setshs\">Set High Score</button><br><br><br><a>Remove Cactus</a><input type=\"checkbox\"id=\"cac\"><br><button onclick=\"Runner.instance_.gameOver()\"id=\"endgame\">End Game (only works if Remove Cactus is off.)</button><br><br><br><a>Weird stuff</a><br><a>Set State			</a><br><button onclick=\"setsta('crashed')\"id=\"setstcr\">CRASHED</button><button onclick=\"setsta('ducking')\"id=\"setstdu\">DUCKING</button><button onclick=\"setsta('jumping')\"id=\"setstju\">JUMPING</button><button onclick=\"setsta('running')\"id=\"setstru\">RUNNING</button><button onclick=\"setsta('waiting')\"id=\"setstwa\">WAITING</button></body>";
// end html
document.getElementById("invin").style.opacity = 100;
document.getElementById("cac").style.opacity = 100;
document.getElementById("setspd").style.cssFloat = "left";
document.getElementById("setshs").style.cssFloat = "left";
document.getElementById("setstcr").style.cssFloat = "left";
document.getElementById("setstdu").style.cssFloat = "left";
document.getElementById("setstju").style.cssFloat = "left";
document.getElementById("setstru").style.cssFloat = "left";
document.getElementById("setstwa").style.cssFloat = "left";
document.getElementById("endgame").style.cssFloat = "left";

// init above

var old1 = false;
var old2 = false;
var old3 = false;
var a = checkForCollision;
var b = [Obstacle.types,Horizon.prototype.addNewObstacle,checkForCollision];

// vars above

function setspd() {
	if (isNaN(Number(document.getElementById("spd").value)) || document.getElementById("spd").value < 2) {
		document.getElementById("spd").value = "1";
		alert('Value must be a number larger than 2.');
	} else {
		Runner.instance_.setSpeed(document.getElementById("spd").value);
	}
}
function setshs() {
	if (isNaN(Number(document.getElementById("scr").value)) || (document.getElementById("scr").value < 1 || document.getElementById("scr").value > 99999)) {
		document.getElementById("scr").value = "0";
		alert('Value must be a number between 0 and 100,000.');
	} else {
		Runner.instance_.saveHighScore(document.getElementById("scr").value*40);
	}
}
function setsta(a) {
	if (a == "crashed") {
		Runner.instance_.tRex.update(100, Trex.status.CRASHED);
	}
	if (a == "ducking") {
		Runner.instance_.tRex.update(100, Trex.status.DUCKING);
	}
	if (a == "jumping") {
		Runner.instance_.tRex.update(100, Trex.status.JUMPING);
	}
	if (a == "running") {
		Runner.instance_.tRex.update(100, Trex.status.RUNNING);
	}
	if (a == "waiting") {
		Runner.instance_.tRex.update(100, Trex.status.WAITING);
	}
}

// buttons above

// checkboxes & dropdowns below

setInterval(function (){
	if (document.getElementById("invin").checked != old1) {
		if (document.getElementById("invin").checked) {
			Runner.instance_.gameOver = function(){};
		} else {
			Runner.instance_.gameOver = a;
		}
    old1 = document.getElementById("invin").checked;
	}
	if (document.getElementById("cac").checked != old2) {
		if (document.getElementById("cac").checked) {
			Obstacle.types = null;
			Horizon.prototype.addNewObstacle = function(){};
			checkForCollision = function(){};
		} else {
			Obstacle.types = b[0];
			Horizon.prototype.addNewObstacle = b[1];
			checkForCollision = b[2];
		}
		old2 = document.getElementById("cac").checked;
	}
})

console.log('Succesfully loaded.');