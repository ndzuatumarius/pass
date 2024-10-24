import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'

interface Specialty {
  code: string
  name: string
}

interface SpecialtyListProps {
  specialties: Specialty[]
  onSelectSpecialty: (specialty: Specialty) => void
  onBack: () => void
}

export default function SpecialtyList({ specialties, onSelectSpecialty, onBack }: SpecialtyListProps) {
  return (
    <div>
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Exams
      </Button>
      <div className="grid md:grid-cols-3 gap-6">
        {specialties.map((specialty) => (
          <Card key={specialty.code} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{specialty.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Code: {specialty.code}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => onSelectSpecialty(specialty)}>
                View Questions
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
