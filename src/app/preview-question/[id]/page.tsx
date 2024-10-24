'use client'

import { useParams } from 'next/navigation'
import ViewQuestion from '../../components/ViewQuestion'

// Mock question data (replace with actual data fetching in a real application)
const mockQuestions = {
  '1': { title: "French Language Question 1", level: "BEPC A" },
  '2': { title: "Mathematics Question 1", level: "BEPC A" },
  '3': { title: "Physics Question 1", level: "Probatoire C" },
  '4': { title: "Chemistry Question 1", level: "Probatoire C" },
  '5': { title: "Biology Question 1", level: "BACC D" },
  '6': { title: "Earth Science Question 1", level: "BACC D" },
}

export default function PreviewQuestionPage() {
  const params = useParams()
  const questionId = params.id as string

  // In a real application, you'd fetch the question data based on the ID
  const questionData = mockQuestions[questionId] || { title: `Sample Question ${questionId}`, level: 'Unknown' }

  const viewQuestionProps = {
    questionId,
    title: questionData.title,
    pdfUrl: '/sample-pdf.pdf', // Replace with actual PDF URL
    solutionUrl: '/sample-solution.pdf', // Replace with actual solution URL
    supplementaryMaterialUrl: '/sample-material.pdf', // Replace with actual supplementary material URL
    price: 9.99 // Replace with actual price
  }

  return (
    <div className="container mx-auto p-4">
      <ViewQuestion {...viewQuestionProps} />
    </div>
  )
}
