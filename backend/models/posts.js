const knex = require('knex')(require('../config/knexfile'))


module.exports.getPosts = () => {
    return knex.select('*').from('posts')
}

module.exports.createPost = (data) => {
    return knex('posts').insert([
        data
    ])
}

module.exports.updatePost = (data) => {
    return knex('posts').update(data).where('id', data.id)
}

module.exports.deletePost = (id) => {
    return knex('posts').where('id', id).del()
}