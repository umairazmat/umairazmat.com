'use client'

import { useEffect, useRef } from 'react'

interface AnalyticsData {
  page: string
  timestamp: number
  referrer?: string
  userAgent?: string
  screenWidth?: number
  screenHeight?: number
  timeOnPage?: number
  scrollDepth?: number
  clicks?: number
}

class Analytics {
  private startTime: number = Date.now()
  private scrollDepth: number = 0
  private clickCount: number = 0
  private maxScrollDepth: number = 0
  private isTracking: boolean = false

  init() {
    if (this.isTracking) return
    this.isTracking = true
    this.startTime = Date.now()

    // Track scroll depth
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true })
      document.addEventListener('click', this.handleClick.bind(this), { passive: true })
      
      // Track page visibility
      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
    }
  }

  private handleScroll() {
    if (typeof window === 'undefined') return
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
    
    this.maxScrollDepth = Math.max(this.maxScrollDepth, scrollPercent)
  }

  private handleClick() {
    this.clickCount++
  }

  private handleVisibilityChange() {
    if (document.hidden) {
      this.track('page_leave', {
        timeOnPage: Date.now() - this.startTime,
        scrollDepth: this.maxScrollDepth,
        clicks: this.clickCount,
      })
    }
  }

  track(event: string, data?: Partial<AnalyticsData>) {
    if (typeof window === 'undefined') return

    const analyticsData: AnalyticsData = {
      page: window.location.pathname,
      timestamp: Date.now(),
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timeOnPage: Date.now() - this.startTime,
      scrollDepth: this.maxScrollDepth,
      clicks: this.clickCount,
      ...data,
    }

    // Send to API endpoint (to be created)
    this.sendToAPI(event, analyticsData)
  }

  private async sendToAPI(event: string, data: AnalyticsData) {
    try {
      // Only send in production or if explicitly enabled
      if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ event, data }),
        })
      }
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics error:', error)
    }
  }

  getSessionData(): Partial<AnalyticsData> {
    return {
      timeOnPage: Date.now() - this.startTime,
      scrollDepth: this.maxScrollDepth,
      clicks: this.clickCount,
    }
  }
}

const analytics = new Analytics()

export function useAnalytics() {
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    analytics.init()

    // Track page view
    analytics.track('page_view', {
      page: window.location.pathname,
    })

    // Track when user leaves
    const handleBeforeUnload = () => {
      analytics.track('page_leave', analytics.getSessionData())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return {
    track: (event: string, data?: Partial<AnalyticsData>) => analytics.track(event, data),
  }
}

