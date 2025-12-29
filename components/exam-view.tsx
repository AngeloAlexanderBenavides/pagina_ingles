"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertCircle, Star, Trophy, Volume2, Play } from "lucide-react"
import { Exercise } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ExamViewProps {
  phaseTitle: string
  questions: Exercise[]
  onClose: () => void
  onComplete: (score: number) => void
}

const PASS_RATE = 0.7

export function ExamView({ phaseTitle, questions, onClose, onComplete }: ExamViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [score, setScore] = useState(0)
  const [view, setView] = useState<'exam' | 'result'>('exam')
  const [submitted, setSubmitted] = useState(false)

  const totalQuestions = questions.length
  const progress = Math.round((currentIndex / totalQuestions) * 100)
  const passScore = Math.ceil(totalQuestions * PASS_RATE)
  const passed = score >= passScore

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex])

  const handleCheck = () => {
    if (selectedOption === null || !currentQuestion) return
    const isCorrect = selectedOption === currentQuestion.correctAnswer
    setStatus(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) setScore(prev => prev + 1)
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setStatus('idle')
    } else {
      setView('result')
    }
  }

  const handleSubmit = () => {
    if (submitted) return
    setSubmitted(true)
    onComplete(score)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050A18] flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-[#1F2937] flex items-center px-6 gap-6 bg-[#0B1121]">
        <button onClick={onClose} className="text-[#8899A6] hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="flex-1">
          <div className="text-xs text-[#8899A6] uppercase tracking-widest font-bold">Examen de fase</div>
          <div className="text-lg font-extrabold text-white">{phaseTitle}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 h-2 bg-[#1F2937] rounded-full overflow-hidden">
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
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            {view === 'exam' ? (
              <motion.div
                key={`q-${currentIndex}`}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <div className="text-sm text-[#8899A6] font-bold uppercase tracking-wide mb-1">
                    Pregunta {currentIndex + 1} de {totalQuestions}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => status === 'idle' && setSelectedOption(idx)}
                      disabled={status !== 'idle'}
                      className={cn(
                        "p-5 rounded-2xl border-2 text-left text-lg font-semibold transition-all flex items-center justify-between group",
                        selectedOption === idx 
                          ? "border-[#00E0FF] bg-[#00E0FF]/10 text-[#00E0FF]" 
                          : "border-[#1F2937] bg-[#0B1121] hover:border-[#374151] text-white",
                        status === 'correct' && idx === currentQuestion.correctAnswer && "border-[#10B981] bg-[#10B981]/20 text-[#10B981]",
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

                <div className="flex justify-between items-center text-sm text-[#8899A6]">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Responde todas las preguntas para completar el examen.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <button onClick={() => speakText(currentQuestion.question)} className="underline text-[#00E0FF]">Escuchar</button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0B1121] border-2 border-[#1F2937] rounded-[24px] p-8 max-w-xl mx-auto text-center shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="w-20 h-20 bg-[#111827] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#1F2937]">
                  {passed ? <Trophy className="w-10 h-10 text-[#FFC800]" /> : <AlertCircle className="w-10 h-10 text-[#F43F5E]" />}
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">{passed ? "¡Examen aprobado!" : "Necesitas mejorar"}</h2>
                <p className="text-[#8899A6] mb-6">
                  Obtuviste {score} de {totalQuestions}. Puntaje de aprobación: {passScore}.
                </p>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="px-4 py-2 bg-[#1F2937] rounded-lg text-sm text-[#8899A6]">Porcentaje: {Math.round((score / totalQuestions) * 100)}%</div>
                  <div className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold",
                    passed ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#F43F5E]/20 text-[#F43F5E]"
                  )}>
                    {passed ? "Aprobado" : "Reintentar"}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl border border-[#1F2937] text-white hover:bg-[#111827] transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-xl bg-[#00E0FF] text-[#050A18] font-extrabold shadow-[0_6px_0_#0099b0] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-60"
                    disabled={submitted}
                  >
                    Guardar resultado
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      {view === 'exam' && (
        <div className={cn(
          "p-6 border-t border-[#1F2937]",
          status === 'correct' ? "bg-[#10B981]/10 border-[#10B981]/30" : 
          status === 'incorrect' ? "bg-[#F43F5E]/10 border-[#F43F5E]/30" : "bg-[#0B1121]"
        )}>
          <div className="max-w-3xl mx-auto flex items-center justify-between">
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
                    <div className={cn("font-extrabold text-xl", status === 'correct' ? "text-[#10B981]" : "text-[#F43F5E]")}
                    >
                      {status === 'correct' ? "¡Correcto!" : "Incorrecto"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className={cn(
                    "px-10 py-4 font-extrabold rounded-2xl shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-wide",
                    status === 'correct' ? "bg-[#10B981] text-[#050A18] shadow-[0_6px_0_#059669]" : "bg-[#F43F5E] text-white shadow-[0_6px_0_#E11D48]"
                  )}
                >
                  {currentIndex === totalQuestions - 1 ? "Finalizar" : "Continuar"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
