import {
  TicketCreatedEvent,
  Publisher,
  Subjects,
} from "@jwt-auth-microsrv/common";

export class TickerCreatePublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
