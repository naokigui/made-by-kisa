/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, MessageSquare, Instagram, Mail, ChevronLeft, ChevronRight, Menu, X, ArrowRight } from "lucide-react";
import { PRODUCTS, BRAND_INFO } from "./constants";
import { Product, ContactFormData } from "./types";

import heroImg from "./assets/images/foto-pagina-principal.jpeg";
import sobreImg from "./assets/images/sobre.jpeg";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getItemsToShow = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const itemsToShow = getItemsToShow();
  const maxIndex = Math.max(0, PRODUCTS.length - itemsToShow);

  useEffect(() => {
    if (currentProductIndex > maxIndex) {
      setCurrentProductIndex(maxIndex);
    }
  }, [itemsToShow, maxIndex, currentProductIndex]);

  const handlePrev = () => {
    setCurrentProductIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentProductIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };

  const handleOrder = (product: Product) => {
    const message = encodeURIComponent(`Olá! Gostaria de encomendar o produto: ${product.name}`);
    window.open(`https://wa.me/${BRAND_INFO.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div id="inicio" className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: scrolled ? 0 : "-100%" }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="absolute inset-0 bg-brand-sidebar/95 backdrop-blur-md border-b border-brand-border z-[-1]"
        />
        <div className={`max-w-7xl mx-auto px-12 flex justify-between items-center transition-all duration-500 ${scrolled ? "h-20" : "h-28"}`}>
          {/* Logo & Brand (Left) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-4 cursor-pointer"
            onClick={(e) => scrollTo(e, "inicio")}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img 
                src={BRAND_INFO.logo} 
                alt="Logo Made by Kisa" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-2xl tracking-tight font-bold text-brand-ink uppercase whitespace-nowrap">made by kisa</span>
          </motion.div>
          
          {/* Menu Links (Right on Desktop) - Distributed beautifully with generous spacing */}
          <div className="hidden md:flex items-center gap-16 lg:gap-24 text-xs lg:text-sm uppercase tracking-widest font-medium">
            {[
              { name: "Início", id: "inicio" },
              { name: "Produtos", id: "produtos" },
              { name: "Sobre", id: "sobre" },
              { name: "Contato", id: "contato" }
            ].map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                onClick={(e) => scrollTo(e, item.id)}
                className="text-brand-ink hover:text-brand-accent transition-colors relative group py-1 whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-ink hover:border-brand-accent hover:text-brand-accent transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-brand-ink text-brand-sidebar p-8 flex flex-col justify-between md:hidden"
          >
            {/* Header row inside mobile menu */}
            <div className="flex justify-between items-center h-20 px-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-accent/30 bg-brand-sidebar">
                  <img 
                    src={BRAND_INFO.logo} 
                    alt="Logo Made by Kisa" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-serif text-2xl tracking-tight font-bold text-brand-sidebar uppercase">made by kisa</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-brand-border/20 flex items-center justify-center hover:bg-brand-sidebar/10 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={18} className="text-brand-sidebar" />
              </button>
            </div>

            {/* Menu Links with staggered animation */}
            <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 my-auto">
              {[
                { name: "Início", num: "01", sub: "Voltar para o topo", id: "inicio" },
                { name: "Produtos", num: "02", sub: "Coleções exclusivas", id: "produtos" },
                { name: "Sobre", num: "03", sub: "Nossa história & afeto", id: "sobre" },
                { name: "Contato", num: "04", sub: "Agende sua peça personalizada", id: "contato" }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="w-full text-center"
                >
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => scrollTo(e, item.id)}
                    className="group inline-flex flex-col items-center py-2"
                  >
                    <span className="text-brand-accent text-[10px] font-mono tracking-[0.3em] mb-1">
                      {item.num} / {item.name.toUpperCase()}
                    </span>
                    <span className="text-3xl sm:text-4xl font-serif text-brand-sidebar transition-all group-hover:text-brand-accent duration-300">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-brand-sidebar/50 uppercase tracking-[0.2em] mt-1.5 transition-colors group-hover:text-brand-sidebar duration-300">
                      {item.sub}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer Row in Mobile Menu */}
            <div className="flex flex-col items-center gap-6 mt-auto pb-4 border-t border-brand-border/10 pt-6">
              <div className="flex justify-center gap-4 w-full px-2">
                <a 
                  href={`https://instagram.com/${BRAND_INFO.instagram.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 text-brand-sidebar/85 hover:text-brand-accent transition-colors py-3 px-4 rounded-full border border-brand-border/20 hover:border-brand-accent/40 bg-white/5 text-[10px] font-bold uppercase tracking-wider"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
                <a 
                  href={`https://wa.me/${BRAND_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 text-brand-sidebar/85 hover:text-brand-whatsapp transition-colors py-3 px-4 rounded-full border border-brand-border/20 hover:border-brand-whatsapp/40 bg-white/5 text-[10px] font-bold uppercase tracking-wider"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
              <p className="text-[8px] text-brand-sidebar/40 uppercase tracking-[0.3em] text-center">
                Feito à mão com afeto • © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-12 grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-accent uppercase text-[10px] tracking-[0.4em] font-bold block mb-6">
                Curadoria Artesanal
              </span>
              <h1 className="text-7xl md:text-8xl font-serif leading-[1.1] mb-10 text-brand-ink">
                Beleza no <br />
                <span className="text-brand-accent">cotidiano.</span>
              </h1>
              <p className="text-lg leading-relaxed text-brand-text/70 mb-12 max-w-sm">
                Peças únicas que contam histórias através do fazer manual e da atenção aos detalhes.
              </p>
              <div className="flex">
                <a 
                  href="#produtos" 
                  onClick={(e) => scrollTo(e, "produtos")}
                  className="bg-brand-ink text-white px-12 py-5 rounded-full flex items-center gap-4 font-bold hover:bg-brand-accent transition-colors uppercase text-[10px] tracking-[0.3em] group"
                >
                  Explorar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.2, delay: 0.2 }}
               className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-brand-border/20">
                <img 
                  src={heroImg} 
                  alt="Artesanato" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="produtos" className="py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div className="text-left">
                <h2 className="text-5xl font-serif mb-4">Alguns dos meus produtos</h2>
                <p className="text-brand-accent uppercase tracking-[0.4em] text-[10px]">Peças singulares sob consulta</p>
              </div>
              {PRODUCTS.length > 4 && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePrev}
                    disabled={currentProductIndex === 0}
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-accent hover:text-brand-accent disabled:opacity-30 disabled:hover:border-brand-border disabled:hover:text-brand-ink transition-all cursor-pointer"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={currentProductIndex >= maxIndex}
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-accent hover:text-brand-accent disabled:opacity-30 disabled:hover:border-brand-border disabled:hover:text-brand-ink transition-all cursor-pointer"
                    aria-label="Próximo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {PRODUCTS.length > 4 ? (
              <div className="relative -mx-4">
                <div className="overflow-hidden px-4">
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ 
                      transform: `translateX(-${currentProductIndex * (100 / PRODUCTS.length)}%)`,
                      width: `${(PRODUCTS.length / itemsToShow) * 100}%` 
                    }}
                  >
                    {PRODUCTS.map((product, idx) => (
                      <div 
                        key={product.id}
                        className="px-4 shrink-0 animate-fade-in"
                        style={{ width: `${100 / PRODUCTS.length}%` }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          viewport={{ once: true }}
                          className="group cursor-pointer"
                          onClick={() => handleOrder(product)}
                        >
                          <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-lg bg-brand-sidebar/30">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="text-center">
                            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-brand-ink mb-2">{product.name}</h4>
                            <p className="text-[10px] text-brand-accent uppercase tracking-widest">{product.category}</p>
                            <div className="mt-4 w-6 h-px bg-brand-border mx-auto transition-all group-hover:w-12" />
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
                {PRODUCTS.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => handleOrder(product)}
                  >
                    <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-lg bg-brand-sidebar/30">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-brand-ink mb-2">{product.name}</h4>
                      <p className="text-[10px] text-brand-accent uppercase tracking-widest">{product.category}</p>
                      <div className="mt-4 w-6 h-px bg-brand-border mx-auto transition-all group-hover:w-12" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-32 bg-brand-sidebar">
          <div className="max-w-7xl mx-auto px-12 grid md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                <img 
                   src={sobreImg} 
                   alt="Made by Kisa" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <h2 className="text-5xl lg:text-6xl font-serif mb-10 leading-tight">Um pouco <span className="text-brand-accent">sobre mim.</span></h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed max-w-md">
                <p>
                  Oi, oi! Meu nome é Isabelle, sou estudante de artes visuais na UNESP e uma das coisas que eu mais gosto de fazer é criar!
                </p>
                <p>
                  Através de cada acessório, há um esforço de criar algo que inspire e afete positivamente a vida de cada um. Seja muito bem-vindo a minha lojinha! ❤️
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-24">
          <div className="max-w-3xl mx-auto px-12 text-center">
             <h2 className="text-5xl font-serif mb-6">Fale Comigo</h2>
             <p className="text-brand-text/60 mb-10 uppercase tracking-[0.4em] text-[10px]">Encomendas especiais e dúvidas</p>
             
             <div className="flex justify-center">
                <a 
                  href={`https://wa.me/${BRAND_INFO.whatsapp}`} 
                  target="_blank"
                  className="bg-brand-whatsapp text-white px-12 py-5 rounded-full font-bold hover:bg-brand-whatsapp/90 transition-all uppercase text-[10px] tracking-[0.3em]"
                >
                  Continuar no WhatsApp
                </a>
             </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center px-6"
          >
            <a 
              href={`https://instagram.com/${BRAND_INFO.instagram.replace('@', '')}`} 
              target="_blank" 
              className="inline-flex items-center justify-center flex-wrap gap-2 md:gap-3 text-brand-text/40 hover:text-brand-accent transition-colors group max-w-full"
            >
              <Instagram size={14} className="group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-center">Para mais novidades, me siga no instagram</span>
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-ink text-white pt-20 pb-12 px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative">
          <div>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-8 h-8 rounded-full overflow-hidden">
                 <img 
                   src={BRAND_INFO.logo} 
                   alt="Logo footer" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                 />
               </div>
               <span className="font-serif text-2xl tracking-tight opacity-80 uppercase">made by kisa</span>
            </div>
            <p className="text-white/50 max-w-xs leading-relaxed text-sm">
               Poesia visual em forma de objetos artesanais.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-white/30">Localização</h4>
            <div className="text-xs text-white/40 space-y-3 uppercase tracking-widest">
              <p>São Paulo, BR</p>
              <p>Aberto Sob Consulta</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-center items-center text-[9px] text-white/20 uppercase tracking-[0.3em]">
          <span>© 2026 made by kisa</span>
        </div>
      </footer>

    </div>
  );
}
