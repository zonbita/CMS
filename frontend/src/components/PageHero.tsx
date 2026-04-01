import Image from "next/image";

export function PageHero({
  title,
  subtitle,
  imageUrl,
}: {
  title: string;
  subtitle?: string;
  imageUrl: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-zinc-950">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover opacity-70"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
      </div>
      <div className="relative p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-white">{title}</h1>
        {subtitle ? (
          <p className="text-white/80 mt-3 max-w-3xl whitespace-pre-line">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

