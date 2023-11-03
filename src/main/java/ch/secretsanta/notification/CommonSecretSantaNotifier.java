package ch.secretsanta.notification;

import ch.secretsanta.domain.raffle.observe.RaffleObserver;
import ch.secretsanta.domain.raffle.observe.RaffleResultDwarfParticipant;
import com.brugalibre.notification.config.AlertSendConfig;
import com.brugalibre.notification.config.AlertSendConfigProvider;
import com.brugalibre.notification.send.common.model.AlertSendInfos;
import com.brugalibre.notification.send.common.service.BasicAlertSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static ch.secretsanta.i18n.textresources.TextResources.DWARF_NOTIFICATION_TITEL;

/**
 * The {@link CommonSecretSantaNotifier} sends an alert configured by a {@link AlertSendConfig} to one or more subscribers
 */
public abstract class CommonSecretSantaNotifier extends BasicAlertSender implements RaffleObserver {
   private static final Logger LOG = LoggerFactory.getLogger(CommonSecretSantaNotifier.class);

   private final String notificationMsg;

   public CommonSecretSantaNotifier(AlertSendConfigProvider configProvider, String notificationMsg) {
      super(configProvider);
      this.notificationMsg = notificationMsg;
   }

   @Override
   public void notifyDwarfParticipants(List<RaffleResultDwarfParticipant> dwarfParticipants) {
      LOG.info("Notify {} darf participants", dwarfParticipants.size());
      for (RaffleResultDwarfParticipant raffleResultDwarfParticipant : dwarfParticipants) {
         String msg = getMessage4Result(raffleResultDwarfParticipant.name(), raffleResultDwarfParticipant.toDwarfParticipantName());
         AlertSendInfos alertSendInfos = new AlertSendInfos(DWARF_NOTIFICATION_TITEL, msg, List.of(raffleResultDwarfParticipant.phoneNr()));
         sendMessage(alertSendInfos);
      }
   }

   private String getMessage4Result(String userName, String dwarfName) {
      return notificationMsg.formatted(userName, dwarfName);
   }
}
