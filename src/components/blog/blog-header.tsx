import Image from "next/image";
import Link from "next/link";

export function BlogHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-950 px-3 py-1.5">
            <Image
              src="/images/logo-lockup.webp"
              alt="QuatroCar"
              width={600}
              height={334}
              className="h-6 w-auto sm:h-7"
            />
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Blog
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/blog" className="hover:text-slate-900">
            Artigos
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
          >
            Conheça o app
          </Link>
        </nav>
      </div>
    </header>
  );
}
