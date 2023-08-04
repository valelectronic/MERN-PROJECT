const express = require('express')

const router = express.Router()

const {getGoals, setGoals,updateGoals,deleteGoals} = require('../controller/controller')

const {protect} = require('../middleware/authMiddleWare')

router.get('/',protect, getGoals)

router.post('/',protect, setGoals)

router.put('/:id', protect,updateGoals)

router.delete('/:id',protect, deleteGoals)

module.exports = router