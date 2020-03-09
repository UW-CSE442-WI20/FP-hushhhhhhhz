const d3 = require('d3');

class RSA {

    constructor() {

    }

    start() {
        document.getElementById('vis').innerHTML = "";

        let overall_container = d3.select('#vis').append('div').attr('class', 'overall_Container');

        overall_container.append('div').attr('class', 'receiver_intro').text('Receiver\'s workflow');
        overall_container.append('div').text('Select 2 primes')

        // RECEIVER

        let calc = overall_container.append('div').attr('class', 'calculation')

        // Block for transition left to right (if needed)
        // let p_calculation = ['p', '=', '11']
        // let q_calculation = ['q', '=', '17']
        // for (let i = 0; i < p_calculation.length; i++) {
        //     let index = calc.append('div')
        //         .attr('id', 'p_index' + i)
        //         .attr('class', 'p_index')
        //         .style('display', 'block');

        //     index.append('div')
        //         .attr('class', 'p_data')
        //         .transition()
        //         // .duration(20000)
        //         .text(p_calculation[i]);

        //     index.append('div')
        //         .attr('class', 'q_data')
        //         .transition()
        //         // .duration(10000)
        //         .text(q_calculation[i]);
        // }

        calc.append('div')
            .attr('id', 'p_data')
            .transition()
            .duration(2000)
            .on('start', () => {
                d3.select('#p_data').text('p = 11')
            })
            .on('end', () => {
                d3.select('.calculation')
                    .transition()
                    .duration(2000)
                    .on('start', () => {
                        d3.select('.calculation')
                            .append('div')
                            .attr('id', 'q_data').text('q = 17')
                    })
                    .on('end', () => {
                        d3.select('.calculation')
                            .transition()
                            .duration(2000)
                            .on('start', () => {
                                d3.select('.calculation')
                                    .append('div')
                                    .attr('id', 'n_data').text('n = pq = 11 * 17 = 187')
                            })
                            .on('end', () => {
                                d3.select('.calculation')
                                    .transition()
                                    .duration(2000)
                                    .on('start', () => {
                                        d3.select('.calculation')
                                            .append('div')
                                            .attr('id', 'phi_data').text('ϕ(n) = (p-1)(q-1) = 10 * 16 = 160')
                                    })
                                    .on('end', () => {
                                        d3.select('.calculation')
                                            .transition()
                                            .duration(2000)
                                            .on('start', () => {
                                                d3.select('.calculation')
                                                    .append('div')
                                                    .attr('id', 'e_data').text('e = 3 such that e is relatively prime to ϕ(n)')
                                            })
                                            .on('end', () => {
                                                d3.select('.calculation')
                                                    .transition()
                                                    .duration(2000)
                                                    .on('start', () => {
                                                        d3.select('.calculation')
                                                            .append('div')
                                                            .attr('id', 'd_data').text('d = 107 such that d * e ≡ 1 (mod ϕ(n))')
                                                    })
                                                    .on('end', () => {
                                                        d3.select('.calculation')
                                                            .transition()
                                                            .duration(2000)
                                                            .on('start', () => {
                                                                d3.select('.calculation')
                                                                    .append('div')
                                                                    .attr('id', 'public_data').text('n and e are made public and d is the secret privately held by the receiver')
                                                            })
                                                            .on('end', this.senderMessage)
                                                    })
                                            })
                                    })
                            })
                    })
            })
    }

    senderMessage() {
                // Sender Step 1
                initialMessage = "SECRET";
                initialCipher = Array.from(initialMessage).map((x) => x.charCodeAt(0));

                let alphabet =["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
                let alphabet2 =["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                let alphaAlpha = alphabet.concat(alphabet2)

        d3.select('#vis').append('div').text('Sender\'s workflow');

                let rsa_container = d3.select('#vis').append('div').attr('class', 'rsaContainer');
                let message = rsa_container.append('div').attr('class', 'message');

                for(let i = 0; i<initialMessage.length; i++) {
            let index = message.append('div')
                .attr('id', 'index' + i)
                .attr('class', 'index');

            index.append('div')
                .attr('class', 'letter')
                .transition()
                .duration(200)
                .text(initialMessage[i]);
            index.append('div')
                .attr('class', 'cipher')
        }

        // TABLE 1
        let table_div = rsa_container.append('div').attr('class', 'tableDiv')
        let table = table_div.append('table');
        let thead = table.append('thead');
        let tbody = table.append('tbody');
        thead.append('tr')
            .selectAll('th')
            .data(alphabet)
            .enter()
            .append('th')
            .text(function (letter) { return letter })
            .attr('class', function (letter) { return letter });
        let rows = tbody.selectAll('tr')
            .data([1])
            .enter()
            .append('tr')
        let cells = rows.selectAll('td')
            .data(function (row) {
                return alphabet.map(function (letter) {
                    return { column: letter, value: alphabet.indexOf(letter) + 65 };
                });
            })
            .enter()
            .append('td')
            .html(function (d) { return d.value })
            .attr('class', function (d) { return d.column });
        //TABLE 2
        let table2 = table_div.append('table');
        let thead2 = table2.append('thead');
        let tbody2 = table2.append('tbody');
        thead2.append('tr')
            .selectAll('th')
            .data(alphabet2)
            .enter()
            .append('th')
            .text(function (letter) { return letter })
            .attr('class', function (letter) { return letter });
        let rows2 = tbody2.selectAll('tr')
            .data([1])
            .enter()
            .append('tr')
        let cells2 = rows2.selectAll('td')
            .data(function (row) {
                return alphabet2.map(function (letter) {
                    return { column: letter, value: alphabet2.indexOf(letter) + 13 + 65 };
                });
            })
            .enter()
            .append('td')
            .html(function (d) { return d.value })
            .attr('class', function (d) { return d.column });

        let m = 3000;
        for (let i = 0; i < initialMessage.length; i++) {
            d3.select('#index' + i).select('.letter')
                .transition()
                .duration(500)
                .style('color', '#fdd835')
                .delay(m * i);
            d3.select('#index' + i).select('.key')
                .transition()
                .duration(500)
                .style('color', '#e53935')
                .delay(m * i);
            d3.select('#plain')
                .transition()
                .duration(500)
                .text(alphaAlpha.indexOf(initialMessage[i]))
                .delay(m * i);

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(500)
                .style('background-color', '#fdd835')
                .delay(m * i);

            d3.select('#index' + i).select('.cipher')
                .transition()
                .duration(500)
                .style('color', '#1c87e5')
                .text(initialCipher[i])
                .delay(1000 + m * i);
            d3.select('#cipher')
                .transition()
                .duration(500)
                .text(alphaAlpha.indexOf(initialCipher[i]))
                .delay(1000 + m * i);
            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(500)
                .style('background-color', 'transparent')
                .delay(1000 + m * i);

            d3.select('#index' + i).select('.letter')
                .transition()
                .duration(500)
                .style('color', 'black')
                .delay(1000 + m * i);
            d3.select('#index' + i).select('.key')
                .transition()
                .duration(500)
                .style('color', 'black')
                .delay(1000 + m * i);
        }
    }
}

module.exports = RSA;