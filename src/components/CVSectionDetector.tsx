"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Eye } from "lucide-react"
import { useAI } from "@/hooks/useAI"
import AITipBox from "./AITipBox"

interface CVSectionDetectorProps {
  cvData: any
  onSectionClick?: (section: string) => void
}

export default function CVSectionDetector({ cvData, onSectionClick }: CVSectionDetectorProps) {
  const [sections, setSections] = useState<string[]>([])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [showTipBox, setShowTipBox] = useState(false)
  const { extractSections, isLoading } = useAI()

  useEffect(() => {
    const loadSections = async () => {
      const sectionInfo = await extractSections(cvData)
      setSections(sectionInfo.sections)
    }

    if (cvData) {
      loadSections()
    }
  }, [cvData, extractSections])

  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
    setShowTipBox(true)
    onSectionClick?.(section)
  }

  const closeTipBox = () => {
    setShowTipBox(false)
    setSelectedSection(null)
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-center text-gray-500">Đang phân tích CV...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Eye className="h-5 w-5 text-blue-500" />
            Các mục trong CV ({sections.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sections.map((section, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => handleSectionClick(section)}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                {section}
              </Badge>
            ))}
          </div>

          {sections.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Không tìm thấy mục nào trong CV. Hãy đảm bảo CV có cấu trúc dữ liệu phù hợp.
            </p>
          )}
        </CardContent>
      </Card>

      {showTipBox && selectedSection && <AITipBox section={selectedSection} onClose={closeTipBox} />}
    </div>
  )
}