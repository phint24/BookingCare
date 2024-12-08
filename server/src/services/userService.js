import db from '../models/index';
import { raw } from 'body-parser';
import user from '../models/user';
import { hashUserPassword } from './CRUDService';
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

export { handleUserLogin };
