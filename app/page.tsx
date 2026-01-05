import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Chatbot from '@/components/Chatbot'
import ChatbotFloatingButton from '@/components/ChatbotFloatingButton'
import CTASection from '@/components/CTASection'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CTASection variant="chat" message="Let's work together!" />
      <Experience />
      <CTASection variant="whatsapp" message="Want to discuss a project?" />
      <Projects />
      <CTASection variant="email" message="Have a question?" />
      <Skills />
      <CTASection variant="chat" message="Let's build something amazing!" />
      <Contact />
      <div id="chatbot-trigger" />
      <WhatsAppButton />
      <ChatbotFloatingButton />
    </>
  )
}

