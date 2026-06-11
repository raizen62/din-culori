const ITEMS = ['Nunți', 'Portrete', 'Evenimente', 'Food', 'Concerte', 'Photobooth', 'Botezuri'];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {ITEMS.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-display text-[clamp(2.6rem,5.5vw,4.8rem)] uppercase leading-none md:px-10 ${
              i % 2 === 0 ? 'text-[var(--cream)]' : 'text-stroke-cream'
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="text-spectrum font-serif text-2xl italic md:text-3xl">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--hairline-soft)] bg-[var(--ink)] py-7 md:py-9">
      <div className="marquee-track" aria-label="Nunți, Portrete, Evenimente, Food, Concerte, Photobooth, Botezuri">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
