'use client'

import { Calendar, Mail, MessageSquare, ExternalLink } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useState } from 'react'
import ContactModal from './ContactModal'

export default function BlogSidebar() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <aside className="sticky top-20 space-y-4">
      {/* Contact CTA */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Get in Touch
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Have a project in mind? Let&apos;s discuss how I can help.
        </p>
        <div className="space-y-2">
          <a
            href={personalInfo.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            <Calendar size={16} />
            Schedule a Call
          </a>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-2 w-full px-4 py-2.5 bg-transparent border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:text-sky-400 dark:hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            <MessageSquare size={16} />
            Send Message
          </button>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            <Mail size={16} />
            Email Me
          </a>
        </div>
      </div>

      {/* Ad Space / Tools */}
      <div className="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 backdrop-blur-sm rounded-xl p-5 border border-sky-200 dark:border-sky-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Tools & Resources
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Useful development tools and resources I use.
        </p>
        <div className="space-y-2">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
          >
            <span>GitHub Profile</span>
            <ExternalLink size={14} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
          >
            <span>LinkedIn</span>
            <ExternalLink size={14} />
          </a>
          <a
            href={personalInfo.resumeUrl}
            download
            className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
          >
            <span>Download Resume</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </aside>
  )
}
