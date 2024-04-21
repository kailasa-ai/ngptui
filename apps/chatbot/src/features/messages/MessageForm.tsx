import ChatInput from "@/components/ChatInput";

const MessageForm = () => {
  return (
    <form className="w-full mx-2 lg:mx-auto flex flex-1 lg:max-w-2xl xl:max-w-3xl mb-3">
      <div className="w-full items-center flex">
        <ChatInput />
      </div>
    </form>
  );
};

export default MessageForm;
