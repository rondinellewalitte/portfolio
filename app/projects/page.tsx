import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-8">Meus Projetos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {detailedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="relative h-64 w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{project.longDescription}</p>
            </CardContent>
            <CardFooter className="flex gap-4 mt-auto">
              {project.demoLink && (
                <Button variant="default" asChild className="flex-1">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Demo <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button variant="outline" asChild className="flex-1">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  GitHub <Github className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Substituir a constante detailedProjects no final do arquivo
const detailedProjects = [
  {
    id: 1,
    title: "Curso JavaScript",
    shortDescription: "Curso de JavaScript com exemplos práticos",
    longDescription:
      "Repositório com materiais, exemplos e exercícios de um curso de JavaScript, abordando conceitos fundamentais e avançados da linguagem.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "HTML", "CSS"],
    demoLink: null,
    githubLink: "https://github.com/rondinellewalitte/Curso-Javascript",
  },
  {
    id: 2,
    title: "Semana OmniStack 10.0",
    shortDescription: "Projeto da Semana OmniStack da Rocketseat",
    longDescription:
      "Aplicação desenvolvida durante a Semana OmniStack 10.0 da Rocketseat, utilizando a stack JavaScript com React, React Native e Node.js.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "React", "React Native", "Node.js"],
    demoLink: null,
    githubLink: "https://github.com/rondinellewalitte/Semana_OmniStack_10.0",
  },
  {
    id: 3,
    title: "GoStack 10",
    shortDescription: "Projeto do bootcamp GoStack da Rocketseat",
    longDescription:
      "Projeto desenvolvido durante o bootcamp GoStack 10 da Rocketseat, focado em desenvolvimento web e mobile com JavaScript, React e Node.js.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "React", "Node.js"],
    demoLink: null,
    githubLink: "https://github.com/rondinellewalitte/GoStack_10",
  },
  {
    id: 4,
    title: "Semana OmniStack 9.0",
    shortDescription: "Projeto da Semana OmniStack 9.0",
    longDescription:
      "Aplicação desenvolvida durante a Semana OmniStack 9.0 da Rocketseat, utilizando a stack JavaScript com React, React Native e Node.js.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "React", "React Native", "Node.js"],
    demoLink: null,
    githubLink: "https://github.com/rondinellewalitte/Semana_OmniStack_9.0",
  },
]

