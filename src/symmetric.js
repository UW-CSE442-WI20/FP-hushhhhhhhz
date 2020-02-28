const d3 = require('d3')
const Crypto = require('./crypto')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const unlocked_key = require('./images/unlocked_key.png')
const locked_key = require('./images/locked_key.png')
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
        d3.select('#decryption_display').transition().text(this.encryption.ciphertext)
        console.log(this.encryption.ciphertext)
        d3.select("#decrypt_button").attr('src', locked_key)
        d3.select("#lock").attr('hidden', null)
        d3.select("#decrypt_button").attr('hidden', null)
        d3.select("#encryption_display").attr('hidden', null)    
        d3.select("#decryption_display").attr('hidden', null)    

    }
    
    handleDecrypt() {
        let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
        console.log(decryption)
        d3.select('#decryption_display').attr('hidden', null).transition().text(decryption)
        d3.select("#decrypt_button").attr('src', unlock)
    }

    handleNewMessage() {
        d3.event.preventDefault();
        d3.select("#lock").attr('hidden', 'true')
        d3.select("#decrypt_button").attr('hidden', 'true')
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

        this.vis.append('div')
            .attr('id', 'randomdiv')

        d3.select('#randomdiv').append("div")
            .attr('id', 'first')

        d3.select('#first').append("div")
            .attr('id', 'input_boxes')

        d3.select('#input_boxes').append('form')
            .attr('id', 'form1')
            .attr('name', 'myform')

        // input
        d3.select("#form1").append('textarea')
            .attr('style', "resize: none;")
            .attr('type','text')
            .attr('id', 'message')
            .attr('placeholder','Message to be sent')
            .on('input', this.handleNewMessage)

        // key
        d3.select("#form1").append('input')
            .attr('type','text')
            .attr('id', 'secret')
            .attr('placeholder','Key to be used (random when empty)')
            .on('input', this.handleNewMessage)
        
        d3.select('#first').append("div")
            .attr('id', 'shape1')

        d3.select("#shape1").append('img')
            .attr('id', 'unlocked_key')
            .attr("src", unlocked_key)
            .on('click', this.handleEncrypt)

        d3.select('#randomdiv').append("div")
            .attr('id', 'second')

        d3.select('#second').append("div")
            .attr('id', 'encrypted')

        d3.select("#encrypted").append('textarea')
            .attr('style', "resize: none;")
            .attr('id', 'encryption_display')
            .attr('hidden', 'true')

        d3.select('#second').append("div")
            .attr('id', 'shape2')

        d3.select("#shape2").append('img')
            .attr('id', 'lock')
            .attr("src", lock)
            .attr('width', '140')
            .attr('hidden', 'true')

        d3.select('#randomdiv').append("div")
            .attr('id', 'third')
        
        d3.select('#third').append("div")
            .attr('id', 'decrypted')

        d3.select("#decrypted").append('textarea')
            .attr('style', "resize: none;")
            .attr('id', 'decryption_display')
            .attr('hidden', 'true')
        
        d3.select('#third').append("div")
            .attr('id', 'shape3')

        d3.select("#shape3").append('img')
            .attr('id', 'decrypt_button')
            .attr("src", locked_key)
            .attr('width', '160')
            .attr('hidden', 'true')
            .on('click', this.handleDecrypt)

        document.onkeypress = this.stopRKey; 
    }
}

module.exports = Symmetric
