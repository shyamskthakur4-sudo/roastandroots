import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight, CaretRight, Check, InstagramLogo, Leaf, List, MagnifyingGlass,
  Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck, WhatsappLogo, X
} from "@phosphor-icons/react";
import { collections, money, products, valueProps } from "./data";

export const Logo = ({ compact = false, inverse = false }) => (
  <Link to="/" className="group flex items-center gap-3" aria-label="Roast & Root home">
    <span className={`grid size-10 shrink-0 place-items-center rounded-full shadow-[0_8px_30px_rgba(9,23,17,.16)] transition-transform duration-500 group-hover:rotate-6 ${inverse ? "bg-white text-[#0d1813]" : "bg-[#0d1813] text-[#d5aa55]"}`}>
      <span className="font-black tracking-[-0.12em]">R</span>
    </span>
    {!compact && <span className="leading-none"><span className={`block text-[15px] font-bold tracking-[-0.04em] ${inverse ? "text-white" : "text-[#0d1813]"}`}>ROAST & ROOT</span><span className={`mt-1 block text-[9px] uppercase tracking-[0.24em] ${inverse ? "text-white/55" : "text-[#68736b]"}`}>Every bite, closer to us</span></span>}
  </Link>
);

export function Reveal({ children, className = "", delay = 0, y = 28 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={reduce ? undefined : { duration: .78, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export function ScrollDepth({ children, className = "", rotate = 0, lift = 90, scale = 1.06 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, .5, 1], [lift, 0, -lift]);
  const r = useTransform(scrollYProgress, [0, .5, 1], [reduce ? 0 : rotate, 0, reduce ? 0 : -rotate]);
  const s = useTransform(scrollYProgress, [0, .5, 1], [1, reduce ? 1 : scale, 1]);
  return <motion.div ref={ref} style={{ y, rotate: r, scale: s, transformPerspective: 1200 }} className={className}>{children}</motion.div>;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1800&q=88";

export function Parallax({ src, alt, className = "", scale = 1.12, y = 30 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const move = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-y, y]);
  const zoom = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.02, scale]);
  return <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
    <motion.img
      src={src}
      alt={alt}
      style={{ y: move, scale: zoom }}
      className="h-full w-full object-cover"
      loading="eager"
      onError={(event) => {
        if (event.currentTarget.src !== FALLBACK_IMAGE) event.currentTarget.src = FALLBACK_IMAGE;
      }}
    />
  </div>;
}

export function TiltCard({ children, className = "" }) {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 240, damping: 24, mass: .5 });
  const springY = useSpring(rotateY, { stiffness: 240, damping: 24, mass: .5 });
  const onMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - .5) * 7);
    rotateX.set((.5 - py) * 7);
  };
  const reset = () => { rotateX.set(0); rotateY.set(0); };
  return <motion.div onMouseMove={onMove} onMouseLeave={reset} className={className} style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }} whileTap={reduce ? undefined : { scale: .985 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>{children}</motion.div>;
}

export function ProductCard({ product, onAdd, index = 0, priority = false, featured = false }) {
  return <Reveal delay={index * .04}>
    <TiltCard className={`group h-full ${featured ? "[transform-style:preserve-3d]" : ""}`}>
      <Link to={`/product/${product.slug}`} className="block h-full">
        <motion.div
          className={`relative overflow-hidden rounded-[28px] bg-[#e3e7e1] shadow-[0_24px_70px_rgba(13,24,19,.08)] ${featured ? "aspect-[.9]" : "aspect-[.86]"}`}
          whileHover={useReducedMotion() ? undefined : { y: -5 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.07]"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onError={(event) => {
              if (event.currentTarget.src !== FALLBACK_IMAGE) event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,12,.02)_25%,rgba(7,17,12,.62)_100%)]" />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between">
            <span className="rounded-full border border-white/30 bg-[#f2c56e] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.19em] text-[#16251d] shadow-[0_8px_25px_rgba(0,0,0,.12)]">{product.badge}</span>
            <button
              onClick={(event) => { event.preventDefault(); onAdd(product); }}
              className="grid size-11 place-items-center rounded-full border border-white/20 bg-[#0d1813]/90 text-white opacity-0 shadow-xl backdrop-blur-md transition duration-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5aa55]"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={18} weight="bold" />
            </button>
          </div>
          <div className="absolute inset-x-5 bottom-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-white/55">{product.short} · {product.weight}</p>
                <h3 className={`mt-2 font-semibold leading-[.94] tracking-[-.05em] text-white ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>{product.name}</h3>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowRight size={17} />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>

      <div className="px-1 pt-4">
        <div className="flex items-center gap-1 text-[#d5aa55]" aria-label={`${product.rating} out of 5 stars`}>
          {Array.from({length: 5}).map((_, i) => <Star key={i} size={12} weight="fill" />)}
          <span className="ml-1 text-[10px] text-[#707a73]">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{money(product.price)}</span>
          <span className="text-sm text-[#889189] line-through">{money(product.compareAt)}</span>
        </div>
      </div>
    </TiltCard>
  </Reveal>;
}

function CartIcon({ count, onClick }) {
  return <button onClick={onClick} className="relative grid size-11 place-items-center rounded-full border border-[#ced5ce] bg-white/75 text-[#0d1813] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#0d1813] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5aa55]" aria-label={`Open cart with ${count} items`}><ShoppingBag size={20}/>{count>0&&<span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#0d1813] px-1.5 py-1 text-[10px] font-bold text-white">{count}</span>}</button>;
}

function PromoBar() { return <div className="fixed inset-x-0 top-0 z-50 h-2 bg-[#d5aa55]" aria-hidden="true" />; }

export function Header({ cartCount, onOpenCart }) {
  const [compact,setCompact]=useState(false); const [menu,setMenu]=useState(false); const location=useLocation(); const transparent=location.pathname==="/"&&!compact;
  useEffect(()=>setMenu(false),[location.pathname]); useEffect(()=>{const onScroll=()=>setCompact(window.scrollY>42); onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); return()=>window.removeEventListener("scroll",onScroll)},[]);
  const nav=[["/","Home"],["/about","About"],["/shop","Shop"],["/contact","Contact"]];
  return <><PromoBar/><header className={`fixed inset-x-0 top-2 z-40 transition-all duration-500 ${compact?"bg-[#f3f6f1]/90 backdrop-blur-2xl shadow-[0_14px_40px_rgba(13,24,19,.08)]":"bg-[#f3f6f1]/88 backdrop-blur-xl"}`}><div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-9"><Logo inverse={false}/><nav className="hidden items-center gap-8 lg:flex">{nav.map(([href,label])=><NavLink key={href} to={href} className={`relative text-[13px] font-semibold transition ${transparent?"text-white/82 hover:text-white":"text-[#516058] hover:text-[#0d1813]"}`}>{({isActive})=><><span>{label}</span><span className={`absolute -bottom-2 left-0 h-px bg-[#d5aa55] transition-all ${isActive?"w-full":"w-0"}`}/></>}</NavLink>)}</nav><div className="flex items-center gap-2"><Link to="/shop" aria-label="Search products" className="hidden size-10 place-items-center rounded-full border border-[#ced5ce] bg-white/75 text-[#0d1813] backdrop-blur-xl transition hover:-translate-y-0.5 md:grid"><MagnifyingGlass size={19}/></Link><CartIcon count={cartCount} onClick={onOpenCart}/><button onClick={()=>setMenu(true)} className={`grid size-11 place-items-center rounded-full lg:hidden ${transparent?"bg-white text-[#0d1813]":"bg-[#0d1813] text-white"}`} aria-label="Open navigation"><List size={21}/></button></div></div><AnimatePresence>{menu&&<motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} className="border-t border-[#d9dfd9] bg-[#f3f6f1]/96 px-5 pb-7 pt-5 backdrop-blur-2xl lg:hidden"><div className="grid gap-1">{nav.map(([href,label])=><Link key={href} to={href} className="rounded-xl px-3 py-3 text-lg font-semibold">{label}</Link>)}<Link to="/cart" className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0d1813] px-5 py-3 font-semibold text-white">View cart <ArrowRight size={17}/></Link></div></motion.div>}</AnimatePresence></header></>;
}

export function CartDrawer({ items, open, onClose, onUpdate }) {
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  const total=items.reduce((sum,x)=>sum+x.price*x.qty,0);
  return <AnimatePresence>{open&&<><motion.button aria-label="Close cart" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 cursor-default bg-[#07110c]/45 backdrop-blur-sm"/><motion.aside initial={{x:"105%"}} animate={{x:0}} exit={{x:"105%"}} transition={{type:"spring",stiffness:280,damping:30}} className="fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-[430px] flex-col bg-[#f4f7f2] shadow-2xl" aria-label="Shopping cart"><div className="flex items-center justify-between border-b border-[#dce2dc] px-6 py-5"><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#6f7972]">Roast & Root</p><h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Your cart</h2></div><button onClick={onClose} className="grid size-10 place-items-center rounded-full border border-[#cdd5ce]" aria-label="Close cart"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-6">{items.length===0?<div className="grid h-full place-items-center text-center"><div className="max-w-xs"><ShoppingBag size={46} className="mx-auto text-[#7e897f]"/><h3 className="mt-5 text-xl font-semibold">Your cart is empty</h3><p className="mt-2 text-sm leading-6 text-[#66716a]">Check out the shop and bring a few roasted favourites home.</p><Link onClick={onClose} to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d1813] px-5 py-3 font-semibold text-white">Shop now <ArrowRight size={17}/></Link></div></div>:<div className="space-y-4">{items.map(item=><div key={item.id} className="flex gap-4 border-b border-[#dde3dd] pb-4"><img src={item.image} alt="" className="size-20 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><Link onClick={onClose} to={`/product/${item.slug}`} className="font-semibold">{item.name}</Link><p className="mt-1 text-sm text-[#6d776f]">{money(item.price)}</p><div className="mt-3 inline-flex items-center rounded-full border border-[#ccd4cd] bg-white"><button onClick={()=>onUpdate(item.id,-1)} className="grid size-8 place-items-center" aria-label={`Decrease ${item.name} quantity`}><Minus size={14}/></button><span className="w-8 text-center text-sm">{item.qty}</span><button onClick={()=>onUpdate(item.id,1)} className="grid size-8 place-items-center" aria-label={`Increase ${item.name} quantity`}><Plus size={14}/></button></div></div><div className="font-semibold">{money(item.price*item.qty)}</div></div>)}</div>}</div><div className="border-t border-[#dce2dc] p-6"><div className="mb-4 flex items-center justify-between text-lg font-semibold"><span>Total</span><span>{money(total)}</span></div><Link to="/cart" onClick={onClose} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0d1813] px-5 py-4 font-semibold text-white transition hover:-translate-y-0.5">View full cart <ArrowRight size={18}/></Link></div></motion.aside></>}</AnimatePresence>;
}

export function ValueProps() {
  const iconMap={truck:Truck,shield:ShieldCheck,leaf:Leaf,check:Check};
  return <section className="border-y border-[#dbe1da] bg-[#edf1ec]"><div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">{valueProps.map((item,index)=>{const Icon=iconMap[item.icon];return <Reveal key={item.title} delay={index*.04} className="border-b border-[#dbe1da] last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-9"><Icon size={25}/><p className="mt-5 text-[15px] font-semibold">{item.title}</p><p className="mt-1 text-sm leading-6 text-[#68736b]">{item.copy}</p></Reveal>})}</div></section>;
}

export function Footer() {
 return <footer className="bg-[#0d1712] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-9 lg:py-20"><div className="grid gap-12 md:grid-cols-[1.4fr_.75fr_.75fr_.9fr]"><div><Logo inverse/><p className="mt-5 max-w-sm text-sm leading-7 text-white/55">Premium roasted dry fruits with a little more personality. Small batches, thoughtful flavours and everyday snack rituals.</p><div className="mt-6 flex gap-2"><a href="#" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/4"><InstagramLogo size={17}/></a><a href="#" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/4"><WhatsappLogo size={17}/></a></div></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Explore</p><div className="mt-5 grid gap-3 text-sm text-white/68"><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/shop">Shop</Link><Link to="/contact">Contact</Link></div></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Collections</p><div className="mt-5 grid gap-3 text-sm text-white/68">{collections.map(c=><Link key={c.slug} to={`/collection/${c.slug}`}>{c.title.replace(" Collection","")}</Link>)}</div></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Need help?</p><p className="mt-5 text-sm leading-6 text-white/52">For orders, gifting or product questions, send us a note.</p><Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#e0b867]">Contact us <ArrowRight size={16}/></Link></div></div><div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-white/35 md:flex-row md:items-center md:justify-between"><div>© 2026 Roast & Root. Crafted with care.</div><div className="flex gap-5"><Link to="/terms">Terms</Link><Link to="/privacy">Privacy</Link><Link to="/account">My account</Link></div></div></div></footer>;
}

export function SectionTitle({ eyebrow, title, copy, light=false }) {
 return <div className={light?"text-white":""}><Reveal><p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${light?"text-white/45":"text-[#717b74]"}`}>{eyebrow}</p></Reveal><Reveal delay={.06}><h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[.98] tracking-[-.055em] md:text-6xl">{title}</h2></Reveal>{copy&&<Reveal delay={.12}><p className={`mt-5 max-w-2xl text-base leading-7 ${light?"text-white/62":"text-[#68736b]"}`}>{copy}</p></Reveal>}</div>;
}

export function Breadcrumbs({ items }) { return <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#778078]">{items.map((item,index)=><span key={item.href||item.label} className="flex items-center gap-2">{index>0&&<CaretRight size={12}/>} {item.href?<Link className="hover:text-[#101d16]" to={item.href}>{item.label}</Link>:<span className="text-[#101d16]">{item.label}</span>}</span>)}</div>; }
