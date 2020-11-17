// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/rList.js')
// 定義首頁路由

router.get('/sort/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  const typeObj = { name: '店名', category: '類型', rating: '評分' }
  const methodObj = { asc: '正序', desc: '反序', descending: '由高至低', ascending: '由低至高' }

  Restaurant.find()
    .lean()
    .sort({ [type]: [method] })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

module.exports = router