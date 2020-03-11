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

        d3.selectAll("#vis div").classed("selected", false)
        d3.select("#content5").classed("selected", true)

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

        d3.select("#story_text")
            .append("text")
            .attr("dy", "0em")
            .text("Matt is waiting for his TA to send him sensitive information which needs to be encrypted.")
			.style("opacity", 0)
			.transition()
			.duration(500)
			.style("opacity", 1)

        d3.select("#story_text")
            .append("br")

        d3.select("#story_text").append("text")
			.attr("dy", "1em")
			.text("Because they are using symmetric keys, Matt and the TA will use the same exact key to encrypt and decrypt.")
			.style("opacity", 0)
			.transition()
			.duration(1000)
			.style("opacity", 1)
            .delay(2000)
            .on('end', function () {
                d3.select("#encrypt")
                    .transition()
                    .duration(1000)
                    .delay(1000)
                    .on('end', function () {
                        // increasing size of encrypt key & changine its src
                        d3.select("#encrypt")
                            .attr("src", selected_key)
                            .transition()
                            .duration(1000)
                            .delay(1000)
                        d3.select("#story_text")
                            .text("The TA will encrypt the information using a key that only Matt and her have.")
                            .transition()
                            .duration(2000)
                            .delay(1000)
                            .on('end', function () {
                                // sender document becomes locked document
                                d3.select("#doc1")
                                    .attr("src", locked_doc)
                                    .transition()
                                    .duration(1000)
                                    .delay(2000)
                                d3.select("#story_text")
                                    .text("The information is now encrypted and ready to be sent")
                                    .transition()
                                    .duration(2000)
                                    .delay(700)
                                    .on('end', function () {

                                        // sender key goes back to normal 
                                        d3.select("#encrypt")
                                            .attr("src", key)
                                            .transition()
                                            .duration(0)
                                            .delay(0)
                                        d3.select("#doc1")
                                            .style("opacity", "0")

                                        d3.select("#doc2")
                                            .style("opacity", "1")
                                            .transition()
                                            .duration(1000)
                                            .delay(1000)

                                        d3.select("#story_text")
                                            .text("Matt receives the encrypted document")
                                            .transition()
                                            .duration(2000)
                                            .delay(1000)
                                            .on('end', function () {

                                                // increasing size of decrypt key & changine its src
                                                d3.select("#decrypt")
                                                    .attr("src", selected_key)
                                                    .transition()
                                                    .duration(1000)
                                                    .delay(1000)

                                                d3.select("#story_text")
                                                    .text("and uses his key to decrypt the information")
                                                    .transition()
                                                    .duration(2000)
                                                    .delay(1000)

                                                    .on('end', function () {
                                                        // locked doc becomes unlocked doc
                                                        d3.select("#doc2")
                                                            .attr("src", unlocked_doc)
                                                            .transition()
                                                            .duration(1000)
                                                            .delay(1000)
                                                        
                                                        d3.select("#decrypt")
                                                            .attr("src", key)

                                                        d3.select("#story_text")
                                                            .text("Matt is now happy that he can look at the information")
                                                            .transition()
                                                            .duration(2000)
                                                            .delay(1000)
                                                            .on('end', function() {
                                                                d3.select("#warning")
                                                                .text("Warning!! If a student gets a hold of the shared key between Matt and the TA, they will also be able to decrypt the sensitive information.")
                                                            })

                                                    })

                                            })

                                    })
                            })


                    })
            })

    }
}

module.exports = SymmetricTutorial
