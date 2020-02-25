var CryptoJS = require('crypto-js')

class Crypto {
    constructor(secret) {
        this.secret = secret
    }

    encrypt(data) {
        let encrypted = CryptoJS.AES.encrypt(data, this.secret)
        return {
            encrypted_data: encrypted,
            ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64)
        }
    }

    decrypt(cipher) {
        return CryptoJS.AES.decrypt(cipher, this.secret).toString(CryptoJS.enc.Utf8)
    }
}

module.exports = Crypto
