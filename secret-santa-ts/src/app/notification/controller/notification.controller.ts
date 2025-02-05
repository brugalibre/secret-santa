import { Controller, Post } from '@nestjs/common';
import { NotificationService } from '../notification.service';
import { DwarfParticipant } from '../../dwarf-participant/model/dwarf-participant.model';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('notify')
  notify() {
    let asdf = new DwarfParticipant();
    asdf.name = 'Peter';
    asdf.toDwarf = 'Heinz';
    asdf.id = 3;
    return this.notificationService.notifyDwarfParticipants(Array.of(asdf));
  }
}
