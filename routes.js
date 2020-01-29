const express = require('express')
const routes = express.Router()
const Share = require('./models/Share')
const genRandomId = require('./utils/randomId')



routes.get('/', (req, res) => {
  res.render('home/index')
})

routes.get('/shares/new', async (req, res) => {
  let urlID = genRandomId()
  let share = await Share.findOne({ urlID })

  if(share) {
    return res.redirect('/shares/new')
  }

  Share.create({ urlID })
    .then((share) => {
      share.save()
      return res.redirect(`/shares/${share.urlID}`)
    })
    .catch((error) => {
      return res.send(error)
    })
})

routes.get('/shares/:urlID', (req, res) => {
  Share.findOne({urlID: req.params.urlID})
    .then((share) => {
      return res.render('shares/new', {share: share})
    })
    .catch((error) => {
      return res.render('errors/404')
    })
})

routes.get('/shares', (req, res) => {
  Share.find()
    .then((shares) => {
      return res.render('shares/index', {shares})
    })
    .catch((error) => {
      return res.send(error)
    })
})

routes.delete('/shares/:id', async (req, res) => {
  Share.findByIdAndDelete(req.params.id)
    .then(share => {
      return res.json({success: true, message: 'Share deleted'})
    })
    .catch(error => {
      return res.json({success: false, message: error})
    })
})

routes.get('/auth/signup', (req, res) => {
  res.render('auth/index')
})

module.exports = routes