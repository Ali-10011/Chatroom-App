const mongoose = require('mongoose'); //we are going to create a model for mongoDB database storage/retrieval
const Schema = mongoose.Schema; //property of mongoose


const ChatSchema = new Schema ({
    username: {  //we store it in JSON form
        type: String,
        required: true,
    },
    password: {
        type: String, 
        require: true,
    },
    message : {
        type: String, 
        required: true,
    },
}, { timestamps: true });

const ChatData = mongoose.model('ChatData', ChatSchema); //we are exporting the object linked wiwth MongoDB
module.exports = ChatData;