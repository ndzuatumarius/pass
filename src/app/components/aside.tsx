import React from 'react'
import { Search, Bell, Settings, Grid, BookOpen, CreditCard, Heart, LogOut, Lock, Play } from 'lucide-react'
import Image from 'next/image'

interface Course {
    name: string;
}

interface AsideProps {
    myCourses: Course[];
}

export default function Aside({ myCourses = [] }: AsideProps) {
    return (
        
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
    );
}
