console.log("📢 Using MOCK nats-wrapper");
export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          console.log("[Connected to Nats]", subject, data);
          callback();
        }
      ),
  },
};
