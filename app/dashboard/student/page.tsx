"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, Book, Trophy, Store, User, LogOut, 
  Play, Lock, Star, Check, Map, Zap, Heart, 
  MessageCircle, Mic, Search, Menu, X, Brain,
  Briefcase, Globe, PenTool, BookOpen, Snowflake, Shirt
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { curriculum, Phase, Unit, libraryTopics, storeItems } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PracticeView } from "@/components/practice-view"

// --- ICONS MAPPING ---
const iconMap: { [key: string]: any } = {
  "Briefcase": Briefcase,
  "Globe": Globe,
  "PenTool": PenTool,
  "MessageCircle": MessageCircle,
  "BookOpen": BookOpen,
  "Zap": Zap,
  "Heart": Heart,
  "Snowflake": Snowflake,
  "Shirt": Shirt,
  "Book": Book
}

// --- COMPONENTS ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all w-full text-left",
      active 
        ? "bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/20" 
        : "text-[#8899A6] hover:bg-white/5 hover:text-white border border-transparent"
    )}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
)

const LevelNode = ({ 
  unit, 
  index, 
  status, 
  phaseIndex,
  onClick 
}: { 
  unit: Unit, 
  index: number, 
  status: 'locked' | 'active' | 'completed', 
  phaseIndex: number,
  onClick: () => void 
}) => {
  // Determine colors based on phase
  const phaseColors = [
    { main: "#00E0FF", shadow: "#0099b0" }, // Phase 1: Cyan
    { main: "#7B61FF", shadow: "#5a43cc" }, // Phase 2: Purple
    { main: "#10B981", shadow: "#059669" }, // Phase 3: Emerald
    { main: "#F59E0B", shadow: "#D97706" }, // Phase 4: Amber
    { main: "#F43F5E", shadow: "#E11D48" }, // Phase 5: Rose
  ]
  
  const currentTheme = phaseColors[phaseIndex % phaseColors.length]

  return (
    <div className="relative z-10 transition-transform duration-300 group">
      {status === 'active' && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#050A18] px-3 py-1 rounded-lg font-extrabold text-xs uppercase animate-bounce shadow-lg whitespace-nowrap">
          Empezar
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
        </div>
      )}

      <motion.button
        whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
        whileTap={status !== 'locked' ? { scale: 0.9 } : {}}
        onClick={onClick}
        disabled={status === 'locked'}
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-[0_8px_0_rgba(0,0,0,0.3)] transition-all relative",
          status === 'locked' && "bg-[#1F2937] border-[#050A18] text-gray-500 cursor-not-allowed opacity-60",
          status === 'completed' && "bg-[#FFC800] border-[#050A18] text-[#050A18] shadow-[0_8px_0_#b38600]"
        )}
        style={status === 'active' ? { 
          backgroundColor: currentTheme.main, 
          borderColor: '#050A18', 
          color: '#050A18',
          boxShadow: `0 8px 0 ${currentTheme.shadow}`
        } : {}}
      >
        {status === 'locked' && <Lock className="w-8 h-8" />}
        {status === 'active' && <Play className="w-8 h-8 fill-current" />}
        {status === 'completed' && <Check className="w-8 h-8 stroke-[4]" />}
      </motion.button>

      {/* Stars */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
        {[1, 2, 3].map((star) => (
          <Star 
            key={star} 
            className={cn(
              "w-4 h-4", 
              status === 'completed' ? "fill-[#FFC800] text-[#FFC800]" : "fill-[#374151] text-[#374151]"
            )} 
          />
        ))}
      </div>
      
      {/* Title Tooltip on Hover */}
      <div className="absolute top-1/2 left-24 w-48 text-left opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-[#0B1121] p-3 rounded-xl border border-[#1F2937] shadow-xl">
        <div className="text-xs font-bold text-[#8899A6] uppercase mb-1">Lección {index + 1}</div>
        <div className="text-sm font-bold text-white leading-tight">{unit.title}</div>
        <div className="text-xs text-[#8899A6] mt-1 line-clamp-2">{unit.coreConcept}</div>
      </div>
    </div>
  )
}

