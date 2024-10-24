'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Settings, Search, LogOut, Globe, Home, ShoppingCart, Info, Facebook, Twitter, Instagram, Linkedin, ChevronLeft } from 'lucide-react'
import SubjectList from './SubjectList'
import SpecialtyList from './SpecialtyList'
import UniversitySection from './UniversitySection'
import FrancophoneSection from './FrancophoneSection'

// Make sure to include the CSS for react-slick in your project
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const sections = [
  {
    id: 'anglophone-general',
    title: { en: 'Anglophone General Section', fr: 'Section Générale Anglophone' },
    color: 'bg-green-500',
    items: [
      { 
        name: { en: 'GCE OL General', fr: 'GCE OL Général' }, 
        link: '/dashboard/anglophone-general?exam=gce-ol',
        subjects: [
          { code: '0510', name: 'Biology' },
          { code: '0515', name: 'Chemistry' },
          { code: '0520', name: 'Commerce' },
          { code: '0525', name: 'Economics' },
          { code: '0530', name: 'English Language' },
          { code: '0535', name: 'Literature in English' },
          { code: '0540', name: 'Food and Nutrition' },
          { code: '0545', name: 'French' },
          { code: '0546', name: 'Special Bilingual Education French' },
        ]
      },
      { 
        name: { en: 'GCE AL General', fr: 'GCE AL Général' }, 
        link: '/dashboard/anglophone-general?exam=gce-al',
        subjects: [
          { code: '0705', name: 'Accounting' },
          { code: '0710', name: 'Biology' },
          { code: '0715', name: 'Chemistry' },
          { code: '0725', name: 'Economics' },
          { code: '0730', name: 'English Language' },
          { code: '0735', name: 'Literature in English' },
          { code: '0740', name: 'Food Science and Nutrition' },
          { code: '0745', name: 'French' },
          { code: '0746', name: 'Special Bilingual Education French' },
          { code: '0750', name: 'Geography' },
        ]
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
        link: '/dashboard/anglophone-technical?exam=gce-tvee-intermediate',
        subjects: [
          { code: 'PS3', name: 'Professional Subject 3' },
          { code: 'RPS', name: 'Related Professional Subjects' },
          { code: 'RPS1', name: 'Related Professional Subjects 1' },
          { code: 'RPS2', name: 'Related Professional Subject 2' },
          { code: 'RPS3', name: 'Related Professional Subject 3 (Mathematics Paper 2 for Industrial Candidates)' },
          { code: 'MATH', name: 'Mathematics (Compulsory)' },
          { code: 'ENG', name: 'English (Compulsory)' },
          { code: 'FRE', name: 'French (Compulsory)' },
          { code: 'CS', name: 'Computer Science' },
        ]
      },
      { 
        name: { en: 'GCE TVEE Advanced Technical', fr: 'GCE TVEE Technique Avancé' }, 
        link: '/dashboard/anglophone-technical?exam=gce-tvee-advanced',
        specialties: [
          { code: 'ACC', name: 'Accounting' },
          { code: 'CE', name: 'Citizenship Education' },
        ]
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
        link: '/dashboard/francophone?exam=bepc',
        classes: [
          { code: 'A', name: 'BEPC A' },
          { code: 'C', name: 'BEPC C' },
          { code: 'D', name: 'BEPC D' },
        ]
      },
      { 
        name: { en: 'Probatoire', fr: 'Probatoire' }, 
        link: '/dashboard/francophone?exam=probatoire',
        classes: [
          { code: 'A', name: 'Probatoire A' },
          { code: 'C', name: 'Probatoire C' },
          { code: 'D', name: 'Probatoire D' },
          { code: 'F', name: 'Probatoire F' },
        ]
      },
      { 
        name: { en: 'BACC', fr: 'BACC' }, 
        link: '/dashboard/francophone?exam=bacc',
        classes: [
          { code: 'C', name: 'BACC C' },
          { code: 'D', name: 'BACC D' },
          { code: 'F', name: 'BACC F' },
        ]
      }
    ]
  },
  {
    id: 'university',
    title: { en: 'University Section', fr: 'Section Universitaire' },
    color: 'bg-purple-500',
    items: [
      { name: { en: 'Universities', fr: 'Universités' }, link: '/dashboard/university?exam=universities' },
      { name: { en: 'Entrance Exams', fr: 'Concours d\'entrée' }, link: '/dashboard/university?exam=entrance-exams' }
    ]
  }
]

