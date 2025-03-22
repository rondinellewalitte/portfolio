import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Sobre Mim</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          Olá! Sou Rondinelle Walitte, um desenvolvedor apaixonado por tecnologia, educação e por mudar a vida das
          pessoas através da programação.
        </p>

        <h2>Minha Jornada</h2>
        <p>
          Sou formado em Engenharia de Software e estou sempre em busca de novos conhecimentos e desafios. Minha
          curiosidade me leva a aprender algo novo a cada dia, mantendo-me atualizado com as tecnologias mais recentes.
        </p>

        <h2>Habilidades</h2>
        <ul>
          <li>
            <strong>Linguagens:</strong> JavaScript, TypeScript, Python
          </li>
          <li>
            <strong>Frontend:</strong> React, HTML5, CSS3
          </li>
          <li>
            <strong>Backend:</strong> Node.js
          </li>
          <li>
            <strong>Mobile:</strong> React Native
          </li>
          <li>
            <strong>Outros:</strong> Git, GitHub
          </li>
        </ul>

        <h2>Formação Acadêmica</h2>
        <ul>
          <li>
            <strong>UNOPAR - Universidade Norte do Paraná</strong>
            <p>Graduação em Engenharia de Software</p>
          </li>
          <li>
            <strong>Faculdade Evangélica de Goianésia</strong>
            <p>Graduação em Engenharia Civil</p>
          </li>
          <li>
            <strong>Centro de Educação Profissional - Governador Otavio Lage</strong>
            <p>Técnico em Química nível Médio</p>
          </li>
          <li>
            <strong>Micro Company</strong>
            <p>Técnico em Informática</p>
          </li>
        </ul>

        <h2>Experiência Profissional</h2>
        <ul>
          <li>
            <strong>Gerente Geral</strong> - Maxima Impressão
            <p>Julho de 2023 - Presente (1 ano e 9 meses)</p>
            <p>Goianésia, Goiás, Brasil · Presencial</p>
          </li>
          <li>
            <strong>Desenvolvedor</strong> - DRR Aulas Online
            <p>Novembro de 2021 - Presente (3 anos e 5 meses)</p>
            <p>Goianésia, Goiás, Brasil · Remoto</p>
          </li>
        </ul>

        <h2>Localização</h2>
        <p>Sou de Goianésia-GO, Brasil.</p>

        <h2>Contato</h2>
        <p>
          Sinta-se à vontade para entrar em contato comigo através do meu email ou redes sociais. Estou sempre aberto a
          novas oportunidades e colaborações.
        </p>
      </div>
    </div>
  )
}

