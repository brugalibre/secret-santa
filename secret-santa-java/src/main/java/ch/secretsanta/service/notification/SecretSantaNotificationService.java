package ch.secretsanta.service.notification;

import ch.secretsanta.domain.participant.repository.DwarfParticipantRepository;
import ch.secretsanta.notification.SecretSantaRaffleResultNotifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecretSantaNotificationService {
   private final DwarfParticipantRepository dwarfParticipantRepository;
   private final SecretSantaRaffleResultNotifier secretSantaRaffleResultNotifier;

   @Autowired
   public SecretSantaNotificationService(DwarfParticipantRepository dwarfParticipantRepository,
                                         SecretSantaRaffleResultNotifier secretSantaRaffleResultNotifier) {
      this.dwarfParticipantRepository = dwarfParticipantRepository;
      this.secretSantaRaffleResultNotifier = secretSantaRaffleResultNotifier;
   }

   public void notifyDwarfParticipants() {
      secretSantaRaffleResultNotifier.notifyDwarfParticipants(dwarfParticipantRepository.getAllRaffleResultDwarfParticipants());
   }
}
