const { ValidationError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})
        }
        const message = `Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instant.`
        res.status(500).json({message, data: error})
      })
  })
}