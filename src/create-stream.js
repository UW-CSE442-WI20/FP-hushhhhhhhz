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
	document.getElementById('vis').innerHTML = "";	

    var stream_container = d3.select('#vis').append('div').attr('class', 'streamContainer');
	var message = stream_container.append('div').attr('class', 'message');
 
	for(var i = 0; i < initialMessage.length; i++) {
      	var index = message.append('div') 
			.attr('id', 'index' + i)
			.attr('class', 'index');
			
		index.append('div')
      		.attr('class', 'letter')
			.text(initialMessage[i]);
		index.append('div')
            .attr('class', 'key')
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


	var m = 3000;
	for (var i = 0; i < initialMessage.length; i++) {
		d3.select('#index'+i).select('.letter')
			.transition()
			.duration(500)
			.style('color', '#00897b')
			.delay(m*i);
		d3.select('#index'+i).select('.key')
            .transition()
            .duration(500)
            .style('color', '#fdd835')
            .delay(m*i);
		if (initialMessage[i] === initialKey[i]) {
			d3.selectAll('.'+initialMessage[i])
            	.transition()
            	.duration(500)
            	.style('background-color', '#7cb342')
            	.delay(m*i);
		} else {
			d3.selectAll('.'+initialMessage[i])
				.transition()
				.duration(500)
				.style('background-color', '#00897b')
				.delay(m*i);
			d3.selectAll('.'+initialKey[i])
            	.transition()
            	.duration(500)
            	.style('background-color', '#fdd835')
            	.delay(m*i);
		}
		d3.select('#index'+i).select('.cipher')
			.transition()
			.duration(500)
			.style('color', '#e53935')
			.text(initialCipher[i])
			.delay(1000+m*i);
		d3.selectAll('.'+initialMessage[i])
            .transition()
            .duration(500)
            .style('background-color', '#F1F1F1')
            .delay(1000+m*i);
        d3.selectAll('.'+initialKey[i])
            .transition()
            .duration(500)
            .style('background-color', '#F1F1F1')
            .delay(1000+m*i);
		d3.selectAll('.'+initialCipher[i])
            .transition()
            .duration(500)
            .style('background-color', '#e53935')
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
            .style('background-color', '#F1F1F1')
            .delay(2000+m*i);
	}


		
  }
}

module.exports = CreateStream;


