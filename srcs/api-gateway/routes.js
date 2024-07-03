import { Router } from 'express';
const router = Router();
import { connect } from 'amqplib/callback_api.js';
import inventoryProxy from './proxy.js';

router.use('/api/movies', inventoryProxy);

router.post('/api/billing', (req, res) => {
    connect(`amqp://${process.env.RABBITMQ_HOST}`, function (error0, connection) {
        if (error0) {
            res.status(500).send('Error connecting to RabbitMQ');
            return;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                res.status(500).send('Error creating RabbitMQ channel');
                return;
            }

            const queue = 'billing_queue';
            const msg = JSON.stringify(req.body);

            channel.assertQueue(queue, {
                durable: true
            });

            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true
            });

            res.status(200).send('Message sent to billing queue');
        });
    });
});

export default router;
