package ch.secretsanta.domain.raffle.exception;

public class RaffleLoopException extends IllegalStateException {
   public RaffleLoopException(String msg) {
      super(msg);
   }
}
