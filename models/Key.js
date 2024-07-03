import mongoose from 'mongoose'
const Schema = mongoose.Schema


const keySchema = Schema({
    name:{
        type: String,
    }
})

const key = mongoose.model('keys', keySchema)

export default key
