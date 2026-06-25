import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-mono text-[13px] text-faint mb-6">arsh@arch:~$ cd /that-page</p>
        <div className="flex items-center justify-center gap-5">
          <span className="text-[clamp(56px,12vw,110px)] font-bold tracking-[-0.04em] leading-none">404</span>
          <span className="h-[64px] w-px bg-white/[0.12]" />
          <p className="text-left text-muted text-[15px] max-w-[24ch] leading-[1.5]">
            no such file or directory. this page wandered off, probably my fault.
          </p>
        </div>
        <Link href="/" className="inline-block mt-10 text-[14px] px-[22px] py-3 rounded-[9px] bg-ink text-bg font-medium transition hover:bg-white">
          take me home
        </Link>
      </div>
    </main>
  );
}
