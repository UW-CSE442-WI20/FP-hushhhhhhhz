const d3 = require('d3');
const man = require('./images/man.png')
const woman = require('./images/girl1.png')

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
        const allSteps = [
            'The setup of RSA',
            'Step 1: Select 2 large primes, p and q',
            'p = 11, q = 17',
            'Step 2: Calculate n = pq',
            'n = 11 * 17 = 187',
            'Step 3: Calculate ϕ(n) = (p-1)(q-1)',
            'ϕ(n) = 10 * 16 = 160',
            'Step 4: Select an e such that e is relatively prime to ϕ(n)',
            'e = 3 works!',
            'Step 5: Calculate d such that de ≡ 1 (mod ϕ(n))',
            'd = 107',
            'Final step: n and e are made public',
            'd is the secret privately held by the receiver'
        ]

        d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

        d3.selectAll("#vis div").classed("selected", false)
        d3.select("#content7").classed("selected", true)
        let vizContainer = d3.select('#content7').append('div').attr('class', 'rsa_container');
        let rsa_calc_explanation = vizContainer.append('div').attr('class', 'rsa_calc_explanation');

        // RECEIVER
        let calc = rsa_calc_explanation.append('div').attr('class', 'calculation')
        let timeDuration = 0

        let number = -1;
        calc.transition()
            .duration(timeDuration * allSteps.length)
            .on('start', function printLine() {
                number++
                console.log(number, allSteps[number])
                if (number == allSteps.length - 1) {
                    d3.select('.calculation')
                        .append('div')
                        .transition()
                        .duration(timeDuration)
                        .attr('class', 'rsa_steps')
                        .style('font-weight', 'bold')
                        .attr('id', 'step' + number)
                        .text(allSteps[number])
                    // .on('end', this.senderMessage)
                } else if (number < allSteps.length) {
                    d3.select('.calculation')
                        .append('div')
                        .transition()
                        .duration(timeDuration)
                        .attr('class', 'rsa_steps')
                        .style('font-weight', (number % 2 == 1) ? 'bold' : null)
                        .attr('id', 'rsa_step' + number)
                        .text(allSteps[number])
                        .on('end', printLine)
                }
            })
            .on('end', this.senderMessage)
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

        let rsa_example = d3.select('.rsa_container').append('div').attr('class', 'rsa_example');

        let rsa_container = rsa_example.append('div').attr('class', 'rsaAnitmation');
        let sender_div = rsa_container.append('div').attr('class', 'sender_div');
        let receiver_div = rsa_container.append('div').attr('class', 'receiver_div');

        let table_div = d3.select('.rsa_example').append('div').attr('class', 'tableDivRSA')

        let index = sender_div.append('div')
            .attr('id', 'send_index')
            .attr('class', 'rsa_index');

        index.append('img')
            .attr('src', man)
            .style('width', '120px')

        index.append('div')
            .text('Sender gets n and e')
            .style('font-weight', 'bold')

        index.append('div')
            .attr('class', 'cipher_letter')
            .transition()
        index.append('div')
            .attr('class', 'cipher')

        let images = index.append('div').style('display', 'flex').style('justify-content', 'center').style('flex-wrap', 'wrap')

        images.append('img')
            .attr('class', 'rsa_calc_img')
            .attr('id', 'cipher_calc')
            .attr('src', "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
        images.append('img')
            .attr('class', 'rsa_calc_img')
            .attr('id', 'cipher_final')
            .attr('src', "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")

        rec_index = receiver_div.append('div')
            .attr('id', 'rec_index')
            .attr('class', 'rsa_index');

        rec_index.append('img')
            .attr('src', woman)
            .style('width', '120px')

        rec_index.append('div')
            .text('Receiver already has n, d and e')
            .style('font-weight', 'bold')

        rec_index.append('div')
            .text('They only require n and d')
            .style('font-weight', 'bold')
            .style('padding-bottom', '25px')

        images = rec_index.append('div').style('display', 'flex').style('justify-content', 'center').style('flex-wrap', 'wrap')

        images.append('img')
            .attr('class', 'rsa_calc_img')
            .attr('id', 'decipher_calc')
            .attr('src', "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")

        images.append('img')
            .attr('class', 'rsa_calc_img')
            .attr('id', 'decipher_final')
            .attr('src', "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")

        rec_index.append('div')
            .attr('class', 'decipher_letter')
            .style('color', 'red')

        let decipher_message = rec_index.append('div')
            .attr('class', 'decipher_message')
            .style('display', 'flex')
            .style('font-size', '30px')

        for (let i = 0; i < initialMessage.length; i++) {
            decipher_message.append('div')
                .attr('class', 'rsa_decipher')
                .attr('id', 'rsa_decipher' + i)
                .text(initialMessage[i])
                .style('opacity', '0')
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

        let duration = 1500
        let timeout = 15000;
        let interval = duration
        for (let i = 0; i < initialMessage.length; i++) {
            let d3_index = d3.select('#send_index')

            d3_index.select('.cipher_letter')
                .transition()
                .duration(duration)
                .style('color', '#fdd835')
                .text(initialMessage[i])
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
                .delay(interval + timeout * i);

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', 'transparent')
                .delay(interval + timeout * i);

            d3_index.select('.cipher_letter')
                .transition()
                .duration(duration)
                .style('color', 'white')
                .delay(interval + timeout * i);

            // Sending the message
            let m = initialCipher[i]
            var latex_raw = "\\text{c}=\\text{" + m + "}^\\text{" + this.e + "}\\mod{" + this.n + "}";
            var latex_query = this.latex_render_url + latex_raw;

            d3_index.select('#cipher_calc')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay((2 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('background-color', 'orange')
                .delay(0)
                .transition()
                .duration(duration)
                .style('background-color', null)
                .delay(0)

            let c = this.getCipherLetter(initialCipher[i])
            latex_raw = "\\text{c}=" + c;
            latex_query = this.latex_render_url + latex_raw;

            d3_index.select('#cipher_final')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay((3 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('background-color', 'orange')
                .delay(0)
                .transition()
                .duration(duration)
                .style('background-color', null)
                .delay(0)

            // Receiving the message

            d3_index = d3.select('#rec_index')

            var latex_raw = "\\text{m}=\\text{" + c + "}^\\text{" + this.d + "}\\mod{" + this.n + "}";
            var latex_query = this.latex_render_url + latex_raw;

            d3_index.select('#decipher_calc')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay((4 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('background-color', 'orange')
                .delay(0)
                .transition()
                .duration(duration)
                .style('background-color', null)
                .delay(0)

            latex_raw = "\\text{m}=" + initialCipher[i];
            latex_query = this.latex_render_url + latex_raw;

            d3_index.select('#decipher_final')
                .transition()
                .duration(duration)
                .attr('src', latex_query)
                .delay((5 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('background-color', 'orange')
                .delay(0)
                .transition()
                .duration(duration)
                .style('background-color', null)
                .delay(0)

            d3_index.select('.decipher_letter')
                .transition()
                .duration(duration)
                .attr('hidden', null)
                .text(String.fromCharCode(initialCipher[i]))
                .delay((7 * interval) + timeout * i)

            d3_index.select('#rsa_decipher' + i)
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((7 * interval) + timeout * i)

            d3.selectAll('.' + String.fromCharCode(initialCipher[i]))
                .transition()
                .duration(duration)
                .style('background-color', 'red')
                .delay((7 * interval) + timeout * i);

            d3.selectAll('.' + String.fromCharCode(initialCipher[i]))
                .transition()
                .duration(duration)
                .style('background-color', 'transparent')
                .delay((8 * interval) + timeout * i);
        }
    }
}

module.exports = RSA;
