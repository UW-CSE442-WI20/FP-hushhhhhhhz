const d3 = require('d3');

class CreateBlock {

	constructor() {

	}
	start() {
		console.log('[CreateBlock]');

		initialMessage = "meet me at noon";
		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		// need this in order to clear out the previous section's visualization
		document.getElementById('vis').innerHTML = "";

		var block_container = d3.select("#vis").append("div").attr('class', 'blockContainer')

		var grid = block_container.append('div').attr('class', 'grid');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box block-' + alphabet[j + i * 4 + i]).text(alphabet[j + i * 4 + i]);
			}
		}

		var row_ex = block_container.append("div")
		var plain_text = row_ex.append('div').attr('class', 'example')
		plain_text.append('div').text('G').attr('class', 'block_letter')
		plain_text.append('div').text('R').attr('class', 'block_letter')

		var cipher_text = row_ex.append('div').attr('class', 'example')
		cipher_text.append('div').attr('id', 'row_cipher_1').attr('class', 'block_letter')
		cipher_text.append('div').attr('id', 'row_cipher_2').attr('class', 'block_letter')


		// color the plain text letters in the grid (red)
		d3.select('.block-G')
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(0);
		d3.select('.block-R')
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(0);

		// color the plain text letters in the grid (light red)
		d3.select('.block-G')
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(600);
		d3.select('.block-R')
			.transition()
			.duration(500)
			.style('background-color', '#ffcccc')
			.delay(600);

		// color the cipher text letters in the grid (red)
		d3.select('.block-M')
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(700);
		d3.select('.block-W')
			.transition()
			.duration(500)
			.style('background-color', 'red')
			.delay(700);

		// add in the ciphered letters at the same time as the cipher text highlight
		d3.select("#row_cipher_1")
			.transition()
			.duration(500)
			.text("M")
			.delay(700);

		d3.select("#row_cipher_2")
			.transition()
			.duration(500)
			.text("W")
			.delay(700);

	}
}

module.exports = CreateBlock;


