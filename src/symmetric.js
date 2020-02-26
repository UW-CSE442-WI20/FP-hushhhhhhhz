const d3 = require('d3')
const Crypto = require('./crypto')

class Symmetric {
    constructor() {
        this.handleEncrypt = this.handleEncrypt.bind(this)
        this.handleDecrypt = this.handleDecrypt.bind(this)
    }

    handleEncrypt(){
        d3.event.preventDefault();
        let message = document.getElementById("message").value
        let secret = document.getElementById("secret").value
        this.cryptoInstance = new Crypto(secret)
        this.encryption = this.cryptoInstance.encrypt(message)
        d3.select('#encryption_display').transition().text(this.encryption.ciphertext)
        console.log(this.encryption.ciphertext)
    }
    
    handleDecrypt() {
        let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
        console.log(decryption)
        d3.select('#decryption_display').transition().text(decryption)
    }

    start() {
        document.getElementById('vis').innerHTML = "";
        this.vis = d3.select('#vis')

        this.vis.append('form')
            .attr('id', 'form1')
            .attr('name', 'myform')
            .on('submit', this.handleEncrypt)
            
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
        
        this.vis.append('text')
            .attr('id', 'encryption_display')

        this.vis.append('input')
            .attr('type','submit')
            .attr('value', 'Decrypt')
            .on('click', this.handleDecrypt)
        
        this.vis.append('text')
            .attr('id', 'decryption_display')
    }
}

module.exports = Symmetric
