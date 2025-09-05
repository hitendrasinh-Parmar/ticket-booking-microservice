import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error while connection to database";
  constructor() {
    super("Error while connection to database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializedError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
