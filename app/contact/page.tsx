"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, Send, Twitter, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato. Responderei o mais breve possível.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-muted-foreground mb-8">
            Tem alguma pergunta ou proposta? Não hesite em entrar em contato comigo através do formulário ou pelos
            canais abaixo.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:contato@rondinellewalitte.com.br"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>contato@rondinellewalitte.com.br</span>
            </a>
            <a
              href="https://linkedin.com/in/rondinelle-walitte-pedro-de-jesus-8ab184a4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span>linkedin.com/in/rondinelle-walitte-pedro-de-jesus-8ab184a4</span>
            </a>
            <a
              href="https://github.com/rondinellewalitte"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>github.com/rondinellewalitte</span>
            </a>
            <a
              href="https://twitter.com/Rondinelle_W"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span>@Rondinelle_W</span>
            </a>
            <a
              href="https://rondinellewalitte.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>rondinellewalitte.com.br</span>
            </a>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Envie uma mensagem</CardTitle>
            <CardDescription>Preencha o formulário abaixo e entrarei em contato o mais breve possível.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Assunto
                </label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">Enviando...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar Mensagem <Send className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

