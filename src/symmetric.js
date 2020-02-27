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

    }
    
    handleDecrypt() {
        let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
        console.log(decryption)
        d3.select('#decryption_display').transition().text(decryption)
        d3.select("#lock2").attr('src', unlock)

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
        d3.select("#input_box").append('input')
            .attr('type','text')
            .attr('id', 'message')
            .attr('placeholder','Message to be sent')
        
        // d3.select("#form1").append("div")
        //     .attr('id', 'secret_box')

        // key
        d3.select("#input_box").append('input')
            .attr('type','text')
            .attr('id', 'secret')
            .attr('placeholder','Key to be used (random when empty)')
        
        // d3.select("#input_box").append('img')
        //     .attr('id', 'arrow')
        //     .attr("src", arrow)
        //     .attr('width', '10%')
        //     .on('click', this.handleEncrypt)
        
        d3.select("#form1").append("div")
            .attr('id', 'output_box')

        d3.select("#output_box").append('text')
            .attr('id', 'encryption_display')
            .attr("style","margin-left: 50%")


        // d3.select("#input_box").append('img')
        //     .attr('id', 'decrypt_button')
        //     .attr("src", arrow)
        //     .attr('width', '10%')
        //     .attr('hidden', 'true')
        //     .on('click', this.handleDecrypt)

        d3.select("#output_box").append('text')
            .attr('id', 'decryption_display')
            .attr("style","margin-left: 40%")
        
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
        
        // d3.select("#shapes").append('img')
        //     .attr('id', 'unlock2')
        //     .attr("src", unlock)
        //     .attr('width', '10%')
        //     .attr('hidden', 'true')

        d3.select("#shapes").append('img')
            .attr('id', 'key2')
            .attr("src", key)
            .attr('width', '10%')
            .on('click', this.handleDecrypt)
            .attr('hidden', 'true')
    }
}

module.exports = Symmetric
