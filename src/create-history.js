const d3 = require('d3');
  
// You can separate your code out into modules to
// keep code clean.

class CreateHistory {
  constructor() {

  }

  start() {
    console.log('[CreateHistory]', 'Hello World 5.');
	document.getElementById('vis').innerHTML = "";		
	
	var timelineContainer = d3.select('#vis').append('div').attr('class', 'timelineContainer');
	var leftDiv = timelineContainer.append('div').attr('class', 'leftDiv');
	var lineDiv = timelineContainer.append('div').attr('class', 'lineDiv');
	var rightDiv = timelineContainer.append('div').attr('class', 'rightDiv');
	var line = lineDiv.append('div').attr('class', 'line');

	var firstEvent = leftDiv.append('div').attr('class', 'eventBox');
	firstEvent.append('text').text("Event 1")
	leftDiv.append('br')
  	leftDiv.append('div').attr('class', 'eventBox');
  }
}

module.exports = CreateHistory;

