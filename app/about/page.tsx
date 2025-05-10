import AboutHero from "@/components/about/about-hero"
import AboutMission from "@/components/about/about-mission"
import AboutTeam from "@/components/about/about-team"
import AboutValues from "@/components/about/about-values"
import AboutTimeline from "@/components/about/about-timeline"
import AboutCta from "@/components/about/about-cta"
import AboutAwards from "@/components/about/about-awards"
import AboutTestimonial from "@/components/about/about-testimonial"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <AboutAwards />
      <AboutTestimonial />
      <AboutCta />
    </div>
  )
}
