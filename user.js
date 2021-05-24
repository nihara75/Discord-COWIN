const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({

    tag: {
        type: String,
        required: true,
        unique: true
    },
    state_id: {
        type: String,
        required: true
    },
    subscribe: {
        type: Boolean,
        default: false
    },
    district_id: {
        type: String,
        //required: true
    },
   age : {
        type: Number,
        //required: true,
        // unique: true
    },
    

});

mongoose.model('User', UserSchema);