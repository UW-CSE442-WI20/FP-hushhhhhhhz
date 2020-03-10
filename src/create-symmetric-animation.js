const d3 = require('d3')
const Crypto = require('./crypto')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const locked_key = require('./images/locked_key.png')
const key = require('./images/blue_key_svg.svg')
const receiver = require('./images/boy.png')
const sender = require('./images/girl2.png')
const doc = require('./images/regular.png')
const locked_doc = require('./images/lock_doc.png')
const unlocked_doc = require('./images/unlock_doc.png')
const selected_key = require('./images/highlighted_blue_key.png')

class SymmetricTutorial {
    constructor() {
    }

    start() {
        document.getElementById('vis').innerHTML = "";
        this.vis = d3.select('#vis')

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

        d3.select("#sender_sym")
            .append("div")
            .attr("class", "sender_document")
            .style("width", "22%")
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
            .text("Matt is waiting for his TA to send him sensitive information which needs to be encrypted")
            .transition()
            .duration(1000)
            .delay(1000)
            .on('end', function () {
                d3.select("#encrypt")
                    .transition()
                    .duration(1000)
                    .delay(1000)
                    .on('end', function () {
                        // increasing size of encrypt key & changine its src
                        d3.select("#encrypt")
                            .attr("src", selected_key)
                            .style("width", "65%")
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
                                            .style("width", "35%")
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
                                                    .style("width", "65%")
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
                                                            .style("width", "35%")

                                                        d3.select("#story_text")
                                                            .text("Matt is now happy that he can look at the information and no one else can")
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
