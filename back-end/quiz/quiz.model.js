const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String },//, required: true },
    icon: { type: String },// required: true },
    numSuccess: { type: Number }//, required: true },
});

itemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});
itemSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});

module.exports = mongoose.model('Item', itemSchema);

const quizSchema = new Schema({
    name: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    hash: { type: String, required: true },
    items: { type: [itemSchema], default: [{ name: 'default name', icon: 'default icon', numSuccess: 0 }]},
    createdDate: { type: Date, default: Date.now }
});

quizSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});
quizSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});

module.exports = mongoose.model('Quiz', quizSchema);

