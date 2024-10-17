import amqp from 'amqplib/callback_api.js';
import { insertOrder } from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
const processMessage = async (msg) => {
    const bufferData = msg.content;
    const jsonString = bufferData.toString('utf-8');
    const jsonData = JSON.parse(jsonString);
    try {
        const result = await insertOrder(jsonData.user_id, jsonData.number_of_items, jsonData.total_amount);
        console.log("Order inserted:", result);
    } catch (err) {
        console.error('Error executing query', err);
    }
};
const connectToRabbitMQ = (retryCount = 5, delay = 5000) => {
    amqp.connect(`amqp://${process.env.RABBITMQ_HOST_ADDRESS}`, function (error0, connection) {
        if (error0) {
            console.error(`Failed to connect to RabbitMQ: ${error0.message}`);
            if (retryCount === 0) {
                console.error('Exhausted all retries. Exiting...');
                process.exit(1);
            }
            console.log(`Retrying in ${delay / 1000} seconds...`);
            setTimeout(() => connectToRabbitMQ(retryCount - 1, delay), delay);
            return;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            const queue = 'billing_queue';
            channel.assertQueue(queue, {
                durable: false
            });
            channel.consume(queue, processMessage, {
                noAck: true
            });
        });
    });
};
export const startConsumer = () => {
    connectToRabbitMQ();
};