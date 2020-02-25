const d3 = require('d3')

var vis = d3.select('#vis')

vis.append('form')
    .attr('id', 'form1')
    .attr('name', 'myform')
    .on('submit', handleClick)
    
d3.select("#form1").append('input')
    .attr('type','submit')
    .attr('value', 'Encrypt')

d3.select("#form1").append('input')
    .attr('type','text')
    .attr('id', 'message')
    .attr('placeholder','Message to be sent')

d3.select("#form1").append('input')
    .attr('type','text')
    .attr('id', 'secret')
    .attr('placeholder','Key to be used (random when empty)')

const Crypto = require('./crypto')
var cryptoInstance;
var encryption;

function handleClick(){
    d3.event.preventDefault();
    let message = document.getElementById("message").value
    let secret = document.getElementById("secret").value
    console.log("key ", secret, " hey")
    cryptoInstance = new Crypto(secret);
    encryption = cryptoInstance.encrypt(message)
    vis.append('text').text(encryption.ciphertext)
    console.log(encryption.ciphertext)
}

function handleDecrypt() {
    let decryption = cryptoInstance.decrypt(encryption.encrypted_data)
    console.log(decryption)
    vis.append('br');
    vis.append('text').text(decryption)
}

vis.append('input')
    .attr('type','submit')
    .attr('value', 'Decrypt')
    .on('click', handleDecrypt)