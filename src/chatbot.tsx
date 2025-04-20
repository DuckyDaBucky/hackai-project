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

const Chatbot: React.FC = () => {
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
      history: messages.map((message: Message, itteration: number) => {
        if (itteration === 0 && message.sender === "bot") {
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

    // Simulate bot response
    setTimeout(async () => {
      const response = await chat.sendMessage({
        message: userMessage.text,
      });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `${response.text}`,
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
    const { data: tableMessage, error } = await supabase
      .from("messageTable")
      .insert([
        {
          itter: uuidv4(),
          chat_id: chatId,
          text: currentMessage.text,
          sender: currentMessage.sender as "user" | "bot",
          created_at: currentMessage.timestamp,
        },
      ])
      .select();
    if (error) {
    }
  };
  const getChat = async () => {
    let { data: chatTable, error } = await supabase
      .from("chatTable")
      .select("*")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id);
    if (error) {
      return null;
    }
    return chatTable;
  };
  const createChatContext = async () => {
    const genChatid = uuidv4();
    setChatId(genChatid);
    const { data, error } = await supabase
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
    if (error) {
    }
  };
  const getMessageContext = async () => {
    const chatids = await getChat();
    let currentChatId = chatId;

    if (chatids) {
      const currentChat = chatids.find(
        (chat) => chat.chat_id === currentChatId
      );
      if (currentChat) {
        currentChatId = currentChat.chat_id;
        setChatId(currentChatId);
      }
    }

    if (chatids !== undefined && chatids !== null) {
      if (!chatids || chatids.length < 1) {
        await createChatContext();
        currentChatId = chatId;
      } else if (chatids[0] && chatids[0].chat_id) {
        currentChatId = chatids[0].chat_id;
        setChatId(currentChatId);
      }
    }

    console.log(currentChatId);

    let { data: messageTable, error } = await supabase
      .from("messageTable")
      .select("*")
      .eq("chat_id", currentChatId)
      .order("created_at", { ascending: true });
    if (error) {
    }
    console.log(messageTable);
    setMessages(
      messageTable
        ? messageTable.map((tableEle) => {
            return {
              id: tableEle.chat_id,
              text: tableEle.text,
              sender: tableEle.sender as "user" | "bot",
              timestamp: tableEle.created_at,
            };
          })
        : []
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] py-4 px-6">
        <h1 className="text-lg font-medium text-white">AI Assistant</h1>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#121212]">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3">
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
              <h2 className="text-2xl font-medium text-white">
                How can I help you today?
              </h2>
              <p className="text-center text-gray-400">
                Ask me anything and I'll do my best to assist you.
              </p>
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
                        : "bg-[#1e1e1e] border border-[#2a2a2a] text-gray-100"
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
                  <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl px-4 py-3">
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
      <div className="border-t border-[#2a2a2a] bg-[#1a1a1a] py-4 px-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-end gap-2"
        >
          <div className="flex-1 bg-[#2a2a2a] rounded-lg overflow-hidden">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="w-full p-3 bg-transparent border-none focus:ring-0 resize-none text-white placeholder-gray-400"
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
                ? "bg-gray-700 cursor-not-allowed text-gray-500"
                : "bg-[#7f5af0] text-white hover:bg-[#6b46e5]"
            } transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