const SidebarContent = ({ activeTab, setActiveTab, user, logout, userLevel }: any) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center gap-3 mb-10">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00E0FF] shadow-[0_0_15px_rgba(0,224,255,0.3)] flex-shrink-0">
        <img src="/fondoingles.png" alt="Logo" className="w-full h-full object-cover object-center scale-110" />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-white">Inglés<span className="text-[#00E0FF]">Total</span></span>
    </div>

    <nav className="flex-1 space-y-2">
      <SidebarItem icon={Map} label="Ruta de Aprendizaje" active={activeTab === "ruta"} onClick={() => setActiveTab("ruta")} />
      <SidebarItem icon={Brain} label="AI Tutor Personal" active={activeTab === "tutor"} onClick={() => setActiveTab("tutor")} />
      <SidebarItem icon={Mic} label="Speaking Practice" active={activeTab === "speaking"} onClick={() => setActiveTab("speaking")} />
      <SidebarItem icon={Book} label="Librería de Temas" active={activeTab === "library"} onClick={() => setActiveTab("library")} />
      <SidebarItem icon={Trophy} label="Ranking y Logros" active={activeTab === "ranking"} onClick={() => setActiveTab("ranking")} />
      <SidebarItem icon={Store} label="Tienda de Items" active={activeTab === "store"} onClick={() => setActiveTab("store")} />
    </nav>

    <div className="pt-6 border-t border-[#1F2937] flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 bg-[#00E0FF] rounded-full flex items-center justify-center text-[#050A18] font-bold">
        {user?.name?.substring(0, 2).toUpperCase() || "US"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold truncate text-white">{user?.name || "Usuario"}</div>
        <div className="text-xs text-[#8899A6]">{userLevel}</div>
      </div>
      <button onClick={logout} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  </div>
)

export default function StudentDashboard() {
  const { user, logout, updateProgress } = useAuth()
  const [activeTab, setActiveTab] = useState("ruta")
  const { toast } = useToast()
  
  // Progress State from User Context
  const [completedUnits, setCompletedUnits] = useState<string[]>([])
  const [currentUnitId, setCurrentUnitId] = useState<string>("unit-1")
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)

  // Sync local state with user progress
  useEffect(() => {
    if (user && user.progress) {
      // @ts-ignore
      const completed = Object.keys(user.progress)
      setCompletedUnits(completed)
      
      // Determine current unit (first incomplete one)
      const allUnits = curriculum.flatMap(p => p.units)
      const firstIncomplete = allUnits.find(u => !completed.includes(u.id))
      if (firstIncomplete) {
        setCurrentUnitId(firstIncomplete.id)
      } else {
        // All done?
        setCurrentUnitId("completed")
      }
    }
  }, [user])

  const handleUnitClick = (unitId: string) => {
    const unit = curriculum.flatMap(p => p.units).find(u => u.id === unitId)
    if (!unit) return

    if (completedUnits.includes(unitId)) {
      // Review mode
      setSelectedUnit(unit)
    } else if (unitId === currentUnitId) {
      // New lesson mode
      setSelectedUnit(unit)
    }
  }

  const handlePracticeComplete = (score: number) => {
    if (selectedUnit) {
      updateProgress(selectedUnit.id, score)
      
      if (!completedUnits.includes(selectedUnit.id)) {
        setCompletedUnits(prev => [...prev, selectedUnit.id])
        
        // Find next unit logic
        const allUnits = curriculum.flatMap(p => p.units)
        const currentIndex = allUnits.findIndex(u => u.id === selectedUnit.id)
        if (currentIndex < allUnits.length - 1) {
          setCurrentUnitId(allUnits[currentIndex + 1].id)
        }
      }
      setSelectedUnit(null)
      toast({ 
        title: "¡Unidad Completada!", 
        description: `Has ganado ${score * 10} puntos de experiencia.` 
      })
    }
  }

  // Calculate XP based on progress
  // @ts-ignore
  const totalXP = Object.values(user?.progress || {}).reduce((acc: number, curr: number) => acc + (curr * 10), 0)
  
  // Calculate Rank based on XP (Simple logic for now)
  const currentRank = Math.max(1, 50 - Math.floor(totalXP / 100))

  // Determine current level label
  const currentPhase = curriculum.find(p => p.units.some(u => u.id === currentUnitId))
  const userLevel = currentUnitId === "completed" ? "¡Curso Completado!" : (currentPhase?.level || "Nivel A1.1")

  return (
    <div className="flex h-screen bg-[#050A18] text-white overflow-hidden font-sans">
      <AnimatePresence>
        {selectedUnit && (
          <PracticeView 
            unit={selectedUnit} 
            onClose={() => setSelectedUnit(null)} 
            onComplete={handlePracticeComplete} 
          />
        )}
      </AnimatePresence>
      
      {/* --- SIDEBAR --- */}
      <aside className="w-[280px] bg-[#0B1121] border-r border-[#1F2937] flex flex-col p-6 z-20 hidden md:flex">
        <SidebarContent 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user} 
          logout={logout} 
          userLevel={userLevel} 
        />
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative overflow-y-auto bg-[#050A18]">
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-30" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1F2937 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Ambient Glows */}
        <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#00E0FF] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#7B61FF] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* --- TOP BAR --- */}
        <div className="sticky top-0 z-30 px-4 md:px-8 py-6 flex justify-between md:justify-end gap-4 pointer-events-none bg-gradient-to-b from-[#050A18] to-transparent">
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden pointer-events-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#0B1121] border-r-[#1F2937] p-6">
                 <SidebarContent 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    user={user} 
                    logout={logout} 
                    userLevel={userLevel} 
                  />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-4">
            <div className="pointer-events-auto bg-[#0B1121] border border-[#1F2937] px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[#FFC800] shadow-lg">
              <Zap className="w-4 h-4 fill-current" />
              <span>{totalXP} XP</span>
            </div>
            <div className="pointer-events-auto bg-[#0B1121] border border-[#1F2937] px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[#F43F5E] shadow-lg">
              <Heart className="w-4 h-4 fill-current" />
              {/* @ts-ignore */}
              <span>{user?.lives || 5}</span>
            </div>
            <div className="pointer-events-auto bg-[#0B1121] border border-[#1F2937] px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[#7B61FF] shadow-lg">
              <Trophy className="w-4 h-4" />
              <span>Rank #{currentRank}</span>
            </div>
            <div className="pointer-events-auto bg-[#0B1121] border border-[#1F2937] px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[#00E0FF] shadow-lg">
              <div className="w-4 h-4 bg-[#00E0FF] rounded-sm rotate-45" />
              {/* @ts-ignore */}
              <span>{user?.gems || 0}</span>
            </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="max-w-[600px] mx-auto pb-32 px-4 relative z-10">
          
          {activeTab === "ruta" && (
            <div className="flex flex-col items-center">
              
              {curriculum.map((phase, phaseIndex) => (
                <div key={phase.id} className="w-full mb-20 relative">
                  
                  {/* Phase Header */}
                  <div className="text-center mb-16 relative z-20">
                    <div className={cn(
                      "text-sm font-bold uppercase tracking-widest mb-2",
                      phaseIndex === 0 ? "text-[#00E0FF]" : "text-[#7B61FF]"
                    )}>
                      {phase.id.replace('-', ' ')}
                    </div>
                    <h2 className="text-3xl font-extrabold">{phase.title}</h2>
                    <p className="text-[#8899A6] mt-2">{phase.level}</p>
                  </div>

                  {/* SVG Path Background for this Phase */}
                  <div className="relative w-full" style={{ height: `${phase.units.length * 160 + (phaseIndex < curriculum.length - 1 ? 80 : 0)}px` }}>
                    <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-full pointer-events-none overflow-visible opacity-30">
                      <path 
                        d={`M${(0 + phaseIndex) % 3 === 1 ? 120 : (0 + phaseIndex) % 3 === 2 ? 280 : 200},80 ${phase.units.map((_, i) => {
                          // Calculate effective index to shift pattern per phase
                          const effectiveIndex = i + phaseIndex;
                          
                          // Current Node Position (Center is 200 now for wider SVG)
                          const startY = i * 160 + 80;
                          const startX = effectiveIndex % 3 === 1 ? 120 : effectiveIndex % 3 === 2 ? 280 : 200;

                          if (i === phase.units.length - 1) {
                            // If it's the last unit, AND not the last phase, draw a connector to the next phase
                            if (phaseIndex < curriculum.length - 1) {
                                const endY = startY + 240; // Distance to next node
                                // Next phase starts at (0 + phaseIndex + 1)
                                const nextPhaseStartIndex = 0 + phaseIndex + 1;
                                const endX = nextPhaseStartIndex % 3 === 1 ? 120 : nextPhaseStartIndex % 3 === 2 ? 280 : 200;
                                
                                const cp1Y = startY + 80;
                                const cp2Y = endY - 80;
                                return `M${startX},${startY} C${startX},${cp1Y} ${endX},${cp2Y} ${endX},${endY}`;
                            }
                            return ""; 
                          }
                          
                          // Next Node Position (Internal)
                          const nextEffectiveIndex = (i + 1) + phaseIndex;
                          const endY = (i + 1) * 160 + 80;
                          const endX = nextEffectiveIndex % 3 === 1 ? 120 : nextEffectiveIndex % 3 === 2 ? 280 : 200;
                          
                          // Control Points for Bezier Curve (Vertical S-shape)
                          const cp1Y = startY + 80;
                          const cp2Y = endY - 80;
                          
                          return `M${startX},${startY} C${startX},${cp1Y} ${endX},${cp2Y} ${endX},${endY}`
                        }).join(" ")}`}
                        fill="none" 
                        stroke={["#00E0FF", "#7B61FF", "#10B981", "#F59E0B", "#F43F5E"][phaseIndex % 5]}  
                        strokeWidth="4" 
                        strokeDasharray="10 10"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Units Grid - Absolutely Positioned */}
                    {phase.units.map((unit, i) => {
                      const isCompleted = completedUnits.includes(unit.id);
                      const isCurrent = unit.id === currentUnitId;
                      const isLocked = !isCompleted && !isCurrent;
                      
                      // Calculate Position with Phase Offset
                      const effectiveIndex = i + phaseIndex;
                      const top = i * 160;
                      const leftOffset = effectiveIndex % 3 === 1 ? -80 : effectiveIndex % 3 === 2 ? 80 : 0;
                      
                      return (
                        <div 
                          key={unit.id} 
                          className="absolute left-1/2 -translate-x-1/2"
                          style={{ top: `${top}px`, marginLeft: `${leftOffset}px` }}
                        >
                          <LevelNode 
                            unit={unit}
                            index={i}
                            status={isCompleted ? 'completed' : isCurrent ? 'active' : 'locked'}
                            phaseIndex={phaseIndex}
                            onClick={() => handleUnitClick(unit.id)}
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Section Gate (between phases) */}
                  {phaseIndex < curriculum.length - 1 && (
                    <div className="mt-12 bg-[#0B1121] border-2 border-[#1F2937] rounded-2xl p-6 w-full max-w-md mx-auto flex items-center gap-4 relative z-20">
                      <div className="bg-[#1F2937] p-3 rounded-xl">
                        <Lock className="w-6 h-6 text-[#8899A6]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[#8899A6] uppercase">Siguiente Sección</div>
                        <div className="font-bold text-white">{curriculum[phaseIndex + 1].title}</div>
                      </div>
                      <Button variant="outline" className="border-[#374151] text-white hover:bg-[#1F2937]">
                        Examen
                      </Button>
                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

          {activeTab === "tutor" && (
            <div className="flex flex-col items-center justify-center h-[600px] text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-[#00E0FF]/10 rounded-full flex items-center justify-center mb-8 border border-[#00E0FF]/30">
                <Brain className="w-12 h-12 text-[#00E0FF]" />
              </div>
              <h2 className="text-4xl font-extrabold mb-4 text-white">AI Tutor Personal</h2>
              <p className="text-[#8899A6] text-lg mb-8">
                Practica conversaciones reales, resuelve dudas gramaticales y recibe feedback instantáneo potenciado por inteligencia artificial.
              </p>
              
              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 w-full text-left mb-8">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#00E0FF] flex items-center justify-center font-bold text-[#050A18]">AI</div>
                  <div className="bg-[#1F2937] p-4 rounded-2xl rounded-tl-none text-gray-300">
                    Hello! I'm your personal English tutor. How can I help you today? We can practice conversation or review a specific topic.
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <div className="bg-[#00E0FF]/10 border border-[#00E0FF]/20 p-4 rounded-2xl rounded-tr-none text-[#00E0FF]">
                    Hi! I want to practice ordering food in a restaurant.
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center font-bold text-gray-400">YO</div>
                </div>
              </div>

              <Button className="bg-[#00E0FF] text-[#050A18] hover:bg-[#00E0FF]/90 font-bold px-8 py-6 text-lg rounded-xl">
                Iniciar Sesión de Chat
              </Button>
            </div>
          )}

          {activeTab === "speaking" && (
            <div className="flex flex-col items-center justify-center h-[600px] text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-[#F43F5E]/10 rounded-full flex items-center justify-center mb-8 border border-[#F43F5E]/30">
                <Mic className="w-12 h-12 text-[#F43F5E]" />
              </div>
              <h2 className="text-4xl font-extrabold mb-4 text-white">Speaking Lab</h2>
              <p className="text-[#8899A6] text-lg mb-8">
                Mejora tu pronunciación con análisis de voz en tiempo real. Lee las frases y obtén una puntuación de precisión.
              </p>
              
              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 w-full mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F43F5E] to-transparent opacity-50" />
                <p className="text-2xl font-serif italic text-white mb-8">"The quick brown fox jumps over the lazy dog."</p>
                
                <div className="flex justify-center gap-2 mb-4">
                  {[1,2,3,4,5,4,3,2,1,2,3,4,5].map((h, i) => (
                    <div key={i} className="w-2 bg-[#F43F5E]" style={{ height: `${h * 8}px`, opacity: 0.5 + (h/10) }} />
                  ))}
                </div>
              </div>

              <Button className="bg-[#F43F5E] text-white hover:bg-[#F43F5E]/90 font-bold px-8 py-6 text-lg rounded-xl flex items-center gap-3">
                <Mic className="w-6 h-6" /> Presiona para Hablar
              </Button>
            </div>
          )}

          {activeTab === "library" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full mb-4">
                <h2 className="text-3xl font-extrabold text-white">Librería de Temas</h2>
                <p className="text-[#8899A6]">Explora recursos adicionales por categoría.</p>
              </div>
              {libraryTopics.map((topic, i) => {
                const Icon = iconMap[topic.icon] || Book
                return (
                  <div 
                    key={i} 
                    onClick={() => toast({ title: "Próximamente", description: `El módulo de ${topic.title} estará disponible pronto.` })}
                    className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl hover:border-[#00E0FF]/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#1F2937] rounded-xl flex items-center justify-center group-hover:bg-[#00E0FF] transition-colors">
                        <Icon className="w-6 h-6 text-[#8899A6] group-hover:text-[#050A18]" />
                      </div>
                      <span className="bg-[#1F2937] text-xs font-bold px-2 py-1 rounded text-[#8899A6]">{topic.lessonsCount} Lecciones</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                    <p className="text-sm text-[#8899A6]">{topic.description}</p>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === "ranking" && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-white mb-2">Tabla de Clasificación</h2>
                <p className="text-[#8899A6]">Compite con otros estudiantes y sube de liga.</p>
              </div>

              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1F2937] bg-[#1F2937]/50 flex justify-between font-bold text-[#8899A6] text-sm uppercase tracking-wider">
                  <span>Posición</span>
                  <span>Estudiante</span>
                  <span>XP Total</span>
                </div>
                {[
                  { name: "Sarah Connor", xp: 2450, avatar: "SC" },
                  { name: "John Doe", xp: 2100, avatar: "JD" },
                  { name: user?.name || "Tu Usuario", xp: totalXP, avatar: user?.name?.substring(0, 2).toUpperCase() || "TU", active: true },
                  { name: "Mike Ross", xp: 980, avatar: "MR" },
                  { name: "Elena Fisher", xp: 850, avatar: "EF" },
                ].sort((a, b) => b.xp - a.xp).map((student, i) => (
                  <div key={i} className={cn(
                    "p-4 flex items-center justify-between border-b border-[#1F2937] last:border-0",
                    student.active ? "bg-[#00E0FF]/5 border-l-4 border-l-[#00E0FF]" : "hover:bg-[#1F2937]/30"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 flex items-center justify-center font-bold rounded-full",
                        i === 0 ? "bg-[#FFC800] text-[#050A18]" : 
                        i === 1 ? "bg-[#9CA3AF] text-[#050A18]" : 
                        i === 2 ? "bg-[#B45309] text-white" : "text-[#8899A6]"
                      )}>
                        {i + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1F2937] rounded-full flex items-center justify-center font-bold text-gray-400">
                          {student.avatar}
                        </div>
                        <span className={cn("font-bold", student.active ? "text-[#00E0FF]" : "text-white")}>
                          {student.name}
                        </span>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#FFC800]">{student.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "store" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#1F2937] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Store className="w-10 h-10 text-[#8899A6]" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Tienda de Items</h2>
                <p className="text-[#8899A6]">Canjea tus gemas por potenciadores y vidas extra.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeItems.map((item) => {
                  const Icon = iconMap[item.icon] || Store
                  return (
                    <div key={item.id} className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl flex flex-col relative overflow-hidden group hover:border-[#00E0FF]/50 transition-all">
                      <div className="absolute top-0 right-0 bg-[#00E0FF] text-[#050A18] text-xs font-bold px-3 py-1 rounded-bl-xl">
                        {item.price} 💎
                      </div>
                      <div className="w-16 h-16 bg-[#1F2937] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-[#00E0FF]" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-sm text-[#8899A6] mb-6 flex-1">{item.description}</p>
                      <Button 
                        className="w-full bg-[#1F2937] hover:bg-[#00E0FF] hover:text-[#050A18] text-white font-bold transition-colors"
                        // @ts-ignore
                        disabled={(user?.gems || 0) < item.price}
                      >
                        {/* @ts-ignore */}
                        {(user?.gems || 0) >= item.price ? "Comprar" : "Insuficientes Gemas"}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
