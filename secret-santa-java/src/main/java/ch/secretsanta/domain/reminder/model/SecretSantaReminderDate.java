package ch.secretsanta.domain.reminder.model;

import ch.secretsanta.service.reminder.SecretSantaReminderSchedulerStarter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAccessor;

/**
 * The {@link SecretSantaReminderDate} describes the day and time when the {@link SecretSantaReminderSchedulerStarter} should schedule
 * and send a reminder information
 */
@Service
public class SecretSantaReminderDate {
   private final String secretSantaDateAsString;
   private final String reminderTime;
   private final int daysSendReminderEarlier;

   public SecretSantaReminderDate(@Value("${application.notification.daysSendReminderEarlier}") int daysSendReminderEarlier,
                                  @Value("${application.notification.reminderTime}") String reminderTime,
                                  @Value("${application.secretSantaDate}") String secretSantaDateAsString) {
      this.secretSantaDateAsString = secretSantaDateAsString;
      this.daysSendReminderEarlier = daysSendReminderEarlier;
      this.reminderTime = reminderTime;
   }

   public LocalDateTime calculateSecretSantaReminderDateTime() {
      TemporalAccessor secretSantaDate = LocalDate.parse(secretSantaDateAsString)
              .minusDays(daysSendReminderEarlier);
      TemporalAccessor localTime = LocalTime.parse(reminderTime);
      return LocalDateTime.of(LocalDate.from(secretSantaDate), LocalTime.from(localTime));
   }
}
