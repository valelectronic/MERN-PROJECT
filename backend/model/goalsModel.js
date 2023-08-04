const mongoose = require('mongoose')


const goalSchema = mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    Text:{
        type:String,
        require: [true, 'please add a text value']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)