"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, StarHalf, Search, BookOpen, BookMarked, BookPlus, Loader2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fetchBooks, type Book, type BookCollection } from "@/lib/books-service"

export default function BooksPage() {
  const [bookData, setBookData] = useState<BookCollection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBooks() {
      try {
        setIsLoading(true)
        const data = await fetchBooks()
        setBookData(data)
      } catch (err) {
        console.error("Erro ao buscar livros:", err)
        setError("Não foi possível carregar sua biblioteca. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Minha Biblioteca</h1>

        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Carregando sua biblioteca...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Minha Biblioteca</h1>

        <Alert variant="destructive" className="mb-8">
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Button asChild>
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    )
  }

  if (!bookData) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-8">Minha Biblioteca</h1>

      <BookLibrary bookData={bookData} />
    </div>
  )
}

function BookLibrary({ bookData }: { bookData: BookCollection }) {
  const { currentlyReading, completedBooks, wishlist } = bookData
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar livros com base no termo de busca
  const filterBooks = (books: Book[]) => {
    if (!searchTerm) return books

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.genre && book.genre.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase()))),
    )
  }

  const filteredCurrentlyReading = filterBooks(currentlyReading)
  const filteredCompletedBooks = filterBooks(completedBooks)
  const filteredWishlist = filterBooks(wishlist)

  // Contagem total de livros
  const totalBooks = currentlyReading.length + completedBooks.length + wishlist.length
  const filteredTotal = filteredCurrentlyReading.length + filteredCompletedBooks.length + filteredWishlist.length

  return (
    <div>
      {/* Barra de busca */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por título, autor ou gênero..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <BookMarked className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Livros Lidos</p>
              <p className="text-2xl font-bold">{completedBooks.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Lendo Atualmente</p>
              <p className="text-2xl font-bold">{currentlyReading.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <BookPlus className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Lista de Desejos</p>
              <p className="text-2xl font-bold">{wishlist.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mensagem de resultados da busca */}
      {searchTerm && (
        <p className="text-sm text-muted-foreground mb-4">
          Exibindo {filteredTotal} de {totalBooks} livros para "{searchTerm}"
        </p>
      )}

      {/* Tabs para categorias de livros */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="reading">Lendo</TabsTrigger>
          <TabsTrigger value="completed">Lidos</TabsTrigger>
          <TabsTrigger value="wishlist">Quero Ler</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {filteredCurrentlyReading.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Lendo Atualmente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCurrentlyReading.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          )}

          {filteredCompletedBooks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookMarked className="h-5 w-5" /> Livros Lidos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCompletedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          )}

          {filteredWishlist.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookPlus className="h-5 w-5" /> Lista de Desejos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredWishlist.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          )}

          {filteredTotal === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar seus termos de busca.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reading">
          {filteredCurrentlyReading.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCurrentlyReading.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Tente ajustar seus termos de busca." : "Você não está lendo nenhum livro atualmente."}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {filteredCompletedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCompletedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookMarked className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Tente ajustar seus termos de busca." : "Você ainda não marcou nenhum livro como lido."}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="wishlist">
          {filteredWishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWishlist.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Tente ajustar seus termos de busca." : "Você não tem livros na sua lista de desejos."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookCard({ book }: { book: Book }) {
  // Converter string de gêneros em array se necessário
  const genres = Array.isArray(book.genre) ? book.genre : book.genre ? book.genre.split(",").map((g) => g.trim()) : []

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-64 w-full">
        <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{book.title}</CardTitle>
        <CardDescription className="line-clamp-1">{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        {book.status === "reading" && book.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{book.progress}%</span>
            </div>
            <Progress value={book.progress} className="h-2" />
          </div>
        )}

        {book.status === "completed" && book.rating !== undefined && (
          <div className="flex items-center gap-1">
            {[...Array(Math.floor(book.rating))].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
            {book.rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
            <span className="text-sm ml-2">{book.rating}/5</span>
          </div>
        )}

        {book.completedDate && <p className="text-sm text-muted-foreground">Concluído em {book.completedDate}</p>}

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <Badge key={g} variant="secondary" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
        )}

        {book.description && <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>}

        {book.link && (
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" /> Comprar
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

