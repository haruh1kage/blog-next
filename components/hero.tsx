'use client';

import Image from 'next/image';
import Badge from './tag';

export default function Hero() {
  return (
    <div className="max-w-screen-lg mx-auto mt-16 h-fit">
      <article className="p-8 flex flex-col-reverse md:flex-row md:justify-between items-center">
        <section className="max-w-[400px]">
          <h1 className="font-bold text-5xl text-center md:text-start">
            <span className="text-red-500 font-[family-name:var(--lobster-regular)]">
              Nina
            </span>{' '}
            Studio
          </h1>
          <div className="text-xl h-8 mt-8 gap-2 font-bold flex overflow-hidden ">
            <span>A Web Full Stack Developer&apos;s Blog</span>
          </div>
          <div className="mt-4">
            <span>
              Hi, I&apos;m hako, living in Shenzhen, currently focusing on nodejs full stack
              develop, and intersted in many things..
            </span>
          </div>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Badge>React</Badge>
            <Badge>Vue</Badge>
            <Badge>Nodejs</Badge>
            <Badge>Express</Badge>
            <Badge>Nestjs</Badge>
            <Badge>MySQL</Badge>
            <Badge>PostgreSQL</Badge>
            <Badge>MongoDB</Badge>
            <Badge>Elastic Search</Badge>
            <Badge>Reddis</Badge>
            <Badge>Docker</Badge>
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
