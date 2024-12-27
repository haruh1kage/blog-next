import Badge from '@/components/tag';
import { readFileSync } from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';

const root = process.cwd() + '/posts';

export default async function Blog() {
  const markdown = readFileSync(root + '/test.mdx');
  return (
    <div className=" flex justify-center">
      <article className="w-full max-w-screen-lg">
        <section className="mt-8 border-b border-theme pb-4">
          <h1 className="text-3xl">ubunut server自建幸福工厂服务器</h1>
          <p className="mt-4 text-lg">
            ubunut server自建幸福工厂服务器，使用systemctl运行，启动自动更新
          </p>
          <div className="mt-2">
            <Badge>React</Badge>
          </div>
          <div className="mt-2 text-sm text-gray-500">Dec 26, 2024</div>
        </section>
        <section className="mt-4 relative">
          <div>
            <MDXRemote source={markdown} />
          </div>
          <div className="absolute right-0 top-0 text-gray-500">
            <ul>
              <li>link1</li>
              <li>link2</li>
            </ul>
          </div>
        </section>
      </article>
      {/* <MDXRemote source={markdown} /> */}
    </div>
  );
}
