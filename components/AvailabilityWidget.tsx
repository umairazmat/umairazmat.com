'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, MapPin, Code, Calendar } from 'lucide-react'
import { personalInfo } from '@/constants'

export default function AvailabilityWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card max-w-md mx-auto lg:mx-0"
    >
      <div className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" size={24} />
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {personalInfo.availability}
            </h3>
            <p className="text-sm text-gray-600">Open to new opportunities</p>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex items-center gap-3">
          <MapPin className="text-primary-600" size={20} />
          <div>
            <p className="font-semibold text-gray-900">Location & Timezone</p>
            <p className="text-sm text-gray-600">{personalInfo.timezone}</p>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-center gap-3">
          <Clock className="text-primary-600" size={20} />
          <div>
            <p className="font-semibold text-gray-900">Response Time</p>
            <p className="text-sm text-gray-600">{personalInfo.responseTime}</p>
          </div>
        </div>

        {/* Preferred Stack */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Code className="text-primary-600" size={20} />
            <p className="font-semibold text-gray-900">Preferred Stack</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {personalInfo.preferredStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Schedule Button */}
        <a
          href={personalInfo.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Calendar size={20} />
          Schedule a Call
        </a>
      </div>
    </motion.div>
  )
}

