// You can require libraries
const d3 = require('d3')

// You can include local JS files:
const createHistory = require('./create-history');
const MyClass = require('./my-class');
const Symmetric = require('./symmetric');
const mySymmetricInstance = new Symmetric();
const Asymmetric = require('./asymmetric');
const myAsymmetricInstance = new Asymmetric();
const myClassInstance = new MyClass();
myClassInstance.sayHi();

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

//var activateFunctions = [createHistory, createStream, createBlock, createModern, createSchemes, createSymmetric, createAsymmetric, createHashRSA]
var activateFunctions = [createHistory, createHistory, createHistory, createHistory, createHistory, Symmetric, Asymmetric, createHistory]
var currentIndex = -1;
function position() {
    var pos = window.pageYOffset - 400;
    var sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);

	console.log(sectionIndex, currentIndex)
    if (currentIndex !== sectionIndex) {
    	dispatch.call('active', this, sectionIndex);
		currentIndex = sectionIndex;
		// currently selects the grey box, will change as we add visualizations
		var newInstance = new activateFunctions[sectionIndex]();
		newInstance.start();
    }
}

var dispatch = d3.dispatch("active", "progress");

d3.select(window)
	.on("scroll.scroller", position);
