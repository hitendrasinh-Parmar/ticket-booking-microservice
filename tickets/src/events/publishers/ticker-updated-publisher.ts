import {
  TicketUpdatedEvent,
  Publisher,
  Subjects,
} from "@jwt-auth-microsrv/common";

export class TickerUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
