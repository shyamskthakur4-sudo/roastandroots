import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ShoppingBag, X, Plus, Minus, Star, Check, Leaf, Truck, ShieldCheck,
  InstagramLogo, WhatsappLogo, CaretDown
} from "@phosphor-icons/react";

const products = [
  { id: 1, name: "Cashews — W240", category: "Farm Fresh", price: 299, original: 399, rating: 5, weight: "200g", image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=1200&q=85" },
  { id: 2, name: "Chatpata Masala Cashews", category: "Savoury", price: 329, original: 449, rating: 5, weight: "150g", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=85" },
  { id: 3, name: "Choco Dust Almonds", category: "Chocolate", price: 349, original: 499, rating: 5, weight: "200g", image: "https://images.unsplash.com/photo-1574570066130-0b30b1c5d8aa?auto=format&fit=crop&w=1200&q=85" },
  { id: 4, name: "Honey Pepper Cashews", category: "Savoury", price: 329, original: 449, rating: 5, weight: "150g", image: "https://images.unsplash.com/photo-1573246123716-6b178e9bfc09?auto=format&fit=crop&w=1200&q=85" },
];

const collections = [
  { title: "Thoughtfully Paired Sets", tag: "Curated for gifting", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1400&q=85" },
  { title: "Farm Fresh Cashews", tag: "Pure. Creamy. Crisp.", image: "https://images.unsplash.com/photo-1599599810694-cbf3c31f1d82?auto=format&fit=crop&w=1400&q=85" },
  { title: "Premium Chocolate Collection", tag: "Rich, not cloying", image: "https://images.unsplash.com/photo-1575377222312-dd1a0e27c3a0?auto=format&fit=crop&w=1400&q=85" },
  { title: "Premium Savoury Collection", tag: "Bold little cravings", image: "https://images.unsplash.com/photo-1599599810694-57a6d0a9f2f0?auto=format&fit=crop&w=1400&q=85" },
];

const reviews = [
  { quote: "The crunch is genuinely fresh, and the seasoning tastes layered rather than overpowering.", name: "Ananya J." },
  { quote: "The chocolate almonds feel like a proper premium snack, not a sugar bomb.", name: "Rishi G." },
  { quote: "Beautifully packed, quick to arrive and easy to finish in one sitting.", name: "Meera K." },
];

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={reduce ? undefined : { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >{children}</motion.div>
  );
}

function ParallaxImage({ src, alt, className = "", scale = 1.12, yRange = 30 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-yRange, yRange]);
  const s = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.02, scale]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: s }} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8, rotateX: 2, rotateY: -2 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group"
      style={{ transformPerspective: 1000 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e8ebe4]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" loading="lazy" />
        <div className="absolute left-4 top-4 rounded-full bg-[#f0b44a] px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#18231e]">SALE</div>
        <button
          onClick={() => onAdd(product)}
          className="absolute bottom-4 right-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#10231b] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#173126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b44a]"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus weight="bold" size={18} /> Add
        </button>
      </div>
      <div className="pt-4">
        <div className="mb-1 flex items-center gap-1 text-[#f0b44a]" aria-label={`${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} weight="fill" />)}
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#667069]">{product.category} · {product.weight}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#10231b]">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{money.format(product.price)}</span>
          <span className="text-sm text-[#7a847d] line-through">{money.format(product.original)}</span>
        </div>
      </div>
    </motion.article>
  );
}

function CartDrawer({ items, open, onClose, onUpdate }) {
  const total = items.reduce((sum, x) => sum + x.price * x.qty, 0);
  const freeShipping = total >= 499;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 30 }} className="fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-md flex-col bg-[#f4f6f1] p-6 shadow-2xl" aria-label="Shopping cart">
            <div className="flex items-center justify-between border-b border-[#dbe0d8] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#667069]">Your bag</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Cart</h2>
              </div>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-[#ccd4cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b44a]" aria-label="Close cart"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto mb-4 text-[#7a847d]" size={42} />
                    <p className="text-lg font-semibold">Your cart is empty</p>
                    <p className="mt-2 text-sm text-[#667069]">Add a few roasted favourites and come back here.</p>
                  </div>
                </div>
              ) : items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-[#dbe0d8] py-4">
                  <img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm text-[#667069]">{money.format(item.price)}</p>
                    <div className="mt-3 inline-flex items-center rounded-full border border-[#cdd4ce]">
                      <button onClick={() => onUpdate(item.id, -1)} className="grid h-8 w-8 place-items-center" aria-label={`Decrease ${item.name} quantity`}><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => onUpdate(item.id, 1)} className="grid h-8 w-8 place-items-center" aria-label={`Increase ${item.name} quantity`}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="font-semibold">{money.format(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#dbe0d8] pt-4">
              {items.length > 0 && <div className="mb-4 rounded-2xl bg-[#e8eee7] p-4 text-sm">{freeShipping ? "You unlocked free shipping." : "Add ₹499+ to unlock free shipping."}</div>}
              <div className="flex items-center justify-between text-lg font-semibold"><span>Total</span><span>{money.format(total)}</span></div>
              <button disabled={!items.length} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#10231b] px-5 py-4 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45">Checkout <ArrowRight size={18} /></button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, reduce ? 0 : -4]);
  const headerShadow = useTransform(scrollY, [0, 80], ["0px 0px 0px rgba(0,0,0,0)", "0px 12px 36px rgba(16,35,27,.10)"]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.09]);
  const logoY = useSpring(useTransform(scrollY, [0, 100], [0, reduce ? 0 : -2]), { stiffness: 200, damping: 30 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(x => x.id === product.id);
      return found ? prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x) : [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };
  const updateCart = (id, delta) => setCart(prev => prev.flatMap(x => x.id === id ? [{ ...x, qty: x.qty + delta }].filter(y => y.qty > 0) : [x]));
  const cartCount = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f4f6f1] text-[#10231b]">
      <motion.header style={{ y: headerY, boxShadow: headerShadow }} className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${scrolled ? "border-[#d8ded7] bg-[#f4f6f1]/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Roast and Root home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#10231b] text-[#f0b44a] font-black">R</span>
            <div className="leading-none">
              <div className="text-lg font-bold tracking-[-0.04em]">ROAST & ROOT</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#667069]">Every bite, closer to us</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["Home", "About", "Shop", "Contact"].map(x => <a key={x} href={`#${x.toLowerCase()}`} className="text-sm font-medium text-[#324239] transition hover:text-[#10231b]">{x}</a>)}
          </nav>
          <button onClick={() => setCartOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full bg-[#10231b] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b44a]" aria-label={`Open cart with ${cartCount} items`}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#f0b44a] px-1 text-[10px] font-bold text-[#10231b]">{cartCount}</span>}
          </button>
        </div>
      </motion.header>

      <main>
        <section id="home" ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=2200&q=90" alt="Roasted nuts and dry fruits" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,28,20,.88)_0%,rgba(10,28,20,.60)_38%,rgba(10,28,20,.12)_76%)]" />
          <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] items-end px-5 pb-16 pt-32 lg:items-center lg:px-8 lg:pb-24">
            <div className="max-w-2xl text-white">
              <Reveal><p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#f0b44a]">Hand-roasted in small batches</p></Reveal>
              <Reveal delay={0.08}><h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[6.2rem]">Rooted in purity.<br /><span className="text-[#f0b44a]">Roasted to perfection.</span></h1></Reveal>
              <Reveal delay={0.16}><p className="mt-7 max-w-xl text-base leading-7 text-white/78 md:text-lg">Premium dry fruits, thoughtful flavours and honest ingredients. Made for the pause between busy days.</p></Reveal>
              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-[#f0b44a] px-6 py-3.5 font-semibold text-[#10231b] transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Explore the collection <ArrowRight size={18} /></a>
                  <a href="#story" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">Our story</a>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="absolute bottom-7 right-6 hidden max-w-xs text-right text-xs uppercase tracking-[0.18em] text-white/60 lg:block">Small batches · Clean ingredients · Big crunch</div>
        </section>

        <section id="shop" className="mx-auto max-w-[1400px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <Reveal><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667069]">Best sellers</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">The jars that disappear first.</h2></div></Reveal>
            <Reveal delay={0.08}><a href="#collections" className="inline-flex items-center gap-2 text-sm font-semibold">Browse all flavours <ArrowRight size={18} /></a></Reveal>
          </div>
          <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><ProductCard product={p} onAdd={addToCart} /></Reveal>)}
          </div>
        </section>

        <section id="collections" className="bg-[#10231b] py-24 text-[#f4f6f1] lg:py-32">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aeb8b0]">Find your flavour</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Four ways to snack beautifully.</h2></Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {collections.map((item, i) => (
                <motion.a key={item.title} href="#shop" whileHover={reduce ? undefined : { y: -6, rotateX: 1.5, rotateY: i % 2 ? -1.5 : 1.5 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "md:row-span-2 min-h-[580px]" : "min-h-[280px]"}`} style={{ transformPerspective: 1000 }}>
                  <ParallaxImage src={item.image} alt={item.title} className="absolute inset-0" scale={1.1} yRange={22} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">{item.tag}</p>
                    <h3 className="mt-2 max-w-md text-3xl font-semibold tracking-[-0.045em]">{item.title}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Shop the edit <ArrowRight size={17} /></span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Truck, "Free shipping", "On orders ₹499+"],
              [ShieldCheck, "Uncompromised purity", "A 100% promise"],
              [Leaf, "High-protein snacks", "Smart everyday fuel"],
              [Check, "Wholesome & guilt-free", "Simple ingredients, bold flavour"]
            ].map(([Icon, title, copy], i) => <Reveal key={title} delay={i * 0.05}><div className="border-t border-[#cad1cb] pt-5"><Icon size={26} /><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-1 text-sm text-[#667069]">{copy}</p></div></Reveal>)}
          </div>
        </section>

        <section id="story" className="relative overflow-hidden bg-[#e8eee7]">
          <div className="mx-auto grid min-h-[680px] max-w-[1400px] items-center gap-8 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <Reveal><div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667069]">The roast & root way</p><h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl">Nothing complicated.<br />Just really good nuts.</h2><p className="mt-7 text-base leading-7 text-[#4b5a51]">We keep the process small-batch and the ingredient list honest. The result is a snack that feels special enough to gift and effortless enough to keep beside your desk.</p><a href="#shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#10231b] px-6 py-3.5 font-semibold text-white transition hover:-translate-y-1">Shop favourites <ArrowRight size={18} /></a></div></Reveal>
            <Reveal delay={0.1}><div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[5/6]"><ParallaxImage src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=85" alt="Roasted dry fruit preparation" className="absolute inset-0" scale={1.11} yRange={30} /><div className="absolute bottom-5 left-5 rounded-full bg-[#f4f6f1]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]">Small-batch roasted</div></div></Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="flex items-end justify-between gap-6"><Reveal><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667069]">Customer notes</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Good ingredients speak for themselves.</h2></div></Reveal></div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reviews.map((r, i) => <Reveal key={r.name} delay={i * 0.06}><blockquote className="flex h-full flex-col justify-between rounded-2xl border border-[#d4dbd4] bg-white/60 p-7"><div><div className="flex gap-1 text-[#f0b44a]">{Array.from({ length: 5 }).map((_, n) => <Star key={n} size={14} weight="fill" />)}</div><p className="mt-6 text-xl font-medium leading-8 tracking-[-0.025em]">“{r.quote}”</p></div><footer className="mt-10 border-t border-[#dde2dd] pt-4 text-sm font-semibold text-[#526057]">{r.name}</footer></blockquote></Reveal>)}
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#0d1b15] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr_.7fr]">
            <div><div className="text-2xl font-bold tracking-[-0.04em]">ROAST & ROOT</div><p className="mt-4 max-w-sm text-sm leading-6 text-white/60">Rooted in purity. Roasted to perfection. Thoughtful snacking for everyday rituals.</p><div className="mt-6 flex gap-2"><a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><InstagramLogo size={18} /></a><a href="#" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-white/15"><WhatsappLogo size={18} /></a></div></div>
            <div><p className="text-xs uppercase tracking-[0.18em] text-white/45">Explore</p><div className="mt-4 grid gap-3 text-sm text-white/70"><a href="#home">Home</a><a href="#story">About</a><a href="#shop">Shop</a><a href="#contact">Contact</a></div></div>
            <div><p className="text-xs uppercase tracking-[0.18em] text-white/45">Help</p><div className="mt-4 grid gap-3 text-sm text-white/70"><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a><a href="#">My Account</a></div></div>
            <div><p className="text-xs uppercase tracking-[0.18em] text-white/45">Stay close</p><p className="mt-4 text-sm leading-6 text-white/60">New drops, seasonal flavours and offers, occasionally.</p><div className="mt-4 flex rounded-full border border-white/15 bg-white/5 p-1"><input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/35" /><button className="rounded-full bg-[#f0b44a] px-4 py-2 text-sm font-semibold text-[#10231b]">Join</button></div></div>
          </div>
          <div className="mt-14 border-t border-white/10 pt-5 text-xs text-white/40">© 2026 Roast & Root. Crafted with care.</div>
        </div>
      </footer>

      <CartDrawer items={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdate={updateCart} />
    </div>
  );
}
