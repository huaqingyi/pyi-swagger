import { PYIBootstrap, PYIApplication, autowired, PYIApplicationHook } from 'pyi';
import Koa from 'koa';
import { SwaggerInjectService, Swagger } from '../../src';

@PYIBootstrap
export class Application extends PYIApplication implements PYIApplicationHook {

    public static main(args: string[]) {
        SwaggerInjectService.register();
        /**
         * 指定项目路径
         */
        Application.runtime(__dirname);
    }

    public async willInitApp(app: Koa) {
        await Swagger.build('/swagger', app, {
            securityDefinitions: {
                api_key: {
                    type: 'apiKey',
                    name: 'authorization',
                    in: 'header'
                }
            }
        });
    }
}
