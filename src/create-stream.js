const d3 = require('d3');

class CreateStream {
  constructor() {

  }

  start() {
    console.log('[CreateStream]', 'Hello World 5.');
    initialMessage = "MESSAGE";
	initialKey = "KEYKEYK";
	initialCipher = "WIQCEEO";
	document.getElementById('vis').innerHTML = "";	
	var message = d3.select('#vis').append('div').attr('class', 'message');
 
	for(var i = 0; i < initialMessage.length; i++) {
      	var index = message.append('div') 
			.attr('id', 'index' + i)
			.attr('class', 'index');
			
		index.append('div')
      		.attr('class', 'letter')
			.text(initialMessage[i]);
		index.append('div')
            .attr('class', 'key')
			.text(initialKey[i]);
		index.append('div')
            .attr('class', 'cipher')
	}
	var m = 3000;
	for (var i = 0; i < initialMessage.length; i++) {
		d3.select('#index'+i)
			.transition()
			.duration(500)
			.style('color', 'red')
			.delay(m*i);
		d3.select('#index'+i).select('.cipher')
			.transition()
			.duration(500)
			.style('color', 'blue')
			.text(initialCipher[i])
			.delay(1000+m*i);
		d3.select('#index'+i)
            .transition()
            .duration(500)
            .style('color', 'black')
			.delay(2000+m*i);
	}
		
  }
}

module.exports = CreateStream;


