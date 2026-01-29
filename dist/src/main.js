"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const envs_1 = require("./config/envs");
const common_1 = require("@nestjs/common");
async function main() {
    const logger = new common_1.Logger('Main');
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            port: envs_1.envs.port
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen();
    logger.log(`app running on ${envs_1.envs.port}`);
}
main();
//# sourceMappingURL=main.js.map