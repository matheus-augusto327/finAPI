const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const custumers = []

app.post("/account", (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = custumers.some(
    (custumer) => custumer.cpf === cpf
  )

  if(customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' })
  }

  custumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).send()
})

app.listen(3333)