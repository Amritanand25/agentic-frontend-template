# Conversations Feature

**Type:** Feature
**Size:** Large
**Status:** UI Shell Built (master-detail layout, mock messages, no compose)
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** High
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Unified inbox for managing customer conversations across WhatsApp, Email, and Web (originally Instagram, changed due to Lucide icon availability).

### Implementation Notes

**What's built (`pages/app/conversations/index.tsx`):**

- Master-detail layout: conversation list (left) + message thread (right)
- Channel badges (WhatsApp, Email, Web) with colored icons
- Message bubbles with sent/received styling
- Persistent scrollbars (`ScrollArea type="always"`)
- Message preview wraps to 2 lines (`line-clamp-2`, `items-start`)
- Container height: `calc(100vh - 100px)`
- Mock conversations and messages hardcoded in page
- Channel filter section with checkboxes

**What's NOT built yet:**

- Message compose/send functionality
- File attachments
- Real-time sync / WebSocket
- Typing indicators
- Conversation assignment
- Internal notes

## Layout Pattern

**Pattern 5: Master-Detail** (Inbox style)

```
┌────────────────────────────────────────────────────────┐
│ 💬 Conversations          [All ▾] [Filter] [Search]    │
├──────────────┬─────────────────────────────────────────┤
│ Channels:    │ Acme Inc <contact@acme.com>            │
│ ☑ WhatsApp   │ Last message 2 hours ago               │
│ ☑ Email      ├─────────────────────────────────────────┤
│ ☑ Instagram  │                                         │
│              │ [user] Hey, can we schedule a demo?     │
│ ───────────  │ 10:45 AM                                │
│              │                                         │
│ [📧 Email]   │ [You] Sure! How about tomorrow at 2pm? │
│ Acme Inc     │ 10:47 AM                                │
│ 2 hours ago  │                                         │
│              │ [user] Perfect, see you then!           │
│ [📱 WhatsApp]│ 10:50 AM                                │
│ TechCorp     │                                         │
│ 1 day ago    │                                         │
│              │                                         │
│ [📷 Instagram│                                         │
│ StartupXYZ   │                                         │
│ 3 days ago   │ ┌─────────────────────────────────────┐ │
│              │ │ [Attachment icon] proposal.pdf      │ │
│ 320px        │ └─────────────────────────────────────┘ │
│              │                                         │
│              │ [Type a message...        ] [Send]     │
│              │ [📎] [😊] [📷]                          │
└──────────────┴─────────────────────────────────────────┘
```

## Requirements

### Core Features

- ✅ Unified inbox (all channels in one view)
- ✅ Channel filters (WhatsApp, Email, Instagram)
- ✅ Real-time message sync (WebSocket/polling)
- ✅ Thread view with message history
- ✅ Rich media support (images, files, videos)
- ✅ Message status (sent, delivered, read)
- ✅ Typing indicators
- ✅ Assignment to team members
- ✅ Internal notes (team only, not sent to customer)
- ✅ Emoji picker
- ✅ Search conversations

### Channel-Specific Features

| Feature         | WhatsApp | Email        | Instagram |
| --------------- | -------- | ------------ | --------- |
| Send text       | ✓        | ✓            | ✓         |
| Send image      | ✓        | ✓            | ✓         |
| Send file       | ✓        | ✓            | ✗         |
| Rich formatting | ✗        | ✓ (HTML)     | ✗         |
| Read receipts   | ✓        | ✓ (tracking) | ✓         |
| Emoji reactions | ✓        | ✗            | ✓         |

## Design Tokens

```css
/* Conversation list */
--conversation-item-bg: var(--surface-0);
--conversation-item-hover: var(--grey-20);
--conversation-item-active: var(--primary-20);
--conversation-unread: var(--primary-50);

/* Messages */
--message-sent-bg: var(--primary-50);
--message-sent-text: var(--text-inverse);
--message-received-bg: var(--grey-20);
--message-received-text: var(--text-default);
--message-timestamp: var(--text-subdued-2);

/* Composer */
--composer-bg: var(--surface-0);
--composer-border: var(--grey-40);
--composer-height: 80px;
```

## Components

### Existing (from packages/ui/src/)

- `Input`, `Button`, `Avatar`, `Badge`, `ScrollArea`
- `Popover`, `Tooltip`, `Separator`

### New Components

#### `ConversationList` (Medium)

Sidebar list of conversations

```typescript
interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  filters: ChannelFilter[];
}

<ScrollArea className="conversation-list">
  {conversations.map(conv => (
    <div
      key={conv.id}
      className={cn("conversation-item", {
        active: conv.id === activeId,
        unread: conv.unreadCount > 0
      })}
      onClick={() => onSelect(conv.id)}
    >
      <Avatar src={conv.contact.avatar} fallback={conv.contact.initials} />
      <div className="conversation-info">
        <div className="conversation-header">
          <span className="contact-name">{conv.contact.name}</span>
          <span className="timestamp">{formatTime(conv.lastMessageAt)}</span>
        </div>
        <div className="conversation-preview">
          <ChannelBadge channel={conv.channel} />
          <span className="last-message">{conv.lastMessage.preview}</span>
          {conv.unreadCount > 0 && (
            <Badge variant="primary">{conv.unreadCount}</Badge>
          )}
        </div>
      </div>
    </div>
  ))}
</ScrollArea>
```

