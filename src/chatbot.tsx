import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ai } from "./gemini";
import { supabase } from "./supabaseClient";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string | undefined;
};

type Props = {
  theme: string; // pass something like "bg-green-100 text-gray-900"
};

const Chatbot: React.FC<Props> = ({ theme }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatId, setChatId] = useState<UUIDTypes | undefined>();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      getMessageContext();
    }
  }, []);

  const [chat] = useState(() =>
    ai.chats.create({
      model: "gemini-2.0-flash",
      history: messages.map((message: Message, index: number) => {
        if (index === 0 && message.sender === "bot") {
          return {
            role: "user",
            parts: [{ text: "" }],
          };
        }
        return {
          role: message.sender === "bot" ? "model" : "user",
          parts: [{ text: message.text }],
        };
      }),
    })
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(async () => {
      // const apiResponse = await chat.sendMessage({
      //   message: userMessage.text,
      // });

      let apiResponse = {
        text: "Sorry, I couldn't get a response.",
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userMessage.text }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Extract the answer from the response format
        apiResponse = {
          text:
            `${data.answer}\nsource page: ${data.page}` ||
            "Sorry, I couldn't get a proper response.",
        };
      } catch (error) {
        console.error("Error fetching response:", error);
        apiResponse = {
          text: "Sorry, I couldn't connect to the server.",
        };
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: apiResponse.text,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      sendMessageToDB(userMessage);
      sendMessageToDB(botMessage);
      setIsLoading(false);
    }, 0);
  };

  const sendMessageToDB = async (currentMessage: Message) => {
    await supabase
      .from("messageTable")
      .insert([
        {
          itter: uuidv4(),
          chat_id: chatId,
          text: currentMessage.text,
          sender: currentMessage.sender,
          created_at: currentMessage.timestamp,
        },
      ])
      .select();
  };

  const getChat = async () => {
    let { data: chatTable } = await supabase
      .from("chatTable")
      .select("*")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id);
    return chatTable;
  };

  const createChatContext = async () => {
    const genChatid = uuidv4();
    setChatId(genChatid);
    await supabase
      .from("chatTable")
      .insert([
        {
          user_id: (await supabase.auth.getUser()).data.user?.id,
          chat_id: genChatid,
          title: "title 1",
          created_at: new Date().toISOString(),
        },
      ])
      .select();
  };

  const getMessageContext = async () => {
    const chatids = await getChat();
    let currentChatId = chatId;

    if (chatids?.length) {
      currentChatId = chatids[0].chat_id;
      setChatId(currentChatId);
    } else {
      await createChatContext();
      currentChatId = chatId;
    }

    const { data: messageTable } = await supabase
      .from("messageTable")
      .select("*")
      .eq("chat_id", currentChatId)
      .order("created_at", { ascending: true });

    setMessages(
      messageTable
        ? messageTable.map((tableEle) => ({
            id: tableEle.chat_id,
            text: tableEle.text,
            sender: tableEle.sender,
            timestamp: tableEle.created_at,
          }))
        : []
    );
  };

  return (
    <div
      className={`flex flex-col h-screen ${theme} transition-all duration-300`}
    >
      {/* Header */}
      <header className="border-b border-black/10 py-4 px-6">
        <h1 className="text-lg font-medium">AI Assistant</h1>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3 text-center">
              <div className="w-16 h-16 rounded-full bg-[#7f5af0] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-medium">
                How can I help you today?
              </h2>
              <p className="text-gray-600">Ask me anything about the data.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-[#7f5af0] text-white"
                        : "bg-white text-gray-900 border border-gray-300"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-black border border-gray-300 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#7f5af0] animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#7f5af0] animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#7f5af0] animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-black/10 bg-white py-4 px-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-end gap-2"
        >
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="w-full p-3 bg-transparent border-none focus:ring-0 resize-none text-black placeholder-gray-500"
              style={{ minHeight: "48px", maxHeight: "150px" }}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || input.trim() === ""}
            className={`px-4 py-3 rounded-lg ${
              isLoading || input.trim() === ""
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#7f5af0] text-white hover:bg-[#6b46e5]"
            } transition-colors`}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
