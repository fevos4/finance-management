import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";

export default function HelpChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I’m your assistant. Choose a question below 👇",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // FAQ list
  const faqList = [
    {
      q: "How do I pay my tuition or fees?",
      a: "💬 You can pay your tuition or fees directly from your dashboard, click the make payment button choose your payment method, and follow the instructions. Once your payment is successful, your balance will be updated automatically.",
    },
    {
      q: "Where can I view my transactions?",
      a: "📊 You can view your transactions under Dashboard > View Payment History.",
    },
    {
      q: "How do I see my courses and fees breakdown?",
      a: "📝 You can view your transactions under Dashboard > My Courses.",
    },
    {
      q: "Can I export my payment history?",
      a: "Yes, you can download your payment history from the Payment History section. Just click on the Download button and select your preferred format.",
    },
  ];

  // Handle user clicking a question
  const handleQuestionClick = (faq) => {
    setMessages((prev) => [...prev, { sender: "user", text: faq.q }]);
    setIsLoading(true);

    // Simulate delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: faq.a }]);
      setIsLoading(false);
    }, 1500);
  };

  // Clear chat function
  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Chat cleared! Start fresh by choosing a question below 👇",
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {isOpen ? (
        <div className="bg-white shadow-lg rounded-2xl w-80 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-yellow-200 text-black flex justify-between items-center p-3 rounded-t-2xl">
            <span>💬 Help Assistant</span>
            <div className="flex items-center gap-2">
              {/* Clear Chat Button */}
              <button onClick={clearChat} title="Clear Chat">
                <MdOutlineClear size={18} />
              </button>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-gray-200 self-start"
                    : "bg-yellow-400 text-black self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="p-2 rounded-lg bg-gray-200 w-fit animate-pulse">
                Bot is typing...
              </div>
            )}
          </div>

          {/* FAQ Buttons */}
          <div className="border-t p-2 space-y-2 overflow-y-auto max-h-32">
            {faqList.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(faq)}
                disabled={isLoading}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {faq.q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg"
        >
          Help
        </button>
      )}
    </div>
  );
}
