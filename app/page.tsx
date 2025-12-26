"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Globe, Brain, Zap, Mic, Check, Menu, X, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#050A18] text-white font-sans overflow-x-hidden">
      
      {/* --- NAV --- */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-[#050A18]/80 sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl font-bold">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00E0FF] shadow-[0_0_10px_rgba(0,224,255,0.3)]">
              <img src="/placeholder-logo.png" alt="Logo" className="w-full h-full object-cover object-center scale-110" />
            </div>
            <span>InglésPara<span className="text-[#00E0FF]">Todos</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#9CA3AF] hover:text-[#00E0FF] font-semibold transition-colors">Características</a>
            <a href="#method" className="text-[#9CA3AF] hover:text-[#00E0FF] font-semibold transition-colors">Método</a>
            <a href="#pricing" className="text-[#9CA3AF] hover:text-[#00E0FF] font-semibold transition-colors">Precios</a>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:inline-block px-6 py-2 bg-[#00E0FF] text-[#050A18] font-extrabold rounded-2xl shadow-[0_4px_0_#008fa3] active:shadow-none active:translate-y-[4px] transition-all hover:brightness-110">
              ENTRAR
            </Link>
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B1121] border-b border-white/10 p-4 flex flex-col gap-4">
            <a href="#features" className="text-[#9CA3AF] hover:text-[#00E0FF]" onClick={() => setMobileMenuOpen(false)}>Características</a>
            <a href="#method" className="text-[#9CA3AF] hover:text-[#00E0FF]" onClick={() => setMobileMenuOpen(false)}>Método</a>
            <a href="#pricing" className="text-[#9CA3AF] hover:text-[#00E0FF]" onClick={() => setMobileMenuOpen(false)}>Precios</a>
            <Link href="/login" className="text-[#00E0FF] font-bold" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="max-w-[1100px] mx-auto px-5 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Aprende Inglés a la <br/>
            <span className="text-[#00E0FF]">Velocidad de la Luz</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#9CA3AF] mb-10 leading-relaxed"
          >
            La plataforma gamificada que transforma el aprendizaje en una aventura espacial. Sube de nivel, gana recompensas y habla con fluidez.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link href="/register" className="px-8 py-4 bg-[#00E0FF] text-[#050A18] font-extrabold rounded-2xl shadow-[0_6px_0_#008fa3] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 uppercase tracking-wide">
              Empezar Gratis
            </Link>
            <Link href="#" className="px-8 py-4 bg-[#2C3E50] text-white font-extrabold rounded-2xl shadow-[0_6px_0_#1A252F] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 uppercase tracking-wide">
              Ver Demo
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 relative flex justify-center hidden md:flex">
          <motion.div 
            animate={{ y: [-15, 0, -15] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-[400px] h-[300px] bg-gradient-to-br from-[#1F2937] to-[#111827] border-4 border-[#2C3E50] rounded-[20px] shadow-[0_20px_50px_rgba(0,224,255,0.15)] flex items-center justify-center relative"
          >
            <Rocket className="w-32 h-32 text-[#00E0FF]" />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-5 -right-5 bg-[#0B1121] border-2 border-[#FFC800] px-5 py-2 rounded-full font-bold text-[#FFC800] shadow-lg"
            >
              Nivel 5!
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* --- STATS STRIP --- */}
      <section className="bg-[#0B1121] border-y border-[#1F2937] py-10 my-12">
        <div className="max-w-[1100px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-extrabold text-[#00E0FF] mb-2">50K+</div>
            <div className="text-[#9CA3AF] text-sm uppercase tracking-widest font-bold">Viajeros Activos</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#00E0FF] mb-2">4.9/5</div>
            <div className="text-[#9CA3AF] text-sm uppercase tracking-widest font-bold">Calificación</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#00E0FF] mb-2">200+</div>
            <div className="text-[#9CA3AF] text-sm uppercase tracking-widest font-bold">Misiones</div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="max-w-[1100px] mx-auto px-5 py-20">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Tecnología de <span className="text-[#E91E63]">Otro Mundo</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Brain, color: "#FFC800", title: "AI Tutor Personal", desc: "Tu copiloto de inteligencia artificial disponible 24/7 para practicar conversaciones reales." },
            { icon: Zap, color: "#00E0FF", title: "Gamificación Total", desc: "Olvida los libros aburridos. Aquí ganas XP, mantienes rachas y desbloqueas logros." },
            { icon: Mic, color: "#E91E63", title: "Speech Recognition", desc: "Nuestros sensores analizan tu pronunciación y te corrigen al instante." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#0B1121] p-8 rounded-3xl border-2 border-transparent hover:border-[#00E0FF] transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(0,224,255,0.05)]"
            >
              <feature.icon className="w-12 h-12 mb-6" style={{ color: feature.color }} />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="method" className="py-20 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-5">
          <h2 className="text-4xl font-extrabold text-center mb-20">Tu Ruta de Vuelo</h2>
          
          <div className="relative flex flex-col items-center">
            {/* Central Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00E0FF] to-transparent md:-translate-x-1/2 border-r-2 border-dashed border-[#00E0FF]/30 bg-transparent" />

            {[
              { step: 1, title: "Evalúa tu Nivel", desc: "Realiza un test de diagnóstico rápido para calibrar tu punto de partida en el mapa." },
              { step: 2, title: "Completa Misiones", desc: "Lecciones cortas y efectivas de 10 minutos. Teoría, práctica y juego combinados." },
              { step: 3, title: "Derrota Jefes", desc: "Al final de cada sección, demuestra lo aprendido en desafíos interactivos." },
              { step: 4, title: "Obtén tu Certificado", desc: "Desbloquea tu insignia de fluidez y certificado validado internacionalmente." }
            ].map((item, i) => (
              <div key={i} className={cn(
                "flex flex-col md:flex-row items-center w-full mb-16 relative z-10",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                <div className="flex-1 hidden md:block" />
                
                {/* Marker */}
                <div className="w-16 h-16 bg-[#050A18] border-4 border-[#00E0FF] rounded-full flex items-center justify-center text-2xl font-bold text-[#00E0FF] shadow-[0_0_15px_#008fa3] z-20 absolute left-0 md:left-1/2 md:-translate-x-1/2">
                  {item.step}
                </div>

                <div className={cn(
                  "flex-1 pl-24 md:pl-0 w-full",
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                )}>
                  <div className="bg-[#0B1121] p-8 rounded-3xl border-2 border-[#1F2937]">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[#9CA3AF]">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="max-w-[1100px] mx-auto px-5 py-20">
        <h2 className="text-4xl font-extrabold text-center mb-16">Elige tu Nave</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Basic */}
          <div className="bg-[#0B1121] p-8 rounded-3xl border-2 border-[#1F2937] text-center">
            <h3 className="text-2xl font-bold mb-4">Explorador</h3>
            <div className="text-4xl font-extrabold mb-6">Gratis</div>
            <ul className="text-left space-y-3 mb-8 text-[#ccc]">
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> 5 corazones al día</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Lecciones básicas</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Acceso con publicidad</li>
            </ul>
            <button className="w-full py-4 bg-[#2C3E50] text-white font-bold rounded-2xl shadow-[0_6px_0_#1A252F] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 uppercase">
              Elegir
            </button>
          </div>

          {/* Pro */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-[#0B1121] to-[#0d1b3e] p-8 rounded-3xl border-2 border-[#00E0FF] text-center relative shadow-[0_0_30px_rgba(0,224,255,0.1)]"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00E0FF] text-[#050A18] px-4 py-1 rounded-full font-bold text-sm">
              MÁS POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#00E0FF]">Astronauta</h3>
            <div className="text-4xl font-extrabold mb-6">$9.99<span className="text-lg text-[#9CA3AF] font-normal">/mes</span></div>
            <ul className="text-left space-y-3 mb-8 text-[#ccc]">
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Vidas ilimitadas</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Sin anuncios</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Tutor AI ilimitado</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Práctica de pronunciación</li>
            </ul>
            <button className="w-full py-4 bg-[#00E0FF] text-[#050A18] font-bold rounded-2xl shadow-[0_6px_0_#008fa3] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 uppercase">
              Despegar Ahora
            </button>
          </motion.div>

          {/* Premium */}
          <div className="bg-[#0B1121] p-8 rounded-3xl border-2 border-[#1F2937] text-center">
            <h3 className="text-2xl font-bold mb-4">Comandante</h3>
            <div className="text-4xl font-extrabold mb-6">$19.99<span className="text-lg text-[#9CA3AF] font-normal">/mes</span></div>
            <ul className="text-left space-y-3 mb-8 text-[#ccc]">
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Todo lo de Astronauta</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Certificados Premium</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#00E0FF]" /> Mentoría 1 a 1 mensual</li>
            </ul>
            <button className="w-full py-4 bg-[#2C3E50] text-white font-bold rounded-2xl shadow-[0_6px_0_#1A252F] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 uppercase">
              Elegir
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <div className="max-w-[1100px] mx-auto px-5 mb-20">
        <div className="bg-gradient-to-br from-[#0B1121] to-[#151e36] p-12 md:p-20 rounded-[30px] border border-[#1F2937] text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">¿Listo para despegar?</h2>
          <p className="text-xl text-[#9CA3AF] mb-10 max-w-2xl mx-auto">Únete a miles de estudiantes que ya están transformando su futuro.</p>
          <Link href="/register" className="inline-block px-10 py-5 bg-[#00E0FF] text-[#050A18] text-xl font-extrabold rounded-2xl shadow-[0_6px_0_#008fa3] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 uppercase">
            Crear Cuenta Gratis
          </Link>
        </div>
      </div>

      <footer className="text-center text-[#4B5563] pb-10 text-sm">
        © 2025 Inglés para Todos. Todos los derechos reservados.
      </footer>

    </div>
  )
}
