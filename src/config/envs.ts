import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
    PRODUCT_MICROSERVICE_PORT: number;
    PRODUCT_MICROSERVICE_HOST: string;
}

const envSchema = joi.object({
    PORT : joi.number().required(),
    DATABASE_URL: joi.string().required(),
    PRODUCT_MICROSERVICE_PORT : joi.number().required(),
    PRODUCT_MICROSERVICE_HOST: joi.string().required()
})
.unknown(true);

const { error, value } = envSchema.validate(process.env);
if ( error )throw new Error(`Config validation error: ${ error.message }`);

const variable:EnvVars = value;

export const envs = {
    port: variable.PORT,
    database_url: variable.DATABASE_URL,
    product_port: variable.PRODUCT_MICROSERVICE_PORT,
    product_host: variable.PRODUCT_MICROSERVICE_HOST

}

