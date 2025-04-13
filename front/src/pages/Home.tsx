import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="text-4xl font-bold text-center">Bem-vindo ao Sistema de Gerenciamento de Empréstimos</h1>
      <p className="text-lg text-center text-gray-600">
        Gerencie membros, livros, autores, categorias e empréstimos de forma simples e eficiente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer" onClick={() => navigate("/members")}>
          <CardHeader>
            <CardTitle>Membros</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie os membros cadastrados no sistema.</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={() => navigate("/books")}>
          <CardHeader>
            <CardTitle>Livros</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie os livros disponíveis para empréstimo.</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={() => navigate("/authors")}>
          <CardHeader>
            <CardTitle>Autores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie os autores cadastrados no sistema.</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={() => navigate("/categories")}>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie as categorias dos livros.</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={() => navigate("/loans")}>
          <CardHeader>
            <CardTitle>Empréstimos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie os empréstimos realizados.</p>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center text-gray-500">
        Desenvolvido por Fernando Moro
      </footer>
    </div>
  );
}