const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

async function execute(db) {
    // Criando as tabelas do banco de dados.
    await db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)

    return db // <- Retorna a conexão do banco para os outros arquivos poderem usar
}

module.exports = open({
    filename: __dirname + '/database.sqlite',
    driver: sqlite3.Database
}).then(execute)
