import Link from "next/link"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Experiência Profissional</h1>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <CardTitle className="text-xl">{experience.role}</CardTitle>
                    <CardDescription className="text-lg font-medium">{experience.company}</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {experience.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <p>{experience.description}</p>

                {experience.responsibilities && (
                  <div>
                    <h3 className="font-medium mb-2">Responsabilidades:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {experience.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <h1 className="text-4xl font-bold mt-16 mb-8">Formação Acadêmica</h1>

        <div className="space-y-8">
          {education.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{item.institution}</CardTitle>
                <CardDescription className="text-lg font-medium">{item.degree}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{item.period}</span>
                </div>

                {item.description && <p>{item.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const experiences = [
  {
    role: "Gerente Geral",
    company: "Maxima Impressão",
    type: "Tempo integral",
    period: "Julho de 2023 - Presente (1 ano e 9 meses)",
    location: "Goianésia, Goiás, Brasil",
    description: "Gerenciamento geral das operações da empresa de impressão.",
    responsibilities: ["Supervisão de equipe", "Gestão de projetos", "Atendimento ao cliente", "Controle de qualidade"],
  },
  {
    role: "Desenvolvedor",
    company: "DRR Aulas Online",
    type: "Tempo integral",
    period: "Novembro de 2021 - Presente (3 anos e 5 meses)",
    location: "Goianésia, Goiás, Brasil (Remoto)",
    description: "Desenvolvimento de soluções para plataforma de aulas online.",
    responsibilities: [
      "Desenvolvimento de aplicações web",
      "Manutenção de sistemas",
      "Implementação de novas funcionalidades",
      "Otimização de performance",
    ],
    technologies: ["JavaScript", "React", "Node.js", "HTML5", "CSS3"],
  },
]

const education = [
  {
    institution: "UNOPAR - Universidade Norte do Paraná",
    degree: "Graduação em Engenharia de Software",
    period: "Concluído",
    description: "Formação completa em Engenharia de Software, com foco em desenvolvimento de sistemas e aplicações.",
  },
  {
    institution: "Faculdade Evangélica de Goianésia",
    degree: "Graduação em Engenharia Civil",
    period: "Concluído",
    description: "Formação em Engenharia Civil, com conhecimentos em projetos estruturais e gestão de obras.",
  },
  {
    institution: "Centro de Educação Profissional - Governador Otavio Lage",
    degree: "Técnico em Química nível Médio",
    period: "Concluído",
    description: "Formação técnica em Química, com conhecimentos em processos químicos e análises laboratoriais.",
  },
  {
    institution: "Micro Company",
    degree: "Técnico em Informática",
    period: "Concluído",
    description: "Formação técnica em Informática, com conhecimentos em hardware, software e redes.",
  },
]

