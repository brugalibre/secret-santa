package ch.secretsanta.service.raffle;

import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.domain.participant.model.DwarfParticipantProcessor;
import ch.secretsanta.domain.participant.repository.DwarfParticipantRepository;
import ch.secretsanta.domain.raffle.SecretSanta;
import ch.secretsanta.domain.raffle.SecretSantaPrinter;
import ch.secretsanta.domain.raffle.SecretSantaValidator;
import ch.secretsanta.domain.raffle.exception.RaffleLoopException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecretSantaService {
   private final static Logger LOG = LoggerFactory.getLogger(SecretSantaService.class);
   private final DwarfParticipantProcessor secretSanta;
   private final DwarfParticipantRepository dwarfParticipantRepository;

   @Autowired
   public SecretSantaService(DwarfParticipantRepository dwarfParticipantRepository) {
      this.secretSanta = new SecretSantaPrinter(new SecretSantaValidator(new SecretSanta()));
      this.dwarfParticipantRepository = dwarfParticipantRepository;
   }

   public List<DwarfParticipant> raffleDwarfs() {
      LOG.info("Start raffling..");
      try {
         List<DwarfParticipant> processedDwarfParticipants = secretSanta.process(dwarfParticipantRepository.getAll());
         dwarfParticipantRepository.saveAll(processedDwarfParticipants);
         return dwarfParticipantRepository.getAll();
      } catch (RaffleLoopException e) {
         LOG.error("Loop detected while raffling", e);
      }
      return List.of();
   }

   public void printDwarfs() {
      new SecretSantaPrinter().process(dwarfParticipantRepository.getAll());
   }
}
