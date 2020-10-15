if (document.title != "chrome://dino/") {
        alert('You need to be on chrome://dino to execute this script.');
        throw new Error('Wrong webpage');
}
document.title = "chrome://dino";
const html = "<body><a>Thank you for using SamHack</a><br><br><a>Invincibility</a><input type=\"checkbox\"id=\"invin\"><br><a>Set Speed			</a><input type=\"text\" id=\"spd\" name=\"spd\"><br><button onclick=\"setspd()\"id=\"setspd\">Set Speed</button><br><br><a>Set High Score			</a><input type=\"text\" id=\"scr\" name=\"scr\"><br><button onclick=\"setshs()\"id=\"setshs\">Set High Score</button><br><br><a>Remove Cactus</a><input type=\"checkbox\"id=\"cac\"><br><button onclick=\"game0ver()\"id=\"endgame\">End Game</button><br><br><a>Stop Dino</a><input type=\"checkbox\"id=\"remv\"><br><br><a>Weird stuff</a><br><a>Set State			</a><br><button onclick=\"setsta('crashed')\"id=\"setstcr\">CRASHED</button><button onclick=\"setsta('ducking')\"id=\"setstdu\">DUCKING</button><button onclick=\"setsta('jumping')\"id=\"setstju\">JUMPING</button><button onclick=\"setsta('running')\"id=\"setstru\">RUNNING</button><button onclick=\"setsta('waiting')\"id=\"setstwa\">WAITING</button></body>";
document
.evaluate('//*[text()="ERR_INTERNET_DISCONNECTED"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
.snapshotItem(0)
// begin html
.innerHTML = html;
// end html
document.getElementById("invin").style.opacity = 100;
document.getElementById("cac").style.opacity = 100;
document.getElementById("remv").style.opacity = 100;
document.getElementById("setspd").style.cssFloat = "left";
document.getElementById("setshs").style.cssFloat = "left";
document.getElementById("setstcr").style.cssFloat = "left";
document.getElementById("setstdu").style.cssFloat = "left";
document.getElementById("setstju").style.cssFloat = "left";
document.getElementById("setstru").style.cssFloat = "left";
document.getElementById("setstwa").style.cssFloat = "left";
document.getElementById("endgame").style.cssFloat = "left";

// init above

var old1;
var old2;
var old3 = false;
var a = Runner.instance_.gameOver;
var b = [Obstacle.types,Horizon.prototype.addNewObstacle,checkForCollision];

// vars above

function setspd() {
	if (isNaN(Number(document.getElementById("spd").value)) || document.getElementById("spd").value < 1) {
		document.getElementById("spd").value = "1";
		alert('Value must be a number larger than 1.');
	} else {
		Runner.instance_.setSpeed(Number(document.getElementById("spd").value));
	}
}
function setshs() {
	if (isNaN(Number(document.getElementById("scr").value)) || (document.getElementById("scr").value < 1 || document.getElementById("scr").value > 999999)) {
		document.getElementById("scr").value = "0";
		alert('Value must be a number between 0 and 1,000,000.');
	} else {
		Runner.instance_.saveHighScore(document.getElementById("scr").value*40);
	}
}
function setsta(a) {
	Runner.instance_.tRex.update(100, a.toUpperCase());
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
    if (document.getElementById("remv").checked) {
        Runner.instance_.setSpeed(0.01);
        old3 = document.getElementById("remv").checked
    } else {
        if (old3 != document.getElementById("remv").checked) {
            Runner.instance_.setSpeed(2);
            old3 = document.getElementById("remv").checked
        }
	}
})

// extra functions below

function game0ver() {
    Runner.instance_.playSound(Runner.instance_.soundFx.HIT);
    vibrate(200);
    Runner.instance_.stop();
    Runner.instance_.crashed = true;
    Runner.instance_.distanceMeter.achievement = false;
    Runner.instance_.tRex.update(100, Trex.status.CRASHED);
    if (!Runner.instance_.gameOverPanel) {
        if (Runner.instance_.canvas) {
        Runner.instance_.gameOverPanel = new GameOverPanel(Runner.instance_.canvas,
            Runner.instance_.spriteDef.TEXT_SPRITE, Runner.instance_.spriteDef.RESTART,
            Runner.instance_.dimensions);
      }
    } else {
      Runner.instance_.gameOverPanel.draw();
    }
    if (Runner.instance_.distanceRan > Runner.instance_.highestScore) {
      Runner.instance_.saveHighScore(Runner.instance_.distanceRan);
    }
    Runner.instance_.time = getTimeStamp();
}
// end

console.log('Succesfully loaded.');
