package ch.secretsanta.notification;

import com.brugalibre.notification.config.AlertSendConfig;
import com.brugalibre.notification.config.AlertSendConfigProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static ch.secretsanta.i18n.textresources.TextResources.DWARF_REMINDER_NOTIFICATION_MSG;

/**
 * The {@link SecretSantaReminderNotifier} sends an alert configured by a {@link AlertSendConfig} to one or more subscribers
 */
@Service
public class SecretSantaReminderNotifier extends CommonSecretSantaNotifier {

   @Autowired
   public SecretSantaReminderNotifier(AlertSendConfigProvider configProvider) {
      super(configProvider, DWARF_REMINDER_NOTIFICATION_MSG);
   }
}
