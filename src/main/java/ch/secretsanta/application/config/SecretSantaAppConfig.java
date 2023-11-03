package ch.secretsanta.application.config;

import ch.secretsanta.domain.participant.repository.DwarfParticipantRepository;
import ch.secretsanta.persistence.user.dao.DwarfParticipantDao;
import com.brugalibre.common.domain.app.config.CommonAppPersistenceConfig;
import com.brugalibre.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = {"ch.secretsanta.domain", "ch.secretsanta.service", "ch.secretsanta.notification"})
@Import({SecretSantaPersistenceConfig.class, CommonAppPersistenceConfig.class})
public class SecretSantaAppConfig {

   public static final String DWARF_USER_REPOSITORY = "dwarfParticipantRepository";

   @Bean(name = DWARF_USER_REPOSITORY)
   public DwarfParticipantRepository getdwarfParticipantRepository(@Autowired DwarfParticipantDao dwarfParticipantDao,
                                                                   @Autowired UserService userService) {
      return new DwarfParticipantRepository(dwarfParticipantDao, userService);
   }
}

