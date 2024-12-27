import Hero from '@/components/hero';
import Badge from '@/components/tag';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="pt-[80px]">
      <main className="px-8">
        <Hero />
        <div className="max-w-screen-lg mx-auto mt-16 h-fit">
          <h2 className="font-bold text-xl">Latest</h2>
          <hr />
        </div>
      </main>
    </div>
  );
}
