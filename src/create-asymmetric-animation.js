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


class AsymmetricAnimation {
    constructor() {
    }

    start() {
        d3.select('#title9 .halfVis').html("")
        d3.select("#title9")
            .style("display", "flex")
            .style("flex-direction", "row")
        this.vis = d3.select('#title9 .halfVis')
        this.vis.append('div')
            .attr("id", "outter")

        d3.select("#outter")
            .append('div')
            .attr("id", "senders")

        d3.select("#senders")
            .append('div')
            .attr("id", "sender1")
            .attr("class", "person")

        d3.select("#senders")
            .append('div')
            .attr("id", "sender2")
            .attr("class", "person")

        d3.select("#senders")
            .append('div')
            .attr("id", "sender3")
            .attr("class", "person")

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

        d3.selectAll(".locked_doc").attr('hidden', 'true')

        d3.select("#receiver_outer")
            .append('div')
            .attr("id", "receiver")


        d3.select("#sender1")
            .append("div")
            .attr("id", "sender1_image")
            .attr("class", "perdoc")

        d3.select("#sender1_image")
            .append('img')
            .attr("src", sender1)


        d3.select("#sender1_image")
            .append('img')
            .attr("src", doc)
            .attr("class", "sender_doc")

        // div with keys in it (senders only)
        d3.select("#sender1")
            .append('div')
            .attr("id", "sender1_key")

        d3.select("#sender1_key")
            .append('img')
            .attr("src", public_key)
            .attr("class", "keys")
            .attr('class', 'publickey')

        d3.select("#sender2")
            .append("div")
            .attr("id", "sender2_image")
            .attr("class", "perdoc")

        d3.select("#sender2_image")
            .append('img')
            .attr("src", sender2)
            .attr("class", "perdoc")

        d3.select("#sender2_image")
            .append('img')
            .attr("src", doc)
            .attr("class", "sender_doc")

        d3.select("#sender2")
            .append('div')
            .attr("id", "sender2_key")

        d3.select("#sender2_key")
            .append('img')
            .attr("src", public_key)
            .attr("class", "keys")
            .attr('class', 'publickey')

        d3.select("#sender3")
            .append("div")
            .attr("id", "sender3_image")
            .attr("class", "perdoc")

        d3.select("#sender3_image")
            .append('img')
            .attr("src", sender3)


        d3.select("#sender3_image")
            .append('img')
            .attr("src", doc)
            .attr("id", "doc1")
            .attr("class", "sender_doc")

        d3.select("#sender3")
            .append('div')
            .attr("id", "sender3_key")

        d3.select("#sender3_key")
            .append('img')
            .attr("src", public_key)
            .attr("class", "keys")
            .attr('class', 'publickey')


        d3.select("#receiver")
            .append("div")
            .attr("id", "receiver_images")

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

        this.vis.append("div")
            .attr("id", "story")

        this.vis.append("div")
            .attr("id", "attention")

        d3.select("#title9")
            .append("div")
            .attr("id", "startAnimation")
            .text("Start animation")
            .style("width", "10%")

        document.getElementById("startAnimation").onclick = function () {
            d3.select("#story").html("")
            d3.select("#attention").html("")
            move();
        };

        function move() {
            let time = 2000;
            const foreal = this
            d3.select("#story")
                .append("text")
                .attr("dy", "0em")
                .text("Matt is waiting for all of his TAs to send him sensitive information which needs to be encrypted")
                .append("br")

            d3.select("#story")
                .append("text")
                .attr("dy", "1em")
                .text("Because they are using asymmetric keys this time, each TA will need Matt's public key")
                .append("br")

            d3.select("#story")
                .append("text")
                .attr("dy", "2em")
                .text("If Matt wanted to send an encrypted message back to each of the TAs, he would need to use each of their unique public keys")

            d3.selectAll(".publickey")
                .transition()
                .duration(0.5 * time)
                .duration(time)
                .on('end', function () {
                    d3.selectAll(".publickey")
                        .attr("src", selected_key)
                        .style("width", "25%")

                    d3.select("#story")
                        .style("opacity", 0)
                        .transition()
                        .text("The TAs use Matt's public key to encrypt their sensiive information")
                        .style("opacity", 1)
                        .style("color", "#FF5733")
                        .duration(3 * time)
                        .on('end', function () {
                            d3.selectAll(".sender_doc")
                                .attr("src", locked_doc)
                                .style("width", "60%")
                                .style("height", "60%")
                                .style("margin-left", "-10%")

                            d3.select("#story")
                                .style("opacity", 0)
                                .transition()
                                .text("The information is now encrypted and ready to be sent")
                                .style("opacity", 1)
                                .style("color", "white")
                                .duration(3 * time)
                                .on('end', function () {

                                    d3.selectAll(".publickey")
                                        .attr("src", public_key)
                                        .style('width', '15%')
                                        .transition()

                                    d3.selectAll(".sender_doc")
                                        .attr("hidden", true)
                                        .transition()

                                    d3.selectAll(".locked_doc")
                                        .attr('hidden', null)
                                        .transition()

                                    d3.select("#story")
                                        .style("opacity", 0)
                                        .transition()
                                        .text("Matt receives the encrypted documents, which only HE can decrypt using his private key")
                                        .style("opacity", 1)
                                        .duration(3 * time)
                                        .on('end', function () {

                                            d3.select("#private")
                                                .attr("src", selected_key)
                                                .style("width", "25%")
                                                .transition()
                                                .duration(2 * time)
                                                .delay(time)

                                            d3.select("#story")
                                                .style("opacity", 0)
                                                .transition()
                                                .text("Matt uses his private key to decrypt the documents")
                                                .style("opacity", 1)
                                                .style("color", "#FF5733")
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
                                                        .style("opacity", 0)
                                                        .transition()
                                                        .text("Matt is now happy that he can look at the information and can be rest assured that no one else can")
                                                        .style("opacity", 1)
                                                        .style("color", "white")
                                                        .duration(3 * time)
                                                        .on('end', function () {
                                                            d3.select("#attention")
                                                                .style("opacity", 0)
                                                                .transition()
                                                                .text("Note that it is impossible for a student to decrypt the senititve information with Matt's public key, because his private key is the only thing that can decrypt the message")
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
