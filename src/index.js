const d3 = require('d3')

const createIntro = require('./create-intro');
const createHistory = require('./create-history');
const createStreamAnimation = require('./create-stream-animation');
const createStreamInteraction = require('./create-stream-interaction');
const createBlockAnimation  = require('./create-block-animation');
const createBlockInteraction  = require('./create-block-interaction');
const createTransitionSection = require('./create-transition-section');
const createSymmetricAnimation = require('./create-symmetric-animation');
const createSymmetricInteraction = require('./create-symmetric-interaction');
const createAsymmetricAnimation = require('./create-asymmetric-animation');
const createAsymmetricInteraction = require('./create-asymmetric-interaction');
const createRSA = require('./create-rsa');

// get scrolling coordinates
sections = d3.selectAll('.step');
names = d3.select("#sections").selectAll('div');
sectionPositions = [];
var startPos;
sections.each(function(d,i) {
	var top = this.getBoundingClientRect().top;

	if(i === 0) {
		startPos = top;
	}
	sectionPositions.push(top - startPos);
});

var currentIndex = -1;

var activateFunctions = [createIntro, createHistory, createStreamAnimation, createStreamInteraction, createBlockAnimation, createBlockInteraction, createTransitionSection, createSymmetricAnimation, createSymmetricInteraction, createAsymmetricAnimation, createAsymmetricInteraction, createRSA]
var contentToStep = {
	"content1": "step1",
	"content2": "step2",
	"content3": "step3",
	"content4": "step5",
	"content5": "step8",
	"content6": "step10",
	"content7": "step12",
}

function position() {
	var height = window.innerHeight - 100;
	var pos = window.pageYOffset - height;
	var sectionIndex = d3.bisect(sectionPositions, pos);
	sectionIndex = Math.min(sections.size() - 1, sectionIndex);
	var newInstance = new activateFunctions[sectionIndex]();
	if (currentIndex !== sectionIndex) {
		dispatch.call('active', this, sectionIndex);
		currentIndex = sectionIndex;
		newInstance.start();
	}
}

d3.selectAll("#vis div")
    .style("font-weight", "normal")
	.on("click", function(d) {
		location.hash = contentToStep[this.id];
		d3.select("#" + this.id).style("font-weight", "bold")
})

var dispatch = d3.dispatch("active", "progress");

d3.select(window)
	.on("scroll.scroller", position);
