const d3 = require('d3')
const receiver = require('./images/boy.png')
const sender1 = require('./images/girl2.png')
const sender2 = require('./images/girl1.png')
const sender3 = require('./images/man.png')
const public_key = require('./images/public_key.png')
const private_key = require('./images/private.png')
const doc = require('./images/regular.png')
const locked_doc = require('./images/lock_doc.png')
const unlocked_doc = require('./images/unlock_doc.png')
const selected_key = require('./images/highlighted_key.png')
const private_selected_key = require('./images/private_highlighted.png')

class AsymmetricAnimation {
	constructor() {
	}

	start() {
		d3.select('#title9 .fullVis').html("")
		d3.selectAll("#vis div").classed("selected", false)
		d3.select("#content6").classed("selected", true)
		this.vis = d3.select('#title9 .fullVis')
		this.vis.append("h1")
			.text("Asymmetric Encryption: harder to crack")
			.attr("class", "titleBox")
			.style("padding-bottom", "0px")

		this.vis.append("div")
			.attr("id", "asym")
			.style("height", "700px")

		d3.select("#asym").append('div')
			.attr("id", "outter")

		d3.select("#outter")
			.append('div')
			.attr("id", "senders")

		d3.select("#senders")
			.append('div')
			.attr("id", "sender1")
			.attr("class", "person")
			.append("h3")
			.text("TA1")

		d3.select("#senders")
			.append('div')
			.attr("id", "sender2")
			.attr("class", "person")
			.append("h3")
			.text("TA2")

		d3.select("#senders")
			.append('div')
			.attr("id", "sender3")
			.attr("class", "person")
			.append("h3")
			.text("TA3")

		d3.select("#outter")
			.append('div')
			.attr("id", "receiver_outer")

		d3.select("#receiver_outer")
			.append('div')
			.attr("id", "messages")

		d3.select("#messages")
			.append("img")
			.attr("src", locked_doc)
			.attr("class", "locked_doc")

		d3.select("#messages")
			.append("img")
			.attr("src", locked_doc)
			.attr("class", "locked_doc")

		d3.select("#messages")
			.append("img")
			.attr("src", locked_doc)
			.attr("class", "locked_doc")

		d3.selectAll(".locked_doc").style('opacity', 0)

		d3.select("#receiver_outer")
			.append('div')
			.attr("id", "receiver")
			.append("h3")
			.text("Matt")

		d3.select("#sender1")
			.append("div")
			.attr("id", "sender1_image")
			.attr("class", "perdoc")

		d3.select("#sender1_image")
			.append('img')
			.attr("src", sender1)


		d3.select("#sender1_image")
			.append('img')
			.attr("src", public_key)
			.attr('class', 'publickey')

		// div with keys in it (senders only)
		d3.select("#sender1")
			.append('div')
			.attr("id", "sender1_doc")

		d3.select("#sender1_doc")
			.append('img')
			.attr("src", doc)
			.attr("class", "sender_doc")

		//////sender3
		d3.select("#sender2")
			.append("div")
			.attr("id", "sender2_image")
			.attr("class", "perdoc")

		d3.select("#sender2_image")
			.append('img')
			.attr("src", sender2)

		d3.select("#sender2_image")
			.append('img')
			.attr("src", public_key)
			.attr('class', 'publickey')

		d3.select("#sender2")
			.append('div')
			.attr("id", "sender2_doc")

		d3.select("#sender2_doc")
			.append('img')
			.attr("src", doc)
			.attr("class", "sender_doc")

		/////sender 3
		d3.select("#sender3")
			.append("div")
			.attr("id", "sender3_image")
			.attr("class", "perdoc")

		d3.select("#sender3_image")
			.append('img')
			.attr("src", sender3)


		d3.select("#sender3_image")
			.append('img')
			.attr("src", public_key)
			.attr('class', 'publickey')

		// div with keys in it (senders only)
		d3.select("#sender3")
			.append('div')
			.attr("id", "sender3_doc")

		d3.select("#sender3_doc")
			.append('img')
			.attr("src", doc)
			.attr("class", "sender_doc")

		d3.select("#receiver")
			.append("div")
			.attr("id", "receiver_images")
			.style("width", "93%")
			.style("margin-bottom", "-8%")
			.style("margin-top", "-9%")

		d3.select("#receiver")
			.append("div")
			.attr("id", "receiver_key")

		d3.select("#receiver_images")
			.append("img")
			.attr("src", receiver)

		d3.select("#receiver_key")
			.append('img')
			.attr("src", public_key)
			.attr("class", "keys")
			.style('width', '30%')
			.style("padding", "10px")

		d3.select("#receiver_key")
			.append('img')
			.attr("src", private_key)
			.attr("class", "keys")
			.style('width', '30%')
			.style("padding", "10px")
			.attr("id", "private")

		d3.select("#outter")
			.append("div")
			.attr("id", "story_attention")
			.style("width", "100%")

		d3.select("#story_attention")
			.append("div")
			.attr("id", "story")

		d3.select("#story_attention")
			.append("div")
			.attr("id", "attention")

		this.vis.append("div")
			.attr("id", "asym-startAnimation")
			.text("START ANIMATION")
			.style("width", "10%")
			.style("margin-top", "3%")

		document.getElementById("asym-startAnimation").onclick = function () {
			d3.select("#story").html("")
			d3.select("#attention").html("")
			d3.select("#asym-startAnimation").style("opacity", 0.7)
			document.getElementById("asym-startAnimation").style.pointerEvents = 'none'
			move();
		};

		function move() {
			let time = 1500;
			const foreal = this
			d3.select("#story")
				.append("text")
				.attr("dy", "0em")
				.text("Matt is waiting for all of his TAs to send him sensitive information which needs to be encrypted.")
				.append("br")

			d3.select("#story")
				.append("text")
				.attr("dy", "1em")
				.transition()
				.text("Because they are using asymmetric keys this time, each TA will need Matt's public key.")
				.delay(2 * time)

			// d3.select("#story")
			//     .append("text")
			//     .attr("dy", "2em")
			//     .text("If Matt wanted to send an encrypted message back to each of the TAs, he would need to use each of their unique public keys")
			d3.selectAll(".sender_doc")
				.attr("src", doc)
				.transition()
				.duration(500)
				.style("opacity", 1)

			d3.selectAll(".locked_doc")
				.transition()
				.duration(500)
				.style("opacity", 0)
				.on('end', () => {d3.selectAll(".locked_doc").attr("src", locked_doc) })

			d3.select("#doc2")
				.transition()
				.duration(500)
				.style("opacity", 0)


			d3.selectAll(".publickey")
				.transition()
				.delay(5 * time)
				.on('end', function () {
					d3.selectAll(".publickey")
						.attr("src", selected_key)
						.style("width", "25%")

					d3.select("#story")
						.transition()
						.text("The TAs use Matt's public key to encrypt their sensitive information")
						.duration(3 * time)
						.on('end', function () {
							d3.selectAll(".sender_doc")
								.attr("src", locked_doc)

							d3.select("#story")
								.transition()
								.text("The information is now encrypted and ready to be sent")
								.duration(3 * time)
								.on('end', function () {

									d3.selectAll(".publickey")
										.attr("src", public_key)
										.style('width', '15%')
										.transition()

									d3.selectAll(".sender_doc")
										.style("opacity", 0)
										.transition()

									d3.selectAll(".locked_doc")
										.style('opacity', 1)
										.transition()

									d3.select("#story")
										.transition()
										.text("Matt receives the encrypted documents, which only HE can decrypt using his private key")
										.duration(3 * time)
										.on('end', function () {

											d3.select("#private")
												.attr("src", private_selected_key)
												.transition()
												.duration(2 * time)
												.delay(time)

											d3.select("#story")
												.transition()
												.text("Matt uses his private key to decrypt the documents")
												.duration(3 * time)
												.on('end', function () {

													d3.selectAll(".locked_doc")
														.attr('src', unlocked_doc)
														.transition()
														.duration(time)
														.delay(time)

													d3.select("#private")
														.attr('src', private_key)
														.transition()
														.duration(time)
														.delay(time)

													d3.select("#story")
														.transition()
														.text("Matt is now happy that he can look at the information and can rest assured that no one else can")
														.duration(3 * time)
														.on('end', function () {
															d3.select("#attention")
																.transition()
																.text("Note that it is impossible for a student to decrypt the senititve information with Matt's public key, because his private key is the only thing that can decrypt the message")
																.duration(5 * time)

															document.getElementById("asym-startAnimation").style.pointerEvents = 'auto'
															d3.select("#asym-startAnimation")
																.transition()
																.style("opacity", 1)
																.duration(5 * time)
														})
												})
										})
								})
						})
				})
		}
	}
}

module.exports = AsymmetricAnimation
