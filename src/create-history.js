const d3 = require('d3');
  
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
	rightDiv.append('br')
	var line = lineDiv.append('div').attr('class', 'line');

        eventHash = { 
		"1467": "Leon Battista Alberti, the father of western cryptography, invented cipher wheel",
		"1553": "Vigenere cipher described by Giovan Battista Bellaso",
		"1678": "Robert Hooke publishes first one way function (related to RSA)",
		"1854": "playfair invented by Sir Charles Wheatstone",
		"1863": "first published solution to vigenere cipher, authored by Kasiski",
		// "1917" : "Gilbert Vernam proposed one time pad, a stream cipher",
		"1923": "enigma decoding machine invented by alan turing and co.",
		"1960": "cryptographic hash functions were first used in computers for passwords",
		"1975": "DES, data encryption standard in 1975 (an early symmetric key encryption)",
		// "2001": "SHA-2 published in 2001, SHA-3 in 2015",
		// "2015": "SHA-2 published in 2001, SHA-3 in 2015",
	}

	var i = 0;
	var delay = 1000;
	for (var key in eventHash) {
		var side = (i % 2 == 0) ? leftDiv : rightDiv;
		var eventBox = side.append('div')

		eventBox.transition()
			.attr('class', 'eventBox')
			.attr('id', 'eventBox' + i)
		        .delay(delay * i);

		eventBox.append('div')
		        .transition()
			.attr('class', 'year')
			.text(key)
		        .delay(delay * i);
		eventBox.append('div')
		        .transition()
			.attr('class', 'event')
			.text(eventHash[key])
		        .delay(delay * i);
		i += 1;
	}
  }
}

module.exports = CreateHistory;

