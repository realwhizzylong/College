import bcrypt from 'bcryptjs';

const users = [
    {
        username: 'Whizzy Long',
        email: 'whizzy@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true

    },
    {
        username: 'Kobe Bryant',
        email: 'kobe@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        username: 'Stephen Curry',
        email: 'steph@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;