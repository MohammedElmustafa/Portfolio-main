import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import TimelineComponent from "@/components/TimelineComponent";
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <section className='w-full h-full'>
        <HeroBanner />
        <TimelineComponent />
        <BlogSection />
      </section>
      <Footer />
    </main>
  );
}
