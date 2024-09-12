import { CallToAction } from "@/components/call-to-action";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Pictures } from "@/components/pictures";
import { Quotes } from "@/components/quotes";
import { TestimonialStudent } from "@/components/testimonial-student";
import { TestimonialVideo } from "@/components/testimonial-video";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-40">
        <Hero />
        <Features />
        <Quotes />
        <CallToAction />
        <Pictures />
        <TestimonialStudent />
        <TestimonialVideo />
      </main>
      <Footer />
    </>
  );
}
