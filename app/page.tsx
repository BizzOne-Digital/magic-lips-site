import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteEffects from "@/components/ui/SiteEffects";
import SimpleHero from "@/components/home/SimpleHero";
import NewsletterSection from "@/components/home/NewsletterSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import OffersSection from "@/components/home/OffersSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <SiteEffects>
      <div className="min-h-screen w-full overflow-x-clip bg-white">
        <Header />
        <main>
          <SimpleHero />
          <NewsletterSection />
          <CategoriesSection />
          <FeaturedProducts />
          <OffersSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SiteEffects>
  );
}
