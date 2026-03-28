import { useState } from "react";
import {
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  ScrollArea,
  Separator,
  Input,
} from "@repo/ui";
import { cn } from "@repo/utils";
import {
  Mail,
  MessageCircle,
  Globe,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Search,
  MoreVertical,
  Phone,
  Video,
  FileText,
  Clock,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Channel = "all" | "whatsapp" | "email" | "instagram";

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  initials: string;
  avatarColor: string;
}

interface ConversationItem {
  id: string;
  contact: Contact;
  channel: Exclude<Channel, "all">;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  status: "sending" | "sent" | "delivered" | "read";
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const CURRENT_USER_ID = "user_1";

const mockConversations: ConversationItem[] = [
  {
    id: "conv_1",
    contact: {
      id: "contact_1",
      name: "Acme Inc",
      email: "contact@acme.com",
      initials: "AI",
      avatarColor: "var(--primary-50)",
    },
    channel: "email",
    lastMessage: "Perfect, see you then!",
    timestamp: "10:50 AM",
    unreadCount: 0,
  },
  {
    id: "conv_2",
    contact: {
      id: "contact_2",
      name: "TechCorp",
      phone: "+1 555 123 4567",
      initials: "TC",
      avatarColor: "var(--success-50)",
    },
    channel: "whatsapp",
    lastMessage:
      "Thanks for the update! We will review the proposal and get back to you shortly.",
    timestamp: "Yesterday",
    unreadCount: 2,
  },
  {
    id: "conv_3",
    contact: {
      id: "contact_3",
      name: "StartupXYZ",
      email: "hello@startupxyz.io",
      initials: "SX",
      avatarColor: "var(--tertiary-50)",
    },
    channel: "instagram",
    lastMessage: "Love your product! Can we get a demo?",
    timestamp: "Mar 25",
    unreadCount: 1,
  },
  {
    id: "conv_4",
    contact: {
      id: "contact_4",
      name: "GlobalTech",
      email: "procurement@globaltech.com",
      initials: "GT",
      avatarColor: "var(--warning-50)",
    },
    channel: "email",
    lastMessage: "Please find attached the signed contract for Q2.",
    timestamp: "Mar 24",
    unreadCount: 0,
  },
  {
    id: "conv_5",
    contact: {
      id: "contact_5",
      name: "InnovateCo",
      phone: "+44 20 7946 0958",
      initials: "IC",
      avatarColor: "var(--error-50)",
    },
    channel: "whatsapp",
    lastMessage: "Hey, quick question about the pricing tiers.",
    timestamp: "Mar 23",
    unreadCount: 3,
  },
  {
    id: "conv_6",
    contact: {
      id: "contact_6",
      name: "DesignHub",
      email: "team@designhub.co",
      initials: "DH",
      avatarColor: "var(--secondary-50)",
    },
    channel: "email",
    lastMessage: "The wireframes look great! Let me share with the team.",
    timestamp: "Mar 22",
    unreadCount: 0,
  },
  {
    id: "conv_7",
    contact: {
      id: "contact_7",
      name: "NextGenAI",
      initials: "NA",
      avatarColor: "var(--primary-40)",
    },
    channel: "instagram",
    lastMessage: "Just saw your latest feature release. Impressive!",
    timestamp: "Mar 20",
    unreadCount: 0,
  },
  {
    id: "conv_8",
    contact: {
      id: "contact_8",
      name: "CloudBase",
      phone: "+1 555 987 6543",
      initials: "CB",
      avatarColor: "var(--success-40)",
    },
    channel: "whatsapp",
    lastMessage: "Can we schedule a call for next week?",
    timestamp: "Mar 19",
    unreadCount: 0,
  },
];

const mockMessages: Record<string, Message[]> = {
  conv_1: [
    {
      id: "msg_1",
      content: "Hey, can we schedule a demo of your CRM platform?",
      senderId: "contact_1",
      timestamp: "10:45 AM",
      status: "read",
    },
    {
      id: "msg_2",
      content:
        "Sure! How about tomorrow at 2pm? I can walk you through the main features and answer any questions.",
      senderId: CURRENT_USER_ID,
      timestamp: "10:47 AM",
      status: "read",
    },
    {
      id: "msg_3",
      content: "That works perfectly. I will also bring our CTO along.",
      senderId: "contact_1",
      timestamp: "10:48 AM",
      status: "read",
    },
    {
      id: "msg_4",
      content:
        "Great! I will send over a calendar invite. Here is the proposal document for your review before the meeting.",
      senderId: CURRENT_USER_ID,
      timestamp: "10:49 AM",
      status: "delivered",
      attachment: {
        name: "proposal.pdf",
        size: "245 KB",
        type: "pdf",
      },
    },
    {
      id: "msg_5",
      content: "Perfect, see you then!",
      senderId: "contact_1",
      timestamp: "10:50 AM",
      status: "read",
    },
  ],
  conv_2: [
    {
      id: "msg_6",
      content:
        "Hi TechCorp team! We have some exciting updates to share about our integration capabilities.",
      senderId: CURRENT_USER_ID,
      timestamp: "2:15 PM",
      status: "read",
    },
    {
      id: "msg_7",
      content: "That sounds interesting! What kind of integrations?",
      senderId: "contact_2",
      timestamp: "2:20 PM",
      status: "read",
    },
    {
      id: "msg_8",
      content:
        "We now support Salesforce, HubSpot, and Slack integrations out of the box. Plus a REST API for custom builds.",
      senderId: CURRENT_USER_ID,
      timestamp: "2:22 PM",
      status: "delivered",
    },
    {
      id: "msg_9",
      content:
        "Thanks for the update! We will review the proposal and get back to you shortly.",
      senderId: "contact_2",
      timestamp: "2:30 PM",
      status: "read",
    },
  ],
};

// ─── Channel Icon ───────────────────────────────────────────────────────────

function ChannelIcon({
  channel,
  size = 14,
}: {
  channel: Exclude<Channel, "all">;
  size?: number;
}) {
  const iconMap = {
    whatsapp: <MessageCircle size={size} />,
    email: <Mail size={size} />,
    instagram: <Globe size={size} />,
  };
  return iconMap[channel];
}

function getChannelColor(channel: Exclude<Channel, "all">): string {
  const colorMap = {
    whatsapp: "var(--success-50)",
    email: "var(--primary-50)",
    instagram: "var(--tertiary-50)",
  };
  return colorMap[channel];
}

function getChannelLabel(channel: Exclude<Channel, "all">): string {
  const labelMap = {
    whatsapp: "WhatsApp",
    email: "Email",
    instagram: "Instagram",
  };
  return labelMap[channel];
}

// ─── Message Status Icon ────────────────────────────────────────────────────

function MessageStatus({ status }: { status: Message["status"] }) {
  if (status === "sending") {
    return <Clock size={12} style={{ color: "var(--text-subdued-2)" }} />;
  }
  if (status === "sent") {
    return <Check size={12} style={{ color: "var(--text-subdued-2)" }} />;
  }
  if (status === "delivered") {
    return <CheckCheck size={12} style={{ color: "var(--text-subdued-2)" }} />;
  }
  return <CheckCheck size={12} style={{ color: "var(--primary-50)" }} />;
}

// ─── Conversation List Item ─────────────────────────────────────────────────

function ConversationListItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: ConversationItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 w-full text-left transition-colors duration-150 rounded-lg",
      )}
      style={{
        padding: "12px",
        backgroundColor: isActive ? "var(--primary-10)" : "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--surface-10)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
      aria-selected={isActive}
      role="option"
    >
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback
          style={{
            backgroundColor: conversation.contact.avatarColor,
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {conversation.contact.initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-sm truncate",
              conversation.unreadCount > 0 ? "font-semibold" : "font-medium",
            )}
            style={{ color: "var(--text-default)" }}
          >
            {conversation.contact.name}
          </span>
          <span
            className="text-xs shrink-0"
            style={{ color: "var(--text-subdued-2)" }}
          >
            {conversation.timestamp}
          </span>
        </div>
        <div className="flex items-start gap-2 mt-1">
          <span
            className="shrink-0 mt-0.5"
            style={{ color: getChannelColor(conversation.channel) }}
          >
            <ChannelIcon channel={conversation.channel} size={12} />
          </span>
          <span
            className="text-xs line-clamp-2 flex-1 min-w-0"
            style={{
              color:
                conversation.unreadCount > 0
                  ? "var(--text-default)"
                  : "var(--text-subdued-1)",
              fontWeight: conversation.unreadCount > 0 ? 500 : 400,
            }}
          >
            {conversation.lastMessage}
          </span>
          {conversation.unreadCount > 0 && (
            <span
              className="flex items-center justify-center shrink-0 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold px-1 mt-0.5"
              style={{
                backgroundColor: "var(--primary-50)",
                color: "var(--surface-0)",
              }}
            >
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Message Bubble ─────────────────────────────────────────────────────────

function MessageBubble({
  message,
  isOwn,
}: {
  message: Message;
  isOwn: boolean;
}) {
  return (
    <div
      className={cn("flex gap-2 mb-4", isOwn ? "justify-end" : "justify-start")}
    >
      <div
        className={cn("max-w-[70%] rounded-2xl px-4 py-2.5")}
        style={{
          backgroundColor: isOwn ? "var(--primary-50)" : "var(--surface-10)",
          color: isOwn ? "var(--text-inverse)" : "var(--text-default)",
          borderBottomRightRadius: isOwn ? 4 : undefined,
          borderBottomLeftRadius: !isOwn ? 4 : undefined,
        }}
      >
        {message.attachment && (
          <div
            className="flex items-center gap-2 mb-2 p-2 rounded-lg"
            style={{
              backgroundColor: isOwn
                ? "rgba(255,255,255,0.15)"
                : "var(--surface-0)",
              border: isOwn ? "none" : "1px solid var(--grey-40)",
            }}
          >
            <FileText size={16} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">
                {message.attachment.name}
              </p>
              <p className="text-[10px] opacity-70">
                {message.attachment.size}
              </p>
            </div>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-1",
            isOwn ? "justify-end" : "justify-start",
          )}
        >
          <span
            className="text-[10px]"
            style={{
              color: isOwn ? "rgba(255,255,255,0.7)" : "var(--text-subdued-2)",
            }}
          >
            {message.timestamp}
          </span>
          {isOwn && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
}

// ─── Message Composer ───────────────────────────────────────────────────────

function MessageComposer({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex items-center gap-2 p-4"
      style={{
        borderTop: "1px solid var(--grey-40)",
        backgroundColor: "var(--surface-0)",
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        className="shrink-0"
        aria-label="Attach file"
        style={{ color: "var(--text-subdued-1)" }}
      >
        <Paperclip size={18} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="shrink-0"
        aria-label="Add emoji"
        style={{ color: "var(--text-subdued-1)" }}
      >
        <Smile size={18} />
      </Button>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1"
        style={{
          backgroundColor: "var(--surface-10)",
          border: "1px solid var(--grey-40)",
        }}
        aria-label="Message input"
      />
      <Button
        size="sm"
        onClick={handleSend}
        disabled={!text.trim()}
        aria-label="Send message"
        style={{
          backgroundColor: text.trim() ? "var(--primary-50)" : undefined,
          color: text.trim() ? "var(--text-inverse)" : undefined,
        }}
      >
        <Send size={16} />
      </Button>
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyConversation() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div
        className="p-4 rounded-full"
        style={{ backgroundColor: "var(--surface-10)" }}
      >
        <MessageCircle size={32} style={{ color: "var(--text-subdued-2)" }} />
      </div>
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--text-default)" }}
      >
        Select a conversation
      </h3>
      <p className="text-sm" style={{ color: "var(--text-subdued-1)" }}>
        Choose a conversation from the sidebar to view messages
      </p>
    </div>
  );
}

// ─── Conversations Page ─────────────────────────────────────────────────────

export default function ConversationsPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    "conv_1",
  );
  const [channelFilter, setChannelFilter] = useState<Channel>("all");
  const [messages, setMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const channelFilters: {
    value: Channel;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { value: "all", label: "All", icon: null },
    { value: "whatsapp", label: "WhatsApp", icon: <MessageCircle size={14} /> },
    { value: "email", label: "Email", icon: <Mail size={14} /> },
    { value: "instagram", label: "Instagram", icon: <Globe size={14} /> },
  ];

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesChannel =
      channelFilter === "all" || conv.channel === channelFilter;
    const matchesSearch =
      !searchQuery ||
      conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const activeConv = mockConversations.find((c) => c.id === activeConversation);
  const activeMessages = activeConversation
    ? (messages[activeConversation] ?? [])
    : [];

  const handleSendMessage = (text: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      content: text,
      senderId: CURRENT_USER_ID,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] ?? []), newMessage],
    }));
  };

  return (
    <div
      className="flex rounded-xl overflow-hidden"
      style={{
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-30)",
        height: "calc(100vh - 100px)",
      }}
    >
      {/* Left panel - Conversation list */}
      <div
        className="flex flex-col shrink-0"
        style={{
          width: 360,
          borderRight: "1px solid var(--grey-40)",
        }}
      >
        {/* Header */}
        <div
          className="p-4 space-y-3"
          style={{ borderBottom: "1px solid var(--grey-40)" }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-default)" }}
            >
              Inbox
            </h2>
            <Badge variant="secondary" className="font-semibold">
              {mockConversations.reduce((sum, c) => sum + c.unreadCount, 0)}{" "}
              unread
            </Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-subdued-2)" }}
            />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              style={{
                backgroundColor: "var(--surface-10)",
                border: "1px solid var(--grey-30)",
              }}
              aria-label="Search conversations"
            />
          </div>

          {/* Channel filters */}
          <div className="flex gap-1.5">
            {channelFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setChannelFilter(filter.value)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 transition-colors",
                )}
                style={{
                  backgroundColor:
                    channelFilter === filter.value
                      ? "var(--primary-10)"
                      : "var(--surface-10)",
                  color:
                    channelFilter === filter.value
                      ? "var(--primary-50)"
                      : "var(--text-subdued-1)",
                  border:
                    channelFilter === filter.value
                      ? "1px solid var(--primary-30)"
                      : "1px solid transparent",
                  cursor: "pointer",
                }}
                aria-pressed={channelFilter === filter.value}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation list */}
        <ScrollArea className="flex-1" type="always">
          <div className="p-2" role="listbox" aria-label="Conversations">
            {filteredConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversation}
                onClick={() => setActiveConversation(conversation.id)}
              />
            ))}
            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <p
                  className="text-sm"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  No conversations found
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel - Message thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeConv ? (
          <>
            {/* Conversation header */}
            <div
              className="flex items-center justify-between p-4 shrink-0"
              style={{ borderBottom: "1px solid var(--grey-40)" }}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback
                    style={{
                      backgroundColor: activeConv.contact.avatarColor,
                      color: "white",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {activeConv.contact.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-default)" }}
                  >
                    {activeConv.contact.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-subdued-1)" }}
                    >
                      {activeConv.contact.email || activeConv.contact.phone}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                      style={{
                        borderColor: getChannelColor(activeConv.channel),
                        color: getChannelColor(activeConv.channel),
                      }}
                    >
                      <span className="mr-1">
                        <ChannelIcon channel={activeConv.channel} size={10} />
                      </span>
                      {getChannelLabel(activeConv.channel)}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Phone call"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  <Phone size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Video call"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  <Video size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="More options"
                  style={{ color: "var(--text-subdued-1)" }}
                >
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea
              className="flex-1"
              type="always"
              style={{ backgroundColor: "var(--surface-10)" }}
            >
              <div className="p-6 space-y-1">
                {/* Date separator */}
                <div className="flex items-center gap-4 mb-6">
                  <Separator
                    className="flex-1"
                    style={{ backgroundColor: "var(--grey-30)" }}
                  />
                  <span
                    className="text-xs font-medium shrink-0"
                    style={{ color: "var(--text-subdued-2)" }}
                  >
                    Today
                  </span>
                  <Separator
                    className="flex-1"
                    style={{ backgroundColor: "var(--grey-30)" }}
                  />
                </div>

                {activeMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderId === CURRENT_USER_ID}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Composer */}
            <MessageComposer onSend={handleSendMessage} />
          </>
        ) : (
          <EmptyConversation />
        )}
      </div>
    </div>
  );
}
