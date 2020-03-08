const d3 = require('d3');

class StreamInteraction {

  constructor() {
  }

  start() {
	var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
	var alphabet2 = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var alphaAlpha = alphabet.concat(alphabet2)

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
		  .style('color', '#fdd835')

	var keyDisplay = results.append('p')
                        .attr('id', 'keyDisplay')
                        .text("keytext: ")
		  .style('color', '#e53935')

	var cipherDisplay = results.append('p')
                        .attr('id', 'cipherDisplay')
                        .text("ciphertext: ")
		  .style('color', '#1c87e5')

	inputs.append('h4').text('hover over the keys to see the cipher:').attr('class', 'instruction')
	var row1 = ["RNC","ONQ","CKO","LYY","FGU"];
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
		d3.select(this).style('background-color', '#e53935')
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
	}
}

module.exports = StreamInteraction;