#### `MessageThread` (Complex)

Main chat interface

```typescript
interface MessageThreadProps {
  conversation: Conversation;
  messages: Message[];
  onSend: (content: string, attachments?: File[]) => Promise<void>;
}

<div className="message-thread">
  {/* Header */}
  <div className="thread-header">
    <Avatar src={contact.avatar} />
    <div>
      <div className="contact-name">{contact.name}</div>
      <div className="contact-info">{contact.email}</div>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger>⋮</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Assign to...</DropdownMenuItem>
        <DropdownMenuItem>Add note</DropdownMenuItem>
        <DropdownMenuItem>View contact</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  {/* Messages */}
  <ScrollArea className="messages-container" ref={scrollRef}>
    {messages.map(msg => (
      <MessageBubble
        key={msg.id}
        message={msg}
        isOwn={msg.senderId === currentUserId}
      />
    ))}
    {isTyping && <TypingIndicator />}
  </ScrollArea>

  {/* Composer */}
  <MessageComposer
    onSend={onSend}
    channel={conversation.channel}
  />
</div>
```

#### `MessageBubble` (Simple)

Individual message display

```tsx
<div className={cn("message-bubble", { own: isOwn, received: !isOwn })}>
  {!isOwn && <Avatar src={sender.avatar} size="sm" />}

  <div className="message-content">
    {message.attachments?.map((att) => (
      <MessageAttachment key={att.id} attachment={att} />
    ))}
    <div className="message-text">{message.content}</div>
    <div className="message-meta">
      <span className="timestamp">{formatTime(message.sentAt)}</span>
      {isOwn && <MessageStatus status={message.status} />}
    </div>
  </div>
</div>
```

#### `MessageComposer` (Complex)

Message input with attachments, emoji

```tsx
<div className="message-composer">
  <div className="composer-toolbar">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => fileInputRef.current?.click()}
    >
      <Paperclip size={20} />
    </Button>
    <input type="file" ref={fileInputRef} onChange={handleFileSelect} hidden />

    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Smile size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <EmojiPicker onSelect={handleEmojiSelect} />
      </PopoverContent>
    </Popover>
  </div>

  <div className="composer-input">
    <Textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown} // Ctrl+Enter to send
      placeholder="Type a message..."
      rows={3}
    />
  </div>

  {attachments.length > 0 && (
    <div className="composer-attachments">
      {attachments.map((file) => (
        <AttachmentPreview
          key={file.name}
          file={file}
          onRemove={removeAttachment}
        />
      ))}
    </div>
  )}

  <Button
    onClick={handleSend}
    disabled={!message.trim() && attachments.length === 0}
  >
    <Send size={18} /> Send
  </Button>
</div>
```

#### `TypingIndicator` (Simple)

Shows when other person is typing

```tsx
<div className="typing-indicator">
  <Avatar src={contact.avatar} size="xs" />
  <div className="typing-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
```

## State Management

### Feature Store (Zustand)

```typescript
interface ConversationsStore {
  // Data
  conversations: Map<string, Conversation>;
  activeConversationId: string | null;
  channelFilters: Set<Channel>;

  // Actions
  loadConversations: () => Promise<void>;
  selectConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  markAsRead: (conversationId: string) => void;
  toggleChannelFilter: (channel: Channel) => void;

  // Real-time
  handleIncomingMessage: (message: Message) => void;
  setTypingStatus: (conversationId: string, isTyping: boolean) => void;
}
```

### TanStack Query

```typescript
// Fetch conversations
const { data: conversations } = useQuery({
  queryKey: ["conversations", tenantId, channelFilters],
  queryFn: () =>
    fetchConversations({ tenantId, channels: [...channelFilters] }),
  refetchInterval: 10000, // Poll every 10s (until WebSocket implemented)
});

// Fetch messages for conversation
const { data: messages } = useQuery({
  queryKey: ["messages", conversationId],
  queryFn: () => fetchMessages(conversationId),
  enabled: !!conversationId,
});

// Send message mutation
const sendMutation = useMutation({
  mutationFn: ({ conversationId, content, attachments }) =>
    sendMessage({ conversationId, content, attachments }),
  onMutate: async (vars) => {
    // Optimistic update
    const tempMessage = {
      id: `temp-${Date.now()}`,
      conversationId: vars.conversationId,
      content: vars.content,
      senderId: currentUserId,
      sentAt: new Date().toISOString(),
      status: "sending",
    };
    queryClient.setQueryData(["messages", vars.conversationId], (old) => [
      ...old,
      tempMessage,
    ]);
  },
  onSuccess: (data, vars) => {
    // Replace temp message with real one
    queryClient.setQueryData(["messages", vars.conversationId], (old) =>
      old.map((msg) => (msg.id.startsWith("temp-") ? data : msg)),
    );
  },
});
```

