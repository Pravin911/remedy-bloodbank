const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['donar', 'hospital', 'organisation'],
        required: true
    },
    // is required when userType is donar or admin
    name: {
        type: String,
        required: function() {
            if(this.userType === 'admin' || this.userType === 'donar') {
                return true
            }
            return false
        }
    },
    // is required when userType is hospitalName
    hospitalName: {
        type: String,
        required: function() {
            if(this.userType === 'hospital') {
                return true
            }
            return false
        }
    },
    // is required when userType is organisation
    organisationName: {
        type: String,
        required: function() {
            if(this.userType === 'organisation') {
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: function() {
            if(this.userType === 'organisation' || this.userType === 'hospital') {
                return true
            }
            return false
        }
    },
    address: {
        type: String,
        required: function() {
            if(this.userType === 'organisation' || this.userType === 'hospital') {
                return true
            }
            return false
        }
    }
});

module.exports = mongoose.model('users', userSchema);