'use client'
import { SetStateAction, useState } from 'react'
import { Search, Bell, Settings, Grid, BookOpen, CreditCard, Heart, LogOut, Lock, Play } from 'lucide-react'
import Image from 'next/image'



export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  const categories = ['All', 'Ordinary Level', 'Advanced Level', 'University Concour', 'HND']

  const courses = [
    { id: 1, title: 'CEC209, Introduction To Networking And Security Exam, 2020', category: 'University Concour' },
    { id: 2, title: 'Mathematics Ordinary Level Paper, 2023', category: 'Ordinary Level' },
    { id: 3, title: 'Physics Advanced Level Exam, 2023', category: 'Advanced Level' },
    { id: 4, title: 'HND Business Management Final Exam, 2023', category: 'HND' },
    { id: 5, title: 'CEC210, Data Structures and Algorithms, 2021', category: 'University Concour' },
    { id: 6, title: 'Chemistry Ordinary Level Paper, 2023', category: 'Ordinary Level' },
    { id: 7, title: 'Biology Advanced Level Exam, 2023', category: 'Advanced Level' },
    { id: 8, title: 'HND Marketing Strategies Final Project, 2023', category: 'HND' },
  ]

  const myCourses = [
    { name: 'Introduction To Networking And Security', progress: 75 },
    { name: 'Mathematics Ordinary Level', progress: 60 },
    { name: 'Physics Advanced Level', progress: 40 },
    { name: 'HND Business Management', progress: 90 },
  ]

  const openPreview = (course: SetStateAction<null>) => {
    setSelectedCourse(course)
    setPreviewOpen(true)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">PASS</div>
          <nav className="space-x-4">
            <a href="#" className="hover:text-gray-200">Home</a>
            <a href="#" className="hover:text-gray-200">Products</a>
            <a href="#" className="hover:text-gray-200">About Us</a>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-green-800 text-white p-6">
          <nav className="space-y-4">
            <a href="#" className="flex items-center space-x-2 bg-green-700 p-2 rounded">
              <Grid className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
              <BookOpen className="h-5 w-5" />
              <span>My Courses</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
              <Heart className="h-5 w-5" />
              <span>Favourites</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </nav>
          <div className="mt-8">
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
          <div className="absolute bottom-4 left-4">
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-green-800">Welcome Back, NDZUATU!</h1>
              <p className="text-gray-600">It's been a while, we've missed you</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <Bell className="h-5 w-5 text-green-700" />
              </button>
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <Settings className="h-5 w-5 text-green-700" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  N
                </div>
                <span className="text-sm font-medium">NDZUATU MARIUS</span>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Papers"
                className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex space-x-4">
              <select className="bg-green-500 text-white px-4 py-2 rounded-md">
                <option>First Semester</option>
                <option>Second Semester</option>
              </select>
              <select className="bg-green-500 text-white px-4 py-2 rounded-md">
                <option>Level: All</option>
                <option>Level: Beginner</option>
                <option>Level: Intermediate</option>
                <option>Level: Advanced</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === category
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses
              .filter(course => activeCategory === 'All' || course.category === activeCategory)
              .map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <Image src="/placeholder.svg" alt="Course" width={400} height={200} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 text-green-800">{course.title}</h3>
                    <button
                      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                      onClick={() => openPreview(course)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Preview Modal */}
          {previewOpen && selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Introductory Video</h3>
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                      <Play className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Locked Content</h3>
                    <ul className="space-y-2">
                      {['Full exam paper', 'Detailed solutions', 'Video explanations', 'Practice questions'].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <Lock className="h-4 w-4 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-4 text-gray-600">
                    This is a detailed description of the paper. It includes information about the content, difficulty level, and any
                    special instructions or requirements.
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => setPreviewOpen(false)}
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}