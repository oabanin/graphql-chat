import { useAddMessage, useMessages } from "../graphql/hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function Chat({ user }: { user: any }) {
  const { messages } = useMessages();
  const { addMessage } = useAddMessage();
  console.log(messages, "messages");
  const handleSend = async (text: string) => {
    const message = await addMessage(text);
    //console.log("Message added:", message);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user.id}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
