import bcrypt from 'bcryptjs'


const users = [{

    name: 'Rahul Chauhan',
    email: 'rahul.ion12@gmail.com',
    avatar: 'https://avatars.dicebear.com/api/male/rahul.svg',
    password: bcrypt.hashSync('chauhan123', 10),

}, {

    name: 'Animesh Biswas',
    email: 'anime@gmail.com',
    avatar: 'https://avatars.dicebear.com/api/male/anime.svg',
    password: bcrypt.hashSync('anime123', 10),

}, {

    name: 'Admin User',
    email: 'admin@gmail.com',
    avatar: 'https://avatars.dicebear.com/api/male/admin.svg',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true

}]


export default users