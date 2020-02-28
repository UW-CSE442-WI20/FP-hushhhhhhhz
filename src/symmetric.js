const d3 = require('d3')
const Crypto = require('./crypto')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const unlocked_key = require('./images/unlocked_key.png')
const locked_key = require('./images/locked_key.png')
// const bootstrap = require('bootstrap')
class Symmetric {
    constructor() {
        this.handleEncrypt = this.handleEncrypt.bind(this)
        this.handleDecrypt = this.handleDecrypt.bind(this)
        this.handleNewMessage = this.handleNewMessage.bind(this)
        this.delayInMilliseconds = 1000; //1 second
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
        d3.select("#text2").attr('hidden', null) 
        d3.select("#text4").attr('hidden', "true")
        d3.select("#text3").attr('hidden', null)      

    }
    
    handleDecrypt() {
        let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
        console.log(decryption)
        d3.select('#decryption_display').attr('hidden', null).transition().text(decryption)
        d3.select("#decrypt_button").attr('src', unlock)
        d3.select("#text3").attr('hidden', "true")
        d3.select("#text4").attr('hidden', null)


    }

    handleNewMessage() {
        d3.event.preventDefault();
        d3.select("#lock").attr('hidden', 'true')
        d3.select("#decrypt_button").attr('hidden', 'true')
        d3.select("#encryption_display").attr('hidden', 'true')
        d3.select("#decryption_display").attr('hidden', 'true')
        d3.select("#text2").attr('hidden', "true") 
        d3.select("#text4").attr('hidden', "true")

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
            // .attr('class', 'container')
            .attr("style", "margin-top:20%")

        d3.select('#randomdiv').append("div")
            .attr('id', 'first')
            // .attr('class', 'row')

        // d3.select('#first_row')
        //     .append("div")
        //     .attr('id', 'first_col')

        // d3.select('#first_col').append("div")
        //     .attr('id', 'input_boxes')

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
        
        d3.select('#first').append("div")
            .attr('id', 'text1')
            .style("border", "1px black solid")
            .style("margin-top", "10%")
            .style("margin-right", "15%")
            .text("Try typing in a message and click on the lock to encrypt it")

        d3.select('#randomdiv').append("div")
            .attr('id', 'second')

        d3.select('#second').append("div")
            .attr('id', 'encrypted')

        d3.select("#encrypted").append('textarea')
            .attr('style', "resize: none;background-color: white;")
            .attr('disabled', 'true')
            .attr('id', 'encryption_display')
            .attr('hidden', 'true')

        d3.select('#second').append("div")
            .attr('id', 'shape2')

        d3.select("#shape2").append('img')
            .attr('id', 'lock')
            .attr("src", lock)
            .attr('width', '140')
            .attr('hidden', 'true')
        
        d3.select('#second').append("div")
            .attr('id', 'text2')
            .style("border", "1px black solid")
            .text("This is the encrypted message, visible to everyone")
            .attr('hidden', 'true')

        d3.select('#randomdiv').append("div")
            .attr('id', 'third')
        
        d3.select('#third').append("div")
            .attr('id', 'decrypted')

        d3.select("#decrypted").append('textarea')
            .attr('style', "resize: none;background-color: white;")
            .attr('disabled', 'true')
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

        d3.select('#third').append("div")
            .attr('id', 'text3')
            .style("border", "1px black solid")
            .text("Only with the key that we used to encrypt the message, we can decrypt it! Click on the lock to decrypt")
            .attr('hidden', 'true')
        
        d3.select('#third').append("div")
            .attr('id', 'text4')
            .style("border", "1px black solid")
            .text("The decrypted message is only visible to the keyholders")
            .attr('hidden', 'true')


        document.onkeypress = this.stopRKey; 
    }
}

module.exports = Symmetric
