const d3 = require('d3');

class RSA {

    constructor() {
        this.p = 11
        this.q = 17
        this.n = 187
        this.phi = 160
        this.e = 3
        this.d = 107
        this.latex_render_url = "http://latex.codecogs.com/svg.latex?"
        this.senderMessage = this.senderMessage.bind(this)
    }

    start() {
        console.log(this.e)
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

        let timeDuration = 100

        calc.append('div')
            .attr('id', 'p_data')
            .transition()
            .duration(timeDuration)
            .on('start', () => {
                d3.select('#p_data').text('p = 11')
            })
            .on('end', () => {
                d3.select('.calculation')
                    .transition()
                    .duration(timeDuration)
                    .on('start', () => {
                        d3.select('.calculation')
                            .append('div')
                            .attr('id', 'q_data').text('q = 17')
                    })
                    .on('end', () => {
                        d3.select('.calculation')
                            .transition()
                            .duration(timeDuration)
                            .on('start', () => {
                                d3.select('.calculation')
                                    .append('div')
                                    .attr('id', 'n_data').text('n = pq = 11 * 17 = 187')
                            })
                            .on('end', () => {
                                d3.select('.calculation')
                                    .transition()
                                    .duration(timeDuration)
                                    .on('start', () => {
                                        d3.select('.calculation')
                                            .append('div')
                                            .attr('id', 'phi_data').text('ϕ(n) = (p-1)(q-1) = 10 * 16 = 160')
                                    })
                                    .on('end', () => {
                                        d3.select('.calculation')
                                            .transition()
                                            .duration(timeDuration)
                                            .on('start', () => {
                                                d3.select('.calculation')
                                                    .append('div')
                                                    .attr('id', 'e_data').text('Select an e such that e is relatively prime to ϕ(n). e = 3 works!')
                                            })
                                            .on('end', () => {
                                                d3.select('.calculation')
                                                    .transition()
                                                    .duration(timeDuration)
                                                    .on('start', () => {
                                                        d3.select('.calculation')
                                                            .append('div')
                                                            .attr('id', 'd_data').text('d = 107 such that d * e ≡ 1 (mod ϕ(n))')
                                                    })
                                                    .on('end', () => {
                                                        d3.select('.calculation')
                                                            .transition()
                                                            .duration(timeDuration)
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

    getCipherLetter(m) {
        return (m ** this.e) % this.n;
    }

    decipherLetter(c) {
        return (c ** this.d) % this.n;
    }

    senderMessage() {
        // Sender Step 1
        initialMessage = "SECRET";
        initialCipher = Array.from(initialMessage).map((x) => x.charCodeAt(0));

        let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        let alphabet2 = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        let alphaAlpha = alphabet.concat(alphabet2)
        let table_div = d3.select('#vis').append('div').attr('class', 'tableDiv')

        d3.select('#vis').append('div').text('Sender\'s workflow');

        let rsa_container = d3.select('#vis').append('div').attr('class', 'rsaContainer');
        let sender_div = rsa_container.append('div').attr('class', 'sender_div');
        // let sender_div = d3.select('#vis').append('div').attr('class', 'sender_div');
        // let receiver_div = d3.select('#vis').append('div').attr('class', 'receiver_div');

        for (let i = 0; i < initialMessage.length; i++) {
            let index = sender_div.append('div')
                .attr('id', 'index' + i)
                .attr('class', 'index');

            index.append('div')
                .attr('class', 'letter')
                .transition()
                .duration(200)
                .text(initialMessage[i]);
            index.append('div')
                .attr('class', 'cipher')

            index.append('img')
                .attr('class', 'cipher_calc')
            index.append('img')
                .attr('class', 'cipher_final')

            // index = receiver_div.append('div')
            //     .attr('id', 'index' + i)
            //     .attr('class', 'index');

            index.append('img')
                .attr('class', 'decipher_calc')
            index.append('img')
                .attr('class', 'decipher_final')

            index.append('div')
                .attr('class', 'decipher_letter')
                .style('color', 'red')
                .transition()
                .duration(200)
                .text(initialMessage[i])
                .attr('hidden', true)
        }

        // TABLE 1
        let table = table_div.append('table');
        let thead = table.append('thead');
        let tbody = table.append('tbody');
        thead.append('tr')
            .selectAll('th')
            .data(alphabet)
            .enter()
            .append('th')
            .text((letter) => letter)
            .attr('class', (letter) => letter);
        let rows = tbody.selectAll('tr')
            .data([1])
            .enter()
            .append('tr')
        rows.selectAll('td')
            .data(() => (
                alphabet.map((letter) =>
                    ({ column: letter, value: letter.charCodeAt(0) })
                )
            ))
            .enter()
            .append('td')
            .html(d => d.value)
            .attr('class', d => d.column);
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
        rows2.selectAll('td')
            .data(() => (
                alphabet2.map((letter) =>
                    ({ column: letter, value: letter.charCodeAt(0) })
                )
            ))
            .enter()
            .append('td')
            .html(d => d.value)
            .attr('class', d => d.column);

        let duration = 500
        let timeout = 3000;
        for (let i = 0; i < initialMessage.length; i++) {
            let d3_index = d3.select('#index' + i)
            d3_index.select('.letter')
                .transition()
                .duration(duration)
                .style('color', '#fdd835')
                .delay(timeout * i);
            d3_index.select('.key')
                .transition()
                .duration(duration)
                .style('color', '#e53935')
                .delay(timeout * i);
            d3.select('#plain')
                .transition()
                .duration(duration)
                .text(alphaAlpha.indexOf(initialMessage[i]))
                .delay(timeout * i);

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', '#fdd835')
                .delay(timeout * i);

            d3_index.select('.cipher')
                .transition()
                .duration(duration)
                .style('color', '#1c87e5')
                .text(initialCipher[i])
                .delay(1000 + timeout * i);
            d3.select('#cipher')
                .transition()
                .duration(duration)
                .text(alphaAlpha.indexOf(initialCipher[i]))
                .delay(1000 + timeout * i);
            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', 'transparent')
                .delay(1000 + timeout * i);

            d3_index.select('.letter')
                .transition()
                .duration(duration)
                .style('color', 'black')
                .delay(1000 + timeout * i);

            // Sending the message

            let m = initialCipher[i]
            var latex_raw = "\\text{c}=\\text{" + m + "}^\\text{" + this.e + "}\\mod{" + this.n + "}";
            var latex_query = this.latex_render_url + latex_raw;

            d3_index.select('.cipher_calc')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay(1000 + timeout * i)

            let c = this.getCipherLetter(initialCipher[i])
            latex_raw = "\\text{c}=" + c;
            latex_query = this.latex_render_url + latex_raw;

            d3_index.select('.cipher_final')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay(1000 + timeout * i)

            // Receiving the message

            // d3_index = receiver_div.select('index' + i)

            var latex_raw = "\\text{m}=\\text{" + c + "}^\\text{" + this.d + "}\\mod{" + this.n + "}";
            var latex_query = this.latex_render_url + latex_raw;

            d3_index.select('.decipher_calc')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay(2000 + timeout * i) // twice the delay for the receiver

            // latex_raw = "\\text{m}=" + this.decipherLetter(c);
            latex_raw = "\\text{m}=" + initialCipher[i];
            latex_query = this.latex_render_url + latex_raw;

            d3_index.select('.decipher_final')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay(2000 + timeout * i) // twice the delay for the receiver

            d3_index.select('.decipher_letter')
                .transition()
                .duration(duration)
                .attr('hidden', null)
                .delay(2000 + timeout * i) // twice the delay for the receiver
            
            d3.selectAll('.' + String.fromCharCode(initialCipher[i]))
                .transition()
                .duration(duration)
                .style('background-color', 'red')
                .delay(2000 + timeout * i);

            
            d3.selectAll('.' + String.fromCharCode(initialCipher[i]))
                .transition()
                .duration(duration)
                .style('background-color', 'white')
                .delay(3000 + timeout * i);
        }
    }
}

module.exports = RSA;