const carouselImages = [
  '/placeholder.svg?height=400&width=800',
  '/placeholder.svg?height=400&width=800',
  '/placeholder.svg?height=400&width=800',
  '/placeholder.svg?height=400&width=800',
]

export default function QuestionSalesPortal() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [user, setUser] = useState<{ role: string } | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<{ code: string, name: string } | null>(null)

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en')
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  const handleSelectQuestion = (question: any) => {
    console.log("Selected question:", question);
    // Implement question selection logic here
  }

  const renderContent = () => {
    if (selectedExam) {
      if (selectedExam === 'GCE OL General' || selectedExam === 'GCE AL General') {
        const examSubjects = sections.find(s => s.id === 'anglophone-general')?.items.find(item => item.name.en === selectedExam)?.subjects || []
        return (
          <SubjectList 
            subjects={examSubjects}
            onSelectSubject={(subject) => setSelectedSubject(subject)}
            onBack={() => setSelectedExam(null)}
            onSelectQuestion={handleSelectQuestion}
          />
        )
      } else if (selectedExam === 'GCE TVEE Intermediate Technical') {
        const examSubjects = sections.find(s => s.id === 'anglophone-technical')?.items[0].subjects || []
        return (
          <SubjectList 
            subjects={examSubjects}
            onSelectSubject={(subject) => setSelectedSubject(subject)}
            onBack={() => setSelectedExam(null)}
            onSelectQuestion={handleSelectQuestion}
          />
        )
      } else if (selectedExam === 'GCE TVEE Advanced Technical') {
        const examSpecialties = sections.find(s => s.id === 'anglophone-technical')?.items[1].specialties || []
        return (
          <SpecialtyList 
            specialties={examSpecialties}
            onSelectSpecialty={(specialty) => setSelectedSubject(specialty)}
            onBack={() => setSelectedExam(null)}
          />
        )
      } else if (selectedExam === 'Universities' || selectedExam === 'Entrance Exams') {
        return (
          <UniversitySection 
            examType={selectedExam}
            onSelectQuestion={handleSelectQuestion}
            onBack={() => setSelectedExam(null)}
          />
        )
      } else if (selectedExam === 'BEPC' || selectedExam === 'Probatoire' || selectedExam === 'BACC') {
        const examClasses = sections.find(s => s.id === 'francophone')?.items.find(item => item.name.en === selectedExam)?.classes || []
        return (
          <FrancophoneSection 
            examType={selectedExam}
            classes={examClasses}
            onSelectQuestion={handleSelectQuestion}
            onBack={() => setSelectedExam(null)}
          />
        )
      }
    } else if (selectedSection === 'anglophone-general') {
      return (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedSection(null)} 
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Sections' : 'Retour aux Sections'}
          </Button>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.find(s => s.id === 'anglophone-general')?.items.map((item, index) => (
              <Card key={index} className={`${sections.find(s => s.id === 'anglophone-general')?.color} text-white hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {item.subjects.slice(0, 5).map((subject, idx) => (
                      <li key={idx} className="mb-1">{subject.name}</li>
                    ))}
                    {item.subjects.length > 5 && <li>...</li>}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" onClick={() => setSelectedExam(item.name.en)}>
                    {language === 'en' ? 'View Subjects' : 'Voir les Matières'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
    } else if (selectedSection === 'francophone') {
      return (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedSection(null)} 
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Sections' : 'Retour aux Sections'}
          </Button>
          <div className="grid md:grid-cols-3 gap-8">
            {sections.find(s => s.id === 'francophone')?.items.map((item, index) => (
              <Card key={index} className={`${sections.find(s => s.id === 'francophone')?.color} text-white hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {item.classes.map((classItem, idx) => (
                      <li key={idx} className="mb-1">{classItem.name}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" onClick={() => setSelectedExam(item.name.en)}>
                    {language === 'en' ? 'View Classes' : 'Voir les Classes'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
    } else if (selectedSection === 'anglophone-technical') {
      return (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedSection(null)} 
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Sections' : 'Retour aux Sections'}
          </Button>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.find(s => s.id === 'anglophone-technical')?.items.map((item, index) => (
              <Card key={index} className={`${sections.find(s => s.id === 'anglophone-technical')?.color} text-white hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {(item.subjects || item.specialties)?.slice(0, 5).map((subject, idx) => (
                      <li key={idx} className="mb-1">{subject.name}</li>
                    ))}
                    {(item.subjects || item.specialties)?.length > 5 && <li>...</li>}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" onClick={() => setSelectedExam(item.name.en)}>
                    {language === 'en' ? 'View Subjects' : 'Voir les Matières'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
    } else if (selectedSection === 'university') {
      return (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedSection(null)} 
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Sections' : 'Retour aux Sections'}
          </Button>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.find(s => s.id === 'university')?.items.map((item, index) => (
              <Card key={index} className={`${sections.find(s => s.id === 'university')?.color} text-white hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add content if needed */}
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" onClick={() => setSelectedExam(item.name.en)}>
                    {language === 'en' ? 'View Options' : 'Voir les Options'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <Card 
              key={section.id} 
              className={`${section.color} text-white hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => setSelectedSection(section.id)}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{section.title[language]}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, index) => (
                    <li key={index}>
                      <span className="text-white">{item.name[language]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  {language === 'en' ? 'View Options' : 'Voir les Options'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-500 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-2xl">PASS</span>
              <div className="hidden md:flex space-x-4">
                <Link href="/" className="hover:text-gray-200 transition-colors">
                  <Home className="inline-block mr-1" size={18} />
                  {language === 'en' ? 'Home' : 'Accueil'}
                </Link>
                <Link href="/products" className="hover:text-gray-200 transition-colors">
                  <ShoppingCart className="inline-block mr-1" size={18} />
                  {language === 'en' ? 'Products' : 'Produits'}
                </Link>
                <Link href="/about" className="hover:text-gray-200 transition-colors">
                  <Info className="inline-block mr-1" size={18} />
                  {language === 'en' ? 'About Us' : 'À Propos'}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleLanguage} 
                className="text-white hover:text-gray-200 hover:bg-white/20 focus:bg-white/20 active:bg-white/20"
              >
                <Globe className="mr-1 h-4 w-4" />
                {language === 'en' ? 'FR' : 'EN'}
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                N
              </div>
              {user && user.role === 'admin' && (
                <Link href="/admin" className="text-white hover:text-gray-200 transition-colors">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Carousel Banner */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="relative h-[300px] md:h-[400px]">
              <Image
                src={image}
                alt={`Carousel Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className={`
                  transition-all duration-1000 ease-in-out
                  ${currentSlide === index ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'}
                `}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">{language === 'en' ? 'Our Examinations' : 'Nos Examens'}</h1>
          <p className="text-gray-600 mt-2">{language === 'en' ? 'Choose your section and start learning' : 'Choisissez votre section et commencez à apprendre'}</p>
        </header>

        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'About Us' : 'À Propos'}</h3>
              <p className="text-sm text-gray-300">{language === 'en' ? 'PASS is your gateway to academic success.' : 'PASS est votre passerelle vers la réussite académique.'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Quick Links' : 'Liens Rapides'}</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">{language === 'en' ? 'Home' : 'Accueil'}</Link></li>
                <li><Link href="/products" className="text-sm text-gray-300 hover:text-white transition-colors">{language === 'en' ? 'Products' : 'Produits'}</Link></li>
                <li><Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">{language === 'en' ? 'About Us' : 'À Propos'}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Contact Us' : 'Contactez-nous'}</h3>
              <p className="text-sm text-gray-300">Email: info@pass.com</p>
              <p className="text-sm text-gray-300">{language === 'en' ? 'Phone' : 'Téléphone'}: +123 456 7890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Follow Us' : 'Suivez-nous'}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Facebook size={24} /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Twitter size={24} /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
            <p>&copy; 2024 PASS. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: scale(0.9) rotate(6deg); }
          20%, 80% { opacity: 1; transform: scale(1) rotate(0); }
        }
        .slick-slide img {
          animation: fadeInOut 5s infinite;
        }
      `}</style>
    </div>
  )
}
