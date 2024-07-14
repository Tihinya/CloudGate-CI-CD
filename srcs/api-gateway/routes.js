import { Router } from 'express';
import { connect } from 'amqplib/callback_api.js';
import inventoryProxy from './proxy.js';

const router = Router();

router.use('/api/movies', inventoryProxy);

router.post('/api/billing', (req, res) => {
    const amqpUrl = `amqp://${process.env.RABBITMQ_HOST}`;

    connect(amqpUrl, function (error0, connection) {
        if (error0) {
            console.error('Error connecting to RabbitMQ:', error0.message);
            return res.status(500).send('Error connecting to RabbitMQ');
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                console.error('Error creating RabbitMQ channel:', error1.message);
                connection.close();
                return res.status(500).send('Error creating RabbitMQ channel');
            }

            const queue = 'billing_queue';
            const msg = JSON.stringify(req.body);

            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

            res.status(200).send('Message sent to billing queue');

            setTimeout(() => {
                connection.close();
            }, 500);
        });
    });
});

export default router;
