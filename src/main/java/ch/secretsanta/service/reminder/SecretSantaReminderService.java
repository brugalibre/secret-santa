package ch.secretsanta.service.reminder;

import ch.secretsanta.domain.participant.repository.DwarfParticipantRepository;
import ch.secretsanta.notification.SecretSantaReminderNotifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecretSantaReminderService {

   private final SecretSantaReminderNotifier secretSantaReminderNotifier;
   private final DwarfParticipantRepository dwarfParticipantRepository;

   @Autowired
   public SecretSantaReminderService(SecretSantaReminderNotifier secretSantaReminderNotifier, DwarfParticipantRepository dwarfParticipantRepository) {
      this.secretSantaReminderNotifier = secretSantaReminderNotifier;
      this.dwarfParticipantRepository = dwarfParticipantRepository;
   }

   public void sendReminder() {
      secretSantaReminderNotifier.notifyDwarfParticipants(dwarfParticipantRepository.getAllRaffleResultDwarfParticipants());
   }
}
