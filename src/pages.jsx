import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MapPin, Minus, Plus, Quotes, Star, WhatsappLogo } from "@phosphor-icons/react";
import { Breadcrumbs, Parallax, ProductCard, Reveal, ScrollDepth, SectionTitle, TiltCard, ValueProps } from "./components";
import { collections, money, products, reviews } from "./data";

function Hero3D() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.16]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : .92]);
  const lineX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const lineRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -4]);

  return (
    <section ref={ref} className="relative min-h-[118dvh] overflow-hidden bg-[#0b120e] text-white">
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-[-6%]"
      >
        <img
          src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=2400&q=92"
          alt="Premium roasted snack assortment"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,7,.95)_0%,rgba(4,11,7,.68)_37%,rgba(4,11,7,.08)_78%),linear-gradient(180deg,rgba(4,11,7,.34)_0%,transparent_45%,rgba(4,11,7,.54)_100%)]" />
      <motion.div
        style={{ x: lineX, rotate: lineRotate }}
        className="pointer-events-none absolute right-[7%] top-[18%] hidden h-[58vh] w-px bg-white/20 lg:block"
      />
      <div className="pointer-events-none absolute right-[6.6%] top-[18%] hidden text-[9px] uppercase tracking-[.32em] text-white/40 lg:block">
        ROASTED / SMALL BATCH / 2026
      </div>

      <motion.div
        style={{ y: titleY, scale: titleScale }}
        className="relative mx-auto flex min-h-[118dvh] max-w-[1440px] items-center px-5 pb-20 pt-28 lg:px-9"
      >
        <div className="max-w-[900px]">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#e3c079]">
              Roast & Root · Premium dry fruits
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-[clamp(3.8rem,7.8vw,8.6rem)] font-semibold leading-[.82] tracking-[-.085em]">
              Rooted
              <span className="block pl-[7vw] text-[#e0b867]">in purity.</span>
              <span className="block">Roasted</span>
              <span className="block pl-[11vw] text-white/92">to perfection.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end">
              <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg">
                Hand-roasted premium dry fruits in small batches. No shortcuts, no clutter — just a better snack ritual.
              </p>
              <span className="hidden shrink-0 pb-1 text-[10px] uppercase tracking-[.2em] text-white/35 md:block">
                Scroll / explore
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 rounded-full bg-[#e0b867] px-7 py-4 font-semibold text-[#101b15] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(224,184,103,.18)]"
              >
                Explore the collection <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[.04] px-7 py-4 font-semibold text-white/92 backdrop-blur-md transition hover:bg-white/[.09]"
              >
                Our roasting story
              </Link>
            </div>
          </Reveal>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-5 flex items-center gap-3 text-[9px] uppercase tracking-[.28em] text-white/35 lg:left-9">
        <span className="h-px w-10 bg-white/20" />
        Scroll to explore
      </div>
    </section>
  );
}
function EditorialBand() {
  return <section className="overflow-hidden border-b border-[#d9dfd8] bg-[#f3f6f1] py-5"><div className="marquee-track flex min-w-max items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5b675f]"><span>Small batch roast</span><span>•</span><span>Thoughtful ingredients</span><span>•</span><span>Big crunch</span><span>•</span><span>Made for everyday rituals</span><span>•</span><span>Small batch roast</span><span>•</span><span>Thoughtful ingredients</span><span>•</span></div></section>;
}

