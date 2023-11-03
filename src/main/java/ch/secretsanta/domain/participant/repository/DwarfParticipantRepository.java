package ch.secretsanta.domain.participant.repository;

import ch.secretsanta.domain.participant.mapper.DwarfParticipantEntityMapperImpl;
import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.domain.raffle.observe.RaffleResultDwarfParticipant;
import ch.secretsanta.persistence.user.DwarfParticipantEntity;
import ch.secretsanta.persistence.user.dao.DwarfParticipantDao;
import com.brugalibre.common.domain.repository.CommonDomainRepositoryImpl;
import com.brugalibre.domain.user.model.User;
import com.brugalibre.domain.user.service.UserService;

import java.util.List;
import java.util.function.Function;

public class DwarfParticipantRepository extends CommonDomainRepositoryImpl<DwarfParticipant, DwarfParticipantEntity, DwarfParticipantDao> {
   private final UserService userService;

   public DwarfParticipantRepository(DwarfParticipantDao dwarfParticipantDao, UserService userService) {
      super(dwarfParticipantDao, new DwarfParticipantEntityMapperImpl());
      this.userService = userService;
   }

   public List<RaffleResultDwarfParticipant> getAllRaffleResultDwarfParticipants() {
      return getAll().stream()
              .map(map2Result())
              .toList();
   }

   private Function<DwarfParticipant, RaffleResultDwarfParticipant> map2Result() {
      return dwarfParticipant -> {
         User user = userService.getById(dwarfParticipant.userId());
         return new RaffleResultDwarfParticipant(user.username(), user.getMobilePhone().getPhoneNr(), dwarfParticipant.toDwarfName());
      };
   }
}
