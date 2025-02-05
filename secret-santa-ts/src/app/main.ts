import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Environment variables: ', process.env);
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const port = process.env.port ?? 6300;
  console.log(
    `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
  );
  await app.listen(port);
}
bootstrap();
