"use client";

import Container from "@/common/components/elements/Container";
import { useTranslations, useLocale } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import {
  BiSend,
  BiUser,
  BiBot,
  BiStar,
  BiCopy,
  BiRefresh,
  BiTrash,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
import { HiSparkles } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

const SmartTalk = () => {
  const t = useTranslations("SmartTalkPage");
  const locale = useLocale();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // localStorage key for chat history
  const CHAT_STORAGE_KEY = `smart-talk-chat-${session?.user?.email || "anonymous"}`;

  // Load chat history from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && session) {
      try {
        const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    }
    setIsLoadingHistory(false);
  }, [session, CHAT_STORAGE_KEY]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== "undefined" && session && messages.length > 0) {
      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    }
  }, [messages, session, CHAT_STORAGE_KEY]);

  // Predefined quick messages based on locale
  const quickMessages =
    locale === "id"
      ? [
          "Giới thiệu về Lê Minh Quang",
          "Kỹ năng lập trình của bạn là gì?",
          "Dự án nổi bật nhất",
          "Kinh nghiệm làm việc",
          "Cách liên hệ với bạn",
        ]
      : [
          "Tell me about Le Minh Quang",
          "What are your programming skills?",
          "Your most notable projects",
          "Work experience",
          "How to contact you",
        ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputMessage]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([]);
    // Also clear from localStorage
    if (typeof window !== "undefined" && session) {
      try {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      } catch (error) {
        console.error("Error clearing chat history:", error);
      }
    }
  };

  const sendQuickMessage = (message: string) => {
    setInputMessage(message);
    setTimeout(() => sendMessage(), 100);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/smart-talk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          locale: locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          locale === "id"
            ? `Xin lỗi, đã có lỗi xảy ra: ${error instanceof Error ? error.message : "Vui lòng thử lại."}`
            : `Sorry, an error occurred: ${error instanceof Error ? error.message : "Please try again."}`,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!session) {
    return (
      <Container data-aos="fade-up">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Background Decorations */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"></div>
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-20 blur-xl dark:from-blue-800 dark:via-purple-800 dark:to-pink-800"></div>

            {/* Main Content */}
            <div className="relative flex h-[600px] flex-col items-center justify-center gap-y-6 rounded-3xl border border-neutral-200/50 bg-white/80 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/80">
              {/* AI Icon with Animation */}
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 blur-xl"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <HiSparkles size={32} className="animate-pulse" />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="space-y-3 text-center">
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  Smart Talk AI
                </h2>
                <p className="mx-auto max-w-md text-lg text-neutral-600 dark:text-neutral-400">
                  {t("sign_in.title")}
                </p>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => signIn()}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 sm:px-6 lg:px-8 sm:py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 font-semibold text-sm sm:text-base">
                  <BiUser size={16} className="sm:hidden shrink-0" />
                  <BiUser size={18} className="hidden sm:block lg:hidden shrink-0" />
                  <BiUser size={20} className="hidden lg:block shrink-0" />
                  <span className="whitespace-nowrap">{t("sign_in.label")}</span>
                </span>
              </button>

              {/* Features List */}
              <div className="mt-4 sm:mt-6 lg:mt-8 grid w-full max-w-2xl grid-cols-1 gap-2 px-4 sm:grid-cols-3 sm:gap-3 lg:gap-4 sm:px-0">
                <div className="rounded-xl border border-neutral-200/50 bg-white/50 p-3 text-center dark:border-neutral-700/50 dark:bg-neutral-800/50 sm:p-4">
                  <BiBot className="mx-auto mb-2 text-blue-500" size={20} />
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {locale === "id" ? "Hỗ trợ AI" : "AI-Powered"}
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200/50 bg-white/50 p-3 text-center dark:border-neutral-700/50 dark:bg-neutral-800/50 sm:p-4">
                  <HiSparkles
                    className="mx-auto mb-2 text-purple-500"
                    size={20}
                  />
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {locale === "id" ? "Phản hồi thông minh" : "Smart Response"}
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200/50 bg-white/50 p-3 text-center dark:border-neutral-700/50 dark:bg-neutral-800/50 sm:p-4">
                  <BiStar className="mx-auto mb-2 text-yellow-500" size={20} />
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {locale === "id" ? "Chuyên nghiệp" : "Professional"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container data-aos="fade-up">
      <div className="mx-auto max-w-6xl">
        {/* User Info Header */}
        <div className="mb-2 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 rounded-2xl border border-neutral-200/60 bg-white/60 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm dark:border-neutral-700/60 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 sm:h-8 sm:w-8 overflow-hidden rounded-full border-2 border-blue-200 dark:border-blue-800">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  <BiUser size={12} className="sm:hidden" />
                  <BiUser size={16} className="hidden sm:block" />
                </div>
              )}
            </div>
            <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              {t("sign_in.signed_label")}:{" "}
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {session?.user?.name}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={clearChat}
              className="rounded-lg sm:rounded-xl bg-orange-100 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-orange-600 transition-colors hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
              title={locale === "id" ? "Xóa cuộc trò chuyện" : "Clear Chat"}
            >
              <BiTrash size={14} className="mr-1 inline" />
              {locale === "id" ? "Xóa" : "Clear"}
            </button>
            <div className="rounded-lg sm:rounded-xl bg-blue-100 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {locale === "id" ? "Auto-saved" : "Auto-saved"}
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-lg sm:rounded-xl bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              {t("sign_in.sign_out_label")}
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Background decorations */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-neutral-900 dark:to-purple-950/20"></div>
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 opacity-30 blur-xl dark:from-blue-800/20 dark:via-purple-800/20 dark:to-pink-800/20"></div>

          {/* Chat Container */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl  bg-white/40    backdrop-blur-xl dark:border-neutral-700/60 dark:bg-neutral-900/60">
            {/* Header */}
            <div className="border-b border-neutral-200/60 bg-white/80 p-4 sm:p-6 dark:border-neutral-700/60 dark:bg-neutral-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <HiSparkles size={16} className="sm:hidden" />
                    <HiSparkles size={20} className="hidden sm:block" />
                  </div>
                  <div>
                    <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg sm:text-xl font-bold text-transparent">
                      Smart Talk AI
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                      {locale === "id"
                        ? "Được hỗ trợ bởi Gemini AI"
                        : "Powered by Gemini AI"}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg sm:rounded-xl bg-green-100 px-2 sm:px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {locale === "id" ? "Trực tuyến" : "Online"}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto p-4 sm:p-6">
                {isLoadingHistory && session && (
                  <div className="flex h-full items-center justify-center">
                    <div className="space-y-4 text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {locale === "id"
                          ? "Đang tải lịch sử cuộc trò chuyện..."
                          : "Loading chat history..."}
                      </p>
                    </div>
                  </div>
                )}

                {!isLoadingHistory && messages.length === 0 && (
                  <div className="flex h-full items-center justify-center">
                    <div className="space-y-6 text-center">
                      <div className="relative">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-10 blur-xl"></div>
                        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-400">
                          <HiSparkles size={28} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                          {locale === "id"
                            ? "Chào mừng đến với Smart Talk!"
                            : "Welcome to Smart Talk!"}
                        </h4>
                        <p className="mx-auto max-w-md text-neutral-500 dark:text-neutral-400">
                          {locale === "id"
                            ? "Bắt đầu cuộc trò chuyện thông minh với AI. Hỏi tôi về bất cứ điều gì!"
                            : "Start an intelligent conversation with AI. Ask me anything!"}
                        </p>
                      </div>

                      {/* Quick Message Buttons */}
                      <div className="mx-auto grid max-w-lg grid-cols-1 gap-3 md:grid-cols-2">
                        {quickMessages.map((message, index) => (
                          <button
                            key={index}
                            onClick={() => sendQuickMessage(message)}
                            className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/60 p-4 text-left text-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-lg dark:border-neutral-700/60 dark:bg-neutral-800/50 dark:hover:border-blue-600 dark:hover:bg-blue-950/30"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-500/5"></div>
                            <span className="relative font-medium text-neutral-700 dark:text-neutral-300">
                              {message}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!isLoadingHistory &&
                  messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-4 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl shadow-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                            : "bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600 dark:from-purple-900/30 dark:to-indigo-900/30 dark:text-purple-400"
                        }`}
                      >
                        {message.role === "user" ? (
                          <BiUser size={14} className="sm:hidden" />
                        ) : (
                          <HiSparkles size={14} className="sm:hidden" />
                        )}
                        {message.role === "user" ? (
                          <BiUser size={18} className="hidden sm:block" />
                        ) : (
                          <HiSparkles size={18} className="hidden sm:block" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`group relative max-w-[80%] sm:max-w-[75%] ${
                          message.role === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-2 sm:py-4 shadow-lg ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                              : "border border-neutral-200/60 bg-white/60 text-neutral-800 dark:border-neutral-700/60 dark:bg-neutral-800/90 dark:text-neutral-200"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-xs sm:text-sm leading-relaxed">
                            {message.content}
                          </p>

                          <div
                            className={`mt-1 sm:mt-2 flex items-center gap-2 text-xs ${
                              message.role === "user"
                                ? "justify-end text-blue-100"
                                : "text-neutral-500 dark:text-neutral-400"
                            }`}
                          >
                            <span>
                              {new Date(message.timestamp).toLocaleTimeString(
                                "vi-VN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>

                            {message.role === "assistant" && (
                              <button
                                onClick={() => copyToClipboard(message.content)}
                                className="opacity-0 transition-opacity hover:text-blue-500 group-hover:opacity-100"
                                title="Copy message"
                              >
                                <BiCopy size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600 shadow-lg dark:from-purple-900/30 dark:to-indigo-900/30 dark:text-purple-400">
                      <HiSparkles size={14} className="animate-pulse sm:hidden" />
                      <HiSparkles size={18} className="animate-pulse hidden sm:block" />
                    </div>
                    <div className="relative max-w-[80%] sm:max-w-[75%]">
                      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/60 bg-white/60 px-3 sm:px-6 py-2 sm:py-4 shadow-lg dark:border-neutral-700/60 dark:bg-neutral-800/90">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.3s]"></div>
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.15s]"></div>
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-purple-400"></div>
                          <span className="ml-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                            {locale === "id"
                              ? "AI đang suy nghĩ..."
                              : "AI is thinking..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-neutral-200/60 bg-gradient-to-r from-white/50 to-white/80 p-3 sm:p-6 dark:border-neutral-700/60 dark:from-neutral-900/50 dark:to-neutral-900/80">
                <div className="relative">
                  <div className="flex items-end gap-2 sm:gap-3">
                    <div className="relative flex-1">
                      <textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t("placeholder")}
                        className="w-full resize-none rounded-xl sm:rounded-2xl border border-neutral-300/60 bg-white/90 px-3 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 text-xs sm:text-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-neutral-600/60 dark:bg-neutral-800/90 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900/20"
                        rows={1}
                        disabled={isLoading}
                        style={{ minHeight: "44px", maxHeight: "120px" }}
                      />

                      {/* Character count */}
                      <div className="absolute bottom-2 right-10 sm:right-14 text-xs text-neutral-400">
                        {inputMessage.length}
                      </div>
                    </div>

                    <button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:from-neutral-300 disabled:to-neutral-400 disabled:text-neutral-500 disabled:hover:scale-100 dark:disabled:from-neutral-700 dark:disabled:to-neutral-600"
                    >
                      {isLoading ? (
                        <div className="h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      ) : (
                        <>
                          <BiSend size={14} className="sm:hidden" />
                          <BiSend size={18} className="hidden sm:block" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SmartTalk;
