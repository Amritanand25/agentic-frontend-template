# Optimistic Updates Example

This example shows how to implement optimistic UI updates for instant user feedback.

## What Are Optimistic Updates?

Optimistic updates immediately update the UI before the server responds, making the app feel instant. If the server request fails, the UI rolls back to the previous state.

## Example: Like/Unlike a Post

### File: `apps/web/src/features/posts/api/like-post.ts`

```typescript
import { AuthInstance } from "@/api/axios-instances";

export interface LikePostDto {
  postId: string;
  userId: string;
}

export async function likePost(dto: LikePostDto): Promise<void> {
  await AuthInstance.post(`/posts/${dto.postId}/like`, { userId: dto.userId });
}

export async function unlikePost(dto: LikePostDto): Promise<void> {
  await AuthInstance.delete(`/posts/${dto.postId}/like`, {
    data: { userId: dto.userId },
  });
}
```

### File: `apps/web/src/features/posts/hooks/use-like-post.ts`

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost, LikePostDto } from "../api/like-post";

interface Post {
  id: string;
  title: string;
  likes: string[]; // Array of user IDs who liked
  likesCount: number;
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: LikePostDto & { isLiked: boolean }) => {
      return dto.isLiked ? unlikePost(dto) : likePost(dto);
    },

    // Optimistic update - runs immediately before API call
    onMutate: async ({ postId, userId, isLiked }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts", postId] });

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData<Post>(["posts", postId]);

      // Optimistically update the cache
      queryClient.setQueryData<Post>(["posts", postId], (old) => {
        if (!old) return old;

        return {
          ...old,
          likes: isLiked
            ? old.likes.filter((id) => id !== userId) // Remove like
            : [...old.likes, userId], // Add like
          likesCount: isLiked ? old.likesCount - 1 : old.likesCount + 1,
        };
      });

      // Return context with snapshot
      return { previousPost };
    },

    // If mutation fails, rollback to previous value
    onError: (error, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ["posts", variables.postId],
          context.previousPost,
        );
      }
      console.error("Failed to update like:", error);
    },

    // Always refetch after success or error
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts", variables.postId] });
    },
  });
}
```

### File: `apps/web/src/features/posts/components/like-button.tsx`

```tsx
import { Heart } from "lucide-react";
import { useLikePost } from "../hooks/use-like-post";
import { cn } from "@repo/utils";

interface LikeButtonProps {
  postId: string;
  userId: string;
  isLiked: boolean;
  likesCount: number;
}

export function LikeButton({
  postId,
  userId,
  isLiked,
  likesCount,
}: LikeButtonProps) {
  const { mutate: toggleLike, isPending } = useLikePost();

  const handleClick = () => {
    toggleLike({ postId, userId, isLiked });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
        isLiked ? "text-red-500" : "text-grey-60 hover:text-red-500",
      )}
    >
      <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
      <span>{likesCount}</span>
    </button>
  );
}
```

## Example: Delete with Optimistic Update

### File: `apps/web/src/features/posts/hooks/use-delete-post.ts`

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/delete-post";

interface Post {
  id: string;
  title: string;
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onMutate: async (postId: string) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous list
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Optimistically remove from list
      queryClient.setQueryData<Post[]>(["posts"], (old) => {
        return old?.filter((post) => post.id !== postId) ?? [];
      });

      return { previousPosts };
    },

    onError: (error, postId, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      console.error("Failed to delete post:", error);
    },

    onSuccess: () => {
      // Show success message
      alert("Post deleted successfully!");
    },

    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
```

## Example: Edit with Optimistic Update

### File: `apps/web/src/features/posts/hooks/use-update-post.ts`

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, UpdatePostDto } from "../api/update-post";

interface Post {
  id: string;
  title: string;
  content: string;
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,

    onMutate: async (dto: UpdatePostDto) => {
      await queryClient.cancelQueries({ queryKey: ["posts", dto.id] });

      const previousPost = queryClient.getQueryData<Post>(["posts", dto.id]);

      // Optimistically update
      queryClient.setQueryData<Post>(["posts", dto.id], (old) => {
        if (!old) return old;
        return { ...old, ...dto };
      });

      return { previousPost };
    },

    onError: (error, dto, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["posts", dto.id], context.previousPost);
      }
    },

    onSettled: (data, error, dto) => {
      queryClient.invalidateQueries({ queryKey: ["posts", dto.id] });
    },
  });
}
```

## Key Steps for Optimistic Updates

1. **Cancel outgoing queries** - `queryClient.cancelQueries()`
2. **Snapshot previous value** - `queryClient.getQueryData()`
3. **Update cache optimistically** - `queryClient.setQueryData()`
4. **Return context** - Return snapshot in `onMutate`
5. **Rollback on error** - Restore snapshot in `onError`
6. **Refetch on settled** - `queryClient.invalidateQueries()` in `onSettled`

## When to Use Optimistic Updates

✅ **Good use cases:**

- Like/unlike actions
- Increment counters
- Delete items from lists
- Toggle checkboxes
- Simple updates (title, status, etc.)

❌ **Avoid for:**

- Complex validations
- Server-side calculations
- Critical data (payments, auth)
- Scenarios where failure is likely

## Benefits

- **Instant feedback** - UI updates immediately
- **Better UX** - App feels fast and responsive
- **Auto-rollback** - Handles errors gracefully
- **Consistency** - Always refetches to sync with server
