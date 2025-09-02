// Importar o express
const express = require('express')

// criar uma instancia no seu backend com o express
const app = express()

//intermedíario (Middleawers)
// Hello World


app.get("/")



//



//executar a aplicaçãoa porta que ele vai escutar
app.listen(3000, ()  =>{
    console.log("Minha aplicação estárodando em http://localhost:3000")
})