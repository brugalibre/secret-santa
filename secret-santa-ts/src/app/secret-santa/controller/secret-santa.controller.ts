import { Controller, Post } from '@nestjs/common';
import { SecretSantaService } from '../service/secret-santa.service';

@Controller('secret-santa')
export class SecretSantaController {
  constructor(private readonly secretSantaService: SecretSantaService) {}

  @Post('raffle-dwarfs')
  raffleDwarfs() {
    return this.secretSantaService.raffleDwarfs();
  }
}
