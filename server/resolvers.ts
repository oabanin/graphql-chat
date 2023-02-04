import { PubSub } from "graphql-subscriptions";
import { Message } from "./db";

const pubSub = new PubSub();

function rejectIf(condition: boolean) {
  if (condition) {
    throw new Error("Unauthorized");
  }
}

export const resolvers = {
  Query: {
    messages: (_root: any, _args: any, { userId }: { userId: any }) => {
      rejectIf(!userId);
      return Message.findAll();
    },
  },

  Mutation: {
    addMessage: async (
      _root: any,
      { input }: { input: any },
      { userId }: { userId: any }
    ) => {
      rejectIf(!userId);
      const message = await Message.create({ from: userId, text: input.text });
      pubSub.publish("MESSAGE_ADDED", { messageAdded: message });
      return message;
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: (_root: any, _args: any, { userId }: { userId: any }) => {
        rejectIf(!userId);
        return pubSub.asyncIterator("MESSAGE_ADDED");
      },
    },
  },
};
