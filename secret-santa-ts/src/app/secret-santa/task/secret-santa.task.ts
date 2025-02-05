import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DwarfParticipantService } from '../../dwarf-participant/service/dwarf-participant.service';

import * as process from 'process';

@Injectable()
export class SecretSantaTaskService implements OnModuleInit {
  private readonly logger = new Logger(SecretSantaTaskService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly dwarfParticipantService: DwarfParticipantService,
  ) {}

  onModuleInit() {
    this.addCronJob(
      'call_participate_last_year',
      process.env.SECRET_SANTA_DATE_CRON_EXPR!,
      this.participateLastYear.bind(this),
    );
    this.addCronJob(
      'remind_participants',
      process.env.REMINDER_SCHEDULE_CRON_EXPR!,
      this.remindParticipants.bind(this),
    );
  }

  participateLastYear(): void {
    this.logger.log('Participating last year.');
    this.dwarfParticipantService.participateLastYear();
  }

  remindParticipants(): void {
    this.logger.log(
      'Reminding participants to participate in the Secret Santa event.',
    );
  }

  /**
   *  Adds a dynamic cron job.
   *
   * @param name - the cron job name.
   * @param cronExpression - a cron expression.
   * @param callback - the function that will handle the actual actions of the cron job.
   */
  addCronJob(name: string, cronExpression: string, callback: CallableFunction) {
    const job = new CronJob(`${cronExpression}`, () => {
      callback();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.log(
      `The cron job ${name} has been added with the following cron expression : ${cronExpression}.`,
    );
  }
}
