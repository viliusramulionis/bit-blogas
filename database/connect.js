import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import Posts from '../model/posts.js'
import Users from '../model/users.js'
import Comments from '../model/comments.js'

const database = {} 
const credentials = {
    host: 'pauliuspetrunin.lt',
    user: 'bit',
    password: 'w0JipRCKkzdpzpgQ',
    database: 'blog'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { 
        dialect: 'mysql',
        host: credentials.host
    })

    database.Posts = Posts(sequelize)
    database.Users = Users(sequelize)
    database.Comments = Comments(sequelize)

    database.Users.hasMany(database.Posts, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    database.Posts.belongsTo(database.Users)
    database.Posts.hasMany(database.Comments)
    database.Comments.belongsTo(database.Users)

    await sequelize.sync({ alter: true })
} catch(error) {
    console.log(error)
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database