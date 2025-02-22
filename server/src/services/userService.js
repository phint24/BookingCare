import db from '../models/index';
import { raw } from 'body-parser';
import user from '../models/user';
import { createUser, hashUserPassword, updateUser } from './CRUDService';
import bcrypt from 'bcryptjs';
const checkUserEmailExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

// const comeparePassword = (password, hashUserPassword) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await db.User.findOne({
//                 where: { email: email }
//             })
//             if (user) {
//                 const inputPassword = await hashUserPassword(password);
//                 bcrypt.compare(inputPassword, user.password);
//             } else {
//                 resolve({
//                     errCode: 2,
//                     message: "User does not exist"
//                 })
//             }

//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await checkUserEmailExist(email);
            const userData = {};
            if (isExist) {

                const user = await db.User.findOne({
                    attributes: ['email', 'password', 'userName', 'roleId'],
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    const check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = "Login successful";
                        delete user.password;
                        userData.user = user;
                        resolve(userData)
                    } else {
                        userData.errCode = 4;
                        userData.message = "Wrong password";
                        resolve(userData)
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = "User does not exist";
                    resolve(userData)
                }
            } else {
                userData.errCode = 2;
                userData.message = "User does not exist";
                resolve(userData)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleUserSignUp = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const create = await createUser(user);
            if (create) {
                resolve({
                    errCode: 0,
                    message: "Sign up successful!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Sign up failed!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const handleGetAllDoctors = () => {
    return db.User.findAll({
        where: { roleId: 'R2' },
        attributes: ['userId', 'email', 'password', 'userName', 'roleId']
    });
}

const handleUpdateDoctor = (data) => {
    console.log("receive req edit at server", data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId) {
                resolve({
                    errCode: 1,
                    message: "Missing userId parameter!"
                });
            };
            console.log("check data in function: ", data)
            const updateDoctor = await updateUser(data);
            // const user = await db.User.findOne({
            //     where: { userId: data.userId }
            // });

            // if (user) {
            //     user.userName = data.userName;
            //     user.email = data.email;
            //     user.phoneNumber = data.phoneNumber;
            //     user.address = data.address;
            //     user.gender = data.gender;

            //     await user.save();

            //     const allUsers = await db.User.findAll({
            //         raw: true
            //     });
            if (updateDoctor) {
                resolve({
                    errCode: 0,
                    message: "Update successful!",
                    data: allUsers
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "User not found!",
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

const handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newUser = await createUser(data);
            if (newUser) {
                console.log("Ok");
                resolve({
                    errCode: 0,
                    message: "Create successful!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Create failed!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCodeServices = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: "Missing input parameter!"
                })
            } else {
                let res = {};
                let allCode = await db.AllCode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }

        } catch (e) {
            reject(e);
        }
    })
}

export { handleUserLogin, handleUserSignUp, handleGetAllDoctors, handleUpdateDoctor, handleCreateNewUser, getAllCodeServices };
