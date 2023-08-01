const express = require('express')

const router = express.Router()

const {getGoals, setGoals,updateGoals,deleteGoals} = require('../controller/controller')


router.get('/', getGoals)

router.post('/',setGoals)

router.put('/:id',updateGoals)

router.delete('/:id', deleteGoals)

module.exports = router