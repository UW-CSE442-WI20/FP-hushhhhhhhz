const d3 = require('d3');

class CreateBlock {

	constructor() {

	}

	start() {
		console.log('[CreateBlock]');

		// need this in order to clear out the previous section's visualization
		document.getElementById('vis').innerHTML = "";

		

		// column, row, box
		plain_text_pairs = ["GR", "MO", "MY"];
		cipher_text_pairs = ["MW", "NP", "OW"];

		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var block_container = d3.select("#vis").append("div").attr('class', 'blockContainer')

		var grid = block_container.append('div').attr('class', 'grid');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box block-' + alphabet[j + i * 4 + i]).append('p').text(alphabet[j + i * 4 + i]);
			}
		}

		var text_container = block_container.append('div').attr('class', 'text_container')
		text_container.append('div').attr('class', 'rules');
		
		// this.transitions(plain_text_pairs, cipher_text_pairs, 0);

		var encryption = text_container.append('div').attr('class', 'encryption');
		encryption.append('div').attr('class', 'block_message').text("");
		encryption.append('div').attr('class', 'cipher_message').text("");

		this.message_transition()
		
	}

	message_transition() {
		var initialMessage = "SECRET";
		var cipherMessage = "UCBSDU"
		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		
		var duration = 1000
		var buffer = 2500;

		for(var i=0; i < initialMessage.length; i++){
			var delay = 1000
			d3.select('.block_message').append("div").attr('id', "encr_block_"+i).attr('class', 'block_msg_letter')
				.transition()
				.duration(duration)
				.text(initialMessage[(i == 0) ? 0 : i])
				.delay(delay);

			d3.select('.cipher_message').append("div").attr('id', "decr_block_"+i).attr('class', 'block_msg_letter update_margin')
				.transition()
				.duration(duration)
				.delay(delay);
		}

		var lastTiming = 0;
		for(var i=0; i < initialMessage.length; i+=2){
			var delay = (i==0) ? 0 : (lastTiming - ((i/2) * 3000));

			var last = i/2;
			
			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', 'red')
				.delay((last * buffer)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', 'red')
				.delay((last * buffer)+(delay + duration));	
			

			var e_index1 = alphabet.indexOf(initialMessage[i])
			var e_index2 = alphabet.indexOf(initialMessage[i+1])

			// make two plain text letters red 
			d3.select('.block-' + alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * buffer)+(delay + duration));

			console.log("first" + i, (last * buffer)+(delay + duration) + duration)

			delay = (i==0) ? 2000 : (lastTiming - ((i/2) * 1000) - (1000*(i-2)))

			d3.select("#encr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', 'black')
				.delay((last * buffer)+(delay + duration));

			d3.select("#encr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', 'black')
				.delay((last * buffer)+(delay + duration));	
			
			// make two plain text letters pink
			d3.select('.block-' + alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'pink')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'pink')
				.delay((last * buffer)+(delay + duration));

			var c_index1 = alphabet.indexOf(cipherMessage[i])
			var c_index2 = alphabet.indexOf(cipherMessage[i+1])
			
			// make two cipher text letters red
			d3.select('.block-' + alphabet[c_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[c_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'red')
				.delay((last * buffer)+(delay + duration));

			d3.select("#decr_block_" + i)
				.transition()
				.duration(duration)
				.style('color', 'blue')
				.text(cipherMessage[i])
				.delay((last * buffer)+(delay + duration));

			d3.select("#decr_block_" + (i+1))
				.transition()
				.duration(duration)
				.style('color', 'blue')
				.text(cipherMessage[i+1])
				.delay((last * buffer)+(delay + duration));	

			console.log("second" + i, (last * buffer)+(delay + duration) + duration)

			delay = (i==0) ? 3000 : (lastTiming - ((i-2) * 500))
			
			// decolor everything
			d3.select('.block-' + alphabet[e_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[e_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[c_index1])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));
			d3.select('.block-' + alphabet[c_index2])
				.transition()
				.duration(duration)
				.style('background-color', 'transparent')
				.delay((last * buffer)+(delay + duration));

			console.log("third" + i, (last * buffer)+(delay + duration) + duration)

			lastTiming = (last * buffer)+(delay + duration) + duration
		}


	}

}

module.exports = CreateBlock;


