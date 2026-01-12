'use client'

import { useState } from 'react'
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface BlogShareButtonsProps {
  title: string
  url: string
  excerpt?: string
}

export default function BlogShareButtons({ title, url, excerpt }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? window.location.href : url

  const handleShare = async (platform: string) => {
    const shareText = excerpt || title
    const encodedUrl = encodeURIComponent(fullUrl)
    const encodedTitle = encodeURIComponent(title)
    const encodedText = encodeURIComponent(shareText)

    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share:</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </button>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  )
}
