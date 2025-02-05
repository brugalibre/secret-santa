import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { DwarfParticipantEntity } from './dwarf-persistence/dwarf-participant/model/dwarf-participant.entity';
import { DwarfParticipantModule } from './dwarf-participant/dwarf-participant.module';
import { SecretSantaModule } from './secret-santa/secret-santa.module';
import { SecretSantaPostgresOrmModule } from './dwarf-persistence/secret-santa-postgres-orm.module';
import { SecretSantaController } from './secret-santa/controller/secret-santa.controller';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SecretSantaService } from './secret-santa/service/secret-santa.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    SecretSantaPostgresOrmModule([DwarfParticipantEntity]),
    DwarfParticipantModule,
    SecretSantaModule,
    NotificationModule,
  ],
  controllers: [SecretSantaController],
  providers: [SecretSantaService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
