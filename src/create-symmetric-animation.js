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
        d3.select('#title8 .fullVis').html("")

        this.vis = d3.select('#title8 .fullVis')
        this.vis.append("h1")
            .text("Symmetric Encryption: using a single key")
            .attr("class", "titleBox")

        this.vis.append('div')
            .attr('id', 'sym_outter')
            .style("height", "550px")

        d3.select("#sym_outter")
            .append('div')
            .attr('id', 'symmetric_container')

        d3.select('#symmetric_container')
            .append("div")
            .attr('id', 'sender_sym')
            .style("margin-top", "-6%")
            .append("h3")
            .attr("class", "label")
            .text("TA")

        d3.select('#symmetric_container')
            .append("div")
            .attr('id', 'receiver_sym')
            .style("margin-top", "-6%")
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

        d3.select("#sym_outter")
            .append("div")
            .attr("id", "story_warning")

        d3.select("#story_warning")
            .append("div")
            .attr("id", "story_text")


        d3.select("#story_warning")
            .append("div")
            .attr("id", "warning")

        this.vis.append("div")
            .attr("id", "startAnimation")
            .text("START ANIMATION")
            .style("width", "10%")

        document.getElementById("startAnimation").onclick = function () {
            d3.select("#warning").html("")
            d3.select("#story_text").html("")
            animation();
        };

        function animation() {
            let time = 2000;
            d3.select("#story_text")
                .append("text")
                .attr("dy", "0em")
                .transition()
                .text("Matt is waiting for his TA to send him sensitive information which needs to be encrypted.")
                .delay(time)

            d3.select("#story_text")
                .append("br")

            d3.select("#story_text").append("text")
                .attr("dy", "1em")
                .transition()
                .text("Because they are using symmetric keys, Matt and the TA will use")
                .delay(3 * time)

            d3.select("#story_text").append("text")
                .style("color", "#FF5733")
                .transition()
                .text(" the same exact key")
                .delay(3 * time)

            d3.select("#story_text").append("text")
                .transition()
                .text(" to encrypt and decrypt.")
                .style("color", "white")
                .delay(3 * time)
                .on('end', function () {
                    d3.select("#encrypt")
                        .transition()
                        .duration(6* time)
                        .on('end', function () {

                            d3.select("#story_text")
                                .transition()
                                .text("The TA will encrypt the information using a key that only Matt and her have.")

                            // increasing size of encrypt key & changine its src
                            d3.select("#encrypt")
                                .attr("src", selected_key)
                                .style("width", "100%")
                                .transition()
                                .delay(2 * time)
                                .on('end', function () {

                                    d3.select("#story_text")
                                        .transition()
                                        .text("The information is now encrypted and ready to be sent")
                                        
                                    // sender document becomes locked document
                                    d3.select("#doc1")
                                        .attr("src", locked_doc)
                                        .transition()
                                        .delay(2 * time)
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
                                                .transition()
                                                .text("Matt receives the encrypted document")
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
                                                        .transition()
                                                        .text("and uses his key to decrypt the information")
                                                        .duration(2 * time)
                                                        .on('end', function () {
                                                            // locked doc becomes unlocked doc
                                                            d3.select("#doc2")
                                                                .attr("src", unlocked_doc)
                                                                .transition()

                                                            d3.select("#decrypt")
                                                                .attr("src", key)
                                                                .style("width", "65%")
                                                                .transition()
                                                                .delay(time)

                                                            d3.select("#story_text")
                                                                .transition()
                                                                .text("Matt is now happy that he can look at the information")
                                                                .duration(2 * time)
                                                                .on('end', function () {
                                                                    d3.select("#warning")
                                                                        .transition()
                                                                        .text("Warning!! If a student gets a hold of the shared key between Matt and the TA, they will also be able to decrypt the sensitive information.")
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
