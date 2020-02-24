// You can require libraries
const d3 = require('d3')

// You can include local JS files:
const MyClass = require('./my-class');
const myClassInstance = new MyClass();
myClassInstance.sayHi();

// get scrolling coordinates
sections = d3.selectAll('.step')
sectionPositions = [];
var startPos;
sections.each(function(d,i) {
	var top = this.getBoundingClientRect().top;

	if(i === 0) {
		startPos = top;
	}
	sectionPositions.push(top - startPos);
});

d3.select(window)
	.on("scroll.scroller", position);

function position() {
	var pos = window.pageYOffset - 10;
	var sectionIndex = d3.bisect(sectionPositions, pos);
	sectionIndex = Math.min(sections.size() - 1, sectionIndex);

	if (currentIndex !== sectionIndex) {
		dispatch.active(sectionIndex);
		currentIndex = sectionIndex;
	}
}

// var dispatch = d3.dispatch("active", "progress");
// square grid
var squares = g.selectAll(".square").data(wordData);
squares.enter()
	.append("rect")
	.attr("width", squareSize)
	.attr("height", squareSize)
	.attr("fill", "#fff")
	.classed("square", true)
	.classed("fill-square", function(d) { return d.filler; })
	.attr("x", function(d) { return d.x;})
	.attr("y", function(d) { return d.y;})
	.attr("opacity", 0);
