/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";
import { WsAdapter } from "@nestjs/platform-ws"
import { RedocModule, RedocOptions } from "nestjs-redoc";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  if (process.env.VERCEL_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Boilerplated API')
        .setDescription('General description here')
        .setVersion('')
        .build()
    ;
    const swaggerOptions: SwaggerDocumentOptions =  {
      operationIdFactory: (
          controllerKey: string,
          methodKey: string
      ) => methodKey
    };
    const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);

    const redocOptions: RedocOptions = {
      title: 'Boilerplate documentation',
      favicon: 'https://lor.cardsrealm.com/ezoimgfmt/cdn.cardsrealm.com/images/icon/lor.png?width=45&ezimgfmt=rs:0x0/rscb1/ng:webp/ngcb1',
      logo: {
        url: 'https://upload.wikimedia.org/wikipedia/it/thumb/1/17/Logo-No_Tag_No-Faction-ENG-RGB.png/260px-Logo-No_Tag_No-Faction-ENG-RGB.png',
        // backgroundColor: '#F0F0F0',
        altText: 'Boilerplate Logo'
      },
      requiredPropsFirst: true,
      sortPropsAlphabetically: true,
      hideDownloadButton: true,
      hideHostname: true,
      auth: {
        enabled: false,
        user: 'admin',
        password: '123'
      },
    };

    // Instead of using SwaggerModule.setup() you call this module
    await RedocModule.setup('/docs', app, document, redocOptions);
    // SwaggerModule.setup('docs', app, document);
  }

  const port = process.env.PORT || 3333;
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(port);
  Logger.log(
      `🚀 Backend Api is running on: http://localhost:${port}`
  );
}

bootstrap();

