import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        content: {
            type: DataTypes.TEXT //= TEXT
        },
        image: {
            type: DataTypes.STRING //=VARCHAR(255)
        }
    }

    return sequelize.define('posts', Schema)
}

export default Posts