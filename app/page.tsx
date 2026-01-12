import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import InstantProof from '@/components/sections/InstantProof'
import SkillsTechStack from '@/components/sections/SkillsTechStack'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Experiences from '@/components/sections/Experiences'
import HowIWork from '@/components/sections/HowIWork'
import WhoIWorkWith from '@/components/sections/WhoIWorkWith'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
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
    <div className="overflow-x-hidden w-full">
      {/* Primary User Journey - Recruiter-Focused */}
      <Hero />
      <AboutMe />
      <InstantProof />
      <SkillsTechStack />
      <FeaturedProjects />
      <Experiences />
      <HowIWork />
      <WhoIWorkWith />
      <Testimonials />
      <FAQ />
      <LetsBuild />
      {/* Floating Actions */}
      <div id="chatbot-trigger" />
      <WhatsAppButton />
      <ChatbotFloatingButton />
    </div>
  )
}

