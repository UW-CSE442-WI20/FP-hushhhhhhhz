const d3 = require('d3');

class CreateStream {

  constructor() {

  }
  start() {
    console.log('[CreateStream]', 'Hello World 5.');
    initialMessage = "MESSAGE";
	initialKey = "KEYKEYK";
	initialCipher = "WIQCEEO";
	var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
	var alphabet2 = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var alphaAlpha = alphabet.concat(alphabet2)
	document.getElementById('vis').innerHTML = "";	


    var stream_container = d3.select('#vis').append('div').attr('class', 'streamContainer');
	var message = stream_container.append('div').attr('class', 'message');
 
	for(var i = 0; i < initialMessage.length; i++) {
      	var index = message.append('div') 
			.attr('id', 'index' + i)
			.attr('class', 'index');
			
		index.append('div')
      		.attr('class', 'letter')
			.transition()
			.duration(200)
			.text(initialMessage[i]);
		index.append('div')
            .attr('class', 'key')
			.transition()
            .duration(200)
			.text(initialKey[i]);
		index.append('div')
            .attr('class', 'cipher')
	}

	// TABLE 1
	var table_div = stream_container.append('div').attr('class', 'tableDiv')
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
	//TABLE 2
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


    // MATH CALCULATIONS
    var math_div = table_div.append('div').attr('class', 'math')
    var plain_text = math_div.append('p').text('P')
                             .style('color', '#fdd835')
                             .attr('id', 'plain')
							 .attr('class', 'mathSymbol')
    var plus = math_div.append('p').text('  +  ').attr('class', 'mathSymbol')
    var key = math_div.append('p').text('K')
                             .style('color', '#e53935')
                             .attr('id', 'key')
							 .attr('class', 'mathSymbol')
    var mod = math_div.append('p').text(' mod 26 = ').attr('class', 'mathSymbol')
    var cipher = math_div.append('p').text('C')
                             .style('color', '#1c87e5')
                             .attr('id', 'cipher')
							 .attr('class', 'mathSymbol')

	var m = 3000;
	for (var i = 0; i < initialMessage.length; i++) {
		d3.select('#index'+i).select('.letter')
			.transition()
			.duration(500)
			.style('color', '#fdd835')
			.delay(m*i);
		d3.select('#index'+i).select('.key')
            .transition()
            .duration(500)
            .style('color', '#e53935')
            .delay(m*i);
		d3.select('#key')
            .transition()
            .duration(500)
            .text(alphaAlpha.indexOf(initialKey[i]))
            .delay(m*i);
		d3.select('#plain')
            .transition()
            .duration(500)
            .text(alphaAlpha.indexOf(initialMessage[i]))
            .delay(m*i);
		if (initialMessage[i] === initialKey[i]) {
			d3.selectAll('.'+initialMessage[i])
            	.transition()
            	.duration(500)
            	.style('background-color', '#fb8c00') 
            	.delay(m*i);
		} else {
			d3.selectAll('.'+initialMessage[i])
				.transition()
				.duration(500)
				.style('background-color', '#fdd835')
				.delay(m*i);
			d3.selectAll('.'+initialKey[i])
            	.transition()
            	.duration(500)
            	.style('background-color', '#e53935')
            	.delay(m*i);
		}
		d3.select('#index'+i).select('.cipher')
			.transition()
			.duration(500)
			.style('color', '#1c87e5')
			.text(initialCipher[i])
			.delay(1000+m*i);
		d3.select('#cipher')
            .transition()
            .duration(500)
            .text(alphaAlpha.indexOf(initialCipher[i]))
            .delay(1000+m*i);
		d3.selectAll('.'+initialMessage[i])
            .transition()
            .duration(500)
            .style('background-color', 'transparent')
            .delay(1000+m*i);
        d3.selectAll('.'+initialKey[i])
            .transition()
            .duration(500)
            .style('background-color', 'transparent')
            .delay(1000+m*i);
		d3.selectAll('.'+initialCipher[i])
            .transition()
            .duration(500)
            .style('background-color', '#1c87e5')
            .delay(1000+m*i);

		d3.select('#index'+i).select('.letter')
            .transition()
            .duration(500)
            .style('color', 'black')
			.delay(1000+m*i);
		d3.select('#index'+i).select('.key')
            .transition()
            .duration(500)
            .style('color', 'black')
            .delay(1000+m*i);
		d3.selectAll('.'+initialCipher[i])
            .transition()
            .duration(500)
            .style('background-color', 'transparent')
            .delay(2000+m*i);
	}
	d3.select('#plain')
            .transition()
            .duration(50)
            .text('P')
            .delay(20000);
	d3.select('#cipher')
            .transition()
            .duration(50)
            .text('C')
            .delay(20000);
	d3.select('#key')
            .transition()
            .duration(50)
            .text('K')
            .delay(20000);
	inputMessage = "";
	inputKey = "";
	resultCipher = "";
	var inputContainer = d3.select('#vis').append('div').attr('class', 'inputContainer');
	var inputs = inputContainer.append('div').attr('class', 'inputs');
	var results = inputContainer.append('div').attr('class', 'results');
	results.append('br')
	results.append('br')
	results.append('br')
    inputs.append('h3').text('Now you try!').attr('class', 'instruction').attr('style', 'opacity: 0')
	inputs.append('h4').text('type your message and hit select:').attr('class', 'instruction').attr('style', 'opacity: 0')
	lilDiv = inputs.append('div').attr('class', 'lilDiv')
	var textInput = lilDiv.append('input')
                        .attr('id', 'textInput')
                        .attr('style', 'text')
						.attr('style', 'opacity: 0')
    var inputButton = lilDiv.append('div')
                        .attr('id', 'inputButton')
						.text('SELECT')
						.attr('style', 'opacity: 0')
	var textDisplay = results.append('p')
						.attr('id', 'textDisplay')
						.text("plaintext: ")
						.attr('style', 'opacity: 0')
	var keyDisplay = results.append('p')
                        .attr('id', 'keyDisplay')
                        .text("keytext: ")
						.attr('style', 'opacity: 0')
	var cipherDisplay = results.append('p')
                        .attr('id', 'cipherDisplay')
                        .text("ciphertext: ")
						.attr('style', 'opacity: 0')
	inputs.append('h4').text('hover over the keys to see the cipher:').attr('class', 'instruction').attr('style', 'opacity: 0')
	var row1 = ["RNC","ONQ","CKO","LYY","FGU"];
	var row2 = ["MIO","CAY","ZUU","KRK","BMW"];
	var row3 = ["QXG","UXV","HPV","YUH","LDG"];
	var row4 = ["STD","HVO","JEQ","PYL","DNO"];
	var row5 = ["QDA","HZQ","WKV","XDF","UPR"];
	var keys = [row1, row2, row3, row4, row5];
	var keyTable = inputs.append('table').attr('class', 'keyTable').attr('style', 'opacity: 0')
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
	d3.selectAll('.instruction').transition().duration(200).attr('style', 'opacity: 1').delay(20000)
  	d3.select('#textInput').transition().duration(200).attr('style', 'opacity: 1').delay(20000)
	d3.select('#inputButton').transition().duration(200).attr('style', 'opacity: 1').delay(20000)
	d3.select('#textDisplay').transition().duration(200).attr('style', 'opacity: 1').delay(20000).style('color', '#fdd835')
	d3.select('#keyDisplay').transition().duration(200).attr('style', 'opacity: 1').delay(20000).style('color', '#e53935')
	d3.select('#cipherDisplay').transition().duration(200).attr('style', 'opacity: 1').delay(20000).style('color', '#1c87e5')
	d3.select('.keyTable').transition().duration(200).attr('style', 'opacity: 1').delay(20000)
	}
}

module.exports = CreateStream;


