'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Settings, Search, LogOut } from 'lucide-react'

const sections = [
  {
    id: 'anglophone-general',
    title: { en: 'Anglophone General Section', fr: 'Section Générale Anglophone' },
    color: 'bg-green-500',
    items: [
      { 
        name: { en: 'GCE OL General', fr: 'GCE OL Général' }, 
        link: '/questions/gce-ol',
        subjects: ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History']
      },
      { 
        name: { en: 'GCE AL General', fr: 'GCE AL Général' }, 
        link: '/questions/gce-al',
        subjects: ['Pure Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature in English']
      }
    ]
  },
  {
    id: 'anglophone-technical',
    title: { en: 'Anglophone Technical Section', fr: 'Section Technique Anglophone' },
    color: 'bg-blue-500',
    items: [
      { 
        name: { en: 'GCE TVEE Intermediate Technical', fr: 'GCE TVEE Technique Intermédiaire' }, 
        link: '/questions/gce-tvee-intermediate',
        subjects: ['Building Construction', 'Electrical Installation', 'Automobile Mechanics', 'Woodwork', 'Metalwork']
      },
      { 
        name: { en: 'GCE TVEE Advanced Technical', fr: 'GCE TVEE Technique Avancé' }, 
        link: '/questions/gce-tvee-advanced',
        subjects: ['Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Computer Engineering', 'Food Science Technology']
      }
    ]
  },
  {
    id: 'francophone',
    title: { en: 'Francophone Section', fr: 'Section Francophone' },
    color: 'bg-yellow-500',
    items: [
      { 
        name: { en: 'BEPC', fr: 'BEPC' }, 
        link: '/questions/bepc',
        subjects: ['Mathématiques', 'Français', 'Histoire-Géographie', 'Sciences de la Vie et de la Terre', 'Physique-Chimie']
      },
      { 
        name: { en: 'Probatoire', fr: 'Probatoire' }, 
        link: '/questions/probatoire',
        subjects: ['Mathématiques', 'Physique', 'Chimie', 'Sciences de la Vie et de la Terre', 'Français', 'Philosophie']
      }
    ]
  },
  {
    id: 'university',
    title: { en: 'University Section', fr: 'Section Universitaire' },
    color: 'bg-purple-500',
    items: [
      { 
        name: { en: 'Universities', fr: 'Universités' }, 
        link: '/questions/universities',
        institutions: ['University of Buea', 'University of Yaoundé I', 'University of Douala', 'University of Dschang', 'University of Bamenda']
      },
      { 
        name: { en: 'Entrance Exams', fr: 'Concours d\'entrée' }, 
        link: '/questions/entrance-exams',
        exams: ['ENAM', 'ENSET', 'EMIA', 'IRIC', 'FMBS']
      }
    ]
  }
]

const myCourses = [
  { name: "GCE OL Mathematics", progress: 75 },
  { name: "GCE AL Physics", progress: 60 },
  { name: "BEPC Français", progress: 40 },
  { name: "University of Buea Entrance", progress: 90 },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSection, setSelectedSection] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [language, setLanguage] = useState<'en' | 'fr'>('en')
  const searchParams = useSearchParams()

  useEffect(() => {
    const sectionFromUrl = searchParams.get('section')
    if (sectionFromUrl) {
      setSelectedSection(sectionFromUrl)
    }
  }, [searchParams])

  const getSubjects = () => {
    if (selectedSection === 'all') {
      return sections.flatMap(section => 
        section.items.flatMap(item => {
          if ('subjects' in item) return item.subjects;
          if ('institutions' in item) return item.institutions;
          if ('exams' in item) return item.exams;
          return [];
        })
      )
    }
    const section = sections.find(s => s.id === selectedSection)
    return section ? section.items.flatMap(item => {
      if ('subjects' in item) return item.subjects;
      if ('institutions' in item) return item.institutions;
      if ('exams' in item) return item.exams;
      return [];
    }) : []
  }
  const filteredSubjects = getSubjects().filter(subject => 
    subject?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white">
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
            <a href="#" className="block py-2 px-4 hover:bg-green-600 rounded flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </a>
          </nav>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">My Courses</h3>
          {myCourses.map((course, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{course.name}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-green-900 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 mt-auto">
          <button className="flex items-center w-full bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, NDZUATU!</h1>
            <p className="text-gray-600">It's been a while, we've missed you</p>
          </div>
          <div className="flex items-center space-x-4">
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

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search Papers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {sections.map((section) => (
                <SelectItem key={section.id} value={section.id}>{section.title[language]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              
              {sections.flatMap(section => 
                section.items.map(item => (
                  <SelectItem key={item.link} value={item.name.en}>{item.name[language]}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {getSubjects().map((subject, index) => (
                <SelectItem key={index} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Button variant={selectedSection === "all" ? "default" : "outline"} className="mr-2 mb-2" onClick={() => setSelectedSection("all")}>All</Button>
          {sections.map((section) => (
            <Button 
              key={section.id}
              variant={selectedSection === section.id ? "default" : "outline"}
              className="mr-2 mb-2"
              onClick={() => setSelectedSection(section.id)}
            >
              {section.title[language]}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">{subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Section: {sections.find(s => s.id === selectedSection)?.title[language] || 'All Sections'}
                </p>
                <p className="text-sm text-gray-500">
                  Level: {selectedLevel === 'all' ? 'All Levels' : selectedLevel}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Questions</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}