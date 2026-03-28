# Collaboration Feature

**Type:** Feature
**Size:** Medium
**Status:** Not Started
**Created:** 2026-03-28
**Updated:** 2026-03-28
**Priority:** Low
**Parent:** [Relio CRM Platform](./module-relio-crm.md)

## Overview

Team collaboration tools: comments, @mentions, activity timeline, and record watchers.

## Requirements

- ✅ Comments on records
- ✅ @mention team members (triggers notification)
- ✅ Activity timeline (who changed what, when)
- ✅ Watch/unwatch records (get notified on changes)
- ✅ Rich text editor for comments
- ✅ Edit/delete own comments
- ✅ Reply to comments (threading)

## Components

### `CommentSection` (Medium)

```tsx
<div className="comment-section">
  <div className="comment-header">
    <h3>Comments ({comments.length})</h3>
    <Button variant="ghost" onClick={() => setWatching(!watching)}>
      {watching ? <BellOff size={16} /> : <Bell size={16} />}
      {watching ? "Unwatch" : "Watch"}
    </Button>
  </div>

  <div className="comment-composer">
    <Avatar src={currentUser.avatar} size="sm" />
    <RichTextEditor
      value={newComment}
      onChange={setNewComment}
      placeholder="Add a comment... (Use @ to mention)"
      mentions={teamMembers}
    />
    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
      Comment
    </Button>
  </div>

  <div className="comments-list">
    {comments.map((comment) => (
      <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
    ))}
  </div>
</div>
```

### `CommentItem` (Simple)

```tsx
<div className="comment-item">
  <Avatar src={comment.author.avatar} />
  <div className="comment-content">
    <div className="comment-header">
      <span className="author-name">{comment.author.name}</span>
      <span className="timestamp">{formatTime(comment.createdAt)}</span>
      {comment.authorId === currentUserId && (
        <DropdownMenu>
          <DropdownMenuTrigger>⋮</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editComment(comment.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteComment(comment.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
    <div
      className="comment-text"
      dangerouslySetInnerHTML={{ __html: comment.content }}
    />
    <Button variant="ghost" size="sm" onClick={() => onReply(comment.id)}>
      <CornerDownRight size={14} /> Reply
    </Button>
    {comment.replies?.length > 0 && (
      <div className="comment-replies">
        {comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    )}
  </div>
</div>
```

### `ActivityTimeline` (Medium)

```tsx
<div className="activity-timeline">
  <div className="timeline-header">
    <h3>Activity</h3>
    <Select value={filter} onValueChange={setFilter}>
      <SelectItem value="all">All Activity</SelectItem>
      <SelectItem value="comments">Comments Only</SelectItem>
      <SelectItem value="updates">Updates Only</SelectItem>
    </Select>
  </div>

  <ScrollArea className="timeline-items">
    {activities.map((activity, index) => (
      <div key={activity.id} className="timeline-item">
        <div className="timeline-dot" />
        {index < activities.length - 1 && <div className="timeline-line" />}
        <div className="timeline-content">
          <div className="timeline-header">
            <Avatar src={activity.user.avatar} size="xs" />
            <span className="activity-text">
              <strong>{activity.user.name}</strong> {activity.action}
            </span>
            <span className="timestamp">{formatTime(activity.timestamp)}</span>
          </div>
          {activity.details && (
            <div className="activity-details">
              {activity.details.field}: {activity.details.oldValue} →{" "}
              {activity.details.newValue}
            </div>
          )}
        </div>
      </div>
    ))}
  </ScrollArea>
</div>
```

## Mock Data

```typescript
const mockComments: Comment[] = [
  {
    id: "comment_1",
    recordId: "rec_1",
    authorId: "user_1",
    author: { name: "John Doe", avatar: null },
    content: "Great progress on this deal! @jane can you follow up?",
    mentions: ["user_2"],
    createdAt: "2026-03-28T10:30:00Z",
    replies: [
      {
        id: "comment_2",
        parentId: "comment_1",
        authorId: "user_2",
        author: { name: "Jane Smith", avatar: null },
        content: "Sure, I'll reach out tomorrow!",
        createdAt: "2026-03-28T11:00:00Z",
      },
    ],
  },
];

const mockActivities: Activity[] = [
  {
    id: "activity_1",
    recordId: "rec_1",
    userId: "user_1",
    user: { name: "John Doe", avatar: null },
    action: "updated",
    timestamp: "2026-03-28T14:20:00Z",
    details: { field: "Status", oldValue: "Lead", newValue: "Active" },
  },
  {
    id: "activity_2",
    recordId: "rec_1",
    userId: "user_2",
    user: { name: "Jane Smith", avatar: null },
    action: "commented",
    timestamp: "2026-03-28T11:00:00Z",
  },
];
```

## Acceptance Criteria

- ✅ Add comment on record
- ✅ @mention team member (shows autocomplete, sends notification)
- ✅ Reply to comment (threaded)
- ✅ Edit/delete own comment
- ✅ Activity timeline shows field updates + comments
- ✅ Watch record (bell icon toggles)

---

**Next:** [Auth Pages](./page-auth.md)
