import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchMaterials } from '../services/materialService';
import type { MaterialItem } from '../services/materialService';
import { Header } from '../components/Header';
import { MaterialCard } from '../components/MaterialCard';
import { RegisterModal } from '../components/RegisterModal';

export default function Home() {
  const [items, setItems] = useState<MaterialItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedZone, setSelectedZone] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.append('query', debouncedQuery);
    if (selectedCategory !== 'Todas') params.append('category', selectedCategory);
    if (selectedZone !== 'Todas') params.append('zone', selectedZone);

    fetchMaterials(params)
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch materials:', err));
  }, [debouncedQuery, selectedCategory, selectedZone]);

  const categories = ['Todas', 'Alimentos', 'Mobiliário', 'Tecnologia', 'Escolar', 'Roupas'];
  const zones = ['Todas', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... (keep existing main content) */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Mural de Recursos Disponíveis
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Conecte-se com outras instituições e encontre materiais excedentes para a sua ONG.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar itens ou ONGs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {zones.map((z) => (
                  <option key={z} value={z}>{z === 'Todas' ? 'Todas as Zonas' : z}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      
      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(newItem) => setItems([newItem, ...items])}
      />
    </div>
  );
}
