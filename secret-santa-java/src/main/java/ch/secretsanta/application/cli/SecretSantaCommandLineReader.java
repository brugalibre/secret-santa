package ch.secretsanta.application.cli;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Scanner;

@Service
public class SecretSantaCommandLineReader implements CommandLineRunner {
   private final SecretSantaCommandLineProcessor secretSantaCommandLineProcessor;
   private static final Logger LOG = LoggerFactory.getLogger(SecretSantaCommandLineReader.class);

   @Autowired
   public SecretSantaCommandLineReader(SecretSantaCommandLineProcessor secretSantaCommandLineProcessor) {
      this.secretSantaCommandLineProcessor = secretSantaCommandLineProcessor;
   }

   @Override
   public void run(String... args) {
      Scanner scanner = new Scanner(System.in);
      String input;
      while ((input = scanner.nextLine()) != null) {
         LOG.info("Processing input '{}'", input);
         secretSantaCommandLineProcessor.processArguments(input.split(" "));
      }
   }
}
