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

        d3.select('#symmetric_container')
            .append("div")
            .attr('id', 'receiver_sym')

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
        

        d3.select("#encrypt")
            .transition()
            .duration(1000)
            .delay(1000)
            .on('end', function() {
                // increasing size of encrypt key & changine its src
                d3.select("#encrypt")
                    .attr("src", selected_key)
                    .style("width", "70%")
                    .transition()
                    .duration(1000)
                    .delay(1000)
                    .on('end', function() {
                        // sender document becomes locked document
                        d3.select("#doc1")
                            .attr("src", locked_doc)
                            .transition()
                            .duration(1000)
                            .delay(2000)
                            .on('end', function() {

                                // sender key goes back to normal 
                                d3.select("#encrypt")
                                    .attr("src", key)
                                    .style("width", "35%")
                                    .transition()
                                    .duration(1000)
                                    .delay(1000)
                                    .on('end', function() {
                                        // sender doc goes away
                                        d3.select("#doc1")
                                            .style("opacity", "0")

                                        // receiver doc shows up
                                        d3.select("#doc2")
                                            .style("opacity", "1")
                                            .transition()
                                            .duration(1000)
                                            .delay(1000)
                                            .on('end', function() {

                                                // increasing size of decrypt key & changine its src
                                                d3.select("#decrypt")
                                                    .attr("src", selected_key)
                                                    .style("width", "70%")
                                                    .transition()
                                                    .duration(1000)
                                                    .delay(1000)
                                                    .on('end', function() {

                                                        // locked doc becomes unlocked doc
                                                        d3.select("#doc2")
                                                            .attr("src", unlocked_doc)
                                                            .transition()
                                                            .duration(1000)
                                                            .delay(1000)
                                                            .on('end', function() {
                                                                d3.select("#decrypt")
                                                                    .attr("src", key)
                                                                    .style("width", "35%")
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
