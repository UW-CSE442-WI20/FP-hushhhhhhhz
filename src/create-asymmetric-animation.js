const d3 = require('d3')
const Crypto = require('./crypto')
const lock = require('./images/lock.png')
const unlock = require('./images/unlock.png')
const locked_key = require('./images/locked_key.png')
const key = require('./images/white_key.png')
const key2 = require('./images/dark_key.png')

class AsymmetricAnimation {
	constructor() {
		this.handleEncrypt = this.handleEncrypt.bind(this)
		this.handleDecrypt = this.handleDecrypt.bind(this)
		this.handleNewMessage = this.handleNewMessage.bind(this)
		this.handleAttacker = this.handleAttacker.bind(this)
		this.handlePublicKeyDecrypt = this.handlePublicKeyDecrypt.bind(this)
	}

	handleEncrypt(){
		d3.event.preventDefault();
		let message = document.getElementById("message").value
		this.cryptoInstance = new Crypto('secret')
		this.encryption = this.cryptoInstance.encrypt(message)
		d3.select('#encryption_display').transition().text(this.encryption.ciphertext)
		d3.select('#decryption_display').transition().text(this.encryption.ciphertext)
		d3.select("#lock").attr('hidden', null)
		d3.select("#adversary_key").attr('hidden', null)
		d3.select("#shape3").attr('hidden', null)
		d3.select("#encryption_display").attr('hidden', null)    
		d3.select("#decryption_display").attr('hidden', null)   
		d3.select("#text2").attr('hidden', null) 
		d3.select("#text4").attr('hidden', "true")
		d3.select("#text3").attr('hidden', null)      

	}

	handleDecrypt() {
		let decryption = this.cryptoInstance.decrypt(this.encryption.encrypted_data)
		d3.select('#decryption_display').attr('hidden', null).transition().text(decryption)
		d3.select("#lock_decrypt").attr('src', unlock)
		d3.select("#text3").attr('hidden', "true")
		d3.select("#text4").attr('hidden', null)
	}

	handleNewMessage() {
		d3.event.preventDefault();
		d3.select("#lock_decrypt").attr("src", lock)
		d3.select("#lock").attr('hidden', 'true')
		d3.select("#adversary_key").attr('hidden', 'true')
		d3.select("#shape3").attr('hidden', 'true')
		d3.select("#encryption_display").attr('hidden', 'true')
		d3.select("#decryption_display").attr('hidden', 'true')
		d3.select("#text2").attr('hidden', "true").transition().text("This is the encrypted message, visible to everyone") 
		d3.select("#text3").attr('hidden', "true").transition().text('Only the private key can be used to decrypt the message. Try both keys to test.')
		d3.select("#text4").attr('hidden', "true")
	}

	handleAttacker() {
		d3.select("#text2").transition().text("he he he! This key won't work!")
	}

	handlePublicKeyDecrypt() {
		d3.select("#text3").transition().text("You cannot used the public key to decrypt in Asymmetric Key Cryptography")
	}

	stopRKey(evt) {
		var evt = (evt) ? evt : ((event) ? event : null);
		var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
		if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
	}

	start() {
		d3.selectAll('.fullVis').style("background-color", "transparent").html("")
		d3.selectAll('.halfVis').style("background-color", "transparent").html("")

		d3.selectAll("#vis div").style("font-weight", "normal")
		d3.select("#content6").style("font-weight", "bold")

		this.vis = d3.select('#title10 .halfVis')

		this.vis.append('div')
			.attr('class', "bootstrap-iso")
			.append('div')
			.attr('id', 'randomdiv')
			.attr('class', 'container')

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
		// col-sm-4 col-md-4 col-lg-4
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
			.attr('style', "resize: none;")
			.attr('type','text')
			.attr('id', 'message')
			.attr('placeholder','Message to be sent')
			.on('input', this.handleNewMessage)

		d3.select('#second_col1').append("div")
			.attr('id', 'shape1')
			.attr('class', 'row')

		d3.select("#shape1").append('div')
			.attr('class', 'col-sm-2 col-md-2 col-lg-2')

		d3.select("#shape1").append('img')
			.attr('id', 'unlocked_key')
			.attr('class', 'col-sm-4 col-md-4 col-lg-4')
			.attr("src", key2)
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
			.text("Try typing in a message")


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
			.attr('class', 'col-sm-2 col-md-2 col-lg-2')

		d3.select("#shape2").append('img')
			.attr('id', 'lock')
			.attr('class', 'col-sm-4 col-md-4 col-lg-4')
			.attr("src", lock)
			.attr('hidden', 'true')

		d3.select("#shape2").append('img')
			.attr('id', 'adversary_key')
			.attr("src", key2)
			.attr('class', 'col-sm-4 col-md-4 col-lg-4')
			.attr('hidden', 'true')
			.on('click', this.handleAttacker)

		d3.select("#shape2").append('div')
			.attr('class', 'col-sm-2 col-md-2 col-lg-2')

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
			.attr('hidden', 'true')
			.attr('class', 'row')

		d3.select("#shape3").append('img')
			.attr('id', 'lock_decrypt')
			.attr("src", lock)
			.attr('class', 'col-sm-4 col-md-4 col-lg-4')

		d3.select("#shape3").append('img')
			.attr('id', 'public_key_decrypt')
			.attr("src", key2)
			.attr('class', 'col-sm-4 col-md-4 col-lg-4')
			.on('click', this.handlePublicKeyDecrypt)

		d3.select("#shape3").append('img')
			.attr('id', 'decrypt_button')
			.attr("src", key)
			.on('click', this.handleDecrypt)
			.attr('class', 'col-sm-4 col-md-4 col-lg-4')

		d3.select('#third_col3').append("div")
			.attr('id', 'text3')
			.style("border", "1px black solid")
			.style("border-radius", "5px")
			.text("Only the private key can be used to decrypt the message. Try both keys to test.")
			.attr('hidden', 'true')

		d3.select('#third_col3').append("div")
			.attr('id', 'text4')
			.style("border", "1px black solid")
			.style("border-radius", "5px")
			.text("The decrypted message is only visible to the keyholders")
			.attr('hidden', 'true')


		document.onkeypress = this.stopRKey; 
	}
}

module.exports = AsymmetricAnimation
