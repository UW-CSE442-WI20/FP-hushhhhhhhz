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

		d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

		inputMessage = "";
		inputKey = "";
		resultCipher = "";
		var title = d3.select('#title4 .fullVis').append('div').attr('class', 'title1Container');
		title.append('h1').text('Now you try!').style('font-color', 'white')
		var title2 = d3.select('#title4 .fullVis').append('div').attr('class', 'title2Container');
		title2.append('h2').text('Encryption:').style('font-color', 'white')
		var inputContainer = d3.select('#title4 .fullVis').append('div').attr('class', 'inputContainer');
		var inputs = inputContainer.append('div').attr('class', 'inputs');
		var table_div = inputContainer.append('div').attr('class', 'tableDiv')	
		var results = inputContainer.append('div').attr('class', 'results');
		results.append('text').text('see the results below:')
		inputs.append('h4').text('type your message and hit select:').attr('class', 'instruction')
		lilDiv = inputs.append('div').attr('class', 'lilDiv')
		var textInput = lilDiv.append('input')
			.attr('id', 'textInput')
			.attr('style', 'text')

		var inputButton = lilDiv.append('div')
			.attr('id', 'inputButton')
			.text('SELECT')

		var plainDiv = results.append('div').attr('class', 'resultsDivs')
		var textDisplay = plainDiv.append('div')
			.attr('id', 'textDisplay')
			.append('h2')
			.text("plaintext: ")
			.style('color', plainColor)
		var plainChoice = plainDiv.append('div')
            .append('h2')
            .text("")
			.attr('id', 'plainChoice')
            .style('color', plainColor)

		var keyDiv = results.append('div').attr('class', 'resultsDivs')
        var keyDisplay = keyDiv.append('div')
            .attr('id', 'keyDisplay')
            .append('h2')
            .text("keytext: ")
            .style('color', keyColor)
        var keyChoice = keyDiv.append('div')
            .append('h2')
            .text("")
            .attr('id', 'keyChoice')
            .style('color', keyColor)

		var cipherDiv = results.append('div').attr('class', 'resultsDivs')
        var cipherDisplay = cipherDiv.append('div')
            .attr('id', 'cipherDisplay')
            .append('h2')
            .text("ciphertext: ")
            .style('color', cipherColor)
        var cipherChoice = cipherDiv.append('div')
            .append('h2')
            .text("")
            .attr('id', 'cipherChoice')
            .style('color', cipherColor)

		var row1 = ["RNC","ONQ","CKO","KEY","FGU"];
		var row2 = ["MIO","CAY","ZUU","KRK","BMW"];
		var row3 = ["QXG","UXV","HPV","YUH","LDG"];
		var row4 = ["STD","HVO","JEQ","PYL","DNO"];
		var row5 = ["QDA","HZQ","WKV","XDF","UPR"];
		var keys = [row1, row2, row3, row4, row5];
		table_div.append('h4').text('hover below to choose a key:').attr('class', 'instruction')
		var keyTable = table_div.append('table').attr('class', 'keyTable')
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
		savedId = ""
		savedKey = ""
		savedCipher = ""
		function handleClick() {
			d3.select(this).style('color', 'white')
			if (savedId != "") {
				d3.select("#" + savedId).style('color', 'white')
			}
			inputKey = this.id
			savedId = inputKey
			var newKey = ""
			if (inputMessage.length > 0) {
				for (var i = 0; i < inputMessage.length; i++) {
					newKey = newKey + inputKey[i%3]
				}
				inputKey = newKey
			}
			savedKey = inputKey;
			savedCipher = resultCipher;
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
			document.getElementById('keyChoice').innerHTML = inputKey;	
			calculateCipher();
			document.getElementById('cipherChoice').innerHTML = resultCipher;
		}
		function handleMouseOut() {
			d3.select(this).style('background-color', 'transparent')      
			               .style('color', 'white')
			inputKey = ""
			resultCipher = ""
			d3.select("#" + savedId).style('color', keyColor)
			document.getElementById('keyChoice').innerHTML = savedKey;
			document.getElementById('cipherChoice').innerHTML = savedCipher;
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
			.on("mouseout", handleMouseOut)
		    .on("click", handleClick);
		d3.select('#inputButton').on('click', function () { 
			inputMessage = document.getElementById('textInput').value 
			inputMessage = inputMessage.replace(/\s+/g, '');
			inputMessage = inputMessage.toUpperCase();
			document.getElementById('plainChoice').innerHTML = inputMessage;
			document.getElementById('textInput').value = ""
		});

		var title3 = d3.select('#title4 .fullVis').append('div').attr('class', 'title3Container');
        title3.append('h2').text('Decryption:')
		var input2Container = d3.select('#title4 .fullVis').append('div').attr('class', 'input2Container');
		var inputs2 = input2Container.append('div').attr('class', 'inputs2'); 
		inputs2.append('h4').text('try to decode this secret message by reversing the equation (C - K mod 26 = P)').attr('class', 'instruction')
		inputs2.append('h2').text('ciphertext: ISSNMBSX').style('color', cipherColor)
		inputs2.append('h2').text('keytext: KEYKEYKE').style('color', keyColor)

		var table_div2 = input2Container.append('div').attr('class', 'tableDiv')
		lilDiv2 = input2Container.append('div').attr('class', 'lilDiv2')
        table_div2.append('h4').text('use this table to compute the values of C and K:').style('margin', '0 0 30px 0')
		var table = table_div2.append('table');
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
		var table2 = table_div2.append('table');
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
		
		lilDiv2.append('text').text('try your answer below:')
		var textInput2 = lilDiv2.append('input')
            .attr('id', 'textInput2')
            .attr('style', 'text')
		var inputButton2 = lilDiv2.append('div')
            .attr('id', 'inputButton2')
            .text('CHECK')
		var answer = lilDiv2.append('h4').text('')
								.style('color', 'white')
								.attr('id', 'answer')
		d3.select('#inputButton2').on('click', function () {
            guess = document.getElementById('textInput2').value
            guess = guess.replace(/\s+/g, '');
			guess = guess.toUpperCase();
			if (guess == "YOUDIDIT") {
            	document.getElementById('answer').innerHTML = "correct!";
            } else {
				document.getElementById('answer').innerHTML = "try again..."
			}
        });
	}
}

module.exports = StreamInteraction;
