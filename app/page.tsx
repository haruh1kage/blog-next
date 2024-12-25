import Hero from '@/components/hero';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="pt-[80px]">
      <main className="px-8">
        <Hero />
        <div className="mt-8">
          <section>
            <h2 className="text-xl font-bold">
              Tech Stack <hr />
            </h2>
          </section>
          <section>
            <h2 className="text-xl font-bold">
              Projects <hr />
            </h2>
          </section>
        </div>
      </main>
    </div>
  );
}
