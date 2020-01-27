const express = require('express')
const routes = express.Router()
const Share = require('./models/Share')


routes.get('/', (req, res) => {
  res.render('home/index')
})

routes.get('/shares/new', (req, res) => {
  Share.create({})
    .then((share) => {
      share.save()
      return res.redirect(`/shares/${share._id}`)
    })
    .catch((error) => {
      return res.send(error)
    })
})

routes.get('/shares/:id', (req, res) => {
  Share.findById(req.params.id)
    .then((share) => {
      return res.render('shares/new', {share: share})
    })
    .catch((error) => {
      return res.render('errors/404')
    })
})

routes.get('/shares', (req, res) => {
  Share.find(req.params.id)
    .then((shares) => {
      return res.render('shares/index', {shares})
    })
    .catch((error) => {
      return res.send(error)
    })
})

routes.get('/auth/signup', (req, res) => {
  res.render('auth/index')
})

module.exports = routes