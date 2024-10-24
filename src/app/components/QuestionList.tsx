'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: string
  title: string
}

interface QuestionListProps {
  subject: { code: string, name: string }
  questions: Question[]
  onSelectQuestion: (question: Question) => void
  onBack: () => void
}

export default function QuestionList({ subject, questions, onSelectQuestion, onBack }: QuestionListProps) {
  return (
    <div>
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Subjects
      </Button>
      <h2 className="text-2xl font-bold mb-4">{subject.name} (Code: {subject.code})</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <Card key={question.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{question.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Link href={`/preview-question/${question.id}`} passHref>
                <Button className="w-full">Preview</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
