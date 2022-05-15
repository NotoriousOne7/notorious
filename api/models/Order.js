const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String},
        products: [
            {
                productId: {
                    type: String,
                },
                size:{type: Array},
                color:{type: Array},
                quantity: {
                    type: Number,
                    default: 1,
                },
            },  
        ],
        total: {type: Number, required: true},
        customerName: {type: String, required:true},
        phoneNumber: {type: String , required:true},
        address: {type: Object, required: true},
        status: {type: String, default:"pending"},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);