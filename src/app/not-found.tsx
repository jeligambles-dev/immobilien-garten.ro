import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-24">
      <div className="text-center px-4">
        <p className="text-8xl font-heading font-extrabold text-green-200 mb-4">
          404
        </p>
        <h1 className="font-heading font-bold text-slate-900 text-2xl sm:text-3xl mb-3">
          Pagina nu a fost găsită
        </h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Se pare că te-ai rătăcit prin grădină. Pagina pe care o cauți nu
          există sau a fost mutată.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            <Home className="h-5 w-5" />
            Acasă
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 border border-green-200 text-green-700 font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
