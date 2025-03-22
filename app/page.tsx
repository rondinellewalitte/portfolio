import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, BookOpen, Code, ExternalLink, Twitter, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Hero Section */}
      <header className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 mb-6">
          <AvatarImage
            src="https://sjc.microlink.io/ZfrHorcl5ooJZpUfkOp2mUDcHL0coRL2X47_ZeiwQy9HYqYUi1jw1aaDbCF_1Ks_nwRAJguA0GInj7vG8fsV1A.jpeg"
            alt="Rondinelle Walitte"
          />
          <AvatarFallback>RW</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Rondinelle Walitte</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Formado em Engenharia de Software. Curioso, esta sempre aprendendo uma coisa nova a cada dia. :)
        </p>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/rondinellewalitte"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://linkedin.com/in/rondinelle-walitte-pedro-de-jesus-8ab184a4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://twitter.com/Rondinelle_W" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="mailto:contato@rondinellewalitte.com.br" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://rondinellewalitte.com.br" target="_blank" rel="noopener noreferrer" aria-label="Website">
              <Globe className="h-5 w-5" />
            </a>
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" asChild>
            <Link href="/about">Sobre Mim</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/experience">Experiência</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/skills">Habilidades</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/github">GitHub</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/books">Livros</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contato</Link>
          </Button>
        </div>
      </header>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Code className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Tecnologias</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Badge className="px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white">HTML5</Badge>
          <Badge className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white">CSS3</Badge>
          <Badge className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-black">JavaScript</Badge>
          <Badge className="px-3 py-1 text-sm bg-blue-700 hover:bg-blue-800 text-white">TypeScript</Badge>
          <Badge className="px-3 py-1 text-sm bg-cyan-500 hover:bg-cyan-600 text-white">React</Badge>
          <Badge className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white">Node.js</Badge>
          <Badge className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white">Python</Badge>
          <Badge className="px-3 py-1 text-sm bg-blue-400 hover:bg-blue-500 text-white">React Native</Badge>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center gap-2 mb-8">
          <Code className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Projetos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" asChild className="w-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Ver Projeto <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 bg-muted/30">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-6 w-6" />
          <h2 className="text-3xl font-bold">Leituras Atuais</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col">
              <div className="relative h-64 w-full">
                <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{book.progress}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t mt-12 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Rondinelle Walitte. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

// Sample data - replace with your own
const projects = [
  {
    id: 1,
    title: "Curso JavaScript",
    description: "Curso de JavaScript com exemplos práticos e exercícios.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript"],
    link: "https://github.com/rondinellewalitte/Curso-Javascript",
  },
  {
    id: 2,
    title: "Semana OmniStack 10.0",
    description: "Projeto desenvolvido durante a Semana OmniStack da Rocketseat.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "React", "Node.js"],
    link: "https://github.com/rondinellewalitte/Semana_OmniStack_10.0",
  },
  {
    id: 3,
    title: "GoStack 10",
    description: "Projeto do bootcamp GoStack da Rocketseat.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["JavaScript", "React", "Node.js"],
    link: "https://github.com/rondinellewalitte/GoStack_10",
  },
]

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/placeholder.svg?height=400&width=300",
    progress: "Lendo - Capítulo 5",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    cover: "/placeholder.svg?height=400&width=300",
    progress: "Lendo - Capítulo 3",
  },
  {
    id: 3,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/placeholder.svg?height=400&width=300",
    progress: "Lendo - Capítulo 7",
  },
  {
    id: 4,
    title: "Refactoring",
    author: "Martin Fowler",
    cover: "/placeholder.svg?height=400&width=300",
    progress: "Próxima leitura",
  },
]

// Bio
const bio =
  "Apaixonado por tecnologia, educação e por mudar a vida das pessoas através da programação. Formado em Engenharia de Software, de Goianésia-GO. Sempre curioso e aprendendo coisas novas a cada dia."

