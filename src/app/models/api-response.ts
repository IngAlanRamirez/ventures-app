import { CategoriaMenu } from './categoria-menu';
import { MarcaMenu } from './marca-menu';

export interface ApiResponse {
  error: boolean;
  codigo: string;
  message: string;
  categorias?: CategoriaMenu[];
  marcas?: MarcaMenu[];
}
