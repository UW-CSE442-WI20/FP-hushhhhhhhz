const d3 = require('d3')
const key = require('./images/public_key.png')
const receiver = require('./images/boy.png')
const sender = require('./images/girl2.png')
const doc = require('./images/regular.png')
const locked_doc = require('./images/lock_doc.png')
const unlocked_doc = require('./images/unlock_doc.png')
const selected_key = require('./images/highlighted_key.png')

class SymmetricTutorial {
    constructor() {
    }

    start() {
        d3.select('#title8 .halfVis').html("")
        d3.select("#title8")
            .style("display", "flex")
            .style("flex-direction", "row")
        this.vis = d3.select('#title8 .halfVis')

        this.vis.append('div')
            .attr('id', 'symmetric_container')

        d3.select('#symmetric_container')
            .append("div")
            .attr('id', 'sender_sym')
            .append("h3")
            .attr("class", "label")
            .text("TA")

        d3.select('#symmetric_container')
            .append("div")
            .attr('id', 'receiver_sym')
            .append("h3")
            .attr("class", "label")
            .text("Matt")

        d3.select("#sender_sym")
            .append("div")
            .attr("id", "sender_personAndKey")


        d3.select("#receiver_sym")
            .append("div")
            .attr("id", "receiver_personAndKey")


        d3.select("#sender_personAndKey")
            .append("div")
            .attr("class", "people_sender_sym")
            .append("img")
            .attr("src", sender)

        d3.select("#sender_personAndKey")
            .append("div")
            .attr("class", "symmetric_key")
            .append("img")
            .attr("src", key)
            .attr("id", "encrypt")
            .style("width", "65%")


        d3.select("#sender_sym")
            .append("div")
            .attr("class", "sender_document")
            .append("img")
            .attr("src", doc)
            .attr("id", "doc1")

        d3.select("#receiver_personAndKey")
            .append("div")
            .attr("class", "people_sender_sym")
            .append("img")
            .attr("src", receiver)

        d3.select("#receiver_personAndKey")
            .append("div")
            .attr("class", "symmetric_key")
            .append("img")
            .attr("src", key)
            .attr("id", "decrypt")
            .style("width", "65%")

        d3.select("#receiver_sym")
            .append("div")
            .attr("class", "sender_document")
            .append("img")
            .attr("src", locked_doc)
            .attr("id", "doc2")
            .style("opacity", "0")

        this.vis.append("div")
            .attr("id", "story_text")

        this.vis.append("div")
            .attr("id", "warning")

        d3.select("#title8")
            .append("div")
            .attr("id", "startAnimation")
            .text("Start animation")
            .style("width", "10%")

        document.getElementById("startAnimation").onclick = function () {
            animation();
        };

        function animation() {
            d3.select("#story_text")
                .append("text")
                .attr("dy", "0em")
                .style("opacity", 0)
                .transition()
                .text("Matt is waiting for his TA to send him sensitive information which needs to be encrypted.")
                .duration(4000)
                .style("opacity", 1)

            d3.select("#story_text")
                .append("br")

            let time = 2000;

            d3.select("#story_text").append("text")
                .attr("dy", "1em")
                .style("opacity", 0)
                .transition()
                .text("Because they are using symmetric keys, Matt and the TA will use the same exact key to encrypt and decrypt.")
                .style("opacity", 1)
                .duration(5 * time)
                .delay(time)
                .on('end', function () {
                    d3.select("#encrypt")
                        .transition()
                        .duration(time)
                        .on('end', function () {
                            // increasing size of encrypt key & changine its src
                            d3.select("#encrypt")
                                .attr("src", selected_key)
                                .style("width", "100%")

                            d3.select("#story_text")
                                .style("opacity", 0)
                                .transition()
                                .text("The TA will encrypt the information using a key that only Matt and her have.")
                                .style("opacity", 1)
                                .duration(4 * time)
                                .on('end', function () {
                                    // sender document becomes locked document
                                    d3.select("#doc1")
                                        .attr("src", locked_doc)

                                    d3.select("#story_text")
                                        .style("opacity", 0)
                                        .transition()
                                        .text("The information is now encrypted and ready to be sent")
                                        .style("opacity", 1)
                                        .duration(3 * time)
                                        .on('end', function () {

                                            // sender key goes back to normal 
                                            d3.select("#encrypt")
                                                .attr("src", key)
                                                .style("width", "65%")
                                                .transition()

                                            d3.select("#doc1")
                                                .style("opacity", "0")

                                            d3.select("#doc2")
                                                .style("opacity", "1")

                                            d3.select("#story_text")
                                                .style("opacity", 0)
                                                .transition()
                                                .text("Matt receives the encrypted document")
                                                .style("opacity", 1)
                                                .duration(2 * time)
                                                .on('end', function () {

                                                    // increasing size of decrypt key & changine its src
                                                    d3.select("#decrypt")
                                                        .attr("src", selected_key)
                                                        .style("width", "100%")
                                                        .transition()
                                                        .duration(2 * time)
                                                        .delay(time)

                                                    d3.select("#story_text")
                                                        .style("opacity", 0)
                                                        .transition()
                                                        .text("and uses his key to decrypt the information")
                                                        .style("opacity", 1)
                                                        .duration(2 * time)



                                                        .on('end', function () {
                                                            // locked doc becomes unlocked doc
                                                            d3.select("#doc2")
                                                                .attr("src", unlocked_doc)
                                                                .transition()
                                                                .duration(time)
                                                                .delay(time)

                                                            d3.select("#decrypt")
                                                                .attr("src", key)
                                                                .style("width", "65%")
                                                                .transition()
                                                                .duration(time)
                                                                .delay(time)


                                                            d3.select("#story_text")
                                                                .style("opacity", 0)
                                                                .transition()
                                                                .text("Matt is now happy that he can look at the information")
                                                                .style("opacity", 1)
                                                                .duration(2 * time)


                                                                .on('end', function () {
                                                                    d3.select("#warning")
                                                                        .style("opacity", 0)
                                                                        .transition()
                                                                        .text("Warning!! If a student gets a hold of the shared key between Matt and the TA, they will also be able to decrypt the sensitive information.")
                                                                        .style("opacity", 1)
                                                                        .duration(5 * time)

                                                                })

                                                        })

                                                })

                                        })
                                })


                        })
                })
        }
    }
}

module.exports = SymmetricTutorial
