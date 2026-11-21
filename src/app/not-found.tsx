import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="glow-bg flex min-h-[90vh] items-center justify-center px-5 pt-32 pb-20">
      <div className="glass max-w-[560px] p-10 text-center">
        <p className="mb-2 font-heading text-[96px] font-black leading-none text-accent">404</p>
        <h1 className="mb-3 text-3xl font-black">Pagina nu a fost găsită</h1>
        <p className="mx-auto mb-8 max-w-md text-muted">
          Se pare că te-ai rătăcit prin grădină. Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-cta !px-6 !py-3"><Home className="h-5 w-5" /> Acasă</Link>
          <Link href="/servicii" className="btn-ghost glass !px-6 !py-3">Servicii <ArrowRight className="h-5 w-5" /></Link>
        </div>
      </div>
    </section>
  );
}
