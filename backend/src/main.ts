import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// ポート番号の定義
const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
