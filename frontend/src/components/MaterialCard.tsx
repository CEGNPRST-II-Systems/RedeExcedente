import React from 'react';
import { MapPin, Building2, Phone } from 'lucide-react';
import type { MaterialItem } from '../services/materialService';

interface MaterialCardProps {
  item: MaterialItem;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
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
          href={`https://api.whatsapp.com/send?phone=${item.contact.replace(/\D/g, '')}&text=Olá, vi o anúncio "${item.title}" no sistema de trocas.`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Contato
        </a>
      </div>
    </div>
  );
};
