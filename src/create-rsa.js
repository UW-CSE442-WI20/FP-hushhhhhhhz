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
        this.senderMessage = this.senderMessage.bind(this)
        this.createBubbles = this.createBubbles.bind(this)
        this.wrap = this.wrap.bind(this)
    }

    start(flag) {

        /**
         * One implementation of asymmetric keys that is used commonly is the RSA algorithm. We will give a high level quick overview of how this complicated algorithm works. 
         */

        d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

        d3.selectAll("#vis div").classed("selected", false)
        d3.select("#content7").classed("selected", true)
        let vizContainer = d3.select('#title10 .halfVis').append('div').attr('class', 'rsa_container');
        let rsa_calc_explanation = vizContainer.append('div').attr('class', 'rsa_calc_explanation');
        let rsa_example = vizContainer.append('div').attr('id', 'rsa_example')

		if (!flag) {
			this.createBubbles()
		}

//         rsa_calc_explanation.append('div')
//             .transition()
//             .duration(timeDuration)
//             .attr('class', 'rsaStepTitle')
//             .style('font-weight', 'bold')
//             .text('One implementation of asymmetric keys that is used commonly is the RSA algorithm. We will give a high level quick overview of how this complicated algorithm works. ')
//             .delay()
// 
//         // RECEIVER
//         let calc = rsa_calc_explanation.append('div').attr('class', 'calculation').style('display', 'grid')
//         rsa_calc_explanation.append("div")
//             .attr("id", "sym-startAnimation")
//             .style('opacity', '0')
// 
//         let timeDuration = 150
// 
//         let num_transitions = 13  // TODO: Find a better way to deal with this.
// 
//         let number = 1;
//         calc.transition()
//             .duration(timeDuration * 20)
//             .on('start', function printLine() {
//                 for (var step in allSteps) {
//                     number++
//                     calc.append('div')
//                         .transition()
//                         .duration(timeDuration)
//                         .attr('class', 'rsaStepTitle')
//                         .style('font-weight', 'bold')
//                         .text(step)
//                         .delay(timeDuration * number)
//                     for (var key in allSteps[step]) {
//                         number++
//                         calc.append('div')
//                             .transition()
//                             .duration(timeDuration)
//                             .attr('class', 'rsaStepText')
//                             // .style('font-weight', 'bold')
//                             .text(allSteps[step][key])
//                             .delay(timeDuration * number)
//                     }
//                 }
//             })
//             .on('end', this.createStartButton)
     }

    getCipherLetter(m) {
        return (m ** this.e) % this.n;
    }

    decipherLetter(c) {
        return (c ** this.d) % this.n;
    }

    senderMessage() {
		console.log("!")
        // Sender Step 1
        initialMessage = "SECRET";
        initialCipher = Array.from(initialMessage).map((x) => x.charCodeAt(0));

        let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        let alphabet2 = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        let story = [
            'Bob encrypts his message to Alice letter by letter using her public key in the following equation  C = M^k mod n where M is the ASCII representation of the letter Bob is currently encrypting',
            'Bob sends C to Alice.',
            'Alice receives C and is now decrypting the letter using her private key in the following equation M =  C^d mod n',
            'Alice now has the ASCII representation of the letter Bob just sent, which she translates into the letter itself'
        ]

        let rsa_example = d3.select('#rsa_example').html('');


        let rsa_container = rsa_example.append('div').attr('class', 'rsaAnitmation');
        let sender_div = rsa_container.append('div').attr('class', 'sender_div');
        let receiver_div = rsa_container.append('div').attr('class', 'receiver_div');
        let storyboard = rsa_example.append('div').attr('class', 'storyboard')
        let table_div = rsa_example.append('div').attr('class', 'tableDivRSA')

        let index = sender_div.append('div')
            .attr('id', 'send_index')
            .attr('class', 'rsa_index');

        index.append('img')
            .attr('src', man)
            .style('width', '120px')
            .style('margin', '10px')

        let cipher_message = index.append('div')
            .attr('class', 'cipher_message')
            .style('display', 'flex')
            .style('font-size', '30px')

        for (let i = 0; i < initialMessage.length; i++) {
            cipher_message.append('div')
                .attr('class', 'rsa_cipher')
                .attr('id', 'rsa_cipher' + i)
                .text(initialMessage[i])
        }


        let send_eq = index.append('div')
            .attr('class', 'rsa_equations')
            .attr('id', 'send_eq')


        send_eq.append('p').attr('id', 'send_eq_c').attr('class', 'rsa_equation_para').style('opacity', 0)
        send_eq.append('p').attr('id', 'send_eq_equals').attr('class', 'rsa_equation_para').text(" = ").style('opacity', 0)
        send_eq.append('p').attr('id', 'send_eq_m').attr('class', 'rsa_equation_para').style('opacity', 0)
        send_eq.append('sup').attr('id', 'send_eq_exp_e').attr('class', 'rsa_equation_para').style('opacity', 0)
        send_eq.append('p').attr('id', 'send_eq_mod').attr('class', 'rsa_equation_para').text(" mod " + this.n).style('opacity', 0)

        let images = index.append('div').style('display', 'flex').style('justify-content', 'center').style('flex-wrap', 'wrap')

        rec_index = receiver_div.append('div')
            .attr('id', 'rec_index')
            .attr('class', 'rsa_index');

        rec_index.append('img')
            .attr('src', woman)
            .style('width', '120px')
            .style('margin', '10px')

        let req_eq = rec_index.append('div')
            .attr('class', 'rsa_equations')
            .attr('id', 'rec_eq')

        req_eq.append('p').attr('id', 'rec_eq_m').attr('class', 'rsa_equation_para').style('opacity', 0)
        req_eq.append('p').attr('id', 'rec_eq_equals').attr('class', 'rsa_equation_para').text(" = ").style('opacity', 0)
        req_eq.append('p').attr('id', 'rec_eq_c').attr('class', 'rsa_equation_para').style('opacity', 0)
        req_eq.append('sup').attr('id', 'rec_eq_exp_d').style('opacity', 0)
        req_eq.append('p').attr('id', 'rec_eq_mod').attr('class', 'rsa_equation_para').text(" mod " + this.n).style('opacity', 0)

        images = rec_index.append('div').style('display', 'flex').style('justify-content', 'center').style('flex-wrap', 'wrap')

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

            d3.select('.storyboard')
                .transition()
                .duration(duration)
                .text(story[0])
                .delay(0)

            d3_index.select('#rsa_cipher' + i)
                .transition()
                .duration(duration)
                .style('color', '#fdd835')
                .delay(timeout * i)

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', '#fdd835')
                .delay(timeout * i);

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', 'transparent')
                .delay(interval + timeout * i);

            d3_index.select('#rsa_cipher' + i)
                .transition()
                .duration(duration)
                .style('color', 'white')
                .delay(interval + timeout * i);

            // Sending the message
            let m = initialCipher[i]
            let c = this.getCipherLetter(initialCipher[i])

            d3.select('#send_eq_c').transition()
                .duration(duration)
                .text('c')
                .style('opacity', 1)
                .delay((2 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .text(c)
                .style('color', 'orange')
                .transition()
                .duration(duration)
                .style('color', 'white')

            d3.select('.storyboard')
                .transition()
                .duration(duration)
                .text(story[1])
                .delay((5 * interval) + timeout * 0)

            d3.select('#send_eq_m').transition()
                .duration(duration)
                .text(m)
                .style('opacity', 1)
                .style('color', 'red')
                .delay((2 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('color', 'white')

            d3.select('#send_eq_exp_e').transition()
                .duration(duration)
                .text(this.e)
                .style('opacity', 1)
                .delay((2 * interval) + timeout * i)

            d3.select('#send_eq_equals').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((2 * interval) + timeout * i)

            d3.select('#send_eq_mod').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((2 * interval) + timeout * i)

            d3.select('.storyboard')
                .transition()
                .duration(duration)
                .text(story[2])
                .delay((6 * interval) + timeout * 0)

            // Receiving the message

            d3_index = d3.select('#rec_index')

            d3.select('#rec_eq_m').transition()
                .duration(duration)
                .text('m')
                .style('opacity', 1)
                .delay((5 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .text(initialCipher[i])
                .style('color', 'orange')
                .transition()
                .duration(duration)
                .style('color', 'white')

            d3.select('#rec_eq_c').transition()
                .duration(duration)
                .text(c)
                .style('opacity', 1)
                .style('color', 'red')
                .delay((5 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('color', 'white')


            d3.select('#rec_eq_exp_d').transition()
                .duration(duration)
                .text(this.d)
                .style('opacity', 1)
                .delay((5 * interval) + timeout * i)

            d3.select('#rec_eq_equals').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((5 * interval) + timeout * i)

            d3.select('#rec_eq_mod').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((5 * interval) + timeout * i)
            
            d3.select('#rec_eq_m')
                .style('opacity', 0)
                .transition()
                .duration(duration)
                .text(initialCipher[i])
                .style('opacity', 1)
                .style('color', 'orange')
                .delay((6 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('color', 'white')

            d3_index.select('#rsa_decipher' + i)
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .style('color', 'red')
                .delay((7 * interval) + timeout * i)
                .transition()
                .duration(duration)
                .style('color', 'white')

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
            
            d3.select('.storyboard')
                .transition()
                .duration(duration)
                .text(story[3])
                .delay((7 * interval) + timeout * 0)
        }

        d3.select('.storyboard')
            .transition()
            .text('Note: In the real world, we use much bigger primes so that they are harder to crack and with bigger primes a message can be encrypted and decrypted together rather than letter by letter. ')
            .style('color', 'red')
            .delay((8 * interval) + timeout * initialMessage.length)
			.on("end", function() {
				document.getElementById("startButton").style.pointerEvents = 'auto'
				d3.select("#startButton")
					.transition()
					.style("opacity", 1)
			})
    }

    // to have inline bold and other tags
    // src: https://stackoverflow.com/questions/37421900/d3-textwrap-to-incorporate-b-and-em-tags
    wrap(text, width, block_id) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = 0
            tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");

            word_id_counter = 0
            bold_state = false
            italic_state = false
            while (word = words.pop()) {
                // change state to bold 
                if (word.split('<b>').length > 1) {
                    bold_state = true
                    word = word.replace('<b>', '')
                }
                //change state to italic
                if (word.split('<em>').length > 1) {
                    italic_state = true
                    word = word.replace('<em>', '')
                }

                tspan.append('tspan')
                    .attr('id', 'word' + '_' + word_id_counter + '_' + block_id)
                    .attr('font-weight', bold_state ? 'bold' : 'normal')
                    .attr('font-style', italic_state ? 'italic' : 'normal')
                    .text(
                        word.replace('</b>', '').replace('</em>', '').replace(new RegExp('<br>', 'g'), '')
                        + " "
                    );

                // handle overflow
                if (tspan.node().getComputedTextLength() >= width) {
                    d3.select("#" + 'word' + '_' + word_id_counter + '_' + block_id).remove();

                    // handle edge case where line break and overflow occur at same time
                    word = word.replace('<br>', '')

                    tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr('id', 'wrap-text')
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")

                    tspan.append('tspan')
                        .attr('id', 'word' + '_' + word_id_counter + '_' + block_id)
                        .attr('font-weight', bold_state ? 'bold' : 'normal')
                        .attr('font-style', italic_state ? 'italic' : 'normal')
                        .text(word.replace('</em>', '').replace('</b>', '').replace(new RegExp('<br>', 'g'), '') + " ");
                }

                // handle newline (can handle multiple)
                if ((total_br = word.split('<br>').length - 1) > 0) {
                    lineNumber = lineNumber + total_br
                    tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr('id', 'wrap-text')
                        .attr("dy", lineNumber * lineHeight + dy + "em")
                }

                //handle close bold: change bold_state back to normal
                if (word.split('</b>').length > 1) {
                    bold_state = false
                }

                //handle close italics: change state back to normal
                if (word.split('</em>').length > 1) {
                    italic_state = false
                }

                word_id_counter = word_id_counter + 1
            }
        });
    }

	createBubbles() {

		var explanation = d3.select('#title10 .explanation')

		introBubble = explanation.append('div')
			.style("width", "0px")
			.style("height", "0px")
			.style("background-color", "#BCF2F0")
			.attr("class", "explanationCircle")

		introBubble.append("div")
			.attr('class', 'textDiv')
			.attr('class', 'textDivTitle')
			.text("RSA Encryption")
			.style("opacity", 0)

		introBubble
			.append('div')
			.attr('class', 'textDiv')
            .text('One implementation of asymmetric keys that is used commonly is the RSA algorithm. We will give a high level quick overview of how this complicated algorithm works. ')
			.style("opacity", 0)

		introBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.style("color", "black")

		introBubble.selectAll(".textDiv").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(700)

		introBubble.selectAll(".textDivTitle").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(700)

		primeBubble = explanation.append('div')
			.style("width", "0px")
			.style("height", "0px")
			.style("background-color", "#4EB7B2")
			.attr("class", "explanationCircle")
			.style("margin-left", "auto")

		primeBubble.append("div")
			.attr('class', 'textDiv')
			.attr('class', 'textDivTitle')
			.text("Generating Primes")
			.style("opacity", 0)

		primeBubble
			.append('div')
			.attr('class', 'textDiv')
			.text('The sender chooses 2 prime numbers p and q which together make the product n. we choose p = 17, q = 11.')
			.style("opacity", 0)

		primeBubble
			.append('div')
			.attr('class', 'textDiv')
			.text('We will keep track of another variable, ϕ(n) = (p-1)(q-1). For us, n = 187 and ϕ(n) = 160.')
			.style("opacity", 0)

		primeBubble.append('div')
			.attr('id', 'startButton')
			.text("START ANIMATION")
			.style('width', '120px')
			.style("opacity", 0)

		primeBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.delay(500)
			.style("color", "black")
			.style("margin-top", '-90px')

		primeBubble.selectAll("#startButton").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(1000)

		primeBubble.selectAll(".textDiv").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(1000)

		primeBubble.selectAll(".textDivTitle").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(1000)

		keyBubble = explanation.append('div')
			.style("width", "0px")
			.style("height", "0px")
			.style("background-color", "#2B7A78")
			.attr("class", "explanationCircle")

		keyBubble.append("div")
			.attr('class', 'textDiv')
			.attr('class', 'textDivTitle')
			.text("Generating Keys")
			.style("opacity", 0)

		keyBubble
			.append('div')
			.attr('class', 'textDiv')
			.text('The public key uses the previously calculated ϕ(n), and a number e that is relatively prime to ϕ(n). our ϕ(n) = 160, and we choose e = 3')
			.style("opacity", 0)

		keyBubble
			.append('div')
			.attr('class', 'textDiv')
			.text('The private key is is calculated by using d from the equation d * e ≡ 1(mod ϕ(n)), e and ϕ(n). Our ϕ(n) is 160, and d = 107')
			.style("opacity", 0)

		keyBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.delay(1000)
			.style("color", "black")
			.style("margin-top", '-90px')

		keyBubble.selectAll(".textDiv").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(1500)

		const forreal = this;
		keyBubble.selectAll(".textDivTitle").transition()
			.duration(500)
			.style("opacity", 1)
			.delay(1500)
			.on('end', function() {
				d3.select('#startButton').html('')
				d3.select('#startButton')
					.text("START ANIMATION")
					.style('opacity', '1')
					.on('click', function() {
						document.getElementById("startButton").style.pointerEvents = 'none'
						d3.select('#startButton').style('opacity', '0.7')
						forreal.senderMessage()
					})
			})

	}
}

module.exports = RSA;
