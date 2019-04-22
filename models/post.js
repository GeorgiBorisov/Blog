const db = require('../db/database')

module.exports = class Post {
    constructor (title, image, body){
        this.title = title
        this.image = image
        this.body = body
    }

    create(){
        return db.execute('INSERT INTO posts (title, image, body) VALUES (?, ?, ?)',
        [this.title, this.image, this.body])
    }

    static featured(){
        return db.execute('SELECT id, title, body FROM posts ORDER BY created DESC LIMIT 3')
    }

    static getAll(){
        return db.execute('SELECT * FROM posts ORDER BY created DESC LIMIT 10')
    }

    static getSingle(id){
        return db.execute('SELECT id, title, image, body, created FROM posts WHERE id = ?', [id])
    }

    static deleteSingle(id){
        return db.execute('DELETE FROM posts WHERE id = ?', [id])
    }

    static edit(id, title, image, body){
        return db.execute('UPDATE posts SET title = ?, image = ?, body = ? WHERE id = ?',
        [title, image, body, id])
    }
}