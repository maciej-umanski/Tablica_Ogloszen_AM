const knex = require('knex')(require('../config/knexfile'))

module.exports.getUsers = () => {
    return knex.select('*').from('users')
}

module.exports.createUser = (data) => {
    return knex('users').insert([
        data
    ])
}

module.exports.updateUser = (data) => {
    return knex('users').update(data).where('id', data.id)
}

module.exports.deleteUser = (id) => {
    return knex('users').where('id', id).del()
}