'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/constants'
import ContactModal from '@/components/ContactModal'

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="contact" className="section-container bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          I&apos;m always open to discussing new opportunities, interesting projects, or just
          having a chat about technology. Let&apos;s connect!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card text-center"
          >
            <Mail className="mx-auto mb-4 text-primary-600" size={32} />
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-primary-600 hover:underline"
            >
              {personalInfo.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card text-center"
          >
            <CheckCircle className="mx-auto mb-4 text-primary-600" size={32} />
            <h3 className="font-bold text-lg mb-2">Availability</h3>
            <p className="text-gray-600">{personalInfo.availability}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card text-center"
          >
            <Send className="mx-auto mb-4 text-primary-600" size={32} />
            <h3 className="font-bold text-lg mb-2">Response Time</h3>
            <p className="text-gray-600">{personalInfo.responseTime}</p>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto"
        >
          <Send size={20} />
          Send Message
        </motion.button>

        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </motion.div>
    </section>
  )
}

