'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, BookOpen, CreditCard, Upload, Palette, Globe, DollarSign, Plus, Edit, Trash2, Search, Bell, Settings, LogOut, FileText, Eye } from 'lucide-react'
import Image from 'next/image'

// Mock user database
const users = [
  { username: 'admin', password: 'password', role: 'admin' },
  { username: 'user', password: 'password', role: 'user' },
]

export default function IntegratedAdminDashboard() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to Networking", category: "University Concour", price: 25000 },
    { id: 2, title: "Advanced Mathematics", category: "Advanced Level", price: 20000 },
    { id: 3, title: "Physics for Beginners", category: "Ordinary Level", price: 15000 },
  ])
  const [questions, setQuestions] = useState([
    { id: 1, title: "Network Topology Types", course: "Introduction to Networking", pdfUrl: "/network-topology.pdf" },
    { id: 2, title: "Calculus Fundamentals", course: "Advanced Mathematics", pdfUrl: "/calculus.pdf" },
    { id: 3, title: "Newton's Laws of Motion", course: "Physics for Beginners", pdfUrl: "/newtons-laws.pdf" },
  ])
  const [payments, setPayments] = useState([
    { id: 1, amount: 25000, course: "Introduction to Networking", status: "Completed", gateway: "Flutterwave" },
    { id: 2, amount: 20000, course: "Advanced Mathematics", status: "Pending", gateway: "Stripe" },
    { id: 3, amount: 15000, course: "Physics for Beginners", status: "Failed", gateway: "Flutterwave" },
  ])
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")
  const [currency, setCurrency] = useState("XAF")
  const [selectedPdf, setSelectedPdf] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    const foundUser = users.find(u => u.username === username && u.password === password)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))
    } else {
      setError('Invalid username or password')
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (users.some(u => u.username === username)) {
      setError('Username already exists')
    } else {
      const newUser = { username, password, role: 'user' }
      users.push(newUser)
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, { id: Date.now(), ...newCourse }])
  }

  const handleEditCourse = (id, updatedCourse) => {
    setCourses(courses.map(course => course.id === id ? { ...course, ...updatedCourse } : course))
  }

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, { id: Date.now(), ...newQuestion }])
  }

  const handleEditQuestion = (id, updatedQuestion) => {
    setQuestions(questions.map(question => question.id === id ? { ...question, ...updatedQuestion } : question))
  }

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id))
  }

  const handleFlutterwavePayment = () => {
    console.log("Processing payment through Flutterwave")
  }

  const handleStripePayment = () => {
    console.log("Processing payment through Stripe")
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Login or create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <Button className="w-full mt-4" type="submit">Login</Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="new-username">Username</Label>
                      <Input 
                        id="new-username" 
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="new-password">Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="Choose a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <Button className="w-full mt-4" type="submit">Register</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-500">Demo credentials:</p>
            <p className="text-sm text-gray-500">admin / password</p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-6">
        <div className="mb-8 text-2xl font-bold">PASS Admin</div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 bg-green-700 p-2 rounded">
            <Grid className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <Upload className="h-5 w-5" />
            <span>Questions</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <CreditCard className="h-5 w-5" />
            <span>Payments</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <Palette className="h-5 w-5" />
            <span>Theme</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <Globe className="h-5 w-5" />
            <span>Language</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <DollarSign className="h-5 w-5" />
            <span>Pricing</span>
          </a>
        </nav>
        <div className="absolute bottom-4 left-4">
          <button onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <Bell className="h-5 w-5 text-green-700" />
            </button>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <Settings className="h-5 w-5 text-green-700" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Manage Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Search courses..." />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><Plus className="w-4 h-4 mr-2" /> Add Course</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target as HTMLFormElement)
                        handleAddCourse({
                          title: formData.get('title') as string,
                          category: formData.get('category') as string,
                          price: parseInt(formData.get('price') as string, 10)
                        })
                      }}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" name="title" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Select name="category">
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="university">University Concour</SelectItem>
                                <SelectItem value="advanced">Advanced Level</SelectItem>
                                <SelectItem value="ordinary">Ordinary Level</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid  grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price (XAF)</Label>
                            <Input id="price" name="price" type="number" className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit">Add Course</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price (XAF)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.price} XAF</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Course</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={(e) => {
                                  e.preventDefault()
                                  const formData = new FormData(e.target as HTMLFormElement)
                                  handleEditCourse(course.id, {
                                    title: formData.get('title') as string,
                                    category: formData.get('category') as string,
                                    price: parseInt(formData.get('price') as string, 10)
                                  })
                                }}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="title" className="text-right">Title</Label>
                                      <Input id="title" name="title" defaultValue={course.title} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="category" className="text-right">Category</Label>
                                      <Select name="category" defaultValue={course.category}>
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="university">University Concour</SelectItem>
                                          <SelectItem value="advanced">Advanced Level</SelectItem>
                                          <SelectItem value="ordinary">Ordinary Level</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="price" className="text-right">Price (XAF)</Label>
                                      <Input id="price" name="price" type="number" defaultValue={course.price} className="col-span-3" />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <Button type="submit">Update Course</Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Manage Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Search questions..." />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><Plus className="w-4 h-4 mr-2" /> Add Question</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Question</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target as HTMLFormElement)
                        handleAddQuestion({
                          title: formData.get('title') as string,
                          course: formData.get('course') as string,
                          pdfUrl: URL.createObjectURL(formData.get('pdf') as File)
                        })
                      }}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" name="title" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="course" className="text-right">Course</Label>
                            <Select name="course">
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select course" />
                              </SelectTrigger>
                              <SelectContent>
                                {courses.map((course) => (
                                  <SelectItem key={course.id} value={course.title}>{course.title}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pdf" className="text-right">PDF File</Label>
                            <Input id="pdf" name="pdf" type="file" accept="application/pdf" className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit">Add Question</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>{question.title}</TableCell>
                        <TableCell>{question.course}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setSelectedPdf(question.pdfUrl)}>
                              <Eye className="w-4 h-4 mr-2" /> Preview
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Question</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={(e) => {
                                  e.preventDefault()
                                  const formData = new FormData(e.target as HTMLFormElement)
                                  handleEditQuestion(question.id, {
                                    title: formData.get('title') as string,
                                    course: formData.get('course') as string,
                                    pdfUrl: formData.get('pdf') ? URL.createObjectURL(formData.get('pdf') as File) : question.pdfUrl
                                  })
                                }}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="title" className="text-right">Title</Label>
                                      <Input id="title" name="title" defaultValue={question.title} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="course" className="text-right">Course</Label>
                                      <Select name="course" defaultValue={question.course}>
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {courses.map((course) => (
                                            <SelectItem key={course.id} value={course.title}>{course.title}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="pdf" className="text-right">PDF File</Label>
                                      <Input id="pdf" name="pdf" type="file" accept="application/pdf" className="col-span-3" />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <Button type="submit">Update Question</Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteQuestion(question.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Manage Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Search payments..." />
                  </div>
                  <div className="space-x-2">
                    <Button onClick={handleFlutterwavePayment}>Process Flutterwave Payment</Button>
                    <Button onClick={handleStripePayment}>Process Stripe Payment</Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount (XAF)</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Gateway</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.amount} XAF</TableCell>
                        <TableCell>{payment.course}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                        <TableCell>{payment.gateway}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XAF">XAF</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* PDF Preview Dialog */}
      {selectedPdf && (
        <Dialog open={!!selectedPdf} onOpenChange={() => setSelectedPdf(null)}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>PDF Preview</DialogTitle>
            </DialogHeader>
            <div className="w-full h-full">
              <iframe src={selectedPdf} className="w-full h-full" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export function AdminDashboardWrapper() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <IntegratedAdminDashboard />
    </div>
  )
}