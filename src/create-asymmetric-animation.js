const d3 = require('d3')
const receiver = require('./images/boy.png')
const sender1 = require('./images/girl2.png')
const sender2 = require('./images/girl1.png')
const sender3 = require('./images/man.png')
const blue = require('./images/blue_key.png')
const pink = require('./images/pink_key.png')
const yellow = require('./images/yellow_key.png')
const purple = require('./images/purple_key.png')
const public_key = require('./images/public_key_blue.png')
const private_key = require('./images/private.png')
const doc = require('./images/regular.png')
const locked_doc = require('./images/lock_doc.png')
const unlocked_doc = require('./images/unlock_doc.png')


class AsymmetricAnimation {
    constructor() {
    }

    start(){
        document.getElementById('vis').innerHTML = "";
        this.vis = d3.select('#vis')
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
            .attr("src",sender1)


        d3.select("#sender1_image")
            .append('img')
            .attr("src",doc)
            .attr("class", "sender_doc")

        // div with keys in it (senders only)
        d3.select("#sender1")
            .append('div')
            .attr("id", "sender1_key")
            
        
        d3.select("#sender1_key")
            .append('img')
            .attr("src",yellow)
            .attr("class", "keys")

        d3.select("#sender1_key")
            .append('img')
            .attr("src",public_key)
            .attr("class", "keys") 
            .attr('class', 'publickey')

        d3.select("#sender2")
            .append("div")
            .attr("id", "sender2_image")
            .attr("class", "perdoc")
        
        d3.select("#sender2_image")
            .append('img')
            .attr("src",sender2)
            .attr("class", "perdoc")
        
        d3.select("#sender2_image")
            .append('img')
            .attr("src",doc)
            .attr("class", "sender_doc")
    
        d3.select("#sender2")
            .append('div')
            .attr("id", "sender2_key")

        d3.select("#sender2_key")
            .append('img')
            .attr("src",pink)
            .attr("class", "keys") 
    
        d3.select("#sender2_key")
            .append('img')
            .attr("src",public_key)
            .attr("class", "keys") 
            .attr('class', 'publickey')

        d3.select("#sender3")
            .append("div")
            .attr("id", "sender3_image")
            .attr("class", "perdoc")

        d3.select("#sender3_image")
            .append('img')
            .attr("src",sender3)

        
        d3.select("#sender3_image")
            .append('img')
            .attr("src",doc)
            .attr("id", "doc1")
            .attr("class", "sender_doc")

        d3.select("#sender3")
            .append('div')
            .attr("id", "sender3_key")

        d3.select("#sender3_key")
            .append('img')
            .attr("src",purple)
            .attr("class", "keys")
    
        d3.select("#sender3_key")
            .append('img')
            .attr("src",public_key)
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
            .attr("src",public_key)
            .attr("class", "keys")
            .style('width', '15%')
            .style("padding","10px")


        d3.select("#receiver_key")
            .append('img')
            .attr("src",private_key)
            .attr("class", "keys")
            .style('width', '15%')
            .style("padding","10px")
            .attr("id", "private")
            
        this.move()
    }
    
        
    move() {
        const foreal = this
        d3.selectAll(".publickey")
            .style("padding","10px")
            .transition()
            .duration(1000)
            .style("border","solid")
            .delay(1000)
            .on('end', function(){
                d3.selectAll(".sender_doc")
                    .attr("src", locked_doc)
                    .style("width", "60%")
                    .style("height", "60%")
                    .style("margin-left", "-10%")
                    .transition()
                    .duration(1000)
                    .delay(1000)
                    .on('end', function(){
                        d3.selectAll(".sender_doc")
                        .attr("hidden", true)
                        .transition()
                        .duration(1000)
                        .delay(1000)
                        
                        d3.selectAll(".publickey")
                            .style("border",null)
                        
                        d3.selectAll(".locked_doc")
                        .attr('hidden', null)
                        .transition()
                        .duration(1000)
                        .delay(1000)
                        .on('end', function(){
                           
                            d3.select("#private")
                            .transition()
                            .duration(1000)
                            .style("border","solid")
                            .delay(500)
                            .on('end', function(){
                                d3.selectAll(".locked_doc")
                                .attr('src', unlocked_doc)
                                .transition()
                                .duration(1000)
                                .delay(1000)

                                d3.select("#private")
                                .style("border",null)
                            })
                        })
                    })
            })
    }
}

module.exports = AsymmetricAnimation