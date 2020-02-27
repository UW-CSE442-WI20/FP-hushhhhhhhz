const d3 = require('d3')
const Crypto = require('./crypto')
const key = require('./images/key.png')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const arrow = require('./images/arrow.png')
class Symmetric {
    constructor() {
        this.handleEncrypt = this.handleEncrypt.bind(this)
        this.handleDecrypt = this.handleDecrypt.bind(this)
        this.handleNewMessage = this.handleNewMessage.bind(this)
    }

    handleEncrypt(){
        d3.event.preventDefault();
        let message = document.getElementById("message").value
        let secret = document.getElementById("secret").value
        this.cryptoInstance = new Crypto(secret)
        this.encryption = this.cryptoInstance.encrypt(message)
        d3.select('#encryption_display').transition().text(this.encryption.ciphertext)
        console.log(this.encryption.ciphertext)
        d3.select("#lock2").attr('src', lock)
        d3.select('#decrypt_button').attr('hidden', null)
        d3.select("#lock").attr('hidden', null)
        d3.select("#lock2").attr('hidden', null)
        d3.select("#key2").attr('hidden', null)
        d3.select("#encryption_display").attr('hidden', null)    
    }
    
    handleDecrypt() {
        let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
        console.log(decryption)
        d3.select('#decryption_display').attr('hidden', null).transition().text(decryption)
        d3.select("#lock2").attr('src', unlock)
    }

    handleNewMessage() {
        d3.event.preventDefault();
        d3.select('#decrypt_button').attr('hidden', 'true')
        d3.select("#lock").attr('hidden', 'true')
        d3.select("#lock2").attr('hidden', 'true')
        d3.select("#key2").attr('hidden', 'true')
        d3.select("#encryption_display").attr('hidden', 'true')
        d3.select("#decryption_display").attr('hidden', 'true')
    }

    stopRKey(evt) {
        var evt = (evt) ? evt : ((event) ? event : null);
        var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
        if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
    }

    start() {
        document.getElementById('vis').innerHTML = "";
        this.vis = d3.select('#vis')

        this.vis.append('form')
            .attr('id', 'form1')
            .attr('name', 'myform')
        
        d3.select("#form1").append("div")
            .attr('id', 'input_box')

        // input
        d3.select("#input_box").append('textarea')
            .attr('style', "resize: none;")
            .attr('type','text')
            .attr('id', 'message')
            .attr('placeholder','Message to be sent')
            .on('input', this.handleNewMessage)

        // key
        d3.select("#input_box").append('input')
            .attr('type','text')
            .attr('id', 'secret')
            .attr('placeholder','Key to be used (random when empty)')
        
        d3.select("#form1").append("div")
            .attr('id', 'encrypt')

        d3.select("#encrypt").append('text')
            .attr('id', 'encryption_display')

        d3.select("#form1").append("div")
            .attr('id', 'decrypt')

        d3.select("#decrypt").append('text')
            .attr('id', 'decryption_display')
        
        this.vis.append("div")
            .attr('id', 'shapes')

        d3.select("#shapes").append('img')
            .attr('id', 'unlock')
            .attr("src", unlock)
            .attr('width', '10%')

        d3.select("#shapes").append('img')
            .attr('id', 'key')
            .attr("src", key)
            .attr('width', '10%')
            .on('click', this.handleEncrypt)

        d3.select("#shapes").append('img')
            .attr('id', 'lock')
            .attr("src", lock)
            .attr('width', '10%')
            .attr("style","margin-left: 20%")
            .attr('hidden', 'true')
        
        d3.select("#shapes").append('img')
            .attr('id', 'lock2')
            .attr("src", lock)
            .attr('width', '10%')
            .attr("style","margin-left: 20%")
            .attr('hidden', 'true')

        d3.select("#shapes").append('img')
            .attr('id', 'key2')
            .attr("src", key)
            .attr('width', '10%')
            .on('click', this.handleDecrypt)
            .attr('hidden', 'true')
        document.onkeypress = this.stopRKey; 
    }
}

module.exports = Symmetric
