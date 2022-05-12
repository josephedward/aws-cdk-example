import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';


let cachedServer: Server;

const bootstrapServer = async () => {

  
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.NODE_ENV);
  process.env.NODE_ENV == 'development'? (app.listen(3000)) : (null);

  await app.init();
  
  return createServer(expressApp);
};

export const api = async  (event: APIGatewayProxyEvent, context: Context) => {
  // use cached Nestjs server if exists or create one
  // when lambdas are hot, they have tendency to cache runtime variables,
  // so in this case, if we hit one of hot instance, there will be one Nestjs server already bootstrapped
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};