import Link from "next/link";

export type SuiteProduct = {
  name: string;
  description: string;
  href: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export type SuiteLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  problemsTitle?: string;
  problems: string[];
  productsTitle: string;
  products: SuiteProduct[];
  useCasesTitle: string;
  useCases: string[];
  whyTitle: string;
  whyPoints: string[];
  finalTitle: string;
  finalDescription: string;
  finalHref: string;
  finalLabel: string;
};

function ActionLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const className = primary
    ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-hover"
    : "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5";

  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function SuiteLandingPage({
  eyebrow,
  title,
  description,
  problemsTitle = "Problems we focus on",
  problems,
  productsTitle,
  products,
  useCasesTitle,
  useCases,
  whyTitle,
  whyPoints,
  finalTitle,
  finalDescription,
  finalHref,
  finalLabel,
}: SuiteLandingPageProps) {
  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-4xl pb-16 sm:pb-20">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-red sm:text-xs">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-silver sm:text-lg">
            {description}
          </p>
        </section>

        <section className="border-y border-white/10 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">{problemsTitle}</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <div
                key={problem}
                className="rounded-xl border border-white/10 bg-[#0b1017] p-4 text-sm leading-relaxed text-silver"
              >
                {problem}
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">{productsTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-2xl border border-white/10 bg-[#0b1017] p-6 sm:p-7"
              >
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">
                  {product.description}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ActionLink href={product.href} primary>
                    {product.primaryLabel}
                  </ActionLink>
                  {product.secondaryHref && product.secondaryLabel ? (
                    <ActionLink href={product.secondaryHref}>
                      {product.secondaryLabel}
                    </ActionLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-y border-white/10 py-12 sm:py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{useCasesTitle}</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-silver">
              {useCases.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{whyTitle}</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-silver">
              {whyPoints.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 text-center sm:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {finalTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
            {finalDescription}
          </p>
          <div className="mt-8 flex justify-center">
            <ActionLink href={finalHref} primary>
              {finalLabel}
            </ActionLink>
          </div>
        </section>
      </div>
    </main>
  );
}
