const mongoose = require('mongoose')

const profitsSchema = new mongoose.Schema({
    user_id: String,
    total_profits: Number,
    today_date: String,
    today_profit: Number,
})
module.exports = mongoose.model("UserProfits", profitsSchema)