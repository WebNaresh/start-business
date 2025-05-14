import AboutHero from './_components/about-hero'
import AboutMission from './_components/about-mission'
import AboutValues from './_components/about-values'
import AboutTimeline from './_components/about-timeline'
// import AboutTeam from './_components/about-team'
// import AboutAwards from './_components/about-awards'
import AboutTestimonial from './_components/about-testimonial'


export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTimeline />
      {/* <AboutTeam />
      <AboutAwards /> */}
      <AboutTestimonial />
    
    </div>
  )
}
