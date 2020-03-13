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
    }

    start(flag) {

        d3.selectAll(".fullVis:not(.special)").html("")
        d3.selectAll('.halfVis').html("")

        d3.selectAll("#vis div").classed("selected", false)
        d3.select("#content7").classed("selected", true)
        let vizContainer = d3.select('#title10 .halfVis').append('div').attr('class', 'rsa_container');
        vizContainer.append('h1').text('Asymmetric Encryption: in action');
        let rsa_example = vizContainer.append('div').attr('id', 'rsa_example')

		if (!flag) {
			this.createBubbles()
		}

        let rsa_container = rsa_example.append('div').attr('class', 'rsaAnitmation');
        let sender_div = rsa_container.append('div').attr('class', 'sender_div');
        let receiver_div = rsa_container.append('div').attr('class', 'receiver_div');
        let storyboard = rsa_example.append('div').attr('class', 'storyboard').style('text-align', 'center')

		let index = sender_div.append('div')
			.attr('id', 'send_index')
			.attr('class', 'rsa_index');

		index.append('div').attr('id', 'sender_title').text('Bob').style('opacity', 0).style('text-align', 'center');

		index.append('img')
			.attr('id', 'rsa_man_img')
			.attr('src', man)
			.style('width', '120px')
			.style('margin', '10px')
			.style('opacity', 0)

        let rec_index = receiver_div.append('div')
            .attr('id', 'rec_index')
            .attr('class', 'rsa_index');

		rec_index.append('div').attr('id', 'rec_title').text('Alice').style('opacity', 0).style('text-align', 'center');

        rec_index.append('img')
			.attr('id', 'rsa_woman_img')
            .attr('src', woman)
            .style('width', '120px')
            .style('margin', '10px')
			.style('opacity', 0)

        let cipher_message = index.append('div')
            .attr('class', 'cipher_message')
            .style('display', 'flex')

        initialMessage = "SECRET";
        for (let i = 0; i < initialMessage.length; i++) {
            cipher_message.append('div')
                .attr('class', 'rsa_cipher')
                .attr('id', 'rsa_cipher' + i)
                .text(initialMessage[i])
				.style('opacity', 0)
        }

        let send_eq = index.append('div')
            .attr('class', 'rsa_equations')
            .attr('id', 'send_eq')

        let req_eq = rec_index.append('div')
            .attr('class', 'rsa_equations')
            .attr('id', 'rec_eq')

        let decipher_message = rec_index.append('div')
            .attr('class', 'decipher_message')
            .style('display', 'flex')

        for (let i = 0; i < initialMessage.length; i++) {
            decipher_message.append('div')
                .attr('class', 'rsa_decipher')
                .attr('id', 'rsa_decipher' + i)
                .text(initialMessage[i])
                .style('opacity', '0')
        }

        let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        let alphabet2 = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        let table_div = rsa_example.append('div').attr('class', 'tableDivRSA')
        rsa_example.append('div')
			.text('*the numbers in this table are the ASCII representation of the alphabet')
			.style("text-align", "center")
			.style("padding-top", "10px")
		
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

        let rsa_example = d3.select('#rsa_example')

        let rsa_container = d3.select('.rsaAnitmation');
        let sender_div = d3.select('.sender_div');
        let receiver_div = d3.select('.receiver_div');
		d3.select('#sender_title').style('opacity', 1)
		d3.select('#rec_title').style('opacity', 1)
        let storyboard = d3.select('.storyboard').html("");

        storyboard.append('text')
            .attr('id', 'story_intro')

        // eq
        storyboard.append('text')
            .attr('id', 'story_eq_1')
        storyboard.append('sup')
            .attr('id', 'story_exp')
        storyboard.append('text')
            .attr('id', 'story_eq_2')
        storyboard.append('br')


        storyboard.append('text')
            .attr('id', 'story_conclusion')


        let index = d3.select('#send_index')

		d3.select('#rsa_man_img')
			.style('opacity', 1)

        let cipher_message = d3.selectAll('.rsa_cipher')
			.style('color', 'white')
			.style('opacity', 1)
            
		d3.selectAll('.rsa_decipher').style('opacity', 0)

		send_eq = d3.select('#send_eq').html("")

        send_eq.append('p').attr('id', 'send_eq_c').attr('class', 'rsa_equation_para').text("C").style("color", "#ffd700")
        send_eq.append('p').attr('id', 'send_eq_equals').attr('class', 'rsa_equation_para').text(" = ").style('opacity', 1)
        send_eq.append('p').attr('id', 'send_eq_m').attr('class', 'rsa_equation_para').text('M').style("color", "#da2c5e")
        send_eq.append('sup').attr('id', 'send_eq_exp_e').attr('class', 'rsa_equation_para').text('3')
        send_eq.append('p').attr('id', 'send_eq_mod').attr('class', 'rsa_equation_para').text(" mod " + this.n).style('opacity', 1)


        let rec_index = d3.select('#rec_index')

		d3.select('#rsa_woman_img')
			.style('opacity', 1)

		req_eq = d3.select('#rec_eq').html("")

        req_eq.append('p').attr('id', 'rec_eq_m').attr('class', 'rsa_equation_para').text('M').style('color', "#ff5733")
        req_eq.append('p').attr('id', 'rec_eq_equals').attr('class', 'rsa_equation_para').text(" = ")
        req_eq.append('p').attr('id', 'rec_eq_c').attr('class', 'rsa_equation_para').text('C').style('color', '#ffd700')
        req_eq.append('sup').attr('id', 'rec_eq_exp_d').text('107')
        req_eq.append('p').attr('id', 'rec_eq_mod').attr('class', 'rsa_equation_para').text(" mod " + this.n)

        images = rec_index.append('div').style('display', 'flex').style('justify-content', 'center').style('flex-wrap', 'wrap')


        let initialTimeout = 0
		let duration = 4000
        let timeout = 0
        let interval = 4000
        for (let i = 0; i < initialMessage.length; i++) {
            let d3_index = d3.select('#send_index')
		
			if (i > 0) {
				timeout = 9000
				duration = 1500
				interval = 1500
				initialTimeout = 32000
			}

            d3.select('#story_intro')
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .delay(0)
                .text('Bob encrypts his message to Alice letter by letter using her public key in the following equation ')

            d3.select('#story_eq_1')
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .delay(0)
                .text('C = M')
            d3.select('#story_exp')
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .delay(0)
                .text('e')
            d3.select('#story_eq_2')
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .delay(0)
                .text(' mod N')
            d3.select('#story_conclusion')
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .delay(0)

            d3_index.select('#' + 'rsa_cipher' + i)
                .transition()
                .duration(duration)
                .style('color', '#da2c5e')
                .delay(timeout * (i-1) + initialTimeout)

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', '#da2c5e')
                .delay(timeout * (i-1) + initialTimeout);

            d3.selectAll('.' + initialMessage[i])
                .transition()
                .duration(duration)
                .style('background-color', 'transparent')
                .delay(interval + timeout * (i-1) + initialTimeout);

            d3_index.select('#rsa_cipher' + i)
                .transition()
                .duration(duration)
                .style('color', 'black')
                .delay(interval + timeout * (i-1) + initialTimeout);

            // Sending the message
            let m = initialCipher[i]
            let c = this.getCipherLetter(initialCipher[i])

            // story
            let send_time_story = (8 * interval)
            d3.select('#story_eq_1')
                .transition()
                .duration(duration)
                .delay(send_time_story)
                .text('')
            d3.select('#story_exp')
                .transition()
                .duration(duration)
                .delay(send_time_story)
                .text('')
            d3.select('#story_eq_2')
                .transition()
                .duration(duration)
                .delay(send_time_story)
                .text('')
            d3.select('#story_conclusion')
                .transition()
                .duration(duration)
                .delay(send_time_story)
                .text('')

            // equations
            d3.select('#send_eq_c')
				.transition()
                .duration(duration)
                .text(c)
                .style('opacity', 1)
                .delay((2 * interval) + timeout * (i-1) + initialTimeout)

            d3.select('#send_eq_m')
				.transition()
                .duration(duration)
                .text(m)
                .delay((2 * interval) + timeout * (i-1) + initialTimeout)

            d3.select('#send_eq_exp_e').transition()
                .duration(duration)
                .text(this.e)
                .delay((2 * interval) + timeout * (i-1) + initialTimeout)

            d3.select('#send_eq_equals').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((2 * interval) + timeout * (i-1) + initialTimeout)

            d3.select('#send_eq_mod').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((2 * interval) + timeout * (i-1) + initialTimeout)

            // Receiving the message
            // equations
            d3_index = d3.select('#rec_index')

            d3.select('#rec_eq_m').transition()
                .duration(duration)
                .delay((4 * interval) + timeout * (i-1) + initialTimeout)
                .transition()
                .duration(duration)
                .text(initialCipher[i])
                .delay(duration)
                .transition()
                .duration(duration)

            d3.select('#rec_eq_c').transition()
                .duration(duration)
                .text(c)
                .style('opacity', 1)
                .style('color', '#fdd835')
                .delay((4 * interval) + timeout * (i-1) + initialTimeout)
                .transition()
                .duration(duration)


            d3.select('#rec_eq_exp_d').transition()
                .duration(duration)
                .text(this.d)
                .style('opacity', 1)
                .delay((4 * interval))

            d3.select('#rec_eq_equals').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((4 * interval))

            d3.select('#rec_eq_mod').transition()
                .duration(duration)
                .style('opacity', '1')
                .delay((4 * interval))

            d3.select('#rec_eq_m')
                .transition()
                .duration(duration)
                .text(initialCipher[i])
				.style('opacity', 1)
                .style('color', '#ff5733')
                .delay((4 * interval) + timeout * (i-1) + initialTimeout)
                .transition()
                .duration(duration)

            // story
            let rec_time_story = (8 * interval)

            d3.select('#story_intro')
                .transition()
                .duration(duration)
                .delay(rec_time_story)
                .text('Alice receives C and is now decrypting the letter using her private key in the following equation ')
            d3.select('#story_eq_1')
                .transition()
                .duration(duration)
                .delay(rec_time_story)
                .text('M = C')
            d3.select('#story_exp')
                .transition()
                .duration(duration)
                .delay(rec_time_story)
                .text('d')
            d3.select('#story_eq_2')
                .transition()
                .duration(duration)
                .delay(rec_time_story)
                .text(' mod N')
            d3.select('#story_conclusion')
                .transition()
                .duration(duration)
                .delay(rec_time_story)
                .text('')

            d3_index.select('#rsa_decipher' + i)
                .transition()
                .duration(duration)
                .style('opacity', '1')
                .style('color', '#ff5733')
                .delay((5 * interval) + timeout * (i-1) + initialTimeout)

            d3.selectAll('.' + String.fromCharCode(initialCipher[i]))
                .transition()
                .duration(duration)
                .style('background-color', '#ff5733')
                .delay((5 * interval) + timeout * (i-1) + initialTimeout)
                .transition()
                .style('background-color', 'transparent')

            let final_time_story = (12 * interval)

            d3.select('#story_intro')
                .transition()
                .duration(duration)
                .delay(final_time_story)
                .text('Alice now has the ASCII representation of the letter Bob just sent, which she translates into the letter itself ')

			d3.select('#story_intro')
                .transition()
                .duration(duration)
                .delay(final_time_story + 8*interval)
                .text('')

            d3.select('#story_eq_1')
                .transition()
                .text('')
                .delay(final_time_story)

            d3.select('#story_exp')
                .transition()
                .text('')
                .delay(final_time_story)

            d3.select('#story_eq_2')
                .transition()
                .text('')
                .delay(final_time_story)

            d3.select('.story_equations')
                .transition()
                .remove()
                .delay(final_time_story)

            d3.select('#story_conclusion')
                .transition()
                .duration(duration)
                .delay(final_time_story)
                .text('')
        }

		// sorry for this hack lol
        d3.select('#story_intro')
            .transition()
            .style('color', 'red')
            .delay(timeout * (initialMessage.length - 2) + initialTimeout)

        d3.select('#story_intro')
            .transition()
            .text('Note: In the real world, we use much bigger primes so that they are harder to crack and with bigger primes a message can be encrypted and decrypted together rather than letter by letter.')
            .style('font-weight', 'bold')
            .delay(timeout * (initialMessage.length - 1) + initialTimeout)

            .style('color', 'red')
            .style('font-weight', 'bold')
            .delay(timeout * (initialMessage.length - 1) + initialTimeout)
			.on("end", function() {
				document.getElementById("rsaStartButton").style.pointerEvents = 'auto'
				d3.select('#rsaStartButton').style('opacity', 1)
			})
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
            .text('One implementation of asymmetric keys that is used commonly is the RSA algorithm.')
			.style("opacity", 0)

		introBubble
            .append('div')
            .attr('class', 'textDiv')
            .text('We will give a high level quick overview of how this complicated algorithm works. ')
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

		idc = primeBubble
			.append('div')
			.style('padding', '3%')

		idc.append('text')
			.attr('class', 'textDiv')
			.attr('dy', '0em')
			.text('The sender chooses 2 prime numbers p and q which together make the product n.')
			.style("opacity", 0)
			.append('br')

		idc.append('text')
			.attr('class', 'textDiv')
			.attr('dy', '1em')
			.text('We choose p = 17, q = 11.')
			.style("opacity", 0)

		idc = primeBubble
			.append('div')
			.style('padding', '3%')

		idc.append('text')
			.attr('class', 'textDiv')
			.attr('dy', '0em')
			.text('We will keep track of another variable,')
			.style("opacity", 0)
			.append('br')

		idc.append('text')
			.attr('class', 'textDiv')
			.attr('dy', '1em')
			.text('ϕ(n) = (p-1)(q-1). For us, n = 187 and ϕ(n) = 160.')
			.style("opacity", 0)

		primeBubble.append('div')
			.attr('id', 'rsaStartButton')
			.text("START ANIMATION")
			.style('width', '120px')
			.style("opacity", 0)
			.style('margin-top', '10px')

		primeBubble.transition()
			.duration(1000)
			.style("width", "350px")
			.style("height", "350px")
			.delay(500)
			.style("color", "black")
			.style("margin-top", '-90px')

		primeBubble.selectAll("#rsaStartButton").transition()
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
			.text('The public key uses the previously calculated ϕ(n), and a number e that is relatively prime to ϕ(n). Our ϕ(n) = 160, and we choose e = 3')
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
				d3.select('#rsaStartButton').html('')
				d3.select('#rsaStartButton')
					.text("START ANIMATION")
					.style('opacity', '1')
					.on('click', function() {
						document.getElementById("rsaStartButton").style.pointerEvents = 'none'
						d3.select('#rsaStartButton').style('opacity', '0.7')
						forreal.senderMessage()
					})
			})

	}
}

module.exports = RSA;
