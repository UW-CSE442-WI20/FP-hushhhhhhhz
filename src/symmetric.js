const d3 = require('d3')
const crypto = require('./crypto')

var body = d3.select('#vis')

body.append('form')
    .attr('id', 'form1')
    .attr('name', 'myform')
    .on('submit', handleClick)
    
d3.select("#form1").append('input')
    .attr('type','submit')
    .attr('name','Submit')
    .attr('value','Encrypt')

d3.select("#form1").append('input')
    .attr('type','text')
    .attr('id', 'input')
    .attr('placeholder','text to encrypt')


function handleClick(event){
    console.log(document.getElementById("input").value)
}