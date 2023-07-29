import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    color: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    index: {
        type: Number
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;