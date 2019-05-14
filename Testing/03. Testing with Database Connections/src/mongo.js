'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catColors = [
    'brown',
    'orange',
    'white',
    'black',
    'tan'
];

class CatDAO {
    static initialize (mongoURI) {
        const connection = mongoose.createConnection(mongoURI, { useNewUrlParser: true });

        const catSchema = new Schema({
            name: {
                type: String,
                required: true,
                validate: v => v.length > 2
            },
            color: {
                type: String,
                required: true,
                validate: v => catColors.includes(v.toLowerCase()),
                lowercase: true
            },
            age: {
                type: Number,
                required: true,
                validate: v => v > -1
            },
            created: { type: Date, required: true, default: Date.now }
        }, {
            toJSON: {
                transform: (doc, ret) => {
                    ret.id = ret._id.toString();
                    ret.human_age = ret.age * 7;

                    delete ret._id;
                    delete ret.__v;

                    return ret;
                }
            }
        });

        return connection.model('Cat', catSchema);
    }

    static async createCat (catModel, catData) {
        const cat = await catModel.create(catData);

        return cat.toJSON();
    }

    static async getAllCats (catModel) {
        const cats = await catModel.find({});

        return cats.map(c => c.toJSON());
    }

    static async getCatById (catModel, catID) {
        const cat = await catModel.findOne({ _id: catID });

        if (cat === null) {
            throw new Error('No cat with that id');
        }

        return cat.toJSON();
    }

    static async removeCatById (catModel, catId) {
        await catModel.remove({ _id: catId });
    }
}

module.exports = CatDAO;
