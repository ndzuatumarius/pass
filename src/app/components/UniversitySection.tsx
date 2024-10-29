import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { motion } from "framer-motion"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const universities = [
  { id: 1, name: "Université de Buéa", location: "Buéa", image: "/placeholder.jpg" },
  { id: 2, name: "Université de Dschang", location: "Dschang", image: "/placeholder.jpg" },
  { id: 3, name: "Institut Catholique de Yaoundé", location: "Yaoundé", image: "/placeholder.jpg" },
  { id: 4, name: "Université de Douala", location: "Douala", image: "/placeholder.jpg" },
  { id: 5, name: "Université de Ngaoundéré", location: "Ngaoundéré", image: "/placeholder.jpg" },
  { id: 6, name: "Université de Yaoundé II", location: "Soa", image: "/placeholder.jpg" },
  { id: 7, name: "Université de Yaoundé I", location: "Yaoundé", image: "/placeholder.jpg" },
  { id: 8, name: "Université de Maroua", location: "Maroua", image: "/placeholder.jpg" },
  { id: 9, name: "Université de Bamenda", location: "Bamenda", image: "/placeholder.jpg" },
  { id: 10, name: "Université des Montagnes", location: "Bangangté", image: "/placeholder.jpg" },
  { id: 11, name: "Université Protestante d'Afrique Centrale", location: "Yaoundé", image: "/placeholder.jpg" },
  { id: 12, name: "Catholic University of Cameroon", location: "Bamenda", image: "/placeholder.jpg" },
  { id: 13, name: "Université Adventiste Cosendai", location: "Nanga-Eboko", image: "/placeholder.jpg" },
  { id: 14, name: "Bamenda University of Science and Technology", location: "Bamenda", image: "/placeholder.jpg" },
  { id: 15, name: "Jagora University", location: "Yaoundé", image: "/placeholder.jpg" },
  { id: 16, name: "International University, Bamenda", location: "Bamenda", image: "/placeholder.jpg" },
]

const concours = [
  { id: 1, name: "ENAM Concours", location: "Yaoundé" },
  { id: 2, name: "ENS Concours", location: "Yaoundé" },
  { id: 3, name: "ENSP Concours", location: "Yaoundé" },
  { id: 4, name: "IRIC Concours", location: "Yaoundé" },
  { id: 5, name: "FMSP Concours", location: "Douala" },
]

const universityQuestions = {
  1: [
    { id: 101, title: "Mathematics Entrance Exam 2023", level: "Undergraduate" },
    { id: 102, title: "Physics Entrance Exam 2023", level: "Undergraduate" },
    { id: 103, title: "Chemistry Entrance Exam 2023", level: "Undergraduate" },
  ],
  2: [
    { id: 201, title: "Biology Entrance Exam 2023", level: "Undergraduate" },
    { id: 202, title: "Computer Science Entrance Exam 2023", level: "Undergraduate" },
    { id: 203, title: "Economics Entrance Exam 2023", level: "Undergraduate" },
  ],
}

const concoursQuestions = {
  1: [
    { id: 301, title: "ENAM General Knowledge Test 2023", level: "Graduate" },
    { id: 302, title: "ENAM Public Administration Exam 2023", level: "Graduate" },
    { id: 303, title: "ENAM Economics Exam 2023", level: "Graduate" },
  ],
  2: [
    { id: 401, title: "ENS Mathematics Teaching Exam 2023", level: "Graduate" },
    { id: 402, title: "ENS Literature Teaching Exam 2023", level: "Graduate" },
    { id: 403, title: "ENS Science Teaching Exam 2023", level: "Graduate" },
  ],
}

interface UniversitySectionProps {
  examType: 'Universities' | 'Entrance Exams';
  onSelectQuestion: (question: {
    id: number;
    title: string;
    level: string;
    pdfUrl?: string;
    solutionUrl?: string;
    supplementaryMaterialUrl?: string;
    price?: number;
  }) => void;
  onBack: () => void;
}

export default function UniversitySection({ examType, onSelectQuestion, onBack }: UniversitySectionProps) {
  const [selectedType, setSelectedType] = useState<'universities' | 'concours'>(examType === 'Universities' ? 'universities' : 'concours')
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null)

  const handleInstitutionSelect = (institutionId: number) => {
    setSelectedInstitution(institutionId)
  }

  const renderInstitutions = (institutions: typeof universities | typeof concours) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {institutions.map((institution) => (
        <motion.div
          key={institution.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="flex flex-col h-full">
            <div className="relative pt-[56.25%] rounded-t-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt={institution.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-sm font-semibold">{institution.name}</p>
                <p className="text-xs">{institution.location}</p>
              </div>
            </div>
            <CardContent className="flex-grow" />
            <CardFooter>
              <Button className="w-full" onClick={() => handleInstitutionSelect(institution.id)}>
                View Questions
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderQuestions = (questions: typeof universityQuestions[1] | typeof concoursQuestions[1]) => (
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
                src="/design2.jpg"
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
            <CardContent className="flex-grow" />
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
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to University Options
      </Button>
      <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as 'universities' | 'concours')}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="concours">Concours</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="universities">
          {!selectedInstitution ? (
            renderInstitutions(universities)
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {universities.find(u => u.id === selectedInstitution)?.name} Questions
              </h2>
              {renderQuestions(universityQuestions[selectedInstitution as keyof typeof universityQuestions] || [])}
            </>
          )}
        </TabsContent>

        <TabsContent value="concours">
          {!selectedInstitution ? (
            renderInstitutions(concours)
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {concours.find(c => c.id === selectedInstitution)?.name} Questions
              </h2>
              {renderQuestions(concoursQuestions[selectedInstitution as keyof typeof concoursQuestions] || [])}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
