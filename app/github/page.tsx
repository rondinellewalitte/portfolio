"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Star, GitFork, Eye, ExternalLink, Code, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Tipo para os repositórios do GitHub
interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  created_at: string
  updated_at: string
  topics: string[]
  fork: boolean
}

export default function GitHubPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("updated")
  const [filterForks, setFilterForks] = useState(false)

  // Função para buscar os repositórios
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://api.github.com/users/rondinellewalitte/repos?per_page=100")

        if (!response.ok) {
          throw new Error("Falha ao buscar repositórios")
        }

        const data = await response.json()
        setRepos(data)
        setFilteredRepos(data)
        setIsLoading(false)
      } catch (err) {
        setError("Erro ao carregar repositórios. Por favor, tente novamente mais tarde.")
        setIsLoading(false)
        console.error("Erro ao buscar repositórios:", err)
      }
    }

    fetchRepos()
  }, [])

  // Filtrar e ordenar repositórios
  useEffect(() => {
    let result = [...repos]

    // Filtrar por termo de busca
    if (searchTerm) {
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filtrar forks
    if (filterForks) {
      result = result.filter((repo) => !repo.fork)
    }

    // Ordenar
    switch (sortBy) {
      case "stars":
        result.sort((a, b) => b.stargazers_count - a.stargazers_count)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "created":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "updated":
      default:
        result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        break
    }

    setFilteredRepos(result)
  }, [repos, searchTerm, sortBy, filterForks])

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Determinar a cor do badge da linguagem
  const getLanguageColor = (language: string | null) => {
    if (!language) return "bg-gray-500"

    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500 text-black",
      TypeScript: "bg-blue-700 text-white",
      HTML: "bg-orange-500 text-white",
      CSS: "bg-blue-500 text-white",
      Python: "bg-blue-600 text-white",
      Java: "bg-red-600 text-white",
      "C#": "bg-green-700 text-white",
      PHP: "bg-purple-600 text-white",
      Ruby: "bg-red-700 text-white",
      Go: "bg-cyan-600 text-white",
      Swift: "bg-orange-600 text-white",
      Kotlin: "bg-purple-700 text-white",
    }

    return colors[language] || "bg-gray-600 text-white"
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Meus Repositórios no GitHub</h1>

        {/* Filtros e Ordenação */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Buscar repositórios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Atualização recente</SelectItem>
                <SelectItem value="created">Criação recente</SelectItem>
                <SelectItem value="stars">Mais estrelas</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
              </SelectContent>
            </Select>

            <Button variant={filterForks ? "default" : "outline"} onClick={() => setFilterForks(!filterForks)}>
              {filterForks ? "Todos" : "Ocultar Forks"}
            </Button>
          </div>
        </div>

        {/* Mensagem de erro */}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {/* Contagem de repositórios */}
        <p className="text-muted-foreground mb-6">
          Exibindo {filteredRepos.length} repositórios {filterForks ? "(excluindo forks)" : ""}
        </p>

        {/* Lista de repositórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? // Esqueletos de carregamento
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : filteredRepos.map((repo) => (
                <Card key={repo.id} className="overflow-hidden flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl break-words">{repo.name}</CardTitle>
                      {repo.fork && (
                        <Badge variant="outline" className="ml-2">
                          Fork
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">{repo.description || "Sem descrição"}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && <Badge className={`${getLanguageColor(repo.language)}`}>{repo.language}</Badge>}
                      {repo.topics &&
                        repo.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Atualizado em {formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" asChild className="w-full">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Ver no GitHub <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>

        {/* Mensagem de nenhum resultado */}
        {!isLoading && filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Nenhum repositório encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar seus filtros ou termos de busca.</p>
          </div>
        )}
      </div>
    </div>
  )
}

