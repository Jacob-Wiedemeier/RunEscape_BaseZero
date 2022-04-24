'use strict';

const mariadb = require('mariadb');

//test query
async function main() {
    try {
        const conn = await mariadb.createConnection({
            host: 'd805d2.stackhero-network.com',
            user: 'root',
            password: 'OkhxZ62FIP4f5YRJdjC4tjP9E0lvLO2w',
            database: 'basezero'
        });
        // Use Connection to get contacts data
        var rows = await get_contacts(conn);

        //Print list of contacts
        for (i = 0, len = rows.length; i < len; i++) {
            console.log(`${rows[i].Name} ${rows[i].Attack} <${rows[i].FK_ItemID}>`);
        }
    } catch (err) {
        // Manage Errors
        console.log(err);
    } finally {
        // Close Connection
        if (conn) conn.close();
    }
}
function get_contacts(conn) {
    return conn.query("SELECT * FROM basezero.Enemy");
}

main();
console.log('Hello world');
