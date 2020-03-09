const d3 = require('d3');

class StreamInteraction {

	constructor() {
	}

	start() {
		var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
		var alphabet2 = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		var alphaAlpha = alphabet.concat(alphabet2)

		var plainColor = "var(--plain-color)";
		var keyColor = "var(--key-color)";
		var cipherColor = "var(--cipher-color)";

		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		inputMessage = "";
		inputKey = "";
		resultCipher = "";
		var inputContainer = d3.select('#title4 .fullVis').append('div').attr('class', 'inputContainer');
		var inputs = inputContainer.append('div').attr('class', 'inputs');
		var results = inputContainer.append('div').attr('class', 'results');

		results.append('br')
		results.append('br')
		results.append('br')
		inputs.append('h3').text('Now you try!').attr('class', 'instruction')
		inputs.append('h4').text('type your message and hit select:').attr('class', 'instruction')
		lilDiv = inputs.append('div').attr('class', 'lilDiv')
		var textInput = lilDiv.append('input')
			.attr('id', 'textInput')
			.attr('style', 'text')

		var inputButton = lilDiv.append('div')
			.attr('id', 'inputButton')
			.text('SELECT')

		var textDisplay = results.append('p')
			.attr('id', 'textDisplay')
			.text("plaintext: ")
			.style('color', plainColor)

		var keyDisplay = results.append('p')
			.attr('id', 'keyDisplay')
			.text("keytext: ")
			.style('color', keyColor)

		var cipherDisplay = results.append('p')
			.attr('id', 'cipherDisplay')
			.text("ciphertext: ")
			.style('color', cipherColor)

		inputs.append('h4').text('hover over the keys to see the cipher:').attr('class', 'instruction')
		var row1 = ["RNC","ONQ","CKO","KEY","FGU"];
		var row2 = ["MIO","CAY","ZUU","KRK","BMW"];
		var row3 = ["QXG","UXV","HPV","YUH","LDG"];
		var row4 = ["STD","HVO","JEQ","PYL","DNO"];
		var row5 = ["QDA","HZQ","WKV","XDF","UPR"];
		var keys = [row1, row2, row3, row4, row5];
		var keyTable = inputs.append('table').attr('class', 'keyTable')
		var theadKey = keyTable.append('thead');
		var tbodyKey = keyTable.append('tbody');
		function calculateCipher() {
			if (inputMessage.length > 0) {
				for (var i = 0; i < inputMessage.length; i++) {
					p = alphaAlpha.indexOf(inputMessage[i])
					k = alphaAlpha.indexOf(inputKey[i])
					c = (p + k) % 26
					console.log(c)
					resultCipher = resultCipher + alphaAlpha[c]
					console.log(resultCipher)
				}
			}
		}
		function handleMouseOver() {  // Add interactivity
			d3.select(this).style('background-color', keyColor)
			               .style('color', 'black')
			inputKey = this.id
			var newKey = "" 
			if (inputMessage.length > 0) {
				for (var i = 0; i < inputMessage.length; i++) {
					newKey = newKey + inputKey[i%3]
				}
				inputKey = newKey
			}
			document.getElementById('keyDisplay').innerHTML = "keytext:     " + inputKey;	
			calculateCipher();
			document.getElementById('cipherDisplay').innerHTML = "ciphertext: " + resultCipher;
		}
		function handleMouseOut() {
			d3.select(this).style('background-color', 'transparent')      
			               .style('color', 'white')
			inputKey = ""
			resultCipher = ""
			document.getElementById('keyDisplay').innerHTML = "keytext:    ";
			document.getElementById('cipherDisplay').innerHTML = "ciphertext: ";
		}
		var rowsKey = tbodyKey.selectAll('tr')
			.data(keys)
			.enter()
			.append('tr')
		var cellsKey = rowsKey.selectAll('td')
			.data(function(row, i) {
				return keys.map(function(row) {
					return {column: i, value: row[i]};
				});
			})
			.enter()
			.append('td')
			.html(function(d) {return d.value})
			.attr('id', function(d) { return d.value })
			.attr('class', 'keyChoice')
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut);;
		d3.select('#inputButton').on('click', function () { 
			inputMessage = document.getElementById('textInput').value 
			inputMessage = inputMessage.replace(/\s+/g, '');
			inputMessage = inputMessage.toUpperCase();
			document.getElementById('textDisplay').innerHTML = "plaintext:  " + inputMessage;
			document.getElementById('textInput').value = ""
		});

		var input2Container = d3.select('#title4 .fullVis').append('div').attr('class', 'input2Container');
		var inputs2 = input2Container.append('div').attr('class', 'inputs2'); 
		inputs2.append('h4').text('try to decode this secret message by reversing the equation (C - K mod 26 = P)').attr('class', 'instruction')
		inputs2.append('h4').text('ciphertext: ISSNMBSX').style('color', cipherColor)
		inputs2.append('h4').text('keytext: KEYKEYKE').style('color', keyColor)
		lilDiv2 = inputs2.append('div').attr('class', 'lilDiv2')
		var textInput2 = lilDiv2.append('input')
            .attr('id', 'textInput2')
            .attr('style', 'text')
		var inputButton2 = lilDiv2.append('div')
            .attr('id', 'inputButton2')
            .text('CHECK')
		var answer = lilDiv2.append('h4').text('')
								.style('color', 'white')
								.style('margin', 'auto')
								.attr('id', 'answer')
		d3.select('#inputButton2').on('click', function () {
            guess = document.getElementById('textInput2').value
            guess = guess.replace(/\s+/g, '');
			guess = guess.toUpperCase();
			if (guess == "YOUDIDIT") {
            	document.getElementById('answer').innerHTML = "Correct!";
            } else {
				document.getElementById('answer').innerHTML = "Try again..."
			}
        });


		var table_div = input2Container.append('div').attr('class', 'tableDiv')
        var table = table_div.append('table');
        var thead = table.append('thead');
        var tbody = table.append('tbody');
        thead.append('tr')
            .selectAll('th')
            .data(alphabet)
            .enter()
            .append('th')
            .text(function(letter) { return letter })
            .attr('class', function(letter) { return letter });
        var rows = tbody.selectAll('tr')
            .data([1])
            .enter()
            .append('tr')
        var cells = rows.selectAll('td')
            .data(function(row) {
                return alphabet.map(function(letter) {
                    return {column: letter, value: alphabet.indexOf(letter)};
                });
            })
            .enter()
            .append('td')
            .html(function(d) {return d.value})
            .attr('class', function(d) { return d.column });
		 var table2 = table_div.append('table');
        var thead2 = table2.append('thead');
        var tbody2 = table2.append('tbody');
        thead2.append('tr')
            .selectAll('th')
            .data(alphabet2)
            .enter()
            .append('th')
            .text(function(letter) { return letter })
            .attr('class', function(letter) { return letter });
        var rows2 = tbody2.selectAll('tr')
            .data([1])
            .enter()
            .append('tr')
        var cells2 = rows2.selectAll('td')
            .data(function(row) {
                return alphabet2.map(function(letter) {
                    return {column: letter, value: alphabet2.indexOf(letter) + 13};
                });
            })
            .enter()
            .append('td')
            .html(function(d) {return d.value})
            .attr('class', function(d) { return d.column });
	}
}

module.exports = StreamInteraction;
