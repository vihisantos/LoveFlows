import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import StoryTimeline from "@/components/StoryTimeline";
import Countdown from "@/components/Countdown";
import VenueMap from "@/components/VenueMap";
import GiftRegistryCTA from "@/components/GiftRegistryCTA";
import RSVP from "@/components/RSVP";
import Guestbook from "@/components/Guestbook";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Hero />
      <StoryTimeline />
      <Countdown />
      <Gallery />
      <VenueMap />
      <RSVP />
      <GiftRegistryCTA />
      <Guestbook />

      <footer className="py-10 bg-[var(--pk-charcoal)] text-[var(--pk-text-muted)] text-center font-[family-name:var(--font-lato)] text-sm">
        <p>&copy; 2027 Noivo & Noiva. Todos os direitos reservados.</p>
        <p className="opacity-50 mt-2 text-xs uppercase tracking-widest">Criado por <a href="https://vihisantos.github.io/My.Portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--pk-text-muted)] text-[var(--pk-text-muted)] no-underline cursor-default">Capybara Holding</a></p>
      </footer>
    </main>
  );
}
