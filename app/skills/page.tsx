import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Minhas Habilidades</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Desenvolvimento Web</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {webDevelopmentSkills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desenvolvimento Mobile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mobileDevelopmentSkills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Linguagens de Programação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {programmingLanguages.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Habilidades Gerenciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {managementSkills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Outras Habilidades</h2>

        <Card>
          <CardContent className="py-6">
            <div className="flex flex-wrap gap-4">
              {otherSkills.map((skill) => (
                <div key={skill} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const webDevelopmentSkills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 90 },
  { name: "JavaScript", level: 92 },
  { name: "React", level: 88 },
  { name: "Node.js", level: 85 },
]

const mobileDevelopmentSkills = [
  { name: "React Native", level: 85 },
  { name: "UI/UX Mobile", level: 80 },
  { name: "APIs RESTful", level: 82 },
]

const programmingLanguages = [
  { name: "JavaScript", level: 92 },
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 75 },
  { name: "SQL", level: 80 },
]

const managementSkills = [
  { name: "Gestão de Equipes", level: 90 },
  { name: "Gestão de Projetos", level: 85 },
  { name: "Atendimento ao Cliente", level: 95 },
  { name: "Resolução de Problemas", level: 92 },
]

const otherSkills = [
  "Git & GitHub",
  "Metodologias Ágeis",
  "Scrum",
  "Kanban",
  "Engenharia Civil",
  "Química",
  "Análise de Dados",
  "Comunicação",
  "Liderança",
  "Trabalho em Equipe",
]

