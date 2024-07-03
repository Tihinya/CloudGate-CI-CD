import express from 'express';
import bodyParser from 'body-parser';
import yamljs from 'yamljs';
import { config } from 'dotenv';
import { serve, setup } from 'swagger-ui-express';
import routes from './routes.js';

config();

const app = express();
const port = process.env.API_GATEWAY_PORT || 7000;

app.use(bodyParser.json());

const swaggerDocument = yamljs.load('./api-docs.yaml');

app.use('/api-docs', serve, setup(swaggerDocument));

app.use('/', routes);

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});

export default yamljs.load; // Assuming you want to export yamljs's load function
