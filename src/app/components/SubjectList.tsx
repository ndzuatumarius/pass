import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion"
import ViewQuestion from './ViewQuestion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from 'next/link'

interface Subject {
  code: string
  name: string
}

interface Question {
  id: number
  title: string
  level: string
  pdfUrl: string
  solutionUrl: string
  supplementaryMaterialUrl: string
  price: number
  description: string
}

interface SubjectListProps {
  subjects: Subject[]
  onSelectSubject: (subject: Subject) => void
  onBack: () => void
  onSelectQuestion: (question: Question) => void
}

// Mock questions data with more detailed AL questions
const subjectQuestions: Record<string, Question[]> = {
  '0705': [
    { 
      id: 1, 
      title: "Accounting Principles and Financial Statements", 
      level: "Advanced",
      pdfUrl: "/sample-pdf-accounting-1.pdf",
      solutionUrl: "/sample-solution-accounting-1.pdf",
      supplementaryMaterialUrl: "/sample-material-accounting-1.pdf",
      price: 19.99,
      description: "This question covers fundamental accounting principles and the preparation of financial statements including balance sheets and income statements."
    },
    { 
      id: 2, 
      title: "Cost Accounting and Budgeting", 
      level: "Advanced",
      pdfUrl: "/sample-pdf-accounting-2.pdf",
      solutionUrl: "/sample-solution-accounting-2.pdf",
      supplementaryMaterialUrl: "/sample-material-accounting-2.pdf",
      price: 24.99,
      description: "Explore cost accounting methods and budgeting techniques used in managerial decision-making processes."
    },
  ],
  '0710': [
    { 
      id: 3, 
      title: "Cell Biology and Genetics", 
      level: "Advanced",
      pdfUrl: "/sample-pdf-biology-1.pdf",
      solutionUrl: "/sample-solution-biology-1.pdf",
      supplementaryMaterialUrl: "/sample-material-biology-1.pdf",
      price: 22.99,
      description: "This question delves into advanced concepts of cell biology, including cellular processes and genetic inheritance patterns."
    },
    { 
      id: 4, 
      title: "Ecology and Environmental Biology", 
      level: "Advanced",
      pdfUrl: "/sample-pdf-biology-2.pdf",
      solutionUrl: "/sample-solution-biology-2.pdf",
      supplementaryMaterialUrl: "/sample-material-biology-2.pdf",
      price: 21.99,
      description: "Examine ecological principles and environmental issues, including ecosystem dynamics and conservation biology."
    },
  ],
  // Add more subjects and questions as needed
}

export default function SubjectList({ subjects, onSelectSubject, onBack, onSelectQuestion }: SubjectListProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null)

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject)
  }

  const handleBackToSubjects = () => {
    setSelectedSubject(null)
  }

  const handlePreviewQuestion = (question: Question) => {
    setPreviewQuestion(question)
  }

  const renderSubjects = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <motion.div
          key={subject.code}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Code: {subject.code}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSubjectSelect(subject)}>
                View Questions
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderQuestions = (questions: Question[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="flex flex-col h-full">
            <div className="relative pt-[56.25%] rounded-t-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt={question.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-sm font-semibold">{question.level}</p>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{question.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-2">Price: ${question.price.toFixed(2)}</p>
              <p className="text-sm">{question.description}</p>
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

  return (
    <div>
      {selectedSubject ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{selectedSubject.name} Questions</h2>
            <Button variant="outline" onClick={handleBackToSubjects}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Subjects
            </Button>
          </div>
          {renderQuestions(subjectQuestions[selectedSubject.code] || [])}
        </>
      ) : (
        <>
          <Button variant="outline" onClick={onBack} className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Exams
          </Button>
          {renderSubjects()}
        </>
      )}
    </div>
  )
}