export function HomePage({ onAdd }) {
  return (
    <>
      <Hero3D />
      <EditorialBand />

      <main>
        <section className="relative overflow-hidden bg-[#f3f4ef] py-28 lg:py-40">
          <div className="absolute inset-x-0 top-0 h-px bg-[#0f1914]/10" />
          <div className="pointer-events-none absolute left-[-12rem] top-20 size-[30rem] rounded-full border border-[#0d1813]/[.05]" />
          <div className="pointer-events-none absolute right-[-10rem] bottom-0 size-[34rem] rounded-full border border-[#d5aa55]/[.10]" />

          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-9">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <Reveal>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#7a857c]">Signature lineup</p>
                  <h2 className="mt-4 max-w-lg text-[clamp(3.2rem,5.6vw,6.3rem)] font-semibold leading-[.88] tracking-[-.08em]">The jars that disappear first.</h2>
                  <p className="mt-6 max-w-md text-base leading-7 text-[#667068]">Four signature products, presented as objects rather than a flat catalogue.</p>
                  <Link to="/shop" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">See the full collection <ArrowRight size={17}/></Link>
                </div>
              </Reveal>

              <div className="flex items-end justify-between gap-8 border-b border-[#d5dbd5] pb-5">
                <span className="text-[10px] font-bold uppercase tracking-[.24em] text-[#879188]">01 — 04</span>
                <span className="max-w-xs text-right text-[11px] leading-5 text-[#788279]">Scroll through the lineup. Each product has its own depth and rhythm.</span>
              </div>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-12 [perspective:1800px]">
              <ScrollDepth lift={95} rotate={-2.8} scale={1.035} className="md:col-span-7 md:row-span-2">
                <ProductCard product={products[0]} onAdd={onAdd} index={0} priority featured />
              </ScrollDepth>

              <ScrollDepth lift={135} rotate={2.2} scale={1.03} className="md:col-span-5">
                <ProductCard product={products[1]} onAdd={onAdd} index={1} priority />
              </ScrollDepth>

              <ScrollDepth lift={75} rotate={-1.8} scale={1.03} className="md:col-span-5">
                <ProductCard product={products[2]} onAdd={onAdd} index={2} priority />
              </ScrollDepth>

              <ScrollDepth lift={115} rotate={2.6} scale={1.03} className="md:col-span-5 md:ml-14">
                <ProductCard product={products[3]} onAdd={onAdd} index={3} priority />
              </ScrollDepth>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#101812] py-28 text-white lg:py-40">
          <div className="absolute inset-0 opacity-[.18] bg-[radial-gradient(circle_at_20%_20%,#d5aa55,transparent_23%),radial-gradient(circle_at_84%_72%,#6b8e73,transparent_25%)]" />
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-9">
            <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/40">Shop by mood</p>
                  <h2 className="mt-4 text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[.9] tracking-[-.075em]">Four worlds.<br/><span className="text-[#e0b867]">One roast.</span></h2>
                  <p className="mt-6 max-w-sm text-base leading-7 text-white/55">Move through the collections as visual chapters instead of repeating product cards.</p>
                </div>
              </Reveal>
              <div className="space-y-16 [perspective:1800px]">
                {collections.map((item,index)=>(
                  <ScrollDepth key={item.slug} lift={110 + index * 20} rotate={index % 2 ? 2 : -2} scale={1.035}>
                    <TiltCard>
                      <Link to={`/collection/${item.slug}`} className="group relative block min-h-[520px] overflow-hidden rounded-[36px] border border-white/10 bg-white/[.03]">
                        <Parallax src={item.image} alt={item.title} scale={1.15} y={44}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
                        <div className="relative flex min-h-[520px] flex-col justify-end p-7 lg:p-10">
                          <div className="flex items-end justify-between gap-6">
                            <div className="max-w-2xl">
                              <div className="text-[9px] font-bold uppercase tracking-[.25em] text-[#e0b867]">{String(index+1).padStart(2,"0")} · {item.eyebrow}</div>
                              <h3 className="mt-3 text-5xl font-semibold leading-[.88] tracking-[-.07em] md:text-7xl">{item.title}</h3>
                            </div>
                            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition duration-500 group-hover:rotate-45 group-hover:bg-[#e0b867] group-hover:text-[#111a14]"><ArrowRight size={19}/></span>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </ScrollDepth>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ValueProps />

        <section className="relative overflow-hidden bg-[#f4f6f1] py-28 lg:py-40">
          <div className="relative mx-auto max-w-[1440px] px-5 lg:px-9">
            <div className="grid gap-16 lg:grid-cols-[.62fr_1.38fr] lg:items-start">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#7a857c]">Current favourites</p>
                  <h2 className="mt-4 text-[clamp(3.2rem,5.4vw,6rem)] font-semibold leading-[.86] tracking-[-.08em]">A product wall with actual depth.</h2>
                  <p className="mt-6 max-w-sm text-base leading-7 text-[#667068]">The smaller collection shifts vertically as you scroll, with each object sitting on a different plane.</p>
                  <div className="mt-10 grid max-w-sm grid-cols-3 border-y border-[#d8ded8] py-4 text-center">
                    <div><div className="text-xl font-semibold">04</div><div className="mt-1 text-[9px] uppercase tracking-[.16em] text-[#8a938c]">roasts</div></div>
                    <div className="border-x border-[#d8ded8]"><div className="text-xl font-semibold">5★</div><div className="mt-1 text-[9px] uppercase tracking-[.16em] text-[#8a938c]">reviews</div></div>
                    <div><div className="text-xl font-semibold">∞</div><div className="mt-1 text-[9px] uppercase tracking-[.16em] text-[#8a938c]">crunch</div></div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-2 [perspective:1900px]">
                {products.slice(2,6).map((p,i)=>(
                  <ScrollDepth key={p.id} lift={100 + i * 18} rotate={i%2 ? -3 : 2.2} scale={1.045}>
                    <div className={`relative ${i===1 ? "md:mt-24" : i===2 ? "md:-mt-10" : i===3 ? "md:mt-14" : ""}`}>
                      <ProductCard product={p} onAdd={onAdd} index={i} priority />
                    </div>
                  </ScrollDepth>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#d7e0d7] py-28 lg:py-36">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-9">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <Reveal>
                <div className="max-w-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#6e7a71]">The roast ritual</p>
                  <h2 className="mt-4 text-[clamp(3rem,5vw,5.8rem)] font-semibold leading-[.9] tracking-[-.07em]">From snack break to small ritual.</h2>
                  <p className="mt-7 max-w-md text-base leading-7 text-[#59675e]">Roast. Season. Pause. Repeat.</p>
                  <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#101812] px-6 py-3.5 font-semibold text-white transition hover:-translate-y-1">Our story <ArrowRight size={17}/></Link>
                </div>
              </Reveal>
              <ScrollDepth lift={100} rotate={-2.4} scale={1.05}>
                <div className="relative min-h-[560px] [transform-style:preserve-3d]">
                  <div className="absolute left-0 top-0 h-[78%] w-[65%] overflow-hidden rounded-[34px] shadow-[0_35px_90px_rgba(13,24,19,.18)]">
                    <Parallax src="https://images.unsplash.com/photo-1599599810694-cbf3c31f1d82?auto=format&fit=crop&w=1500&q=90" alt="Premium cashews" scale={1.15} y={42}/>
                  </div>
                  <div className="absolute bottom-0 right-0 h-[68%] w-[62%] overflow-hidden rounded-[34px] shadow-[0_35px_90px_rgba(13,24,19,.18)]">
                    <Parallax src="https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=1500&q=90" alt="Roasted almonds" scale={1.13} y={35}/>
                  </div>
                  <div className="absolute left-[45%] top-[38%] z-10 rounded-[24px] bg-[#f7f4ea]/88 px-5 py-4 text-[#15231b] shadow-2xl backdrop-blur-xl" style={{ transform: "translateZ(85px)" }}>
                    <div className="text-[9px] font-bold uppercase tracking-[.2em] text-[#7a837c]">Small batch</div>
                    <div className="mt-1 text-xl font-semibold tracking-[-.04em]">Roasted with intent.</div>
                  </div>
                </div>
              </ScrollDepth>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-28 lg:px-9 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle eyebrow="Customer notes" title="The crunch gets the last word." />
            <span className="text-[10px] uppercase tracking-[.24em] text-[#7b857e]">03 verified buyers</span>
          </div>
          <div className="mt-16 grid gap-7 md:grid-cols-3 [perspective:1500px]">
            {reviews.map((item,i)=><ScrollDepth key={item.name} lift={60} rotate={i===1?2:-1.5}><Reveal delay={i*.07}><TiltCard><blockquote className="flex min-h-[320px] flex-col justify-between rounded-[28px] border border-[#d4dbd4] bg-white p-7 shadow-[0_20px_60px_rgba(13,24,19,.05)]"><div><Quotes size={26} className="text-[#d5aa55]"/><p className="mt-7 text-2xl font-medium leading-[1.25] tracking-[-.04em]">“{item.quote}”</p></div><footer className="border-t border-[#e1e5e1] pt-4"><div className="text-sm font-semibold">{item.name}</div><div className="mt-1 text-[10px] uppercase tracking-[.17em] text-[#7c857e]">{item.role}</div></footer></blockquote></TiltCard></Reveal></ScrollDepth>)}
          </div>
        </section>
      </main>
    </>
  );
}
export function ShopPage({ onAdd }) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "cashews", "almonds", "gifts"];
  const filtered = products.filter(p => filter === "all" ? true : p.category === filter);
  return <div className="pt-[116px]">
    <section className="relative overflow-hidden bg-[#101c15] py-24 text-white lg:py-32"><div className="absolute inset-0 opacity-30"><Parallax src="https://images.unsplash.com/photo-1575377222312-dd1a0e27c3a0?auto=format&fit=crop&w=2000&q=90" alt="" /></div><div className="absolute inset-0 bg-[#0d1712]/78" /><div className="relative mx-auto max-w-[1440px] px-5 lg:px-9"><Reveal><p className="text-[10px] uppercase tracking-[0.24em] text-[#e0b867]">The complete collection</p><h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-.06em] md:text-7xl">Shop the roast.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/60">From pure cashews to chocolate-coated almonds and gifting boxes, everything starts with the same small-batch roast.</p></Reveal></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-9 lg:py-20"><div className="flex flex-col gap-6 border-b border-[#dce2db] pb-7 md:flex-row md:items-center md:justify-between"><div className="flex flex-wrap gap-2">{filters.map(item=><button key={item} onClick={()=>setFilter(item)} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[.13em] transition ${filter===item?"border-[#0d1813] bg-[#0d1813] text-white":"border-[#d0d7d0] bg-white text-[#5f6b63] hover:border-[#0d1813]"}`}>{item}</button>)}</div><div className="text-xs uppercase tracking-[.15em] text-[#747e76]">{filtered.length} products</div></div>
      <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p,i)=><ProductCard key={p.id} product={p} onAdd={onAdd} index={i} />)}</div>
    </section>
  </div>;
}

export function CategoryPage({ onAdd }) {
  const { slug } = useParams();
  const collection = collections.find(c => c.slug === slug) || collections[0];
  const items = products.filter(p => p.collection === collection.slug);
  const displayItems = items.length ? items : products.slice(0,4);
  return <div className="pt-[116px]">
    <section className="relative min-h-[70svh] overflow-hidden bg-[#0d1712] text-white"><Parallax src={collection.image} alt={collection.title} scale={1.1} y={55} /><div className="absolute inset-0 bg-gradient-to-t from-[#0d1712] via-[#0d1712]/30 to-transparent" /><div className="relative mx-auto flex min-h-[70svh] max-w-[1440px] items-end px-5 pb-14 lg:px-9 lg:pb-20"><div className="max-w-3xl"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Shop",href:"/shop"},{label:collection.title}]} /><Reveal><p className="mt-8 text-[10px] uppercase tracking-[.24em] text-[#e0b867]">{collection.eyebrow}</p><h1 className="mt-3 text-5xl font-semibold tracking-[-.065em] md:text-8xl">{collection.title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-white/65">{collection.description}</p></Reveal></div></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">{displayItems.map((p,i)=><ProductCard key={p.id} product={p} onAdd={onAdd} index={i} />)}</div></section>
    <ValueProps />
  </div>;
}

export function ProductPage({ onAdd }) {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug) || products[0];
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const related = products.filter(p => p.id !== product.id).slice(0,3);
  return <div className="pt-[116px]">
    <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-9 lg:py-16"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Shop",href:"/shop"},{label:product.name}]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-[94px_1fr]">
          <div className="order-2 flex gap-3 overflow-auto sm:order-1 sm:flex-col">{product.gallery.map((img,i)=><button key={img} onClick={()=>setActive(i)} className={`overflow-hidden rounded-2xl border ${active===i?"border-[#0d1813]":"border-transparent"}`}><img src={img} alt="" className="size-[78px] object-cover" /></button>)}</div>
          <motion.div layout className="order-1 overflow-hidden rounded-[28px] bg-[#e6eae4] sm:order-2"><motion.img key={product.gallery[active]} initial={{opacity:0,scale:1.025}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src={product.gallery[active]} alt={product.name} className="aspect-[.9] w-full object-cover md:aspect-square" /></motion.div>
        </div>
        <div className="lg:sticky lg:top-28">
          <p className="text-[10px] uppercase tracking-[.22em] text-[#737e76]">{product.short} · {product.weight}</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-7xl">{product.name}</h1>
          <div className="mt-5 flex items-center gap-2">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} weight="fill" className="text-[#d5aa55]" />)}<span className="ml-1 text-xs text-[#707a73]">({product.reviews} reviews)</span></div>
          <div className="mt-6 flex items-baseline gap-3"><span className="text-2xl font-semibold">{money(product.price)}</span><span className="text-base text-[#879087] line-through">{money(product.compareAt)}</span><span className="rounded-full bg-[#edf2eb] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.15em] text-[#425148]">Sale</span></div>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#5c685f]">{product.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">{product.tags.map(tag=><span key={tag} className="rounded-full border border-[#d6ddd6] px-3 py-1.5 text-[10px] uppercase tracking-[.15em] text-[#667169]">{tag}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3"><div className="inline-flex items-center rounded-full border border-[#cfd6cf] bg-white"><button onClick={()=>setQty(q=>Math.max(1,q-1))} className="grid size-11 place-items-center" aria-label="Decrease quantity"><Minus size={15}/></button><span className="w-10 text-center text-sm font-semibold">{qty}</span><button onClick={()=>setQty(q=>q+1)} className="grid size-11 place-items-center" aria-label="Increase quantity"><Plus size={15}/></button></div><button onClick={()=>{for(let i=0;i<qty;i++)onAdd(product)}} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0d1813] px-6 py-3.5 font-semibold text-white transition hover:-translate-y-1">Add to cart <ShoppingBagIcon /></button></div>
          <div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#edf2eb] p-4"><p className="text-[10px] uppercase tracking-[.16em] text-[#748078]">Shipping</p><p className="mt-2 text-sm font-semibold">Free above ₹499</p></div><div className="rounded-2xl bg-[#edf2eb] p-4"><p className="text-[10px] uppercase tracking-[.16em] text-[#748078]">Quality</p><p className="mt-2 text-sm font-semibold">100% promise</p></div></div>
          <a href="https://wa.me/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#486152]"><WhatsappLogo size={18}/> Questions about this product?</a>
        </div>
      </div>
    </section>
    <section className="border-y border-[#dce2db] bg-[#f0f3ee]"><div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-9"><div className="grid gap-8 md:grid-cols-3"><div><p className="text-[10px] uppercase tracking-[.2em] text-[#78827b]">01</p><h3 className="mt-3 text-xl font-semibold">A proper roast</h3><p className="mt-2 text-sm leading-6 text-[#66716a]">The roast is tuned to keep the crunch present without masking the ingredient.</p></div><div><p className="text-[10px] uppercase tracking-[.2em] text-[#78827b]">02</p><h3 className="mt-3 text-xl font-semibold">Made for sharing</h3><p className="mt-2 text-sm leading-6 text-[#66716a]">The range is built for desks, drives, gifting and spontaneous second handfuls.</p></div><div><p className="text-[10px] uppercase tracking-[.2em] text-[#78827b]">03</p><h3 className="mt-3 text-xl font-semibold">Keep it close</h3><p className="mt-2 text-sm leading-6 text-[#66716a]">Store sealed in a cool, dry place and open when the snack mood arrives.</p></div></div></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><SectionTitle eyebrow="You may also like" title="Keep exploring." /><div className="mt-12 grid gap-5 md:grid-cols-3">{related.map((p,i)=><ProductCard key={p.id} product={p} onAdd={onAdd} index={i}/>)}</div></section>
  </div>;
}

