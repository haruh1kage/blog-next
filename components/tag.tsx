import { PropsWithChildren } from 'react';

export default function Badge(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="px-2.5 py-0.5 border border-theme inline-flex items-center rounded-md text-xs font-semibold">
      {children}
    </div>
  );
}
