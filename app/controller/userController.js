const mongoose = require('mongoose');

let response = require('./../handlers/responseHandler');
let validate = require('./../handlers/paramValidator');
let pwdLib = require('./../handlers/passwordHandler');

let UserModel = mongoose.model('User');

let loginController = (req, res) => {

    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email || req.body.mobile) {
                UserModel.find({
                    $or: [
                        { 'mobile': req.body.mobile },
                        { 'email': req.body.email }
                    ]
                }, { _id: 0, __v: 0 })
                    .exec((err, userDetails) => {
                        if (err) {
                            reject(response.generate(true, 'unable to retrieve the user details', 400, null))
                        } else if (validate.isEmpty(userDetails)) {
                            reject(response.generate(true, 'Invalid User Details', 400, null));
                        } else {
                            resolve(userDetails);
                        }
                    })
            } else {
                reject(response.generate(true, 'email/ mobile parameter missing', 400, null));
            }
        })
    }

    let validatePassword = (userDetails) => {

        return new Promise((resolve, reject) => {
            pwdLib.comparePwd(req.body.password, userDetails[0].password, (err, isMatch) => {
                if (err) {
                    reject(response.generate(true, 'Login Failed', 400, null));
                } else if (isMatch) {
                    let userObj = userDetails[0].toObject();
                    delete userObj.password;
                    resolve(response.generate(false, 'User Logged in Successfully :)', 200, userObj));
                } else {
                    reject(response.generate(true, 'Invalid Password', 400, null))
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err);
        })

}

let registerUserCtrl = (req, res) => {

    let createUser = (req, res) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] })
                .exec((err, retrivedUser) => {
                    if (err) {
                        console.log(err);
                        reject(response.generate(true, 'Unable to create the user', 400, null));
                    } else if (validate.isEmpty(retrivedUser)) {
                        let newUser = new UserModel({
                            name: req.body.name,
                            gender: req.body.gender,
                            mobile: req.body.mobile,
                            email: req.body.email.toLowerCase(),
                            password: pwdLib.hashPwd(req.body.password),
                            designation: req.body.designation
                        });
                        newUser.save((error, newUserRet) => {
                            if (error) {
                                reject(response.generate(true, 'unable to save the user', 400, null))
                            } else if (validate.isEmpty(newUserRet)) {
                                reject(response.generate(true, 'user list is empty', 400, null));
                            } else {
                                let user = newUser.toObject();
                                delete user._id;
                                delete user.__v;
                                resolve(user);
                            }
                        })
                    } else {
                        reject(response.generate(true, 'User with Email/ Mobile Already Exists', 400, null))
                    }
                })
        })
    }

    createUser(req, res)
        .then((resolve) => {
            delete resolve.password
            res.send(response.generate(false, 'User Successfully created', 200, resolve));
        })
        .catch((err) => {
            res.send(err);
        })

}

let fetchData = (req, res) => {

    let filter = (req.body.designation === 'A') ? ['A', 'M', 'S'] : (
        (req.body.designation === 'M') ? ['S'] : []
    )

    let fetchDUserBasedOnDesignation = (req, res) => {
        return new Promise((resolve, reject) => {

            UserModel.find({ designation: { $in: filter } }, { password: 0, _id: 0, __v: 0 })
                .exec((err, msg) => {
                    if (err) {
                        reject(response.generate(true, 'Unable to Fetch the user list', 400, null));
                    } else if (validate.isEmpty(msg)) {
                        reject(response.generate(true, 'user list is empty', 400, null));
                    } else {
                        resolve(response.generate(false, "User List Fetched successfully", 200, msg));
                    }
                })
        })
    }

    fetchDUserBasedOnDesignation(req, res)
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((err) => {
            res.send(err);
        })

}

let deleteUser = (req, res) => {

    let findAndDelUser = (req, res) => {
        return new Promise((resolve, reject) => {
            UserModel.findOneAndDelete({ email: req.body.email })
                .exec((err, result) => {
                    if (err) {
                        reject(response.generate(true, 'Unable to create the user', 400, null));
                    } else if (validate.isEmpty(result)) {
                        reject(response.generate(true, 'Specified User Not Available', 400, null));
                    } else {
                        resolve(response.generate(false, 'User Deleted', 200, null))
                    }
                })
        })
    }

    findAndDelUser(req, res)
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((err) => {
            res.send(err);
        })

}

module.exports = {
    loginController: loginController,
    registerUserCtrl: registerUserCtrl,
    fetchData: fetchData,
    deleteUser: deleteUser
}