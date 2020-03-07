const d3 = require('d3')
const Crypto = require('./crypto')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const locked_key = require('./images/locked_key.png')
const key = require('./images/white_key.png')
const receiver = require('./images/receiver.png')
const sender = require('./images/sender.png')
const hacker = require('./images/hacker.png')
class SymmetricTutorial {
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
        d3.select("#people_hacker").attr('hidden', null) 
        d3.select("#people_receiver").attr('hidden', null)      

    }
    
    handleDecrypt() {
        let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
        console.log(decryption)
        d3.select('#decryption_display').attr('hidden', null).transition().text(decryption)
        d3.select("#decrypt_button").attr('src', unlock)
        d3.select("#text3").attr('hidden', "true")
        d3.select("#text4").attr('hidden', null)
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
            .attr('class', "bootstrap-iso")
            .append('div')
            .attr('id', 'randomdiv')
            .attr('class', 'container')
            // .attr("style", "margin-top:20%")

        // TODO: ADD INTRO TEXT
        // d3.select('#randomdiv')
        //     .append("div")
        //     .attr('id', 'intro')
        //     .attr('class', 'row')
        //     .text('Matt wants to send a message to his TAs')

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
            .attr("src", hacker)
            .attr('hidden', 'true')

        d3.select('#people')
            .append('img')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr('id', 'people_receiver')
            .attr("src", receiver)
            .attr('hidden', 'true')

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

        d3.select('#first_col1').append("div")
            .attr('id', 'input_boxes')

        d3.select('#input_boxes').append('form')
            .attr('id', 'form1')
            .attr('name', 'myform')

        // input
        d3.select("#form1").append('textarea')
            .attr('style', "resize: none;background-color: white;")
            .attr('type','text')
            .attr('id', 'message')
            .attr('disabled', 'true')
            .text('Hi TAs! We got to give everyone a 4.0 now! :D')

        // key
        d3.select("#form1").append('textarea')
            .attr('style', "resize: none;background-color: white;")
            .attr('type','text')
            .attr('id', 'secret')
            .attr('disabled', 'true')
            .text('Hail Mike Bostock')
        
        d3.select('#second_col1').append("div")
            .attr('id', 'shape1')
            .attr('class', 'row')

        d3.select("#shape1").append('div')
            .attr('class', 'col-sm-2 col-md-2 col-lg-2')
        
        d3.select("#shape1").append('img')
            .attr('id', 'unlocked_key')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr("src", key)
            .on('click', this.handleEncrypt)

        d3.select("#shape1").append('img')
            .attr('id', 'unlock1')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr("src", unlock)

        d3.select("#shape1").append('div')
            .attr('class', 'col-sm-2 col-md-2 col-lg-2')
        
        d3.select('#third_col1').append("div")
            .attr('id', 'text1')
            .style("border", "1px black solid")
			.style("border-radius", "5px")
            .text("Try typing in a message and click on the lock to encrypt it")

        d3.select('#first_col2').append("div")
            .attr('id', 'encrypted')

        d3.select("#encrypted").append('textarea')
            .attr('style', "resize: none;background-color: white;")
            .attr('disabled', 'true')
            .attr('id', 'encryption_display')
            .attr('hidden', 'true')

        d3.select('#second_col2').append("div")
            .attr('id', 'shape2')
            .attr('class', 'row')

        d3.select("#shape2").append('div')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select("#shape2").append('img')
            .attr('id', 'lock')
            .attr("src", lock)
            .attr('hidden', 'true')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select("#shape2").append('div')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
        
        d3.select('#third_col2').append("div")
            .attr('id', 'text2')
            .style("border", "1px black solid")
			.style("border-radius", "5px")
            .text("This is the encrypted message, visible to everyone")
            .attr('hidden', 'true')
        
        d3.select('#first_col3').append("div")
            .attr('id', 'decrypted')

        d3.select("#decrypted").append('textarea')
            .attr('style', "resize: none;background-color: white;")
            .attr('disabled', 'true')
            .attr('id', 'decryption_display')
            .attr('hidden', 'true')
        
        d3.select('#second_col3').append("div")
            .attr('id', 'shape3')
            .attr('class', 'row')

        d3.select("#shape3").append('div')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select("#shape3").append('img')
            .attr('id', 'decrypt_button')
            .attr("src", locked_key)
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')
            .attr('hidden', 'true')
            .on('click', this.handleDecrypt)

        d3.select("#shape3").append('div')
            .attr('class', 'col-sm-4 col-md-4 col-lg-4')

        d3.select('#third_col3').append("div")
            .attr('id', 'text3')
            .style("border", "1px black solid")
			.style("border-radius", "5px")
            .text("Only with the key that we used to encrypt the message, we can decrypt it! Click on the lock to decrypt")
            .attr('hidden', 'true')
        
        d3.select('#third_col3').append("div")
            .attr('id', 'text4')
            .style("border", "1px black solid")
            .text("The decrypted message is only visible to the keyholders")
            .attr('hidden', 'true')


        document.onkeypress = this.stopRKey; 
    }
}

module.exports = SymmetricTutorial