### Real-time (WebSocket) - Future Enhancement

```typescript
// For now: polling every 10s
// Future: WebSocket connection
useEffect(() => {
  const ws = new WebSocket(`wss://api.relio.com/conversations`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "new_message") {
      conversationsStore.handleIncomingMessage(data.message);
    } else if (data.type === "typing") {
      conversationsStore.setTypingStatus(data.conversationId, data.isTyping);
    }
  };

  return () => ws.close();
}, []);
```

## Mock Data

```typescript
const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    tenantId: "tenant_1",
    channel: "email",
    contact: {
      id: "contact_1",
      name: "Acme Inc",
      email: "contact@acme.com",
      avatar: null,
      initials: "AI",
    },
    lastMessage: {
      id: "msg_3",
      content: "Perfect, see you then!",
      sentAt: "2026-03-28T10:50:00Z",
      senderId: "contact_1",
      preview: "Perfect, see you then!",
    },
    lastMessageAt: "2026-03-28T10:50:00Z",
    unreadCount: 0,
    assignedTo: "user_1",
  },
  {
    id: "conv_2",
    tenantId: "tenant_1",
    channel: "whatsapp",
    contact: {
      id: "contact_2",
      name: "TechCorp",
      phone: "+1 555 123 4567",
      avatar: null,
      initials: "TC",
    },
    lastMessage: {
      id: "msg_5",
      content: "Thanks for the update!",
      sentAt: "2026-03-27T14:30:00Z",
      senderId: "contact_2",
      preview: "Thanks for the update!",
    },
    lastMessageAt: "2026-03-27T14:30:00Z",
    unreadCount: 2,
    assignedTo: null,
  },
];

const mockMessages: Message[] = [
  {
    id: "msg_1",
    conversationId: "conv_1",
    content: "Hey, can we schedule a demo?",
    senderId: "contact_1",
    sentAt: "2026-03-28T10:45:00Z",
    status: "read",
    attachments: [],
  },
  {
    id: "msg_2",
    conversationId: "conv_1",
    content: "Sure! How about tomorrow at 2pm?",
    senderId: "user_1",
    sentAt: "2026-03-28T10:47:00Z",
    status: "read",
    attachments: [],
  },
  {
    id: "msg_3",
    conversationId: "conv_1",
    content: "Perfect, see you then!",
    senderId: "contact_1",
    sentAt: "2026-03-28T10:50:00Z",
    status: "read",
    attachments: [
      {
        id: "att_1",
        type: "file",
        name: "proposal.pdf",
        size: 245000,
        url: "https://example.com/proposal.pdf",
      },
    ],
  },
];
```

## Interaction States

- **Conversation (unread):** Bold name, primary badge with count
- **Message (sending):** Opacity 0.6, spinner icon
- **Message (sent):** Single checkmark
- **Message (read):** Double checkmark (blue)
- **Typing:** Animated dots, subtle pulse
- **Attachment hover:** Show preview, download button

## Accessibility

- ✅ Screen reader announces new messages
- ✅ Keyboard: Arrow up/down to navigate conversations, Enter to select
- ✅ Focus visible on composer
- ✅ Alt text for images

## File Changes

| File                                                                  | Type   |
| --------------------------------------------------------------------- | ------ |
| `apps/web/src/pages/app/conversations/index.tsx`                      | Create |
| `apps/web/src/features/conversations/components/ConversationList.tsx` | Create |
| `apps/web/src/features/conversations/components/MessageThread.tsx`    | Create |
| `apps/web/src/features/conversations/components/MessageBubble.tsx`    | Create |
| `apps/web/src/features/conversations/components/MessageComposer.tsx`  | Create |
| `apps/web/src/features/conversations/components/TypingIndicator.tsx`  | Create |
| `apps/web/src/features/conversations/hooks/useConversations.ts`       | Create |
| `apps/web/src/features/conversations/stores/conversations-store.ts`   | Create |
| `apps/web/src/features/conversations/mock-data.ts`                    | Create |

## Acceptance Criteria

- ✅ View all conversations from 3 channels (WhatsApp, Email, Instagram)
- ✅ Filter by channel (toggle checkboxes)
- ✅ Click conversation to load message thread
- ✅ Send text message (appears immediately, optimistic update)
- ✅ Send image attachment (preview before send)
- ✅ Emoji picker works
- ✅ Unread badge updates when messages read
- ✅ Typing indicator shows when contact typing (mocked)
- ✅ Auto-scroll to latest message
- ✅ Mobile: Stack sidebar, slide-in thread view

---

**Next:** [Workflow Builder Feature](./feature-workflow-builder.md)
