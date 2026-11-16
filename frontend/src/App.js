import { useEffect, useState } from "react";
import "@/App.css";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, ChevronDown, Instagram, Menu, Send, Sparkles } from "lucide-react";
import heroImg from "./assets/Mellia (1).jpg";
import giftImg from "./assets/Mellia (2).jpg";
import studioImg from "./assets/Mellia (3).jpg";
import detailImg from "./assets/Mellia (4).jpg";
import extra1Img from "./assets/Mellia (5).jpg";
import extra2Img from "./assets/Mellia (6).jpg";
import extra3Img from "./assets/Mellia (7).jpg";

const WA = "https://wa.me/6285806713379";
const photos = {
  hero: heroImg,
  gift: giftImg,
  studio: studioImg,
  detail: detailImg,
  extra1: extra1Img,
  extra2: extra2Img,
  extra3: extra3Img,
};
const products = [
  { name: "Moss & Morning", type: "Bouquet", price: "mulai 185K", image: photos.hero },
  { name: "Little Solace", type: "Bouquet", price: "mulai 220K", image: photos.gift },
  { name: "The Wild One", type: "Bouquet", price: "mulai 145K", image: photos.studio },
  { name: "White Elegance", type: "Bouquet", price: "mulai 200K", image: photos.detail },
  { name: "Soft Petals", type: "Bouquet", price: "mulai 195K", image: photos.extra1 },
  { name: "Golden Hour", type: "Bouquet", price: "mulai 230K", image: photos.extra2 },
  { name: "Midnight Bloom", type: "Bouquet", price: "mulai 160K", image: photos.extra3 },
];
const reveal = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };

