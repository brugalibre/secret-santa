package ch.secretsanta.service.reminder;

import ch.secretsanta.domain.reminder.model.SecretSantaReminderDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
public class SecretSantaReminderSchedulerStarter {
   private static final Logger LOG = LoggerFactory.getLogger(SecretSantaReminderSchedulerStarter.class);
   private final ScheduledExecutorService scheduledExecutorService;
   private final SecretSantaReminderDate secretSantaReminderDate;
   private final SecretSantaReminderService secretSantaReminderService;
   private ScheduledFuture<?> scheduledFuture;

   public SecretSantaReminderSchedulerStarter(SecretSantaReminderDate secretSantaReminderDate, SecretSantaReminderService secretSantaReminderService) {
      this.scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();
      this.secretSantaReminderService = secretSantaReminderService;
      this.secretSantaReminderDate = secretSantaReminderDate;
   }

   @EventListener
   public void onApplicationStarted(ApplicationStartedEvent applicationStartedEvent) {
      LOG.info("Starting scheduler for reminder service..");
      startScheduler();
   }

   public void printReminderStatus() {
      Duration durationUntilReminder = getDurationUntilReminder();
      if (durationUntilReminder != null) {
         LOG.info("Wait {} until sending secret-santa reminder", durationUntilReminder);
      } else {
         LOG.info("No reminder is scheduled");
      }
   }

   /**
    * Starts the secret-santa reminder scheduler which automatically triggers the {@link SecretSantaReminderService}
    */
   private void startScheduler() {
      Duration initDelay = calcInitialDelay(secretSantaReminderDate.calculateSecretSantaReminderDateTime());
      if (initDelay.isNegative()) {
         LOG.warn("Date {} for secret-santa reminder is already in the past, not scheduling a reminder!", secretSantaReminderDate.calculateSecretSantaReminderDateTime());
      } else {
         LOG.info("Wait {} until sending secret-santa reminder", initDelay);
         this.scheduledFuture = scheduledExecutorService.schedule(secretSantaReminderService::sendReminder,
                 initDelay.toMinutes(), TimeUnit.MINUTES);
      }
   }

   private Duration calcInitialDelay(LocalDateTime courseDefUpdateDate) {
      long until = LocalDateTime.now().until(courseDefUpdateDate, ChronoUnit.MINUTES);
      return Duration.ofMinutes(until);
   }

   private Duration getDurationUntilReminder() {
      return scheduledFuture == null ? null : Duration.ofSeconds(scheduledFuture.getDelay(TimeUnit.SECONDS));
   }

}
