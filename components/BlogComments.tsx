'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ThumbsUp, ThumbsDown, Flag, Reply, Send, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

interface Comment {
  id: string
  postSlug: string
  author: string
  email: string
  content: string
  parentId?: string
  likes: number
  dislikes: number
  createdAt: string
  replies?: Comment[]
  isApproved: boolean
}

interface BlogCommentsProps {
  postSlug: string
}

export default function BlogComments({ postSlug }: BlogCommentsProps) {
  const { t } = useTranslation()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: '',
    parentId: '',
  })

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postSlug=${postSlug}`)
      if (response.ok) {
        const data = await response.json()
        // Organize comments into a tree structure
        const organized = organizeComments(data.comments || [])
        setComments(organized)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const organizeComments = (allComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>()
    const rootComments: Comment[] = []

    // First pass: create map and add replies array
    allComments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Second pass: organize into tree
    allComments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId)
        if (parent) {
          parent.replies = parent.replies || []
          parent.replies.push(commentWithReplies)
        }
      } else {
        rootComments.push(commentWithReplies)
      }
    })

    return rootComments
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.author || !formData.email || !formData.content) {
      toast.error(t('comments.fillAllFields', 'Please fill all fields'))
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error(t('comments.invalidEmail', 'Please enter a valid email'))
      return
    }

    const toastId = toast.loading(t('comments.submitting', 'Submitting comment...'))

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          postSlug,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit comment')
      }

      toast.success(t('comments.submitted', 'Comment submitted! It will be visible after moderation.'), {
        id: toastId,
      })

      setFormData({ author: '', email: '', content: '', parentId: '' })
      setReplyingTo(null)
      setShowForm(false)
      fetchComments()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t('comments.error', 'Failed to submit comment. Please try again.'),
        { id: toastId }
      )
    }
  }

  const handleLike = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.error('Error liking comment:', error)
    }
  }

  const handleDislike = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/dislike`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.error('Error disliking comment:', error)
    }
  }

  const handleReport = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/report`, {
        method: 'POST',
      })

      if (response.ok) {
        toast.success(t('comments.reported', 'Comment reported. Thank you for your feedback.'))
      }
    } catch (error) {
      console.error('Error reporting comment:', error)
    }
  }

  const startReply = (commentId: string) => {
    setReplyingTo(commentId)
    setFormData({ ...formData, parentId: commentId })
    setShowForm(true)
  }

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-4 ${depth > 0 ? 'ml-6 sm:ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}
    >
      <div className="card p-4">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs">
          <button
            onClick={() => handleLike(comment.id)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ThumbsUp size={14} />
            <span>{comment.likes || 0}</span>
          </button>
          <button
            onClick={() => handleDislike(comment.id)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ThumbsDown size={14} />
            <span>{comment.dislikes || 0}</span>
          </button>
          {depth < 2 && (
            <button
              onClick={() => startReply(comment.id)}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Reply size={14} />
              {t('comments.reply', 'Reply')}
            </button>
          )}
          <button
            onClick={() => handleReport(comment.id)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors ml-auto"
          >
            <Flag size={14} />
            {t('comments.report', 'Report')}
          </button>
        </div>

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-primary-600 dark:text-primary-400" size={24} />
        <h2 className="text-2xl font-bold">
          {t('comments.title', 'Comments')} ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <form onSubmit={handleSubmit} className="card p-6 space-y-4">
              {replyingTo && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('comments.replyingTo', 'Replying to comment')}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('comments.namePlaceholder', 'Your name')}
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  placeholder={t('comments.emailPlaceholder', 'Your email')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <textarea
                placeholder={t('comments.messagePlaceholder', 'Your comment...')}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="input-field min-h-[100px]"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Send size={16} />
                  {t('comments.submit', 'Submit Comment')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setReplyingTo(null)
                    setFormData({ author: '', email: '', content: '', parentId: '' })
                  }}
                  className="btn-secondary"
                >
                  {t('comments.cancel', 'Cancel')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Form Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary mb-8 flex items-center gap-2"
        >
          <MessageSquare size={18} />
          {t('comments.addComment', 'Add a Comment')}
        </button>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          {t('comments.noComments', 'No comments yet. Be the first to comment!')}
        </p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  )
}
