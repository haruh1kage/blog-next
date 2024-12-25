import Image from 'next/image';

export default function Hero() {
  return (
    <div className="w-full mt-16 h-fit">
      <article className="p-8 flex justify-between items-center">
        <section>
          <h1 className="font-bold text-4xl"><span className="text-red-500 cursor-pointer font-[family-name:var(--lobster-regular)]">Nina</span> Studio</h1>
          <p className="text-2xl mt-2">
            This is a blog shared by a Web Developer{' '}
          </p>
          <p className="mt-2">You can call me Hako.(not real name..)</p>
          <p>Currently, I'm focusing on full stack web develop with nodejs.</p>
          <p className="mt-2">Living and wokring in Shenzhen</p>
        </section>
        <section>
          <Image
            className="rounded-full"
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
