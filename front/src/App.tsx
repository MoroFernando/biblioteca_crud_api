import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Sidebar />
      <main className="p-6">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
