"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Rocket, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "¡Bienvenido de nuevo!",
          description: "Redirigiendo al dashboard...",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Error de inicio de sesión",
          description: "Correo o contraseña inválidos",
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
      <Link href="/" className="absolute top-8 left-8 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, y: 2 }}
          className="w-12 h-12 bg-[#1F2937] rounded-full flex items-center justify-center text-white shadow-[0_4px_0_#111827] active:shadow-none active:translate-y-[4px] transition-all"
        >
          <X className="w-6 h-6" />
        </motion.div>
      </Link>

      {/* Contenedor Principal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-[1000px] bg-[#0B1121] rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-[#1F2937] min-h-[600px]"
      >
        
        {/* LADO IZQUIERDO: Visual */}
        <div className="flex-1 bg-gradient-to-br from-[#050A18] to-[#0c1633] flex flex-col items-center justify-center p-10 border-r-0 md:border-r-2 border-[#1F2937] relative overflow-hidden">
          {/* Círculos de fondo */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00E0FF] opacity-5 -top-12 -left-12 pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#00E0FF] opacity-5 bottom-12 -right-5 pointer-events-none" />

          {/* Icono Flotante */}
          <motion.div
            animate={{ y: [-15, 0, -15] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="mb-5 drop-shadow-[0_10px_20px_rgba(0,224,255,0.3)]"
          >
            <Rocket className="w-32 h-32 text-[#00E0FF] fill-[#00E0FF]/10" />
          </motion.div>

          <h1 className="text-4xl font-extrabold text-center leading-tight mb-4">
            ¡Hora de aprender!
          </h1>
          <p className="text-[#9CA3AF] text-center text-lg">
            Continúa tu racha y alcanza el siguiente nivel hoy mismo.
          </p>
        </div>

        {/* LADO DERECHO: Formulario */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ingresa a tu cuenta</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Correo electrónico o usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-5 bg-[#1F2937] border-2 border-transparent rounded-2xl text-white text-base font-semibold outline-none transition-all focus:bg-[#050A18] focus:border-[#00E0FF] placeholder:text-[#4B5563]"
              />
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-5 bg-[#1F2937] border-2 border-transparent rounded-2xl text-white text-base font-semibold outline-none transition-all focus:bg-[#050A18] focus:border-[#00E0FF] placeholder:text-[#4B5563]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98, y: 4, boxShadow: "0 0 0 #008fa3" }}
              type="submit"
              disabled={isLoading}
              className="w-full p-4 mt-4 bg-[#00E0FF] text-[#050A18] text-lg font-extrabold rounded-2xl uppercase tracking-wider shadow-[0_5px_0_#008fa3] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                "ENTRAR AHORA"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-sm font-semibold flex items-center justify-center gap-3 text-[#9CA3AF]">
            <Link href="#" className="hover:text-[#00E0FF] transition-colors">
              Olvidé mi contraseña
            </Link>
            <span className="text-[#374151]">•</span>
            <Link href="/register" className="hover:text-[#00E0FF] transition-colors">
              Crear cuenta
            </Link>
          </div>

          <div className="mt-8 p-3 bg-white/5 rounded-xl text-xs text-center text-slate-500">
            Demo: admin@example.com / admin
          </div>
        </div>

      </motion.div>
    </div>
  )
}
