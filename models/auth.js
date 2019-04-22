const crypto = require('crypto')
const db = require('../db/database')
const config = require('../config')

module.exports = class Auth {
    constructor (username, password, email) {
        this.username = username
        this.password = password
        this.email = email
    }

    create(){
        let encryptedPass = encrypt(this.password)
        let validEmail = validateEmail(this.email)
        let validUser = config.userRegex.test(this.username) ? this.username : false
        if (encryptedPass && validEmail && validUser) {
            return db.execute
                ('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
                [this.username, encryptedPass, this.email])
        }
    }

    static log(user, pass) {
        let encryptedPass = encrypt(pass)
        let validUser = config.userRegex.test(user) ? user : false
        if(encryptedPass && validUser) {
            return db.execute
                ('SELECT username FROM users WHERE username = ? AND password = ?',
                [validUser, encryptedPass])
        }
    }

    static checkName(user){
        let validUser = config.userRegex.test(user) ? user : false
        if (validUser) {
            return db.execute('SELECT username FROM users WHERE username = ?', [user])
        }
    }

    static userInfo(user) {
        return db.execute('SELECT username, email FROM users WHERE username = ?', [user])
    }

    static verify(pass) {
        let encryptedPass = encrypt(pass)
        if(encryptedPass){
            return db.execute('SELECT password FROM users WHERE password = ?', [encryptedPass])
        }
    }

    static update(userInfo) {
        let encryptedPass = encrypt(userInfo.pass)
        let validUser = config.userRegex.test(userInfo.username) ? userInfo.username : false
        let validEmail = validateEmail(userInfo.email)
        if(encryptedPass && validUser && validEmail) {
            return db.execute('UPDATE users SET username=?, password=?, email=? WHERE password=?',
            [validUser, encryptedPass, validEmail, userInfo.oldpass])
        }
    }
}

const encrypt = plainText => {
    if (typeof(plainText) == 'string' && config.passRegex.test(plainText) ) {
        let hashedPass = crypto
            .createHmac('sha256', config.hashSecret)
            .update(plainText)
            .digest('hex')
        return hashedPass    
    } else {
        return false 
    }
}

const validateEmail = email => {
    email = email.toLowerCase()
    if (config.mailRegex.test(email)){
        return email
    } else {
        return false
    }
}