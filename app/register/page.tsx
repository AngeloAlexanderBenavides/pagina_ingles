"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, User, Mail, Lock, Target, Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()

  // Simple password strength calculator
  useEffect(() => {
    let strength = 0
    if (password.length > 4) strength += 20
    if (password.length > 8) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/[0-9]/.test(password)) strength += 20
    if (/[^A-Za-z0-9]/.test(password)) strength += 20
    setPasswordStrength(strength)
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await register(name, email, password)
      if (success) {
        toast({
          title: "¡Cuenta creada!",
          description: "Bienvenido a la plataforma.",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Error al registrar",
          description: "El correo ya está en uso o hubo un problema.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Algo salió mal. Inténtalo de nuevo.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050A18] text-white flex items-center justify-center p-5 font-sans relative">
      
      {/* Botón Volver */}
      <Link href="/" className="absolute top-8 left-8 z-50 group">
        <div className="flex items-center gap-2 text-[#9CA3AF] font-bold transition-colors group-hover:text-[#00E0FF]">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </div>
      </Link>

      {/* Contenedor Principal */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-[1000px] bg-[#0B1121] rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-[#1F2937] min-h-[650px]"
      >
        
        {/* LADO IZQUIERDO: Visual (Beneficios) */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#0c1633] to-[#050A18] flex-col items-center justify-center p-10 border-r-2 border-[#1F2937] relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00E0FF] opacity-5 -top-24 -left-24 pointer-events-none" />
          
          {/* Icono Hero Animado */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mb-8 drop-shadow-[0_0_30px_rgba(0,224,255,0.2)]"
          >
            <Target className="w-32 h-32 text-[#00E0FF]" />
          </motion.div>

          <h1 className="text-3xl font-extrabold text-center mb-6">
            Únete a la misión
          </h1>
          
          <ul className="space-y-4 text-[#9CA3AF] text-lg w-full max-w-xs">
            <li className="flex items-center gap-3">
              <Check className="w-6 h-6 text-[#00E0FF] flex-shrink-0" />
              <span>Sigue tu progreso diario</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-6 h-6 text-[#00E0FF] flex-shrink-0" />
              <span>Compite en la liga semanal</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-6 h-6 text-[#00E0FF] flex-shrink-0" />
              <span>Desbloquea logros únicos</span>
            </li>
          </ul>
        </div>

        {/* LADO DERECHO: Formulario */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-2">Crear perfil</h2>
          <p className="text-[#9CA3AF] mb-8">Empieza tu aprendizaje en segundos.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nombre */}
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-[#00E0FF]" />
              <input
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 pl-14 bg-[#1F2937] border-2 border-transparent rounded-2xl text-white font-semibold outline-none transition-all focus:bg-[#050A18] focus:border-[#00E0FF] placeholder:text-[#4B5563]"
              />
            </div>

            {/* Correo */}
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-[#00E0FF]" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 pl-14 bg-[#1F2937] border-2 border-transparent rounded-2xl text-white font-semibold outline-none transition-all focus:bg-[#050A18] focus:border-[#00E0FF] placeholder:text-[#4B5563]"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-[#00E0FF]" />
                <input
                  type="password"
                  placeholder="Crear contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 pl-14 bg-[#1F2937] border-2 border-transparent rounded-2xl text-white font-semibold outline-none transition-all focus:bg-[#050A18] focus:border-[#00E0FF] placeholder:text-[#4B5563]"
                />
              </div>
              
              {/* Barra de fuerza */}
              <div className="h-1 bg-[#374151] rounded-full overflow-hidden mx-2">
                <motion.div 
                  className="h-full bg-[#E91E63]"
                  initial={{ width: 0 }}
                  animate={{ width: `${passwordStrength}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98, y: 4, boxShadow: "0 0 0 #008fa3" }}
              type="submit"
              disabled={isLoading}
              className="w-full p-4 bg-[#00E0FF] text-[#050A18] text-lg font-extrabold rounded-2xl uppercase tracking-wider shadow-[0_5px_0_#008fa3] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando...
                </>
              ) : (
                "CREAR MI CUENTA"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-sm font-semibold text-[#9CA3AF]">
            ¿Ya tienes una cuenta? <br />
            <Link href="/login" className="text-[#00E0FF] hover:underline mt-1 inline-block">
              INICIAR SESIÓN
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
