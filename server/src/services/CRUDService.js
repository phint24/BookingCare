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

// const getAllUser = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const users = await db.User.findAll({
//                 attributes: ['email', 'password', 'userName', 'phoneNumber', 'address', 'gender', 'roleId'],
//                 raw: true
//             });

//             if (users) {
//                 users.errCode = 0;
//                 users.message = "Fetch all users succeed!";
//                 delete users.password;
//             }

//             const processedUsers = users.map(users => ({
//                 ...users,
//                 gender: user.gender === true ? "Nữ" : "Nam"
//             }))

//             resolve(processedUsers);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                attributes: ['userId', 'email', 'password', 'userName', 'phoneNumber', 'address', 'gender', 'roleId'],
                raw: true
            });

            if (users) {
                const processedUsers = users.map(user => ({
                    ...user,
                    gender: user.gender === true ? "Nữ" : "Nam",
                }));
                const result = processedUsers.map(user => {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                });

                resolve({
                    errCode: 0,
                    message: "Fetch all users succeed!",
                    data: result
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "No users found!",
                    data: []
                });
            }
        } catch (e) {
            reject({
                errCode: -1,
                message: "Error fetching users",
                error: e.message
            });
        }
    });
};


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
    console.log("check id: ", data.data.userId)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.data.userId) {
                console.log("User not found!")
            };

            const user = await db.User.findOne({
                where: { userId: data.data.userId }
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
                user.userName = data.data.userName;
                user.email = data.data.email;
                user.phoneNumber = data.data.phoneNumber;
                user.address = data.data.address;
                user.gender = data.data.gender;

                await user.save();
                console.log("new data", user)
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
    console.log('check id at CRUDservice: ', id);
    return new Promise(async (resolve, reject) => {
        try {
            const getUser = await db.User.findOne({ where: { userId: id } });
            if (getUser) {
                await getUser.destroy();
                resolve({
                    errCode: 0,
                    message: "Delete user succeed!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "User not found!"
                })
            }

        } catch (e) {
            reject({
                errCode: -1,
                message: "Error deleting user",
                error: e.message
            });
        }
    })
}

export { createUser, hashUserPassword, getAllUser, getUserById, updateUser, deleteUser }