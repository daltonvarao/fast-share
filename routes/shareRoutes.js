const routes = require('express').Router()
const Share = require('../models/Share')
const genRandomId = require('../utils/randomId')


routes.get('/new', async (req, res) => {
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
      return res.send('errors/404', {error})
    })
})

routes.get('/:urlID', (req, res) => {
  Share.findOne({urlID: req.params.urlID})
    .then(share => {
      return res.render('shares/new', {share: share})
    })
    .catch(error => {
      return res.render('errors/404', {error})
    })
})


routes.delete('/:id', async (req, res) => {
  Share.findByIdAndDelete(req.params.id)
    .then(share => {
      return res.json({success: true, message: 'Share deleted'})
    })
    .catch(error => {
      return res.json({success: false, message: error})
    })
})

module.exports = routes
