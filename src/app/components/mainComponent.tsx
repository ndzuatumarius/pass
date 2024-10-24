import Image from 'next/image'; // Adjust based on your image handling
import { SetStateAction, useEffect, useState } from 'react'
import { Search, Bell, Settings, Grid, BookOpen, CreditCard, Heart, LogOut, Lock, Play } from 'lucide-react'
import Script from 'next/script'

interface Course {
    id: number;
    title: string;
    category: string;
}

interface MyCourse {
    name: string;
    progress: number;
}

interface MainContentProps {
    categories: string[];
    courses: Course[];
    myCourses: MyCourse[];
}
type Shape = {
    type: 'square' | 'circle' | 'triangle'
    x: number
    y: number
    size: number
    color: string
    rotation: number
  }

  
export default function MainContent({ categories, courses, myCourses }: MainContentProps) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [previewOpen, setPreviewOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [shapes, setShapes] = useState<Shape[]>([])


    const openPreview = (course: SetStateAction<null>) => {
        setSelectedCourse(course)
        setPreviewOpen(true)
      }

      useEffect(() => {
        const colors = ['#4CAF50', '#FFC107', '#2196F3', '#E91E63', '#9C27B0']
        const shapeTypes: Shape['type'][] = ['square', 'circle', 'triangle']
    
        const createShape = (): Shape => ({
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 100 + 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
        })
    
        const initialShapes = Array.from({ length: 5 }, createShape)
        setShapes(initialShapes)
    
        const animateShapes = () => {
          setShapes((prevShapes) =>
            prevShapes.map((shape) => ({
              ...shape,
              x: (shape.x + 1) % window.innerWidth,
              y: (shape.y + 1) % window.innerHeight,
              rotation: (shape.rotation + 1) % 360,
            }))
          )
        }
    
        const interval = setInterval(animateShapes, 50)
    
        return () => clearInterval(interval)
      }, [])


      
    return (
        <main className="flex-1 p-8 relative">
            <div className="flex justify-between items-center mb-8">

                 {/* Animated Background Shapes */}
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="fixed transition-all duration-200 ease-linear opacity-30"
          style={{
            left: `${shape.x}px`,
            top: `${shape.y}px`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '0%' : '0%',
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            transform: `rotate(${shape.rotation}deg)`,
          }}
        ></div>
      ))}


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
                        <span className="text-sm font-medium">USS COMPUTER CLASS</span>
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
    );
}