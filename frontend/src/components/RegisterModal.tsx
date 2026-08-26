import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createMaterial } from '../services/materialService';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newItem: any) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formState, setFormState] = useState({
    title: '',
    ngoName: '',
    ngoRegistration: '',
    category: 'Alimentos',
    zone: 'Centro',
    quantity: 0,
    condition: 'Usado - Bom estado',
    contact: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Alimentos', 'Mobiliário', 'Tecnologia', 'Escolar', 'Roupas'];
  const zones = ['Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro'];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formState.title.trim()) newErrors.title = 'O título é obrigatório.';
    if (!formState.ngoName.trim()) newErrors.ngoName = 'O nome da ONG é obrigatório.';
    if (!formState.contact.trim()) newErrors.contact = 'O contato é obrigatório.';
    if (!formState.description.trim()) newErrors.description = 'A descrição é obrigatória.';
    if (formState.quantity <= 0) newErrors.quantity = 'A quantidade deve ser maior que 0.';
    if (!formState.ngoRegistration.trim()) newErrors.ngoRegistration = 'O registro da ONG é obrigatório.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const newItem = await createMaterial(formState);
      onSuccess(newItem);
      onClose();
      setFormState({
        title: '',
        ngoName: '',
        ngoRegistration: '',
        category: 'Alimentos',
        zone: 'Centro',
        quantity: 0,
        condition: 'Usado - Bom estado',
        contact: '',
        description: '',
      });
      setErrors({});
    } catch (err) {
      console.error('Failed to create material:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-1">Cadastrar Material Excedente</h2>
        <p className="text-xs text-slate-500 mb-5">Preencha as informações para disponibilizar o item para outras ONGs.</p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Título do Material <span className="text-red-500">*</span></label>
            <input
              type="text"
              maxLength={100}
              placeholder="Ex: 20 Pacotes de Folha Sulfite A4"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.title ? 'border-red-500' : 'border-slate-200'}`}
            />
            {errors.title && <p className="text-red-500 text-[10px] mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nome da ONG <span className="text-red-500">*</span></label>
              <input
                type="text"
                maxLength={100}
                value={formState.ngoName}
                onChange={(e) => setFormState({ ...formState, ngoName: e.target.value })}
                className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.ngoName ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.ngoName && <p className="text-red-500 text-[10px] mt-1">{errors.ngoName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nº Registro / CNPJ <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="ONG-00000"
                maxLength={20}
                value={formState.ngoRegistration}
                onChange={(e) => setFormState({ ...formState, ngoRegistration: e.target.value })}
                className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.ngoRegistration ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.ngoRegistration && <p className="text-red-500 text-[10px] mt-1">{errors.ngoRegistration}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoria <span className="text-red-500">*</span></label>
              <select
                value={formState.category}
                onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Zona de Trabalho <span className="text-red-500">*</span></label>
              <select
                value={formState.zone}
                onChange={(e) => setFormState({ ...formState, zone: e.target.value })}
                className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {zones.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quantidade <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={formState.quantity}
                onChange={(e) => setFormState({ ...formState, quantity: parseInt(e.target.value) || 0 })}
                className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.quantity ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.quantity && <p className="text-red-500 text-[10px] mt-1">{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contato / Telefone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                maxLength={20}
                value={formState.contact}
                onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.contact ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.contact && <p className="text-red-500 text-[10px] mt-1">{errors.contact}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição Breve <span className="text-red-500">*</span></label>
            <textarea
              rows={3}
              maxLength={500}
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.description ? 'border-red-500' : 'border-slate-200'}`}
            />
            {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">
              Publicar Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
