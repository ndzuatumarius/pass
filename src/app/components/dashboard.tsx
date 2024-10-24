'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Settings, Search, LogOut, Menu, X } from 'lucide-react'
import ViewQuestion from './ViewQuestion'
import QuestionList from './QuestionList'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from "framer-motion"
import UniversitySection from './UniversitySection'

const sections = [
  {
    id: 'anglophone-general',
    title: { en: 'Anglophone General Section', fr: 'Section Générale Anglophone' },
    color: 'bg-green-500',
    items: [
      { name: { en: 'GCE OL General', fr: 'GCE OL Général' }, link: '/questions/gce-ol' },
      { name: { en: 'GCE AL General', fr: 'GCE AL Général' }, link: '/questions/gce-al' }
    ]
  },
  {
    id: 'anglophone-technical',
    title: { en: 'Anglophone Technical Section', fr: 'Section Technique Anglophone' },
    color: 'bg-blue-500',
    items: [
      { name: { en: 'GCE TVEE Intermediate Technical', fr: 'GCE TVEE Technique Intermédiaire' }, link: '/questions/gce-tvee-intermediate' },
      { name: { en: 'GCE TVEE Advanced Technical', fr: 'GCE TVEE Technique Avancé' }, link: '/questions/gce-tvee-advanced' }
    ]
  },
  {
    id: 'francophone',
    title: { en: 'Francophone Section', fr: 'Section Francophone' },
    color: 'bg-yellow-500',
    items: [
      { name: { en: 'BEPC', fr: 'BEPC' }, link: '/questions/bepc' },
      { name: { en: 'Probatoire', fr: 'Probatoire' }, link: '/questions/probatoire' }
    ]
  },
  {
    id: 'university',
    title: { en: 'University Section', fr: 'Section Universitaire' },
    color: 'bg-purple-500',
    items: [
      { name: { en: 'Universities', fr: 'Universités' }, link: '/questions/universities' },
      { name: { en: 'Entrance Exams', fr: 'Concours d\'entrée' }, link: '/questions/entrance-exams' }
    ]
  }
]

const courses = [
  { id: 1, title: "University Exams", section: "university", level: "Higher Education", thumbnail: "/university.jpg" },
  { id: 2, title: "Concours", section: "university", level: "Competitive Exams", thumbnail: "/concours.jpg" },
]

interface DashboardProps {
  initialSection?: string;
  user?: { role: string } | null; // Add this line
}

export default function Dashboard({ initialSection = "all", user = null }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSection, setSelectedSection] = useState(initialSection)
  const [language, setLanguage] = useState<'en' | 'fr'>('en')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [view, setView] = useState<'sections' | 'questions' | 'preview'>('sections')
  const [selectedQuestion, setSelectedQuestion] = useState<null | {
    id: number;
    title: string;
    section?: string;
    level: string;
  }>(null)
  const searchParams = useSearchParams()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sectionFromUrl = searchParams.get('section')
    if (sectionFromUrl) {
      setSelectedSection(sectionFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen &&
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node) &&
          toggleButtonRef.current &&
          !toggleButtonRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredCourses = courses.filter(course => 
    (selectedSection === "all" || course.section === selectedSection) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section)
    setView('questions')
  }

  const handleQuestionSelect = (question: {
    id: number;
    title: string;
    section?: string;
    level: string;
  }) => {
    setSelectedQuestion(question)
    setView('preview')
  }

  const handleBackToSections = () => {
    setView('sections')
    setSelectedSection('all')
  }

  const handleBackToQuestions = () => {
    setView('questions')
    setSelectedQuestion(null)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <button
        ref={toggleButtonRef}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-green-700 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-10
          w-64 bg-green-700 text-white transition-transform duration-300 ease-in-out
        `}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">PASS</h1>
          <nav className="space-y-2">
            <a href="#" className="block py-2 px-4 bg-green-600 rounded flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Dashboard
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              My Courses
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              Payments
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Favourites
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center" onClick={() => handleSectionSelect('university')}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              University & Concours
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </a>
            {/* Add this new link for admin users */}
            {user && user.role === 'admin' && (
              <Link href="/admin" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </nav>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">My Courses</h3>
          {/* {myCourses.map((course, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{course.name}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-green-900 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))} */}
        </div>
        <div className="p-4 mt-auto">
          <button className="flex items-center w-full bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome Back, NDZUATU!</h1>
            <p className="text-gray-600">It's been a while, we've missed you</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              N
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-white overflow-hidden">
                  <div className="h-48 w-full bg-gray-300 animate-pulse" />
                  <CardHeader>
                    <div className="h-6 w-3/4 bg-gray-300 animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-1/2 bg-gray-300 animate-pulse" />
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 w-full bg-gray-300 animate-pulse" />
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="relative flex-1 w-full lg:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search Papers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Select value={selectedSection} onValueChange={handleSectionSelect}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>{section.title[language]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6 flex flex-wrap">
              <Button 
                variant={selectedSection === "all" ? "default" : "outline"} 
                className="mr-2 mb-2" 
                onClick={() => handleSectionSelect("all")}
              >
                All
              </Button>
              {sections.map((section) => (
                <Button 
                  key={section.id}
                  variant={selectedSection === section.id ? "default" : "outline"}
                  className="mr-2 mb-2"
                  onClick={() => handleSectionSelect(section.id)}
                >
                  {section.title[language]}
                </Button>
              ))}
            </div>

            {view === 'sections' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="bg-white overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <h3 className="text-xl font-bold">{course.title}</h3>
                          <p className="text-sm">{course.level}</p>
                        </div>
                      </div>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleSectionSelect(course.section)}>View Questions</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {view === 'questions' && selectedSection === 'university' && (
              <UniversitySection onSelectQuestion={handleQuestionSelect} />
            )}

            {view === 'questions' && selectedSection !== 'university' && (
              <QuestionList 
                questions={filteredCourses}
                onSelectQuestion={handleQuestionSelect}
                onBack={handleBackToSections}
              />
            )}

            {view === 'preview' && selectedQuestion && (
              <>
                <Button onClick={handleBackToQuestions} className="mb-4">Back to Questions</Button>
                <ViewQuestion
                  questionId={selectedQuestion.id.toString()}
                  title={selectedQuestion.title}
                  pdfUrl={`/sample-pdf-url-${selectedQuestion.id}.pdf`}
                  solutionUrl={`/sample-solution-url-${selectedQuestion.id}.pdf`}
                  supplementaryMaterialUrl={`/sample-material-url-${selectedQuestion.id}.pdf`}
                  price={9.99}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