function App() {
  const [filter, setFilter] = useState("All Items");
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 110]);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
  const visibleProducts = filter === "All Items" ? products : products.filter((product) => product.type === filter);
  const submitOrder = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Halo Mellia Bouquet! Aku mau custom order ${data.get("occasion")} untuk ${data.get("date")}. Budget: ${data.get("budget")}.`;
    setSent(true);
    window.open(`${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  return <main className="site-shell">
    <div className="progress-line" style={{ scaleX: scrollYProgress }} />
    <nav className="nav-wrap" data-testid="site-navigation">
      <a className="brand-mark" href="#top" data-testid="brand-home"><span className="mark-flower">✳</span><span>Mellia<br /><i>Bouquet</i></span></a>
      <div className="nav-links"><a href="#collection" data-testid="nav-collection-link">Collection</a><a href="#custom" data-testid="nav-custom-link">Custom order</a><a href="#notes" data-testid="nav-notes-link">Our notes</a></div>
      <a className="nav-cta" href={WA} target="_blank" rel="noreferrer" data-testid="nav-whatsapp-link">Order via WhatsApp <ArrowUpRight size={15} /></a>
      <div className="nav-social"><a href="https://www.instagram.com/camell_flowrist" target="_blank" rel="noreferrer" data-testid="nav-instagram-link"><Instagram size={15} /> Instagram</a><a href="https://www.tiktok.com/@camell_flowrist" target="_blank" rel="noreferrer" data-testid="nav-tiktok-link">♪ TikTok</a></div>
      <button className="mobile-menu" aria-label="Buka menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-button"><Menu size={22} /></button>
    </nav>
    {mobileOpen && <motion.div className="mobile-nav-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} data-testid="mobile-navigation-panel"><a href="#collection" onClick={() => setMobileOpen(false)} data-testid="mobile-collection-link">Collection</a><a href="#custom" onClick={() => setMobileOpen(false)} data-testid="mobile-custom-link">Custom order</a><a href="#notes" onClick={() => setMobileOpen(false)} data-testid="mobile-notes-link">Our notes</a><a href={WA} target="_blank" rel="noreferrer" data-testid="mobile-whatsapp-link">Order via WhatsApp <ArrowUpRight size={15} /></a></motion.div>}
    <section className="hero" id="top" data-testid="hero-section">
      <div className="hero-copy"><motion.p className="eyebrow" initial="hidden" animate="show" variants={reveal}>small-batch floral studio · Rejotangan, Tulungagung</motion.p><h1><span className="line-mask"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .15, ease: [.22,1,.36,1] }}>Flowers,</motion.span></span><span className="line-mask italic-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .28, ease: [.22,1,.36,1] }}>with a little</motion.span></span><span className="line-mask"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .41, ease: [.22,1,.36,1] }}>wonder.</motion.span></span></h1><motion.p className="hero-description" initial="hidden" animate="show" variants={reveal} transition={{ delay: .65 }}>Rangkaian mungil yang dibuat pelan-pelan, untuk hari yang ingin kamu ingat lebih lama.</motion.p><motion.a className="button button-dark" href={WA} target="_blank" rel="noreferrer" initial="hidden" animate="show" variants={reveal} transition={{ delay: .75 }} data-testid="hero-whatsapp-button">Bikin sesuatu yang spesial <ArrowUpRight size={17} /></motion.a></div>
      <motion.div className="hero-art" style={{ y: heroY }}><div className="hero-orbit">freshly picked <span>✳</span> just for you</div><div className="hero-image-frame"><img src={photos.hero} alt="Bouquet hijau lembut Mellia Bouquet" data-testid="hero-product-image" /><span className="photo-caption">01 / 04<br /><b>green room</b></span></div><span className="stem-doodle">✽</span></motion.div>
      <div className="hero-bottom"><span>scroll to wander</span><span className="scroll-arrow">↓</span><span className="hero-side-note">est. 2021<br />made with feeling</span></div>
    </section>
    <div className="marquee" aria-label="Mellia Bouquet highlights" data-testid="editorial-marquee"><div>flowers for soft days <span>✳</span> gifts for golden people <span>✳</span> tiny joys, thoughtfully wrapped <span>✳</span> flowers for soft days <span>✳</span></div></div>
    <motion.section className="intro section-pad" id="notes" initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} variants={reveal}><div className="section-kicker">/ our little universe</div><div className="intro-grid"><h2>Not just flowers.<br /><em>A feeling, wrapped.</em></h2><div><p>Mellia Bouquet lahir dari kecintaan pada bunga yang tidak terlalu sempurna—yang mekar dengan caranya sendiri, lalu kami satukan untuk menemani ceritamu.</p><a href="#custom" className="underlined-link" data-testid="intro-custom-link">ceritakan maumu <ArrowUpRight size={15} /></a></div></div></motion.section>
    <section className="collection section-pad" id="collection" data-testid="collection-section"><div className="section-heading"><div><div className="section-kicker">/ pick your little joy</div><h2>Made for the<br /><em>moment.</em></h2></div><p className="section-note">Setiap rangkaian dirakit sesuai musim,<br />mood, dan orang yang kamu sayang.</p></div><div className="filter-row" role="tablist" aria-label="Filter koleksi">{["All Items", "Bouquet"].map((item) => <button key={item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item} data-testid={`filter-${item.toLowerCase().replace(" ", "-")}-button`}>{item}</button>)}</div><motion.div className="product-grid" layout>{visibleProducts.map((product, index) => <motion.article className={`product-card card-${index}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={product.name} data-testid={`product-card-${index}`}><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-index">0{index + 1}</span><a href={`${WA}?text=${encodeURIComponent(`Halo, aku tertarik dengan ${product.name}`)}`} target="_blank" rel="noreferrer" className="round-arrow" aria-label={`Pesan ${product.name}`} data-testid={`product-order-${index}-button`}><ArrowUpRight /></a></div><div className="product-meta"><div><h3>{product.name}</h3><span>{product.type}</span></div><strong>{product.price}</strong></div></motion.article>)}</motion.div></section>
    <section className="split-story section-pad"><div className="story-image"><img src={photos.detail} alt="Detail bunga putih segar" /><span>handpicked<br />in the morning</span></div><div className="story-copy"><div className="section-kicker">/ the camell way</div><h2>Pretty things<br />take <em>time.</em></h2><p>Kami percaya hadiah yang paling diingat adalah yang terasa personal. Pilih palet warnanya, ceritakan orangnya, dan biarkan kami merangkai sisanya.</p><a href={WA} target="_blank" rel="noreferrer" className="button button-outline" data-testid="story-whatsapp-button">Mulai ngobrol <Send size={16} /></a><div className="story-stamp">✳<br /><small>slow<br />& sweet</small></div></div></section>
    <section className="custom section-pad" id="custom" data-testid="custom-order-section"><div className="custom-header"><div className="section-kicker">/ make it yours</div><h2>Tell us the<br /><em>feeling.</em></h2><p>Isi sedikit detail, lalu kita lanjut ngobrol di WhatsApp. No pressure, just pretty things.</p></div><form className="custom-form" onSubmit={submitOrder}><label>Untuk momen apa? <select name="occasion" defaultValue="Birthday" data-testid="custom-occasion-select"><option>Birthday</option><option>Anniversary</option><option>Just because</option><option>Wedding</option></select></label><label>Kapan dibutuhkan? <input name="date" type="date" required data-testid="custom-date-input" /></label><label>Budget nyamanmu <select name="budget" defaultValue="200K — 350K" data-testid="custom-budget-select"><option>150K — 200K</option><option>200K — 350K</option><option>350K — 500K</option><option>Lets discuss</option></select></label><button type="submit" className="button button-dark" data-testid="custom-submit-button">Kirim ke WhatsApp <ArrowUpRight size={17} /></button>{sent && <p className="form-success" data-testid="custom-success-message">Pesanmu siap dikirim ✳</p>}</form></section>
    <section className="testimonials section-pad"><div className="section-heading"><div><div className="section-kicker">/ kind words</div><h2>From our<br /><em>soft corner.</em></h2></div><Sparkles className="sparkle" /></div><div className="quote-grid"><blockquote>“Buketnya datang cantik banget, lebih manis dari ekspektasiku. Detail kecilnya bikin pacarku langsung nangis bahagia.”<cite>— Nadia, South Jakarta <span>verified order ✳</span></cite></blockquote><blockquote>“Aku cuma kasih warna favorit dan budget. Hasilnya personal sekali, seperti mereka benar-benar kenal orang yang aku kasih.”<cite>— Raka, Bandung <span>verified order ✳</span></cite></blockquote></div></section>
    <section className="faq section-pad" data-testid="faq-section"><div className="section-kicker">/ good to know</div><div className="faq-grid"><h2>Before you<br /><em>say hello.</em></h2><div>{[{ q: "Bisa pesan untuk hari yang sama?", a: "Bisa, selama stok bunga dan slot kurir masih tersedia. Chat kami sebelum jam 12 siang untuk peluang terbaik." }, { q: "Bisa request warna atau bunga tertentu?", a: "Tentu. Kirim referensi warna atau foto mood-mu, kami akan bantu pilihkan bunga yang paling cantik dan sedang musim." }, { q: "Area pengirimannya di mana saja?", a: "Kami melayani Rejotangan, Tulungagung dan sekitarnya. Untuk area lain, chat kami dulu agar bisa kami cek opsi pengirimannya." }].map((item, index) => <div className="faq-item" key={item.q}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} data-testid={`faq-${index}-button`}><span>0{index + 1}</span>{item.q}<ChevronDown className={openFaq === index ? "rotated" : ""} size={18} /></button>{openFaq === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} data-testid={`faq-${index}-answer`}>{item.a}</motion.p>}</div>)}</div></div></section>
    <footer className="footer"><div className="footer-top"><div className="footer-brand"><div className="brand-mark"><span className="mark-flower">✳</span><span>Mellia<br /><i>Bouquet</i></span></div><p>small flowers,<br />big feelings.</p></div><div className="footer-action"><span>have a feeling?</span><a href={WA} target="_blank" rel="noreferrer" data-testid="footer-whatsapp-link">make it real <ArrowUpRight /></a></div></div><div className="footer-bottom"><span>© 2024 Mellia Bouquet</span><span>made slowly in Rejotangan, Tulungagung</span></div></footer>
    <a className="floating-wa" href={WA} target="_blank" rel="noreferrer" aria-label="Chat WhatsApp" data-testid="floating-whatsapp-button"><span>chat</span><Send size={19} /></a>
  </main>;
}

export default App;
