import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion"
import Link from 'next/link'

interface Class {
  code: string
  name: string
}

interface Question {
  id: number
  title: string
  level: string
}

interface FrancophoneSectionProps {
  examType: 'BEPC' | 'Probatoire' | 'BACC'
  classes: Class[]
  onSelectQuestion: (question: Question) => void
  onBack: () => void
}

const mockQuestions: Record<string, Question[]> = {
  'BEPC-A': [
    { id: 1, title: "French Language Question 1", level: "BEPC A" },
    { id: 2, title: "Mathematics Question 1", level: "BEPC A" },
  ],
  'Probatoire-C': [
    { id: 3, title: "Physics Question 1", level: "Probatoire C" },
    { id: 4, title: "Chemistry Question 1", level: "Probatoire C" },
  ],
  'BACC-D': [
    { id: 5, title: "Biology Question 1", level: "BACC D" },
    { id: 6, title: "Earth Science Question 1", level: "BACC D" },
  ],
  // Add more mock questions for other classes
}

export default function FrancophoneSection({ examType, classes, onSelectQuestion, onBack }: FrancophoneSectionProps) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem)
  }

  const renderClasses = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {classes.map((classItem) => (
        <motion.div
          key={classItem.code}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{classItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Exam Type: {examType}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleClassSelect(classItem)}>
                View Questions
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderQuestions = () => {
    const questions = mockQuestions[`${examType}-${selectedClass?.code}`] || []
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Level: {question.level}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/preview-question/${question.id}`} passHref>
                  <Button className="w-full">Preview</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to {selectedClass ? examType : 'Francophone Section'}
      </Button>
      <h2 className="text-2xl font-bold mb-4">
        {selectedClass ? `${examType} ${selectedClass.name} Questions` : `${examType} Classes`}
      </h2>
      {selectedClass ? renderQuestions() : renderClasses()}
    </div>
  )
}
