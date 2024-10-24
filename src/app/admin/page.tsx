'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, BookOpen, CreditCard, Upload, Palette, Globe, DollarSign, Plus, Edit, Trash2, Search, Bell, Settings, LogOut, Eye, FileUp, X } from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('courses')
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to Networking", category: "IT", price: 25000 },
    { id: 2, title: "Advanced Mathematics", category: "Math", price: 30000 },
  ])
  const [questions, setQuestions] = useState([
    { id: 1, title: "Network Topology", course: "Introduction to Networking", difficulty: "Medium" },
    { id: 2, title: "Calculus Basics", course: "Advanced Mathematics", difficulty: "Hard" },
  ])
  const [payments, setPayments] = useState([
    { id: 1, amount: 25000, course: "Introduction to Networking", status: "Completed" },
    { id: 2, amount: 30000, course: "Advanced Mathematics", status: "Pending" },
  ])

  const [editItem, setEditItem] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [paymentApiKey, setPaymentApiKey] = useState('')

  const handleAdd = (type) => {
    setEditItem(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (type, item) => {
    setEditItem(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (type, id) => {
    switch (type) {
      case 'course':
        setCourses(courses.filter(course => course.id !== id))
        break
      case 'question':
        setQuestions(questions.filter(question => question.id !== id))
        break
      case 'payment':
        setPayments(payments.filter(payment => payment.id !== id))
        break
    }
  }

  const handleSubmit = (type, data) => {
    switch (type) {
      case 'course':
        if (editItem) {
          setCourses(courses.map(course => course.id === editItem.id ? { ...course, ...data } : course))
        } else {
          setCourses([...courses, { id: Date.now(), ...data }])
        }
        break
      case 'question':
        if (editItem) {
          setQuestions(questions.map(question => question.id === editItem.id ? { ...question, ...data } : question))
        } else {
          setQuestions([...questions, { id: Date.now(), ...data }])
        }
        break
      case 'payment':
        if (editItem) {
          setPayments(payments.map(payment => payment.id === editItem.id ? { ...payment, ...data } : payment))
        } else {
          setPayments([...payments, { id: Date.now(), ...data }])
        }
        break
    }
    setIsDialogOpen(false)
    setEditItem(null)
  }

  const handlePreviewPdf = (pdfUrl: string) => {
    setPdfPreview(pdfUrl)
  }

  const handleClosePdfPreview = () => {
    setPdfPreview(null)
  }

  const handleUploadPdf = (questionId: number) => {
    // Implement PDF upload logic here
    console.log("Upload PDF for question:", questionId);
    // You might want to open a file picker and handle the upload process
  }

  const handleSavePaymentApiKey = () => {
    // Here you would typically send this to your backend to securely store it
    console.log("Saving Payment API Key:", paymentApiKey)
    // You might want to show a success message to the admin
    alert("Payment API Key saved successfully!")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-6">
        <div className="mb-8 text-2xl font-bold">PASS Admin</div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 bg-green-700 p-2 rounded" onClick={() => setActiveTab('courses')}>
            <Grid className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded" onClick={() => setActiveTab('courses')}>
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded" onClick={() => setActiveTab('questions')}>
            <Upload className="h-5 w-5" />
            <span>Questions</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded" onClick={() => setActiveTab('payments')}>
            <CreditCard className="h-5 w-5" />
            <span>Payments</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded" onClick={() => setActiveTab('settings')}>
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="absolute bottom-4 left-4">
          <button className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
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
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Courses</CardTitle>
                  <Button onClick={() => handleAdd('course')}><Plus className="mr-2 h-4 w-4" /> Add Course</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.price}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit('course', course)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete('course', course.id)}><Trash2 className="h-4 w-4" /></Button>
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
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Questions</CardTitle>
                  <Button onClick={() => handleAdd('question')}><Plus className="mr-2 h-4 w-4" /> Add Question</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="Search questions..." />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>PDF</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>{question.title}</TableCell>
                        <TableCell>{question.course}</TableCell>
                        <TableCell>{question.difficulty}</TableCell>
                        <TableCell>
                          {question.pdfUrl ? (
                            <Button variant="outline" size="sm" onClick={() => handlePreviewPdf(question.pdfUrl)}>
                              <Eye className="h-4 w-4 mr-2" /> Preview
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => handleUploadPdf(question.id)}>
                              <FileUp className="h-4 w-4 mr-2" /> Upload PDF
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit('question', question)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete('question', question.id)}><Trash2 className="h-4 w-4" /></Button>
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
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="payment-api-key" className="text-right">
                      Payment API Key
                    </Label>
                    <Input
                      id="payment-api-key"
                      value={paymentApiKey}
                      onChange={(e) => setPaymentApiKey(e.target.value)}
                      type="password"
                      className="col-span-2"
                    />
                    <Button onClick={handleSavePaymentApiKey}>Save Key</Button>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.amount} XAF</TableCell>
                          <TableCell>{payment.course}</TableCell>
                          <TableCell>{payment.status}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2" 
                              onClick={() => handleEdit('payment', payment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDelete('payment', payment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            {/* Settings content */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add settings content here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editItem ? 'Edit' : 'Add'} Question</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSubmit('question', {
              title: formData.get('title') as string,
              course: formData.get('course') as string,
              difficulty: formData.get('difficulty') as string,
              pdfUrl: formData.get('pdf') ? URL.createObjectURL(formData.get('pdf') as File) : editItem?.pdfUrl
            });
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" defaultValue={editItem?.title || ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">Course</Label>
                <Select name="course" defaultValue={editItem?.course || ''}>
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
                <Label htmlFor="difficulty" className="text-right">Difficulty</Label>
                <Select name="difficulty" defaultValue={editItem?.difficulty || ''}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pdf" className="text-right">PDF File</Label>
                <Input id="pdf" name="pdf" type="file" accept="application/pdf" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editItem ? 'Update' : 'Add'} Question</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      {pdfPreview && (
        <Dialog open={!!pdfPreview} onOpenChange={handleClosePdfPreview}>
          <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
            <DialogHeader className="px-4 py-2 absolute top-0 left-0 right-0 bg-white z-10">
              <DialogTitle className="flex justify-between items-center">
                PDF Preview
                <Button variant="ghost" size="sm" onClick={handleClosePdfPreview}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="w-full h-full pt-10">
              <iframe
                src={pdfPreview}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
