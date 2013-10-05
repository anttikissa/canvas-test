var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var w = window.innerWidth - 22;
var h = window.innerHeight - 22;

config = {
	fontSize: 13,
	// I guess we could sniff this.
	characterWidth: 8,
	fontWeight: '400',
	fontFamily: 'Source Code Pro',
	fontColor: '#000',
	lineHeight: 16,
	// These affect how text looks because antialiasing/hinting
	fontXOffset: 0.5,
	// Apparently this isn't subpixel accurate, too bad.
	fontYOffset: 0,
};

function init() {
	canvas.width = w;
	canvas.height = h;
}

var frame = 0;

function clear() {
	ctx.clearRect(0, 0, w, h);
}

function setupFont() {
	var weight = config.fontWeight + ' ';
	var size = String(config.fontSize) + 'px ';
	var family = '"' + config.fontFamily + '"';
	ctx.font = weight + size + family;
	ctx.fillStyle = config.fontColor;
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
		ctx.fillRect(x, y, 10, 10);
	}
}

function drawTextAt(text, textX, textY) {
	var x = textX * config.characterWidth + config.fontXOffset;
	var y = (textY + 1) * config.lineHeight + config.fontYOffset;
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

var lines = [
	"abcdefghijklmnopqrstuvwxyz",
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"0123456789!@#$%^&*(){}[]-=_+|\~`,./<>?",
	"sex prof gives back no quiz with mild joy.",
	"SEX PROF GIVES BACK NO QUIZ WITH MILD JOY.",
	"The romantic growth and imaginative shaping of chivalric love having been ",
	"he romantic growth and imaginative shaping of chivalric love having been ",
	"e romantic growth and imaginative shaping of chivalric love having been ",
	" romantic growth and imaginative shaping of chivalric love having been ",
	"romantic growth and imaginative shaping of chivalric love having been ",
	"omantic growth and imaginative shaping of chivalric love having been ",
	"followed in the fortunes of its great exemplars, Tristan, Iseult, Lancelot,",
	"Guinevere, Parzival, a different illustration of mediaeval passion may be had",
	"by turning from these creations of literature to an actual woman, whose love ",
	"for a living man was thought out as keenly and as tragically felt as any ",
	"heart-break of imagined lovers, and was impressed with as entire a ",
	"self-surrender as ever ravished the soul of nun panting with love of the ",
	"God-man."
];

function drawEditor() {
	setupFont();
	var x = 0;
	for (var line = 0; line < lines.length; line++) {
		if (line > 5)
			x++;
		if (line > 10)
			x = 0;
		drawTextAt(lines[line], x, line);
	}
}

function draw() {
	clear();
	drawFrame();
	if (perfTest)
		drawBoxes();
	if (perfTestText)
		drawTextPerf();

	drawEditor();

	frame++;
	requestAnimationFrame(draw);
}

init();
draw();
