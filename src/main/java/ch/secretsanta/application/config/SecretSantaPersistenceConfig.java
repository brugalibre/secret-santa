package ch.secretsanta.application.config;

import ch.secretsanta.persistence.dwarf.dao.DwarfParticipantDao;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = {DwarfParticipantDao.class})
@EntityScan(basePackages = {"ch.secretsanta.persistence"})
@ComponentScan(basePackages = {"ch.secretsanta.domain"})
public class SecretSantaPersistenceConfig {
   // no-op
}

