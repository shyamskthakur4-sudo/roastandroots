import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { CartDrawer, Footer, Header } from "./components";
import { products } from "./data";
import { AboutPage, CartPage, CategoryPage, ContactPage, HomePage, ProductPage, ShopPage, SimplePage } from "./pages";

function PageFrame({ children }) {
  const location = useLocation();
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3, ease: "easeOut" }}>{children}</motion.div></AnimatePresence>;
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      return found ? prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateCart = (id, delta) => {
    setCart(prev => prev.flatMap(item => item.id === id ? [{ ...item, qty: item.qty + delta }].filter(x => x.qty > 0) : [item]));
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  return (
    <div className="min-h-screen bg-[#f4f7f2] text-[#101d16]">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <PageFrame>
        <Routes>
          <Route path="/" element={<HomePage onAdd={addToCart} />} />
          <Route path="/shop" element={<ShopPage onAdd={addToCart} />} />
          <Route path="/collection/:slug" element={<CategoryPage onAdd={addToCart} />} />
          <Route path="/product/:slug" element={<ProductPage onAdd={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage items={cart} onUpdate={updateCart} />} />
          <Route path="/account" element={<SimplePage title="My account" eyebrow="Account" copy="A calm place for orders, saved details and future favourites." />} />
          <Route path="/terms" element={<SimplePage title="Terms and conditions" eyebrow="Legal" copy="Website terms, ordering conditions and general use information for the Roast & Root storefront." />} />
          <Route path="/privacy" element={<SimplePage title="Privacy policy" eyebrow="Legal" copy="A concise privacy page for customer data, orders and contact submissions." />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageFrame>
      <CartDrawer items={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdate={updateCart} />
      <Footer />
    </div>
  );
}