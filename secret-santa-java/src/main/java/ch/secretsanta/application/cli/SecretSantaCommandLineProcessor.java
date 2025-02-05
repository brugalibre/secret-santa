package ch.secretsanta.application.cli;

import ch.secretsanta.service.notification.SecretSantaNotificationService;
import ch.secretsanta.service.participant.DwarfParticipantService;
import ch.secretsanta.service.raffle.SecretSantaService;
import ch.secretsanta.service.reminder.SecretSantaReminderSchedulerStarter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class SecretSantaCommandLineProcessor {

   private static final Logger LOG = LoggerFactory.getLogger(SecretSantaCommandLineProcessor.class);
   private final SecretSantaReminderSchedulerStarter secretSantaReminderSchedulerStarter;
   private final SecretSantaNotificationService secretSantaNotificationService;
   private final SecretSantaService secretSantaService;
   private final DwarfParticipantService dwarfParticipantService;
   private final String yamlFile;

   @Autowired
   public SecretSantaCommandLineProcessor(SecretSantaService secretSantaService, DwarfParticipantService dwarfParticipantService,
                                          SecretSantaNotificationService secretSantaNotificationService,
                                          @Value("${application.user.dwarfParticipantsYaml}") String yamlFile,
                                          SecretSantaReminderSchedulerStarter secretSantaReminderSchedulerStarter) {
      this.secretSantaReminderSchedulerStarter = secretSantaReminderSchedulerStarter;
      this.secretSantaNotificationService = secretSantaNotificationService;
      this.dwarfParticipantService = dwarfParticipantService;
      this.secretSantaService = secretSantaService;
      this.yamlFile = yamlFile;
   }

   public void processArguments(String[] args) {
      try {
         runActions(createActionsFromNames(args));
      } catch (Exception e) {
         LOG.error(e.getLocalizedMessage(), e);
      }
   }

   private void runActions(List<Action> actions) {
      LOG.info("Running actions {}", actions);
      for (Action action : actions) {
         switch (action) {
            case CREATE -> dwarfParticipantService.createDwarfParticipants(yamlFile);
            case RAFFLE -> secretSantaService.raffleDwarfs();
            case PRINT -> secretSantaService.printDwarfs();
            case STATUS -> handleStatus();
            case NOTIFY -> secretSantaNotificationService.notifyDwarfParticipants();
         }
      }
   }

   private void handleStatus() {
      secretSantaService.printDwarfs();
      secretSantaReminderSchedulerStarter.printReminderStatus();
   }

   public static List<Action> createActionsFromNames(String[] names) {
      return Stream.of(names)
              .map(String::toUpperCase)
              .map(Action::valueOf)
              .toList();
   }
}
