import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Books from '../pages/books/Books';
import Authors from '../pages/authors/Authors';
import Categories from '../pages/categories/Categories';
import Members from '../pages/members/Members';
import Loans from '../pages/loans/Loans';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/members" element={<Members />} />
      <Route path="/loans" element={<Loans />} />
    </Routes>
  );
}
