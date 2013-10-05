var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var w = window.innerWidth - 22;
var h = window.innerHeight - 22;

config = {
	fontSize: 16,
	fontFamily: 'Source Code Pro',
	lineHeight: 20,
};

function init() {
	canvas.width = w;
	canvas.height = h;
}

var frame = 0;

function clear() {
	ctx.clearRect(0, 0, w, h);
}

function setup() {
	ctx.font = String(config.fontSize) + 'px "' + config.fontFamily + '"';
}

function drawFrame() {
	ctx.fillStyle = '#ff8888';
	ctx.fillRect(0, 0, (frame % 60) / 60 * w, 1);
}

function drawBoxesPerf() {
	// mid-2012 macbook pro 13":
	// 1000 brings cpu usage to ~30%
	// 4000 brings cpu usage to ~60%
	// 9000 brings cpu usage to ~100%

	for (var i = 0; i < 1000; i++) {
		var x = Math.random() * w;
		var y = Math.random() * h;
		//var color1 = Math.floor(x % 256).toString(16);
		//var color2 = Math.floor(y % 256).toString(16);
		//ctx.fillStyle = '#' + color1 + '00' + color2;
		ctx.fillStyle = '#cccccc';
		ctx.fillRect(x, y, 10, 10);
	}
}

function drawTextAt(text, textX, textY) {
	var x = textX * config.fontSize;
	var y = (textY + 1) * config.fontSize;
	ctx.fillText(text, x, y);
}


function drawTextPerf() {
	var content = "HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLD";

	// 1000 takes about 58% of cpu with 1 characters
	// 1000 takes about 72% of cpu with 10 characters
	// 1000 takes about 98% of cpu with 40 characters
	for (var i = 0; i < 1000; i++) {
		var x = Math.random() * 24;
		var y = Math.random() * 29;

		var color = '#888';
		ctx.fillStyle = color;
		drawTextAt(content, x, y);
	}
}

var perfTest = false;
var perfTestText = false;

function draw() {
	setup();
	clear();
	drawFrame();
	if (perfTest)
		drawBoxes();
	if (perfTestText)
		drawTextPerf();

	frame++;
	requestAnimationFrame(draw);
}

init();
draw();
