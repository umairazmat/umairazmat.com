import Hero from '@/components/sections/Hero'
import InstantProof from '@/components/sections/InstantProof'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import HowIWork from '@/components/sections/HowIWork'
import WhoIWorkWith from '@/components/sections/WhoIWorkWith'
import LetsBuild from '@/components/sections/LetsBuild'
import SkillsCondensed from '@/components/sections/SkillsCondensed'
import ExperienceCondensed from '@/components/sections/ExperienceCondensed'
import Experience from '@/components/sections/Experience'
import TrustSection from '@/components/sections/TrustSection'
import FinalCTA from '@/components/sections/FinalCTA'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import AboutRedesigned from '@/components/sections/AboutRedesigned'
import Contact from '@/components/sections/Contact'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatbotFloatingButton from '@/components/ChatbotFloatingButton'

export default function Home() {
  return (
    <>
      {/* Primary User Journey - Recruiter-Focused */}
      <Hero />
      <InstantProof />
      <FeaturedProjects />
      <HowIWork />
      <WhoIWorkWith />
      <LetsBuild />
      {/* <div id="projects-full">
        <Projects />
      </div>
      <SkillsCondensed />
      <ExperienceCondensed />
      <TrustSection />
      <FinalCTA /> */}
      
      {/* Secondary Sections - Below the fold */}
      {/* <div id="experience-full">
        <Experience />
      </div>
      <Contact />
       */}
      {/* Floating Actions */}
      <div id="chatbot-trigger" />
      <WhatsAppButton />
      <ChatbotFloatingButton />
    </>
  )
}

