import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RankingFIIModel } from 'src/models/ranking-fii.model';
import { RakingFIIService } from 'src/services/ranking-fii.service';
import { Result } from 'src/view-models/result.model';

@ApiTags('Raking-FII')
@Controller('ranking-fii')
export class RakingFIIController {
  constructor(private _service: RakingFIIService) {}

  @Get()
  async getRankingFII() {
    const find = await this._service.findAll();

    return new Result<RankingFIIModel[]>(
      'Registros carregados com sucesso',
      true,
      find,
    );
  }
}
