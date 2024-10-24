'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Unlock, FileText } from 'lucide-react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

interface ViewQuestionProps {
  questionId: string
  title: string
  pdfUrl: string
  solutionUrl: string
  supplementaryMaterialUrl: string
  price: number
}

export default function ViewQuestion({
  questionId,
  title,
  pdfUrl,
  solutionUrl,
  supplementaryMaterialUrl,
  price
}: ViewQuestionProps) {
  const [isPurchased, setIsPurchased] = useState(false)

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
    tx_ref: Date.now().toString(),
    amount: price,
    currency: 'XAF',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@example.com',
      phone_number: '070********',
      name: 'John Doe',
    },
    customizations: {
      title: 'Question Purchase',
      description: `Payment for ${title}`,
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handlePurchase = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log(response)
        closePaymentModal()
        if (response.status === "successful") {
          setIsPurchased(true)
          // Here you would typically update your backend to record the purchase
        }
      },
      onClose: () => {},
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] mb-4 bg-gray-100 flex items-center justify-center">
          {pdfUrl ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
              className="w-full h-full border-none"
              title="Question Preview"
            />
          ) : (
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">PDF preview not available</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Solution</span>
            {isPurchased ? (
              <a href={solutionUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <Unlock className="mr-2 h-4 w-4" />
                  View Solution
                </Button>
              </a>
            ) : (
              <Button disabled>
                <Lock className="mr-2 h-4 w-4" />
                Locked
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Supplementary Material</span>
            {isPurchased ? (
              <a href={supplementaryMaterialUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <Unlock className="mr-2 h-4 w-4" />
                  View Material
                </Button>
              </a>
            ) : (
              <Button disabled>
                <Lock className="mr-2 h-4 w-4" />
                Locked
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isPurchased && (
          <Button onClick={handlePurchase} className="w-full">
            Purchase for ${price.toFixed(2)}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
