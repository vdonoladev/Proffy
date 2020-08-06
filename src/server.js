// Dados
const proffys = [
	{ 
		name: "Diego Fernandes", 
		avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
		whatsapp: "32988756594", 
		bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
		subject: "Química", 
		cost: "20", 
		weekday: [0], 
		time_from: [720], 
		time_to: [1220]
	},
	{ 
		name: "Daniele Evangelista", 
		avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
		whatsapp: "32988756594", 
		bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
		subject: "Química", 
		cost: "20", 
		weekday: [1], 
		time_from: [720], 
		time_to: [1220]
	},
	{ 
		name: "Mayk Brito", 
		avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
		whatsapp: "32988756594", 
		bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
		subject: "Química", 
		cost: "20", 
		weekday: [1], 
		time_from: [720], 
		time_to: [1220]
	}
]

const subjects = [
	"Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
]

// Funcionalidades

function getSubject(subjectNumber) {
	const position = +subjectNumber - 1
	return subjects[position]
}

function pageLanding(req, res) {
	return res.render("index.html")
}

function pageStudy(req, res) {
	const filters = req.query
	return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res) {
	const data = req.query
	
	// se tiver data (dados)
	const isNotEmpty = Object.keys(data).length > 0
	if (isNotEmpty) {

		data.subject = getSubject(data.subject)

		// adicionar data (dados) a lista de proffys
		proffys.push(data)

		return res.redirect("/study")
	}
	
	// se não, mostrar a página
	return res.render("give-classes.html", {subjects, weekdays})
}

// Servidor
const express = require('express')
const server = express()

// configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
	express: server, 
	noCache: true,
})

// Início e configuração do servidor
server
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// start do servidor
.listen(5500)