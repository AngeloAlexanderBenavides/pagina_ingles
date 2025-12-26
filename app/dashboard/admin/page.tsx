"use client"

import { useEffect, useState } from "react"
import { mockUsers, curriculum } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Users, BookOpen, Activity, Shield, TrendingUp, DollarSign, Menu } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [students, setStudents] = useState<any[]>([])
  const totalUnits = curriculum.reduce((acc, phase) => acc + phase.units.length, 0)

  useEffect(() => {
    // Load users from localStorage to get real-time updates
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    setStudents(storedUsers.filter((u: any) => u.role === 'student'))
  }, [])

  // Mock Data for Charts
  const activityData = [
    { name: 'Lun', lessons: 12 },
    { name: 'Mar', lessons: 19 },
    { name: 'Mie', lessons: 15 },
    { name: 'Jue', lessons: 25 },
    { name: 'Vie', lessons: 32 },
    { name: 'Sab', lessons: 45 },
    { name: 'Dom', lessons: 38 },
  ];

  const levelData = [
    { name: 'A1.1', value: 15, color: '#00E0FF' },
    { name: 'A1.2', value: 25, color: '#7B61FF' },
    { name: 'A2.1', value: 10, color: '#10B981' },
    { name: 'B1', value: 5, color: '#F59E0B' },
  ];

  const revenueData = [
    { name: 'Sem 1', gems: 1200 },
    { name: 'Sem 2', gems: 2100 },
    { name: 'Sem 3', gems: 1800 },
    { name: 'Sem 4', gems: 3400 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-slate-950 border-slate-800 text-white">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-cyan-500/50 bg-slate-900">
                        <img src="/fondoingles.png" alt="Logo" className="w-full h-full object-cover object-center scale-110" />
                      </div>
                      <span className="font-bold text-xl tracking-tight">Admin Portal</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" className="justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                        <Activity className="mr-2 h-4 w-4" /> Dashboard
                      </Button>
                      <Button variant="ghost" className="justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                        <Users className="mr-2 h-4 w-4" /> Estudiantes
                      </Button>
                      <Button variant="ghost" className="justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                        <BookOpen className="mr-2 h-4 w-4" /> Contenido
                      </Button>
                    </div>
                    <div className="border-t border-slate-800 pt-4">
                      <Button 
                        variant="destructive" 
                        className="w-full justify-start"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden md:flex h-10 w-10 rounded-full overflow-hidden border border-cyan-500/50 items-center justify-center bg-slate-900">
              <img src="/placeholder-logo.png" alt="Logo" className="w-full h-full object-cover object-center scale-110" />
            </div>
            <span className="hidden md:inline font-bold text-xl tracking-tight">Admin Portal</span>
            <span className="md:hidden font-bold text-xl tracking-tight ml-2">Admin</span>
          </div>
          <Button 
            variant="ghost" 
            className="hidden md:flex text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard General</h1>
          <p className="text-slate-400">
            Monitoreo de progreso y gestión de estudiantes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{students.length}</div>
              <p className="text-xs text-slate-500 mt-1">+2 desde la semana pasada</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Lecciones Completadas</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,284</div>
              <p className="text-xs text-slate-500 mt-1">+12% vs mes anterior</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Retención Semanal</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">85%</div>
              <p className="text-xs text-slate-500 mt-1">Usuarios activos &gt; 3 días</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Economía (Gemas)</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45.2k</div>
              <p className="text-xs text-slate-500 mt-1">Gemas en circulación</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          
          {/* Activity Chart */}
          <Card className="col-span-4 bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Actividad de Lecciones</CardTitle>
              <CardDescription className="text-slate-400">Lecciones completadas en los últimos 7 días.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                      cursor={{ fill: '#1e293b' }}
                    />
                    <Bar dataKey="lessons" fill="#00E0FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Level Distribution Chart */}
          <Card className="col-span-3 bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Distribución por Nivel</CardTitle>
              <CardDescription className="text-slate-400">Dónde se encuentran tus estudiantes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={levelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {levelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {levelData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Progreso de Estudiantes</CardTitle>
            <CardDescription className="text-slate-400">Vista detallada del avance por usuario.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-slate-900/50">
                  <TableHead className="text-slate-400">Estudiante</TableHead>
                  <TableHead className="text-slate-400">Progreso General</TableHead>
                  <TableHead className="text-slate-400">Estado</TableHead>
                  <TableHead className="text-right text-slate-400">Última Actividad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  // Calculate average progress
                  const progressValues = Object.values(student.progress || {})
                  const avgProgress = progressValues.length > 0 
                    ? progressValues.reduce((a: any, b: any) => a + b, 0) / totalUnits 
                    : 0

                  return (
                    <TableRow key={student.id} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-slate-700">
                            <AvatarImage src={`https://avatar.vercel.sh/${student.email}`} />
                            <AvatarFallback className="bg-slate-800 text-slate-300">
                              {student.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-slate-200">{student.name}</span>
                            <span className="text-xs text-slate-500">{student.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={avgProgress} className="w-[60%] bg-slate-800 [&>*]:bg-cyan-500" />
                          <span className="text-sm text-slate-400">{Math.round(avgProgress)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={avgProgress > 0 
                            ? "bg-green-500/10 text-green-500 border-green-500/20" 
                            : "bg-slate-800 text-slate-400 border-slate-700"
                          }
                        >
                          {avgProgress > 0 ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-slate-400">
                        Hoy
                      </TableCell>
                    </TableRow>
                  )
                })}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                      No hay estudiantes registrados aún.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
