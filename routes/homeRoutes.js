const routes = require('express').Router()
const Share = require('../models/Share')

routes.get('/', (req, res) => {
  res.render('home/index')
})

routes.get('/:urlID', (req, res) => {
  if (req.params.urlID == 'shares') {
    Share.find()
      .then(shares => {
        return res.render('shares/index', {shares})
      })
      .catch(error => {
        return res.send('errors/404', {error})
      })
  } else {
    return res.redirect(`/shares/${req.params.urlID}`)
  }
})

module.exports = routes