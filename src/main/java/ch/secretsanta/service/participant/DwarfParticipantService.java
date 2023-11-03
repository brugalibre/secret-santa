package ch.secretsanta.service.participant;

import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.domain.participant.repository.DwarfParticipantRepository;
import com.brugalibre.domain.user.model.User;
import com.brugalibre.domain.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DwarfParticipantService {
   private final static Logger LOG = LoggerFactory.getLogger(DwarfParticipantService.class);
   private final UserService userService;
   private final DwarfParticipantRepository dwarfParticipantRepository;

   @Autowired
   public DwarfParticipantService(DwarfParticipantRepository dwarfParticipantRepository, UserService userService) {
      this.dwarfParticipantRepository = dwarfParticipantRepository;
      this.userService = userService;
   }

   public List<DwarfParticipant> createDwarfParticipants(String yamlFile) {
      LOG.info("Creating dwarf participants from file {}", yamlFile);
      userService.deleteAll();
      dwarfParticipantRepository.deleteAll();
      List<DwarfParticipant> dwarfParticipants = userService.createFromYaml(yamlFile)
              .stream()
              .map(this::createFromUser)
              .toList();
      LOG.info("Created {} dwarfs", dwarfParticipants.size());
      return dwarfParticipants;
   }

   private DwarfParticipant createFromUser(User user) {
      return dwarfParticipantRepository.save(DwarfParticipant.of(user.username(), user.id()));
   }
}