function ShoppingBagIcon(){return <span aria-hidden="true">+</span>;}

export function AboutPage() {
  return <div className="pt-[116px]">
    <section className="relative overflow-hidden bg-[#0d1712] py-24 text-white lg:py-32"><div className="absolute inset-0 opacity-38"><Parallax src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2000&q=90" alt="" scale={1.08} y={28}/></div><div className="absolute inset-0 bg-[#0d1712]/72"/><div className="relative mx-auto max-w-[1440px] px-5 lg:px-9"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"About"}]}/><Reveal><h1 className="mt-9 max-w-5xl text-6xl font-semibold tracking-[-.065em] md:text-8xl">Good snacking starts with good intent.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-white/62">Roast & Root is built around a simple idea: premium dry fruits should feel considered, not complicated.</p></Reveal></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-9 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]"><SectionTitle eyebrow="Our point of view" title="Roast slowly. Season thoughtfully. Pack beautifully."/><div className="grid gap-8 text-base leading-8 text-[#5e6a62]"><p>We started from the quiet middle ground between everyday snacking and gifting — products good enough to share, easy enough to reach for every day.</p><p>That means staying focused on sourcing, roasting and flavour balance. Instead of filling a shelf with noise, we build a small collection of things we would actually keep close.</p><p>And while the reference site is the starting point for this build, the experience here is intentionally re-authored around stronger visual hierarchy, cinematic movement and a multi-page shopping journey.</p></div></div></section>
    <section className="bg-[#e3ebe2]"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 lg:grid-cols-2 lg:px-9 lg:py-28"><div className="relative min-h-[520px] overflow-hidden rounded-[28px]"><Parallax src="https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=1600&q=90" alt="Premium almonds" scale={1.12} y={34}/></div><div className="flex items-center"><SectionTitle eyebrow="The roast & root way" title="Less noise. Better ingredients. A stronger crunch." copy="From farm-fresh cashews to chocolate and savoury edits, the range is designed to give different snack moods a clear place to live." /></div></div></section>
    <ValueProps />
  </div>;
}

export function ContactPage() {
  return <div className="pt-[116px]"><section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Contact"}]}/><div className="mt-9 grid gap-14 lg:grid-cols-[1fr_.9fr]"><div><Reveal><p className="text-[10px] uppercase tracking-[.24em] text-[#747e76]">We’d love to hear from you</p><h1 className="mt-3 text-6xl font-semibold tracking-[-.065em] md:text-8xl">Say hello.</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#657069]">For orders, gifting, product questions or wholesale conversations, use the form and we’ll get back to you.</p></Reveal><div className="mt-10 grid gap-4 sm:grid-cols-2"><div className="rounded-[22px] bg-[#edf2eb] p-6"><MapPin size={22}/><p className="mt-4 text-sm font-semibold">Based in India</p><p className="mt-1 text-sm text-[#68736b]">Serving snack lovers online.</p></div><div className="rounded-[22px] bg-[#edf2eb] p-6"><WhatsappLogo size={22}/><p className="mt-4 text-sm font-semibold">WhatsApp</p><p className="mt-1 text-sm text-[#68736b]">Fastest for order help.</p></div></div></div>
      <form className="rounded-[28px] border border-[#d5ddd5] bg-white p-6 shadow-[0_24px_80px_rgba(13,24,19,.06)] lg:p-8" onSubmit={(e)=>e.preventDefault()}><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Name<input className="rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="Your name"/></label><label className="grid gap-2 text-sm font-semibold">Email<input type="email" className="rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="you@example.com"/></label></div><label className="mt-5 grid gap-2 text-sm font-semibold">Subject<input className="rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="How can we help?"/></label><label className="mt-5 grid gap-2 text-sm font-semibold">Message<textarea rows="7" className="resize-none rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="Tell us a little more..." /></label><button className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0d1813] px-6 py-4 font-semibold text-white transition hover:-translate-y-0.5">Send message <ArrowRight size={18}/></button></form>
    </div></section></div>;
}

export function CartPage({ items, onUpdate }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = !items.length ? 0 : subtotal >= 499 ? 0 : 59;
  const total = subtotal + shipping;

  return (
    <div className="pt-[116px]">
      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

        <div className="mt-9 grid gap-12 lg:grid-cols-[1fr_390px]">
          <div>
            <SectionTitle eyebrow="Your bag" title="Ready when you are." />

            <div className="mt-10">
              {items.length === 0 ? (
                <div className="rounded-[26px] bg-[#edf2eb] p-10">
                  <p className="text-xl font-semibold">Nothing here yet.</p>
                  <p className="mt-2 text-sm text-[#67736b]">
                    Explore the collection and add a few favourites.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d1813] px-5 py-3 font-semibold text-white"
                  >
                    Shop now <ArrowRight size={17} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-4 border-b border-[#dde2dc] pb-5 sm:grid-cols-[120px_1fr_auto] sm:items-center"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-28 w-28 rounded-2xl object-cover"
                      />

                      <div>
                        <Link
                          to={`/product/${item.slug}`}
                          className="text-lg font-semibold"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-[#68736b]">{item.weight}</p>

                        <div className="mt-4 inline-flex items-center rounded-full border border-[#ccd4cc] bg-white">
                          <button
                            onClick={() => onUpdate(item.id, -1)}
                            className="grid size-9 place-items-center"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-9 text-center text-sm">{item.qty}</span>
                          <button
                            onClick={() => onUpdate(item.id, 1)}
                            className="grid size-9 place-items-center"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="text-lg font-semibold">
                        {money(item.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-[26px] border border-[#d6ddd6] bg-white p-7 lg:sticky lg:top-28">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#778079]">
              Order summary
            </p>

            <div className="mt-6 flex items-center justify-between border-b border-[#e0e5df] pb-4 text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{money(subtotal)}</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-b border-[#e0e5df] pb-4 text-sm">
              <span>Shipping</span>
              <span className="font-semibold">
                {shipping === 0 && items.length ? "Free" : money(shipping)}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between text-xl font-semibold">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>

            <button
              disabled={!items.length}
              className="mt-6 w-full rounded-full bg-[#0d1813] px-5 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Checkout
            </button>

            <div className="mt-4 text-center text-xs text-[#7c857e]">
              Secure checkout · Free shipping above ₹499
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export function SimplePage({ title, eyebrow, copy, children }) {
  return <div className="pt-[116px]"><section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><Breadcrumbs items={[{label:"Home",href:"/"},{label:title}]}/><Reveal><p className="mt-9 text-[10px] uppercase tracking-[.24em] text-[#747e76]">{eyebrow}</p><h1 className="mt-3 max-w-5xl text-6xl font-semibold tracking-[-.065em] md:text-8xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-[#66716a]">{copy}</p></Reveal>{children}</section></div>;
}