const API_URL = 'http://localhost:8000';

export interface MaterialItem {
  id: string;
  title: string;
  ngoName: string;
  ngoRegistration: string;
  category: 'Alimentos' | 'Mobiliário' | 'Tecnologia' | 'Escolar' | 'Roupas';
  zone: 'Zona Norte' | 'Zona Sul' | 'Zona Leste' | 'Zona Oeste' | 'Centro';
  quantity: number;
  condition: 'Novo' | 'Usado - Bom estado' | 'Precisa de Reparo';
  contact: string;
  description: string;
}

export const fetchMaterials = async (params: URLSearchParams): Promise<MaterialItem[]> => {
  const url = `${API_URL}/materials?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch materials');
  return response.json();
};

export const createMaterial = async (data: any): Promise<MaterialItem> => {
  const response = await fetch(`${API_URL}/materials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to create material');
  return response.json();
};
