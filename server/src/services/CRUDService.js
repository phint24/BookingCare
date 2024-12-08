import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import user from '../models/user';
const salt = bcrypt.genSaltSync(10);

const createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                userName: data.userName,
                email: data.email,
                password: hashPasswordBcrypt,
                phoneNumber: data.phoneNumber,
                address: data.address,
                gender: data.gender === '1',
                roleId: data.roleId
            })

            resolve('create succeed!');
        } catch (e) {
            reject(e);
        }
    })
}


const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    });
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                raw: true
            });

            const processedUsers = users.map(users => ({
                ...users,
                gender: user.gender === true ? "Nữ" : "Nam"
            }))

            resolve(processedUsers);
        } catch (e) {
            reject(e);
        }
    })
}

const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { userId: id },
                raw: true
            });
            if (user) {
                resolve(user);
            } else {
                resolve("No data");
            }

        } catch (e) {
            reject(e);
        }
    })
}

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId) {
                console.log("User not found!")
            };

            const user = await db.User.findOne({
                where: { userId: data.userId }
            });

            if (user) {
                // await db.User.update({
                //     userName: data.userName,
                //     email: data.email,
                //     phoneNumber: data.phoneNumber,
                //     address: data.address,
                //     gender: data.gender === '1',
                // }, {
                //     where: { userId: data.userId }
                // });
                user.userName = data.userName;
                user.email = data.email;
                user.phoneNumber = data.phoneNumber;
                user.address = data.address;
                user.gender = data.gender;

                await user.save();

                const allUsers = await db.User.findAll({
                    raw: true
                });

                resolve(allUsers);
            } else {
                resolve('Can not update new information!');
            }

        } catch (e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getUser = await db.User.findOne({ where: { userId: id } });
            if (getUser) {
                await getUser.destroy();
            } else {
                resolve("User not found!")
            }

        } catch (e) {
            reject(e);
        }
    })
}

export { createUser, hashUserPassword, getAllUser, getUserById, updateUser, deleteUser }