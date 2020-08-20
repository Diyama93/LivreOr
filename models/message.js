let connection = require('../config/db')
let moment = require('../config/moment')

class Message {
    //créer un constructeur qui prend un enrégistrement
    constructor (row) {
        this.row = row
    }
    //créer des getter pour récupérer les info
    get id() {
        return this.row.id
    }
    get content() {
        return this.row.content
    }
    get created_at() {
        return moment(this.row.created_at)
    }


    static create (content, cb) {
        //connexion à la bd et sauvé l'enré        
        connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], (err, result) =>{
            if (err) throw err
            cb(result)
        })
    }

    static all (cb){
        connection.query('SELECT * FROM messages', (err, rows) => {
            if (err) throw err
            //renvoie un nouveau message construit à partir de la ligne sélectionné
            cb(rows.map((row) => new Message(row)))
        } )
    }
    static find (id, cb){
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            //je veut que tu renvoie le premier enrégistrement sous forme de message
            cb(new Message(rows[0]))
        } )
    }
}

module.exports = Message