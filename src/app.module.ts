import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RakingFIIController } from './controllers/ranking-fii.controller';
import { RakingFIIService } from './services/ranking-fii.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RakingFIIController],
  providers: [RakingFIIService],
})
export class AppModule {}
