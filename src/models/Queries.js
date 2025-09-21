const db = require('../database/db')
const bcrypt = require('bcrypt')
// CRUD queries are written below

// create table
async function createUsersTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(  
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `;
    //table name is 'users'
    try {
        await db.query(createTableQuery)

        console.log('users table created successfully');
    } catch (e) {
        console.error('Error while creating table', e);
    }
}


// insert data
async function insertUser(username, email, password) {
    const insertUserQuery = `
    INSERT INTO users(username,email,password)
    VALUES($1, $2, $3)
    RETURNING *
    `
    try {
        const result = await db.query(insertUserQuery, [username, email, password]);
        console.log('User inserted successfully', result.rows[0]);
    } catch (e) {
        console.log(e);
    }
}

// read user detail
async function fetchAllUsers() {
    //this is a query string
    const getAllUsersFromUsersTable = `
    SELECT * FROM users
    `
    try {
        const result = await db.query(getAllUsersFromUsersTable);
        console.log('fetched all users');
        
    } catch (e) {
        console.error('Error while creating table', e);
    }
}

async function updateUserInfo(username, newEmail) {
    const updateUserQuery = `
    UPDATE users
    SET email = $2
    WHERE username = $1
    RETURNING *
    `
    try {
        const res = await db.query(updateUserQuery, [username, newEmail]);

        if (res.rows.length > 0) {
            console.log('User updated successfully!', res.rows[0]);
            return res.rows[0];
        }
        else {
            console.log('No User is found with this username');
            return null
        }

    } catch (e) {
        console.error('Error while creating table', e);
    }

}

async function fetchUserByUsername(username) {
    const fetchUserByUsernameQuery = `
    SELECT *
    FROM users
    WHERE username = $1;
    `
    try {
        const result = await db.query(fetchUserByUsernameQuery, [username]);
        return result.rows[0];
    } catch (e) {
        console.log(e);
    }
}

async function fetchUserById(userId) { 
    const fetchUserByIdQuery = `
    SELECT *
    FROM users
    WHERE userId = $1;
    `
    try {
        const result = await db.query(fetchUserByIdQuery, [userId])
        return res.rows[0];

    } catch (e) {
        console.log(e);
    }
}


// delete user data
async function deleteInfo(username) {
    const deleteQuery = `
    DELETE FROM users
    WHERE username = $1
    RETURNING *
    `
    try {
        const res = await db.query(deleteQuery, [username]);
        if (res.rows.length > 0) {
            console.log('User deleted successfully', res.rows);
            return res.rows[0];
        }
        else {
            console.log('No User is found with this username');
            return null
        }

    } catch (e) {
        console.error('Error while creating table', e);
    }

}

module.exports = { createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo, fetchUserByUsername, fetchUserById}