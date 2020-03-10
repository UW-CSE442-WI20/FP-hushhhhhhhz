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
historyFlag = false;
var startPos;
sections.each(function(d,i) {
	var top = this.getBoundingClientRect().top;

	if(i === 0) {
		startPos = top;
	}
	sectionPositions.push(top - startPos);
});

var currentIndex = -1;

var activateFunctions = [createIntro, createHistory, createStreamAnimation, createStreamInteraction, createBlockAnimation, createBlockInteraction, createTransitionSection, createSymmetricAnimation, createAsymmetricAnimation, createRSA, createAsymmetricInteraction]

// also bug with intro and history on up scroll
var contentToStep = {
	"content1": "step1",
	"content2": "step2",
	"content3": "step3",
	"content4": "step5",
	"content5": "step8",
	"content6": "step9",
	"content7": "step10",
}

d3.select("#cover")
	.transition()
	.duration(2500)
	.delay(800)
	.style("opacity", '0')
	.on("end", function() { d3.select("#cover").remove()});

var newInstance = new activateFunctions[0]();
newInstance.start(false);

function position() {
	var height = window.innerHeight - 100;
	var pos = window.pageYOffset - height;
	var sectionIndex = d3.bisect(sectionPositions, pos);
	sectionIndex = Math.min(sections.size() - 1, sectionIndex);
	var newInstance = new activateFunctions[sectionIndex]();
	if (currentIndex !== sectionIndex) {
		dispatch.call('active', this, sectionIndex);
		currentIndex = sectionIndex;
		if (currentIndex == 1) {
			if (historyFlag) {
				newInstance.start(true);
			} else {
				newInstance.start(false);
				console.log("got here");
				historyFlag = true;
			}
		} else if (currentIndex == 0) {
			newInstance.start(true);
		} else {
			newInstance.start();
		}
	}
}

d3.selectAll("#vis div")
	.style("font-weight", "normal")
	.on("click", function(d) {
		location.hash = contentToStep[this.id];
		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#" + this.id).classed("selected", true)
	})

var dispatch = d3.dispatch("active", "progress");

d3.select(window)
	.on("scroll.scroller", position);
