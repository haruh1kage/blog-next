'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="max-w-screen-lg mx-auto mt-16 h-fit">
      <article className="p-8 flex flex-col-reverse md:flex-row md:justify-between items-center">
        <section>
          <h1 className="font-bold text-5xl text-center md:text-start">
            <span className="text-red-500 cursor-pointer font-[family-name:var(--lobster-regular)]">
              Nina
            </span>{' '}
            Studio
          </h1>
          <div className="text-2xl h-8 mt-8 gap-2 font-bold flex overflow-hidden">
            <span>A</span>
            <motion.div className="h-24" animate={{ y: [0, -32, -64, -96, -64, -32, 0] }} transition={{ repeat: Infinity, duration: 18, ease: 'backInOut' }}>
              <div>Front-End</div>
              <div>Back-End</div>
              <div>Full Stack</div>
              <div className="font-[family-name:var(--pixelify-sans-regular)]">
                Indie Game
              </div>
            </motion.div>
            <span> Developer&apos;s Blog</span>
          </div>
        </section>
        <section>
          <Image
            className="rounded-full mb-8 md:mb-0"
            src="/nina3.jpg"
            alt="nina logo"
            width={256}
            height={256}
          />
        </section>
      </article>
    </div>
  );
}
