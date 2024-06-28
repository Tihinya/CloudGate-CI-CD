const pkg = require('pg');

const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    password: 'secret',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});


const query = async (text, params) => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } finally {
        client.release();
    }
};

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);


        channel.consume(queue, async function (msg) {
            var bufferData = msg.content;

            var jsonString = bufferData.toString('utf-8');

            var jsonData = JSON.parse(jsonString);

            try {
                const result = await query('INSERT INTO orders (user_id, number_of_items, total_amount) VALUES ($1, $2, $3) RETURNING *', [jsonData.user_id, jsonData.number_of_items, jsonData.total_amount]);
                console.log("Order inserted:", result.rows[0]);
            } catch (err) {
                console.error('Error executing query', err);
                // Handle error here, maybe log it or send a message to a logging service
            }
            console.log(" [x] Received %s", jsonData.user_id);
        }, {
            noAck: true
        });

    });
});



