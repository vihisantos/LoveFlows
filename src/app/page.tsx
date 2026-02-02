import Hero from "@/components/Hero";
import StoryTimeline from "@/components/StoryTimeline";
import Countdown from "@/components/Countdown";
import VenueMap from "@/components/VenueMap";
import RSVP from "@/components/RSVP";
import Guestbook from "@/components/Guestbook";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <StoryTimeline />
      <Countdown />
      <VenueMap />
      <Gallery />
      <RSVP />
      <Guestbook />

      <footer className="py-10 bg-[var(--pk-charcoal)] text-[var(--pk-text-muted)] text-center font-[family-name:var(--font-lato)] text-sm">
        <p>&copy; 2026 Gustavo & Jéssica. Todos os direitos reservados.</p>
        <p className="opacity-50 mt-2 text-xs uppercase tracking-widest">Criado por Capybara Holding</p>
      </footer>
    </main>
  );
}
