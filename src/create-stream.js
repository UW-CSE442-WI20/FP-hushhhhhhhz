const d3 = require('d3');

class CreateStream {
  constructor() {

  }

  start() {
    console.log('[CreateStream]', 'Hello World 5.');
    initialMessage = "MESSAGE";
	initialKey = "KEYKEYK";
	document.getElementById('vis').innerHTML = "";	
	var message = d3.select('#vis').append('div').attr('class', 'message');
 
	for(var i = 0; i < initialMessage.length; i++) {
      	var index = message.append('div') 
			.attr('id', i)
			
		index.append('div')
      		.attr('class', 'letter')
			.text(initialMessage[i]);
		index.append('div')
            .attr('class', 'key')
			.text(initialKey[i]);
		index.append('div')
            .attr('class', 'cipher')
}
		
  }
}

module.exports = CreateStream;


