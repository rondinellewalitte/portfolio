// Tipos para os livros
export interface Book {
  id: string
  title: string
  author: string
  cover: string
  status: "reading" | "completed" | "wishlist"
  progress?: number
  rating?: number
  completedDate?: string
  genre?: string
  description?: string
  notes?: string
  startDate?: string
  pageCount?: number
  isbn?: string
  publisher?: string
  yearPublished?: string
  language?: string
  format?: string
  purchaseDate?: string
  purchasePrice?: string
  link?: string
}

export interface BookCollection {
  currentlyReading: Book[]
  completedBooks: Book[]
  wishlist: Book[]
}

// ID da sua planilha do Google Sheets (extraído da URL)
const SHEET_ID = "1ZetkhTI19mQxGwjhpv2MxsKMlyqZPX4UwhN3xDYgybQ"

// URL para acessar a planilha como CSV
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`

export async function fetchBooks(): Promise<BookCollection> {
  try {
    const response = await fetch(SHEET_URL)

    if (!response.ok) {
      throw new Error("Falha ao buscar dados dos livros")
    }

    const csvText = await response.text()
    const books = parseCSV(csvText)

    // Organizar livros por status
    const currentlyReading = books.filter((book) => book.status === "reading")
    const completedBooks = books.filter((book) => book.status === "completed")
    const wishlist = books.filter((book) => book.status === "wishlist")

    return {
      currentlyReading,
      completedBooks,
      wishlist,
    }
  } catch (error) {
    console.error("Erro ao buscar livros:", error)
    throw error
  }
}

// Função para converter CSV em array de objetos
function parseCSV(csv: string): Book[] {
  const lines = csv.split("\n")
  const headers = lines[0].split(",")

  return lines
    .slice(1)
    .map((line) => {
      const values = line.split(",")
      const book: any = {}

      headers.forEach((header, index) => {
        // Limpar o header (remover espaços, aspas, etc.)
        const cleanHeader = header.trim().replace(/"/g, "")
        let value = values[index]?.trim().replace(/"/g, "") || ""

        // Converter valores numéricos
        if (
          cleanHeader === "progress" ||
          cleanHeader === "rating" ||
          cleanHeader === "pageCount" ||
          cleanHeader === "yearPublished" ||
          cleanHeader === "purchasePrice"
        ) {
          value = value ? Number.parseFloat(value) : undefined
        }

        // Converter gêneros em array
        if (cleanHeader === "genre" && value) {
          book[cleanHeader] = value.split(",").map((g) => g.trim())
        } else {
          book[cleanHeader] = value || undefined
        }
      })

      return book as Book
    })
    .filter((book) => book.id && book.title) // Filtrar linhas vazias
}

