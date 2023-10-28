export interface Producto {
  nom_prod: string;
  stock_act: number;
  prec_prod: number;
  estado: number;
  stock_min: number;
  cant_comp_prod: number;
  categorias: CategoriasPdt;
  uni_med_prod: string;
  tipo_prod: string;
  cont_prod: number;
  marca: string;
  imagen: string;
  id: string;
}

export interface CategoriasPdt {
  nombre: string;
  id_categorias?: string;
  id_categoria?: string;
}
