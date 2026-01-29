import { HeroSection } from "./HeroSection";
import { Header } from "./Header";
import { NewsSection } from "./NewsSection";
import { JobPortalSection } from "./JobPortalSection";
import { MarketplaceSection } from "./MarketplaceSection";
import { EventsSection } from "./EventSection";

export function UserDashboard() {
    return (
        <div>
            <Header />
            <HeroSection />
            <NewsSection />
            <JobPortalSection />
            <MarketplaceSection />
            <EventsSection />
        </div>
    );
}