const d3 = require('d3');

class BlockInteraction {

	constructor() {
	}

	start() {
		d3.selectAll(".fullVis:not(.special)").style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		var canvas =  d3.select('#title6 .fullVis').append('div').attr('class', 'interactiveContainerContainer')

		var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		var interactive_container = canvas.append('div').attr('class', 'interactiveContainer')
		interactive_container.append('h2').attr("class", "block_interactive_title").text('Test your block cipher skills!')
		
		// test encryption skills
		interactive_container.append('h3').attr("class", "block_interactive_title").text('Choose a word from the dropdown below, and try to ENCRYPT it. When you are done click on the check button to see if you got it right')
		var textboxes_and_res = interactive_container.append('div')

		var textboxes = textboxes_and_res.append('div').attr('class', 'textboxes')

		var words = ['CHOOSE A WORD', 'BASE', 'LOVE', 'GENDER', 'FINGER', 'ACADEMIC', 'ACTIVIST']
		var dropdown = textboxes.append('select').attr('id', 'encr_dropdown').attr("class", "dropdown")

		for (var i = 0; i < words.length; i++) {
			dropdown.append('option').text(words[i])
		}

		textboxes.append('input').style('margin-left', '20px').attr("id", 'encr_userinput').attr("class", "userinput")

		textboxes.append('div')
			.attr('id', 'encr_checkbutton')
			.attr("class", "checkbutton")
			.text('CHECK')

		textboxes_and_res.append('div').attr('id', 'encr_shareResult').attr("class", "shareresult")

		document.getElementById("encr_checkbutton").onclick = this.checkencrypt;

		// test decreyption skills
		interactive_container.append('h3').attr("class", "block_interactive_title").text('Choose a word from the dropdown below, and try to DECRYPT it. When you are done click on the check button to see if you got it right')
		var textboxes_and_res = interactive_container.append('div')

		var textboxes = textboxes_and_res.append('div').attr('class', 'textboxes')

		var words = ['CHOOSE A WORD', 'EBDQ', 'XSMY', 'GWKHIS', 'LQKHIS', 'CBDSBUFD', 'ESOFLCTW']
		var dropdown = textboxes.append('select').attr('id', 'decr_dropdown').attr("class", "dropdown")

		for (var i = 0; i < words.length; i++) {
			dropdown.append('option').text(words[i])
		}

		textboxes.append('input').style('margin-left', '20px').attr("id", 'decr_userinput').attr("class", "userinput")

		textboxes.append('div')
			.attr('id', 'decr_checkbutton')
			.attr("class", "checkbutton")
			.text('CHECK')

		textboxes_and_res.append('div').attr('id', 'decr_shareResult').attr("class", "shareresult")

		document.getElementById("decr_checkbutton").onclick = this.checkdecrypt;

		var grid = canvas.append('div').attr('class', 'grid_new');

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				grid.append('div').attr('class', 'grid_box_new').append('p').text(alphabet[j + i * 4 + i]);
			}
		}
	}

	checkencrypt() {
		var selected_word = d3.select('#encr_dropdown option:checked').text();
		var words = ['CHOOSE A WORD', 'BASE', 'LOVE', 'GENDER', 'FINGER', 'ACADEMIC', 'ACTIVIST']
		var ciphered = ['CHOOSE A WORD', 'CBUC', 'MPZA', 'KBOCBU', 'GKMHBU', 'BDBEBPHD', 'BDYOYFTU']

		if (selected_word != 'CHOOSE A WORD') {
			var userinput = document.getElementById("encr_userinput").value
			var index = words.indexOf(selected_word);

			console.log(userinput, ciphered[index])


			if (userinput.toUpperCase() === ciphered[index]) {
				console.log("CONGRATS")
				d3.select("#encr_shareResult").text("YOU ARE A MASTER, CONGRATS!")
				// d3.select("#encr_userinput").style("background-color", "green")
			}else{
				console.log("try again")
				d3.select("#encr_shareResult").text("TRY AGAIN!")
				// d3.select("#encr_userinput").style("background-color", "red")
			}
		}
	}

	checkdecrypt() {
		var selected_word = d3.select('#decr_dropdown option:checked').text();
		var ciphered = ['CHOOSE A WORD', 'DATA', "SNOW", "BRIGHT", "FLIGHT", "BACTERIA", "CULINARY"]
		var words = ['CHOOSE A WORD', 'EBDQ', 'XSMY', 'GWKHIS', 'LQKHIS', 'CBDSBUFD', 'ESOFLCTW']

		if (selected_word != 'CHOOSE A WORD') {
			var userinput = document.getElementById("decr_userinput").value
			var index = words.indexOf(selected_word);

			console.log(userinput, ciphered[index])


			if (userinput.toUpperCase() === ciphered[index]) {
				console.log("CONGRATS")
				d3.select("#decr_shareResult").text("YOU ARE A MASTER, CONGRATS!")
			}else{
				console.log("try again")
				d3.select("#decr_shareResult").text("TRY AGAIN!")
			}
		}
	}

}

module.exports = BlockInteraction;
