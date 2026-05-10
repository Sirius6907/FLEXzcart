import { Link } from "react-router";
import { HeadphonesIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-base-content">
              <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg border border-primary/30 bg-neutral/80 shadow-[0_0_18px_rgba(245,183,43,0.16)]">
                <img
                  src="/flexzcart-crown.jpg"
                  alt="FLEXzcart crown logo"
                  className="h-full w-full object-cover"
                />
              </span>
              FLEXzcart
            </div>
            <p className="mt-3 text-sm leading-relaxed text-base-content/65">
              Curated electronics and workspace essentials with a premium retail feel. Paid orders
              include priority support, private chat, and video assistance when needed.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Shop
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="link link-hover text-base-content/80">
                  All products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="link link-hover text-base-content/80">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="link link-hover text-base-content/80">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li className="flex items-start gap-2">
                <HeadphonesIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>Order-scoped chat after payment; video links shared in-thread.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Company
            </h3>
            <p className="mt-3 text-sm text-base-content/65">
              FLEXzcart brings together premium daily-use technology, clean fulfillment, and human
              support when it matters.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4 border-t border-base-300 pt-6">
          <p className="text-center text-xs text-base-content/50">
            © {new Date().getFullYear()} FLEXzcart · All prices in USD
          </p>
        </div>
      </div>
    </footer>
  );
}
