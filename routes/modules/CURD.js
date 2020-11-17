// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/rList.js')
// 定義首頁路由

// show page requesting
router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurants => {
      res.render('show', { restaurants })
    })
    .catch(error => console.log(error))
})

// searching requesting
router.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then(restaurants => {
      // exception
      if (!restaurants.length) {
        keyword = `你的收藏沒有"${keyword}"的相關項目唷！`
      }
      // do the searching
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

// to create page requesting
router.get('/new', (req, res) => {
  res.render('new')
})

// create requesting
router.post('/add', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const description = req.body.description
  Restaurant.create({
    name,
    category,
    location,
    google_map,
    phone,
    rating,
    image,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete requesting
router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// to edit page requesting
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit requesting
router.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
module.exports = router