package ch.secretsanta.notification;

import com.brugalibre.notification.config.AlertSendConfig;
import com.brugalibre.notification.config.AlertSendConfigProvider;
import com.brugalibre.util.file.yml.YamlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificationSeSendConfigProviderImpl implements AlertSendConfigProvider {

   private final String apiKey;
   private final String alertConfigFile;
   private final YamlService yamlService;

   @Autowired
   public NotificationSeSendConfigProviderImpl(@Value("${application.notification.notificationConfigFile}") String alertConfigFile,
                                               @Value("${application.notification.apiKey}") String apiKey) {
      this.alertConfigFile = alertConfigFile;
      this.apiKey = apiKey;
      this.yamlService = new YamlService();
   }

   @Override
   public AlertSendConfig getAlertSendConfig() {
      AlertSendConfig alertSendConfig = yamlService.readYaml(alertConfigFile, AlertSendConfig.class);
      alertSendConfig.setApiKeyProvider(apiKey::toCharArray);
      return alertSendConfig;
   }
}
