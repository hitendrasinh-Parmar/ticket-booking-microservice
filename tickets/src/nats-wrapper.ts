import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("NATS client not connect");
    }

    return this._client;
  }

  connect(cluseterId: string, clientId: string, url: string) {
    this._client = nats.connect(cluseterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", (res) => {
        console.log("[Connected to Nats]");
        resolve(res);
      });

      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
