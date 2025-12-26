"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertCircle, ArrowRight, Trophy, Star, RefreshCcw, Book, Zap, MessageSquare, Code, Volume2, Play, Swords } from "lucide-react"
import { Unit, Exercise } from "@/lib/data"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

interface PracticeViewProps {
  unit: Unit
  onClose: () => void
  onComplete: (score: number) => void
}

export function PracticeView({ unit, onClose, onComplete }: PracticeViewProps) {
  const [viewState, setViewState] = useState<'theory' | 'practice' | 'result'>('theory')
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [score, setScore] = useState(0)

  const exercises = unit.exercises || []
  const currentExercise = exercises[currentExerciseIndex]
  
  // Calculate progress: 
  // If in theory: 0%
  // If in practice: based on COMPLETED exercises (current index)
  const progress = viewState === 'theory' ? 0 : ((currentExerciseIndex) / (exercises.length || 1)) * 100

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      // Replace underscores with "blank" for better pronunciation in exercises
      const textToSpeak = text.replace(/_+/g, 'blank')
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = 'en-US' // Set language to English
      utterance.rate = 0.9 // Slightly slower for better clarity
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleStartPractice = () => {
    if (exercises.length > 0) {
      setViewState('practice')
    } else {
      handleFinish()
    }
  }

  const handleCheck = () => {
    if (selectedOption === null || !currentExercise) return

    const isCorrect = selectedOption === currentExercise.correctAnswer
    setStatus(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setSelectedOption(null)
      setStatus('idle')
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => {
    setViewState('result')
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E0FF', '#FFC800', '#E91E63']
    })
  }

  if (viewState === 'result') {
    return (
      <div className="fixed inset-0 z-50 bg-[#050A18] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0B1121] border-2 border-[#1F2937] rounded-[30px] p-8 max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00E0FF] via-[#FFC800] to-[#E91E63]" />
          
          <div className="w-24 h-24 bg-[#FFC800]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-[#FFC800]" />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-2">¡Misión Cumplida!</h2>
          <p className="text-[#8899A6] mb-8">Has completado la unidad con éxito.</p>

          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-[#1F2937] p-4 rounded-2xl w-24">
              <div className="text-[#00E0FF] font-bold text-xl">{score}/{exercises.length}</div>
              <div className="text-xs text-[#8899A6] uppercase">Aciertos</div>
            </div>
            <div className="bg-[#1F2937] p-4 rounded-2xl w-24">
              <div className="text-[#FFC800] font-bold text-xl">+50</div>
              <div className="text-xs text-[#8899A6] uppercase">XP</div>
            </div>
          </div>

          <button 
            onClick={() => onComplete(score)}
            className="w-full py-4 bg-[#00E0FF] text-[#050A18] font-extrabold rounded-2xl shadow-[0_6px_0_#0099b0] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-wide"
          >
            Continuar
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050A18] flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-[#1F2937] flex items-center px-6 gap-6 bg-[#0B1121]">
        <button onClick={onClose} className="text-[#8899A6] hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="flex-1 h-4 bg-[#1F2937] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00E0FF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex items-center gap-2 text-[#FFC800] font-bold">
          <Star className="w-5 h-5 fill-current" />
          <span>{score}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {viewState === 'theory' ? (
              <motion.div
                key="theory"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="space-y-6"
              >
                {/* HEADER */}
                <div className="text-center mb-8">
                  <div className="text-[#9CA3AF] uppercase text-sm tracking-widest font-bold mb-2">
                    Unidad • {unit.id.replace('unit-', '')}
                  </div>
                  <h1 className="text-4xl font-extrabold text-white leading-tight mb-2">{unit.title}</h1>
                  <p className="text-[#9CA3AF]">{unit.coreConcept}</p>
                </div>

                <div className="grid gap-6">
                  
                  {/* 1. VOCABULARIO (Interactivo) */}
                  {unit.vocabulary && (
                    <div className="bg-[#111827] border-2 border-[#1F2937] rounded-[20px] p-6 relative shadow-[0_4px_0_#0d121f] hover:-translate-y-0.5 transition-transform group">
                      <div className="flex items-center gap-3 text-[#00E0FF] font-bold text-xl mb-4">
                        <Book className="w-6 h-6" />
                        <span>Vocabulario Clave</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {unit.vocabulary.map((item, i) => (
                          <button 
                            key={i} 
                            onClick={() => speakText(item)}
                            className="flex items-center gap-2 bg-[#00E0FF]/10 border border-[#00E0FF]/30 text-[#00E0FF] px-4 py-2 rounded-xl font-semibold cursor-pointer hover:bg-[#00E0FF] hover:text-[#050A18] hover:scale-105 transition-all shadow-none hover:shadow-[0_0_15px_rgba(0,224,255,0.4)]"
                          >
                            {item} <Volume2 className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. GRAMÁTICA (Formula Visual) */}
                  {unit.grammar && (
                    <div className="bg-[#111827] border-2 border-[#1F2937] rounded-[20px] p-6 relative shadow-[0_4px_0_#0d121f] hover:-translate-y-0.5 transition-transform">
                      <div className="flex items-center gap-3 text-[#7B61FF] font-bold text-xl mb-4">
                        <Zap className="w-6 h-6" />
                        <span>Power-Up Gramatical</span>
                      </div>
                      
                      <div className="bg-[#7B61FF]/10 border-l-4 border-[#7B61FF] p-4 rounded-lg font-mono text-[#d8b4fe] text-lg">
                        {unit.grammar}
                      </div>
                    </div>
                  )}

                  {/* 3. CONTEXTO (Estilo Audio Player) */}
                  {unit.useCase && (
                    <div className="bg-[#111827] border-2 border-[#1F2937] rounded-[20px] p-6 relative shadow-[0_4px_0_#0d121f] hover:-translate-y-0.5 transition-transform">
                      <div className="flex items-center gap-3 text-[#10B981] font-bold text-xl mb-4">
                        <MessageSquare className="w-6 h-6" />
                        <span>Ejemplo en Contexto</span>
                      </div>
                      
                      <div className="bg-[#1F2937] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-5 flex items-center gap-4 border border-[#374151]">
                        <button 
                          onClick={() => speakText(unit.useCase || "")}
                          className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center text-[#050A18] shadow-[0_4px_0_#047857] active:translate-y-[2px] active:shadow-none cursor-pointer flex-shrink-0 transition-transform hover:scale-105"
                        >
                          <Play className="w-6 h-6 fill-current" />
                        </button>
                        <div className="text-[#E5E7EB] text-lg italic font-medium">
                          "{unit.useCase.replace(/"/g, '')}"
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. DESAFÍO (Call to Action) */}
                  {unit.challenge && (
                    <div className="bg-gradient-to-br from-[#111827] to-[#1c1a0e] border-2 border-[#FFC800] rounded-[20px] p-6 relative shadow-[0_4px_0_#0d121f] hover:-translate-y-0.5 transition-transform">
                      <div className="flex items-center gap-3 text-[#FFC800] font-bold text-xl mb-2">
                        <Swords className="w-6 h-6" />
                        <span>Misión Activa</span>
                      </div>
                      <p className="text-lg font-bold text-white mb-1">{unit.challenge}</p>
                      <p className="text-[#9CA3AF] text-sm mb-6">Completa esta misión para ganar XP extra.</p>
                      
                      <button 
                        onClick={handleStartPractice}
                        className="w-full py-4 bg-[#FFC800] text-[#050A18] font-extrabold rounded-xl shadow-[0_5px_0_#b38600] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide text-lg hover:brightness-110"
                      >
                        ACEPTAR DESAFÍO
                      </button>
                    </div>
                  )}

                  {/* Fallback Start Button if no challenge */}
                  {!unit.challenge && (
                    <button
                      onClick={handleStartPractice}
                      className="w-full py-4 bg-[#00E0FF] text-[#050A18] font-extrabold rounded-xl shadow-[0_5px_0_#0099b0] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide text-lg hover:brightness-110 flex items-center justify-center gap-2"
                    >
                      Comenzar Práctica <ArrowRight className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentExerciseIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-8"
              >
                {currentExercise && (
                  <>
                    <div className="flex items-start justify-center gap-4 mb-2">
                      <button 
                        onClick={() => speakText(currentExercise.question)}
                        className="mt-1 p-3 bg-[#1F2937] rounded-xl text-[#00E0FF] hover:bg-[#00E0FF] hover:text-[#050A18] transition-colors flex-shrink-0 shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                      <h2 className="text-2xl md:text-3xl font-bold text-left leading-relaxed flex-1">
                        {currentExercise.question}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {currentExercise.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => status === 'idle' && setSelectedOption(idx)}
                          disabled={status !== 'idle'}
                          className={cn(
                            "p-6 rounded-2xl border-2 text-left text-lg font-semibold transition-all flex items-center justify-between group",
                            selectedOption === idx 
                              ? "border-[#00E0FF] bg-[#00E0FF]/10 text-[#00E0FF]" 
                              : "border-[#1F2937] bg-[#0B1121] hover:border-[#374151] text-white",
                            status === 'correct' && idx === currentExercise.correctAnswer && "border-[#10B981] bg-[#10B981]/20 text-[#10B981]",
                            status === 'incorrect' && selectedOption === idx && "border-[#F43F5E] bg-[#F43F5E]/20 text-[#F43F5E]"
                          )}
                        >
                          <span>{option}</span>
                          {selectedOption === idx && (
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                              status === 'idle' ? "border-[#00E0FF]" : 
                              status === 'correct' ? "border-[#10B981] bg-[#10B981] text-[#050A18]" : 
                              "border-[#F43F5E] bg-[#F43F5E] text-white"
                            )}>
                              {status === 'idle' && <div className="w-2 h-2 bg-[#00E0FF] rounded-full" />}
                              {status === 'correct' && <Check className="w-4 h-4" />}
                              {status === 'incorrect' && <X className="w-4 h-4" />}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      {viewState === 'practice' && (
        <div className={cn(
          "p-6 border-t border-[#1F2937] transition-colors duration-300",
          status === 'correct' ? "bg-[#10B981]/10 border-[#10B981]/30" : 
          status === 'incorrect' ? "bg-[#F43F5E]/10 border-[#F43F5E]/30" : "bg-[#0B1121]"
        )}>
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            {status === 'idle' ? (
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleCheck}
                  disabled={selectedOption === null}
                  className="px-10 py-4 bg-[#00E0FF] text-[#050A18] font-extrabold rounded-2xl shadow-[0_6px_0_#0099b0] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comprobar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    status === 'correct' ? "bg-[#10B981] text-[#050A18]" : "bg-[#F43F5E] text-white"
                  )}>
                    {status === 'correct' ? <Check className="w-6 h-6 stroke-[3]" /> : <X className="w-6 h-6 stroke-[3]" />}
                  </div>
                  <div>
                    <div className={cn("font-extrabold text-xl", status === 'correct' ? "text-[#10B981]" : "text-[#F43F5E]")}>
                      {status === 'correct' ? "¡Correcto!" : "Incorrecto"}
                    </div>
                    {status === 'incorrect' && currentExercise && (
                      <div className="text-[#F43F5E] text-sm">La respuesta correcta es: {currentExercise.options[currentExercise.correctAnswer]}</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className={cn(
                    "px-10 py-4 font-extrabold rounded-2xl shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-wide",
                    status === 'correct' ? "bg-[#10B981] text-[#050A18] shadow-[0_6px_0_#059669]" : "bg-[#F43F5E] text-white shadow-[0_6px_0_#E11D48]"
                  )}
                >
                  Continuar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
