import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle, MapPin, Minus, Plus, Quote, Star, WhatsappLogo } from "@phosphor-icons/react";
import { Breadcrumbs, Parallax, ProductCard, Reveal, SectionTitle, TiltCard, ValueProps } from "./components";
import { collections, money, products, reviews } from "./data";

function Hero3D() {
  const reduce = useReducedMotion();
  const ref = useMemo(() => ({ current: null }), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.12]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 150]);
  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-[#0d1712] text-white">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=2200&q=92" alt="Premium roasted nuts arranged for a tasting" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(211,174,92,.18),transparent_28%),linear-gradient(90deg,rgba(6,15,10,.95)_0%,rgba(6,15,10,.72)_34%,rgba(6,15,10,.14)_80%)]" />
      <motion.div style={{ y: orbY }} className="absolute right-[10%] top-[17%] size-44 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-[2px]" />
      <motion.div style={{ y: productY }} className="absolute bottom-[10%] right-[9%] hidden w-[28vw] max-w-[390px] md:block">
        <div className="rounded-[28px] border border-white/15 bg-[#f3f6f1]/10 p-3 shadow-2xl backdrop-blur-md">
          <img src="https://images.unsplash.com/photo-1573246123716-6b178e9bfc09?auto=format&fit=crop&w=900&q=90" alt="Honey pepper cashews" className="aspect-[.8] w-full rounded-[22px] object-cover" />
          <div className="absolute inset-x-6 bottom-6 rounded-[18px] border border-white/15 bg-black/35 p-4 backdrop-blur-md">
            <div className="text-[9px] uppercase tracking-[.2em] text-white/55">Signature flavour</div>
            <div className="mt-1 text-lg font-semibold">Honey Pepper Cashews</div>
          </div>
        </div>
      </motion.div>
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] items-end px-5 pb-14 pt-32 lg:items-center lg:px-9 lg:pb-20">
        <div className="max-w-4xl">
          <Reveal><div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e6c27a] backdrop-blur-md">Best quality products <span className="size-1 rounded-full bg-[#e6c27a]" /></div></Reveal>
          <Reveal delay={0.08}><h1 className="mt-6 text-[clamp(3.6rem,8.2vw,8.8rem)] font-semibold leading-[0.86] tracking-[-0.075em]">Rooted in purity.<br /><span className="text-[#deb76a]">Roasted to perfection.</span></h1></Reveal>
          <Reveal delay={0.16}><p className="mt-7 max-w-2xl text-base leading-7 text-white/66 md:text-lg">Hand-roasted premium dry fruits in small batches. No shortcuts. Just honest taste, thoughtful flavours and a better snack ritual.</p></Reveal>
          <Reveal delay={0.24}><div className="mt-9 flex flex-wrap items-center gap-3"><Link to="/shop" className="magnetic-button inline-flex items-center gap-3 rounded-full bg-[#e0b867] px-6 py-3.5 font-semibold text-[#101b15] transition hover:-translate-y-1">Explore the roasted collection <ArrowRight size={18} /></Link><Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/8">How we roast</Link></div></Reveal>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/40 md:flex"><span className="h-px w-12 bg-white/20" /> Scroll to explore <span className="h-px w-12 bg-white/20" /></div>
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
        <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-9 lg:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle eyebrow="Best selling products" title="The jars that disappear first." copy="A direct homage to the reference shop's bestselling grid — now presented with stronger hierarchy, richer motion and a more editorial product language." />
            <Link to="/shop" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">See the full shop <ArrowRight size={18} /></Link>
          </div>
          <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} onAdd={onAdd} index={i} />)}</div>
        </section>

        <section className="bg-[#0d1712] py-24 text-white lg:py-32">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-9">
            <SectionTitle light eyebrow="Shop by mood" title="The four signature edits." copy="The same four collection families from the reference experience, rebuilt as large cinematic tiles with parallax depth." />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {collections.map((item, index) => (
                <TiltCard key={item.slug} className={index === 0 ? "md:row-span-2" : ""}>
                  <Link to={`/collection/${item.slug}`} className={`group relative block overflow-hidden rounded-[24px] ${index === 0 ? "min-h-[610px]" : "min-h-[290px]"}`}>
                    <Parallax src={item.image} alt={item.title} scale={1.1} y={26} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
                    <div className="relative flex h-full min-h-[290px] flex-col justify-end p-7 lg:p-8">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">{item.eyebrow}</p>
                      <h3 className="mt-2 max-w-lg text-3xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-4xl">{item.title}</h3>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Shop now <ArrowRight size={17} /></span>
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <ValueProps />

        <section className="relative mx-auto max-w-[1440px] px-5 py-24 lg:px-9 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <SectionTitle eyebrow="Trending now" title="A little familiar. A lot more refined." copy="Bring the reference site's trending-product moment forward with the same four hero products, tighter spacing and a stronger editorial rhythm." />
            <div className="grid grid-cols-2 gap-5">
              {products.slice(0,4).map((p,i)=><ProductCard key={p.id} product={p} onAdd={onAdd} index={i} />)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#dfe8df]">
          <div className="mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-10 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-9 lg:py-24">
            <Reveal><div className="max-w-xl"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b776f]">Every bite brings you closer to us</p><h2 className="mt-5 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] md:text-7xl">From snack break to small ritual.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#536158]">Roasting is our way of slowing down. We sort, season, roast and pack with a focus on consistency — because a premium snack should feel premium every time.</p><Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0d1813] px-6 py-3.5 font-semibold text-white hover:-translate-y-1 transition">Discover our story <ArrowRight size={18} /></Link></div></Reveal>
            <div className="relative min-h-[570px]"><div className="absolute left-0 top-0 h-[62%] w-[56%] overflow-hidden rounded-[24px]"><Parallax src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90" alt="Fresh roasted snack preparation" scale={1.12} y={34} /></div><div className="absolute bottom-0 right-0 h-[64%] w-[60%] overflow-hidden rounded-[24px]"><Parallax src="https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=1200&q=90" alt="Premium almonds" scale={1.1} y={24} /></div><div className="absolute left-[42%] top-[32%] z-10 grid size-36 place-items-center rounded-full border border-white/50 bg-[#f4f7f2]/72 text-center text-[10px] font-bold uppercase tracking-[.18em] text-[#15241b] backdrop-blur-xl">Small batch<br />roasted</div></div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-9 lg:py-32">
          <SectionTitle eyebrow="Customer reviews" title="The crunch gets the last word." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reviews.map((item, i) => <Reveal key={item.name} delay={i * .06}><TiltCard className="h-full"><blockquote className="flex h-full min-h-[290px] flex-col justify-between rounded-[22px] border border-[#d4dbd4] bg-white p-7"><div><Quote size={25} className="text-[#d5aa55]" /><div className="mt-6 flex gap-1 text-[#d5aa55]">{Array.from({length:5}).map((_, n)=><Star key={n} size={13} weight="fill" />)}</div><p className="mt-5 text-xl font-medium leading-8 tracking-[-.03em]">“{item.quote}”</p></div><footer className="mt-8 flex items-end justify-between border-t border-[#e0e5e0] pt-4"><span className="text-sm font-semibold">{item.name}</span><span className="text-[10px] uppercase tracking-[.16em] text-[#7a847c]">{item.role}</span></footer></blockquote></TiltCard></Reveal>)}
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
  return <div className="pt-[84px]">
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
  return <div className="pt-[84px]">
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
  return <div className="pt-[84px]">
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
  return <div className="pt-[84px]">
    <section className="relative overflow-hidden bg-[#0d1712] py-24 text-white lg:py-32"><div className="absolute inset-0 opacity-38"><Parallax src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2000&q=90" alt="" scale={1.08} y={28}/></div><div className="absolute inset-0 bg-[#0d1712]/72"/><div className="relative mx-auto max-w-[1440px] px-5 lg:px-9"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"About"}]}/><Reveal><h1 className="mt-9 max-w-5xl text-6xl font-semibold tracking-[-.065em] md:text-8xl">Good snacking starts with good intent.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-white/62">Roast & Root is built around a simple idea: premium dry fruits should feel considered, not complicated.</p></Reveal></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-9 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]"><SectionTitle eyebrow="Our point of view" title="Roast slowly. Season thoughtfully. Pack beautifully."/><div className="grid gap-8 text-base leading-8 text-[#5e6a62]"><p>We started from the quiet middle ground between everyday snacking and gifting — products good enough to share, easy enough to reach for every day.</p><p>That means staying focused on sourcing, roasting and flavour balance. Instead of filling a shelf with noise, we build a small collection of things we would actually keep close.</p><p>And while the reference site is the starting point for this build, the experience here is intentionally re-authored around stronger visual hierarchy, cinematic movement and a multi-page shopping journey.</p></div></div></section>
    <section className="bg-[#e3ebe2]"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 lg:grid-cols-2 lg:px-9 lg:py-28"><div className="relative min-h-[520px] overflow-hidden rounded-[28px]"><Parallax src="https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=1600&q=90" alt="Premium almonds" scale={1.12} y={34}/></div><div className="flex items-center"><SectionTitle eyebrow="The roast & root way" title="Less noise. Better ingredients. A stronger crunch." copy="From farm-fresh cashews to chocolate and savoury edits, the range is designed to give different snack moods a clear place to live." /></div></div></section>
    <ValueProps />
  </div>;
}

export function ContactPage() {
  return <div className="pt-[84px]"><section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Contact"}]}/><div className="mt-9 grid gap-14 lg:grid-cols-[1fr_.9fr]"><div><Reveal><p className="text-[10px] uppercase tracking-[.24em] text-[#747e76]">We’d love to hear from you</p><h1 className="mt-3 text-6xl font-semibold tracking-[-.065em] md:text-8xl">Say hello.</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#657069]">For orders, gifting, product questions or wholesale conversations, use the form and we’ll get back to you.</p></Reveal><div className="mt-10 grid gap-4 sm:grid-cols-2"><div className="rounded-[22px] bg-[#edf2eb] p-6"><MapPin size={22}/><p className="mt-4 text-sm font-semibold">Based in India</p><p className="mt-1 text-sm text-[#68736b]">Serving snack lovers online.</p></div><div className="rounded-[22px] bg-[#edf2eb] p-6"><WhatsappLogo size={22}/><p className="mt-4 text-sm font-semibold">WhatsApp</p><p className="mt-1 text-sm text-[#68736b]">Fastest for order help.</p></div></div></div>
      <form className="rounded-[28px] border border-[#d5ddd5] bg-white p-6 shadow-[0_24px_80px_rgba(13,24,19,.06)] lg:p-8" onSubmit={(e)=>e.preventDefault()}><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Name<input className="rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="Your name"/></label><label className="grid gap-2 text-sm font-semibold">Email<input type="email" className="rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="you@example.com"/></label></div><label className="mt-5 grid gap-2 text-sm font-semibold">Subject<input className="rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="How can we help?"/></label><label className="mt-5 grid gap-2 text-sm font-semibold">Message<textarea rows="7" className="resize-none rounded-xl border border-[#d1d9d1] bg-[#fafcfa] px-4 py-3.5 outline-none focus:border-[#0d1813]" placeholder="Tell us a little more..." /></label><button className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0d1813] px-6 py-4 font-semibold text-white transition hover:-translate-y-0.5">Send message <ArrowRight size={18}/></button></form>
    </div></section></div>;
}

export function CartPage({ items, onUpdate }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return <div className="pt-[84px]"><section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Cart"}]}/><div className="mt-9 grid gap-12 lg:grid-cols-[1fr_390px]"><div><SectionTitle eyebrow="Your bag" title="Ready when you are." /><div className="mt-10">{items.length===0?<div className="rounded-[26px] bg-[#edf2eb] p-10"><p className="text-xl font-semibold">Nothing here yet.</p><p className="mt-2 text-sm text-[#67736b]">Explore the collection and add a few favourites.</p><Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d1813] px-5 py-3 font-semibold text-white">Shop now <ArrowRight size={17}/></Link></div>:<div className="space-y-5">{items.map(item=><div key={item.id} className="grid gap-4 border-b border-[#dde2dc] pb-5 sm:grid-cols-[120px_1fr_auto] sm:items-center"><img src={item.image} alt="" className="h-28 w-28 rounded-2xl object-cover"/><div><Link to={`/product/${item.slug}`} className="text-lg font-semibold">{item.name}</Link><p className="mt-1 text-sm text-[#68736b]">{item.weight}</p><div className="mt-4 inline-flex items-center rounded-full border border-[#ccd4cc] bg-white"><button onClick={()=>onUpdate(item.id,-1)} className="grid size-9 place-items-center"><Minus size={14}/></button><span className="w-9 text-center text-sm">{item.qty}</span><button onClick={()=>onUpdate(item.id,1)} className="grid size-9 place-items-center"><Plus size={14}/></button></div></div><div className="text-lg font-semibold">{money(item.price*item.qty)}</div></div>)}</div>}</div>
      <div className="h-fit rounded-[26px] border border-[#d6ddd6] bg-white p-7 lg:sticky lg:top-28"><p className="text-[10px] uppercase tracking-[.2em] text-[#778079]">Order summary</p><div className="mt-6 flex items-center justify-between border-b border-[#e0e5df] pb-4 text-sm"><span>Subtotal</span><span className="font-semibold">{money(subtotal)}</span></div><div className="mt-4 flex items-center justify-between border-b border-[#e0e5df] pb-4 text-sm"><span>Shipping</span><span className="font-semibold">{subtotal >= 499 ? "Free" : money(59)}</span></div><div className="mt-5 flex items-center justify-between text-xl font-semibold"><span>Total</span><span>{money(subtotal >= 499 ? subtotal : subtotal + (items.length ? 59 : 0))}</span></div><button disabled={!items.length} className="mt-6 w-full rounded-full bg-[#0d1813] px-5 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Checkout</button><div className="mt-4 text-center text-xs text-[#7c857e]">Secure checkout · Free shipping above ₹499</div></div>
    </div></section></div>;
}

export function SimplePage({ title, eyebrow, copy, children }) {
  return <div className="pt-[84px]"><section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-9 lg:py-28"><Breadcrumbs items={[{label:"Home",href:"/"},{label:title}]}/><Reveal><p className="mt-9 text-[10px] uppercase tracking-[.24em] text-[#747e76]">{eyebrow}</p><h1 className="mt-3 max-w-5xl text-6xl font-semibold tracking-[-.065em] md:text-8xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-[#66716a]">{copy}</p></Reveal>{children}</section></div>;
}