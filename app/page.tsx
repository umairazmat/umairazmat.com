import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Volunteer from '@/components/sections/Volunteer'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Certificates from '@/components/sections/Certificates'
import Learning from '@/components/sections/Learning'
import References from '@/components/sections/References'
import AppointmentSystem from '@/components/AppointmentSystem'
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
      <Volunteer />
      <CTASection variant="email" message="Have a question?" />
      <Projects />
      <CTASection variant="chat" message="Let's build something amazing!" />
      <Skills />
      <Certificates />
      <CTASection variant="whatsapp" message="Interested in my certifications?" />
      <Learning />
      <CTASection variant="email" message="Want to learn together?" />
      <References />
      <AppointmentSystem />
      <CTASection variant="chat" message="Ready to schedule a meeting?" />
      <Contact />
      <div id="chatbot-trigger" />
      <WhatsAppButton />
      <ChatbotFloatingButton />
    </>
  )
}

