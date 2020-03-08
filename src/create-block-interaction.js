const d3 = require('d3');

class BlockInteraction {

	constructor() {
	}

	start() {
		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		var interactive_container = d3.select('#title6 .fullVis').append('div').attr('class', 'interactiveContainer')
		interactive_container.append('h2').text('Test your block cipher skills!')
		interactive_container.append('h3').text('Choose a word from the dropdown below, and try to cipher it. When you are done click on the check button to see if you got it right :)')
		var textboxes = interactive_container.append('div').attr('class', 'textboxes')

		var words = ['CHOOSE A WORD', 'BASE', 'LOVE', 'GENDER', 'FINGER', 'ACADEMIC', 'ACTIVIST']
		var dropdown = textboxes.append('select').attr('id', 'dropdown')

		for (var i = 0; i < words.length; i++) {
			dropdown.append('option').text(words[i])
		}

		textboxes.append('input').style('margin-left', '20px').attr("id", 'userinput')

		textboxes.append('div')
			.attr('id', 'checkbutton')
			.text('CHECK')

		textboxes.append('div').attr('id', 'shareResult')

		document.getElementById("checkbutton").onclick = this.checkanswer;
	}

	checkanswer() {
		var selected_word = d3.select('#dropdown option:checked').text();
		var words = ['CHOOSE A WORD', 'BASE', 'LOVE', 'GENDER', 'FINGER', 'ACADEMIC', 'ACTIVIST']
		var ciphered = ['CHOOSE A WORD', 'CBUC', 'MPZA', 'KBOCBU', 'GKMHBU', 'BDBEBPHD', 'BDYOYFTU']

		if (selected_word != 'CHOOSE A WORD') {
			var userinput = document.getElementById("userinput").value
			var index = words.indexOf(selected_word);

			console.log(userinput, ciphered[index])


			if (userinput.toUpperCase() === ciphered[index]) {
				console.log("CONGRATS")
				d3.select("#shareResult").text("congrats!")
			}else{
				console.log("try again")
				d3.select("#shareResult").text("try again!")
			}
		}
	}

}

module.exports = BlockInteraction;
