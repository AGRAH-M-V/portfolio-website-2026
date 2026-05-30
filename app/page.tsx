import { ContactSection, CredentialsSection, ExperienceSection, MindsetSection, ProjectsSection, SkillsSection, CurrentlyExploringSection } from "@/components/sections";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Loader } from "@/components/loader";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12 lg:gap-24">
          <Hero />
          
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] items-start gap-12 lg:gap-16 pb-24">
            <div className="flex flex-col gap-12 lg:gap-16">
              <ExperienceSection />
              <SkillsSection />
              <MindsetSection />
            </div>
            
            <div className="flex flex-col gap-12 lg:gap-16">
              <ProjectsSection />
              <CurrentlyExploringSection />
              <CredentialsSection />
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
