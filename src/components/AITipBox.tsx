"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lightbulb } from "lucide-react"
import { useAI } from "@/hooks/useAI"

interface AITipBoxProps {
  section: string
  onClose?: () => void
}

export default function AITipBox({ section, onClose }: AITipBoxProps) {
  const [tip, setTip] = useState<string>("")
  const { generateTip, isLoading } = useAI()

  const handleGenerateTip = async () => {
    const generatedTip = await generateTip(section)
    setTip(generatedTip)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Gợi ý cho: {section}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!tip && (
          <Button onClick={handleGenerateTip} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo gợi ý...
              </>
            ) : (
              "Tạo gợi ý AI"
            )}
          </Button>
        )}

        {tip && (
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{tip}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGenerateTip} disabled={isLoading} variant="outline" size="sm">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Tạo gợi ý khác"}
              </Button>
              {onClose && (
                <Button onClick={onClose} variant="ghost" size="sm">
                  Đóng
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}