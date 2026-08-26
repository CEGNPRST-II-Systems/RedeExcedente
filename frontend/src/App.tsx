import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  Plus, 
  Search, 
  Building2, 
  Phone, 
  X
} from 'lucide-react';

const API_URL = 'http://localhost:8000';

interface MaterialItem {
  id: string;
  title: string;
  ngoName: string;
  ngoRegistration: string;
  category: 'Alimentos' | 'Mobiliário' | 'Tecnologia' | 'Escolar' | 'Roupas';
  zone: 'Zona Norte' | 'Zona Sul' | 'Zona Leste' | 'Zona Oeste' | 'Centro';
  quantity: string;
  condition: 'Novo' | 'Usado - Bom estado' | 'Precisa de Reparo';
  contact: string;
  description: string;
}


export default function NGOExchangePlatform() {
  const [items, setItems] = useState<MaterialItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedZone, setSelectedZone] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${API_URL}/materials`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch materials:', err));
  }, []);

  const [formState, setFormState] = useState({
    title: '',
    ngoName: '',
    ngoRegistration: '',
    category: 'Alimentos',
    zone: 'Centro',
    quantity: '',
    condition: 'Usado - Bom estado',
    contact: '',
    description: '',
  });

  const categories = ['Todas', 'Alimentos', 'Mobiliário', 'Tecnologia', 'Escolar', 'Roupas'];
  const zones = ['Todas', 'Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro'];

  const filteredItems = items.filter((item) => {
    const matchCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchZone = selectedZone === 'Todas' || item.zone === selectedZone;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchZone && matchSearch;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.ngoName) return;

    fetch(`${API_URL}/materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    })
    .then(res => res.json())
    .then(newItem => {
      setItems([newItem, ...items]);
      setIsModalOpen(false);
      setFormState({
        title: '',
        ngoName: '',
        ngoRegistration: '',
        category: 'Alimentos',
        zone: 'Centro',
        quantity: '',
        condition: 'Usado - Bom estado',
        contact: '',
        description: '',
      });
    })
    .catch(err => console.error('Failed to create material:', err));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">RedeExcedente</span>
              <span className="text-xs block text-emerald-700 font-medium">Trocas Inter-ONGs</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Anunciar Excedente
          </button>
        </div>
      </header>

      {/* Hero & Filters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Mural de Recursos Disponíveis
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Conecte-se com outras instituições e encontre materiais excedentes para a sua ONG.
          </p>
        </div>

        {/* Search & Filter Controls */}
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-150">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.zone}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-1.5 mb-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantidade:</span>
                    <span className="font-semibold text-slate-800">{item.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Condição:</span>
                    <span className="font-semibold text-slate-800">{item.condition}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-900">{item.ngoName}</span>
                    <span className="block text-[10px] text-slate-400">{item.ngoRegistration}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/?text=Olá, vi o anúncio "${item.title}" no sistema de trocas.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Contato
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-1">Cadastrar Material Excedente</h2>
            <p className="text-xs text-slate-500 mb-5">Preencha as informações para disponibilizar o item para outras ONGs.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título do Material</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 20 Pacotes de Folha Sulfite A4"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome da ONG</label>
                  <input
                    type="text"
                    required
                    value={formState.ngoName}
                    onChange={(e) => setFormState({ ...formState, ngoName: e.target.value })}
                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nº Registro / CNPJ</label>
                  <input
                    type="text"
                    placeholder="ONG-00000"
                    value={formState.ngoRegistration}
                    onChange={(e) => setFormState({ ...formState, ngoRegistration: e.target.value })}
                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.filter(c => c !== 'Todas').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Zona de Trabalho</label>
                  <select
                    value={formState.zone}
                    onChange={(e) => setFormState({ ...formState, zone: e.target.value })}
                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {zones.filter(z => z !== 'Todas').map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quantidade</label>
                  <input
                    type="text"
                    placeholder="Ex: 5 caixas"
                    value={formState.quantity}
                    onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contato / Telefone</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição Breve</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Publicar Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}