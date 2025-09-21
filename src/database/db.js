const {Pool} = require('pg')
require('dotenv').config()


//creating pool connection instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// this is my defined query function which is different from pool.query wala query
async function query(text, params){  
    //text: text is the sql query string
    // params : params is the values passed in sql in where condition it is like a placeholder
    const start=Date.now()

    try{
        // the query is the built in postgres pool function to run sql queries to postgres
        const result = await pool.query(text,params); //iska kaam hai PostgreSQL database ko query bhejna aur result return karna.

        const duration = Date.now()-start;

        // console.log(`Executed query: ${{text,duration, rows: result.rowCount}}`);
        console.log("Executed query:", { text, duration, rows: result.rowCount });

        return result

    }catch(e){
        console.error(e);
        throw e
    }
}

module.exports = {query}  //this query is different from pool.query so dont confuse 