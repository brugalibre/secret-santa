import { Module } from '@nestjs/common';
import { SecretSantaController } from './controller/secret-santa.controller';
import { SecretSantaService } from './service/secret-santa.service';
import { DwarfParticipantModule } from '../dwarf-participant/dwarf-participant.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [DwarfParticipantModule, NotificationModule],
  controllers: [SecretSantaController],
  providers: [SecretSantaService],
})
export class SecretSantaModule {}
