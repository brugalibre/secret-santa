import { Injectable, Logger } from '@nestjs/common';
import { DwarfParticipantService } from '../../dwarf-participant/service/dwarf-participant.service';
import { DwarfParticipantEntity } from '../../dwarf-persistence/dwarf-participant/model/dwarf-participant.entity';
import { DwarfParticipant } from '../../dwarf-participant/model/dwarf-participant.model';
import { NotificationService } from '../../notification/notification.service';

@Injectable()
export class SecretSantaService {
  private readonly log = new Logger(SecretSantaService.name);

  constructor(
    private readonly dwarfParticipantService: DwarfParticipantService,
    private readonly notificationService: NotificationService,
  ) {}

  public async raffleDwarfs(): Promise<DwarfParticipant | DwarfParticipant[]> {
    return this.dwarfParticipantService
      .getAllParticipatedLastYear()
      .then((dwarfsParticipatedLastYear) => {
        this.log.log(
          'All dwarfs participated last year: {}',
          dwarfsParticipatedLastYear,
        );
        return this.dwarfParticipantService
          .getAllActiveDwarfParticipants()
          .then((dwarfs) => {
            const lastYearsParticipantToDwarfMap = new Map<string, string>();
            dwarfsParticipatedLastYear.forEach((dwarf) => {
              lastYearsParticipantToDwarfMap.set(dwarf.name, dwarf.toDwarf);
            });
            return this.shuffleAndRaffleDwarfsAndCompareWithPrevYear(
              dwarfs,
              lastYearsParticipantToDwarfMap,
            );
          })
          .then((raffledDwarfs) => {
            return this.dwarfParticipantService.update(raffledDwarfs);
          });
      });
  }

  private shuffleAndRaffleDwarfs(
    dwarfs: DwarfParticipantEntity[],
  ): DwarfParticipantEntity[] {
    dwarfs.sort(() => Math.random() - 0.5);
    const raffledDwarfs: DwarfParticipantEntity[] = [];
    for (const [i, dwarf] of dwarfs.entries()) {
      let toDwarf: string = '';
      // // for participants 1 to 2nd-last each get the next one as its dwarf
      if (i + 1 < dwarfs.length) {
        toDwarf = dwarfs[i + 1].name;
      } else if (dwarfs.length > 1) {
        // the last one gets the first one as dwarf
        toDwarf = dwarfs[0].name;
      } else {
        // Only one participant -> no dwarf can be evaluated
      }
      raffledDwarfs.push({
        id: dwarf.id,
        name: dwarf.name,
        phoneNr: dwarf.phoneNr,
        toDwarf: toDwarf,
        participatedLastYear: dwarf.participatedLastYear,
      });
    }
    return raffledDwarfs;
  }

  private shuffleAndRaffleDwarfsAndCompareWithPrevYear(
    dwarfs: DwarfParticipantEntity[],
    dwarfsParticipatedLastYear: Map<string, string>,
  ): DwarfParticipantEntity[] {
    let raffledDwarfs: DwarfParticipantEntity[];
    do {
      raffledDwarfs = this.shuffleAndRaffleDwarfs(dwarfs);
    } while (
      this.existParticipantWithSameDwarfAsLastYear(
        raffledDwarfs,
        dwarfsParticipatedLastYear,
      )
    );
    return raffledDwarfs;
  }

  private existParticipantWithSameDwarfAsLastYear(
    raffledDwarfs: DwarfParticipantEntity[],
    dwarfsParticipatedLastYear: Map<string, string | null>,
  ): boolean {
    return (
      raffledDwarfs.filter((dwarf) => {
        return dwarfsParticipatedLastYear.get(dwarf.name) === dwarf.toDwarf;
      }).length > 0
    );
  }
}
