"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Lightbulb, Eye } from "lucide-react"
import CVSectionDetector from "./CVSectionDetector"
import AIChatBox from "./AIChatBox"
import AITipBox from "./AITipBox"

interface UniversalCVHelperProps {
  cvData: any
  className?: string
}

export default function UniversalCVHelper({ cvData, className = "" }: UniversalCVHelperProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">🤖 AI Trợ lý CV Thông minh</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sections" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sections" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Phân tích CV
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Gợi ý AI
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="mt-4">
              <CVSectionDetector cvData={cvData} onSectionClick={setSelectedSection} />
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              {selectedSection ? (
                <AITipBox section={selectedSection} onClose={() => setSelectedSection(null)} />
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Lightbulb className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">Chọn một mục từ tab "Phân tích CV" để nhận gợi ý AI</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <AIChatBox />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}