import { CategoriaMenu } from './categoria-menu';
import { MarcaMenu } from './marca-menu';

export interface ApiResponse {
  error: boolean;
  codigo: string;
  message: string;
  categorias?: CategoriaMenu[];
  menuItems?: any[]; // Para la respuesta real de la API
  marcas?: MarcaMenu[];
}
