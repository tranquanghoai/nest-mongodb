import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { GlobalGuard } from './guard/global.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalGuards(GlobalGuard)
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
