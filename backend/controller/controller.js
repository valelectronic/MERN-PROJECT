const asyncHandler = require('express-async-handler')

// @desc get goals
// @route Get/api/goals
// @access private
const getGoals =asyncHandler (async(req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please a text field')
    }
    res.status(200).json({message: "get goals"})
})

// @desc get goals
// @route Post/api/goals
// @access private
const setGoals =asyncHandler( async(req, res)=>{
    res.status(200).json({message: "set goals"})
})
// @desc get goals
// @route put/api/goals/:id
// @access private
const updateGoals =asyncHandler(async(req, res)=>{
    res.status(200).json({message: `update goals ${req.params.id}`})
    
})
// @desc get goals
// @route delete/api/goals/:id
// @access private
const deleteGoals =asyncHandler(async(req, res)=>{
    res.status(200).json({message: `delete goals ${req.params.id}`})
}
)
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}