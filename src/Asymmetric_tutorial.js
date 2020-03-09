const d3 = require('d3')
const Crypto = require('./crypto')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const locked_key = require('./images/locked_key.png')
const key = require('./images/white_key.png')
const receiver = require('./images/boy.png')
const sender = require('./images/teamwork.png')
const doc = require('./images/document.png')
const locked_doc = require('./images/locked_doc.png')
const unlocked_doc = require('./images/unlocked_doc.png')
const key2 = require('./images/dark_key.png')

class SymmetricTutorial {
    constructor() {
    }

    start() {
        document.getElementById('vis').innerHTML = "";
        this.vis = d3.select('#vis')
        
        this.vis.append('div')
            .attr('class', "bootstrap-iso")
            .append('div')
            .attr('id', 'randomdiv')
            .attr('class', 'container')

        d3.select('#randomdiv')
            .append("div")
            .attr('id', 'people')
            .attr('class', 'row')
        
        d3.select('#people')
            .append('img')
            .attr('id', 'people_sender')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr("src", sender)

        d3.select('#people')
            .append('img')
            .attr('id', 'people_hacker')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select('#people')
            .append('img')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr('id', 'people_receiver')
            .attr("src", receiver)

        d3.select('#randomdiv')
            .append("div")
            .attr('id', 'first_row')
            .attr('class', 'row')
        d3.select('#randomdiv')
            .append("div")
            .attr('id', 'second_row')
            .attr('class', 'row')
        d3.select('#randomdiv')
            .append("div")
            .attr('id', 'third_row')
            .attr('class', 'row')
        
        d3.select('#first_row')
            .append("div")
            .attr('id', 'first_col1')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select('#first_row')
            .append("div")
            .attr('id', 'first_col2')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select('#first_row')
            .append("div")
            .attr('id', 'first_col3')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select('#second_row')
            .append("div")
            .attr('id', 'second_col1')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        d3.select('#second_row')
            .append("div")
            .attr('id', 'second_col2')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        d3.select('#second_row')
            .append("div")
            .attr('id', 'second_col3')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        
        d3.select('#third_row')
            .append("div")
            .attr('id', 'third_col1')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        d3.select('#third_row')
            .append("div")
            .attr('id', 'third_col2')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        d3.select('#third_row')
            .append("div")
            .attr('id', 'third_col3')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            
        d3.select('#second_row').append('div')
            .attr('class', 'col-sm-1 col-md-1 col-lg-1')
            .attr("id", "left_pad")

        d3.select('#first_row').transition()
            .duration(1000)
            .delay(0)
            .on("start", () => {
                d3.select('#second_row').append('img').attr("src", doc)
                    .attr("class", "col-sm-2 col-md-2 col-lg-2")
                    .attr('id', 'message')

                d3.select('#second_row').append('div')
                    .attr('class', 'col-sm-9 col-md-9 col-lg-9')
                    .attr("id", "right_pad")
                    
            })
            .on("end", ()=>{
                moveDoc()
            })

        function moveDoc(){
            d3.select("#shape1").transition()
                .duration(1000)
                .delay(0)
                .on("start", ()=>{
                    d3.select("#unlocked_key").style("border", "inset")
                })
                .on("end", () => {
                    console.log("nested")
                    d3.select('#message').transition()
                        .duration(1000)
                        .delay(0)
                        .on("start", () => {
                            d3.select("#unlock1").attr('src', lock)
                            d3.select('#message').attr('src', locked_doc)
                            d3.select("#unlocked_key").style("border", null)
                        })
                        .on("end", () => {
                            d3.select("#unlocked_key").transition()
                                .duration(1000)
                                .delay(0)
                                .on("start", ()=>{ 
                                    d3.select('#left_pad').attr('class', 'col-sm-9 col-md-9 col-lg-9')
                                    d3.select('#right_pad').attr('class', 'col-sm-1 col-md-1 col-lg-1')
                                })
                                .on("end", () => {
                                    d3.select("#decrypt_button").transition()
                                        .duration(1000)
                                        .delay(0)
                                        .on("start", () => {
                                            d3.select("#decrypt_button").style("border", "inset")
                                        })
                                        .on("end", () => {
                                            d3.select('#message').attr('src', unlocked_doc)
                                            d3.select("#decrypt_button").style("border", null)
                                        })
                                })
                        })
                })
            }

        d3.select('#third_col1').append("div")
            .attr('id', 'shape1')
            .attr('class', 'row')

        d3.select("#shape1").append('div')
            .attr('class', 'col-sm-2 col-md-2 col-lg-2')
        
        d3.select("#shape1").append('img')
            .attr('id', 'unlocked_key')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr("src", key)

        d3.select("#shape1").append('img')
            .attr('id', 'unlock1')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr("src", unlock)
        
        d3.select('#third_col3').append("div")
            .attr('id', 'shape3')
            .attr('class', 'row')

        d3.select("#shape3").append('div')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select("#shape3").append('img')
            .attr('id', 'public')
            .attr("src", key)
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        
        d3.select("#shape3").append('img')
            .attr('id', 'decrypt_button')
            .attr("src", key2)
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        document.onkeypress = this.stopRKey; 
    }
}

module.exports = SymmetricTutorial
