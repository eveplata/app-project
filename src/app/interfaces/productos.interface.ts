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

// export interface Producto {
//   categorias:     CategoriasPdt;
//   estado:         number;
//   imagen:         string;
//   stock_min:      number;
//   cant_comp_prod: number;
//   uni_med_prod:   string;
//   marca:          string;
//   id:             string;
//   prec_prod:      number;
//   tipo_prod:      string;
//   cont_prod:      number;
//   nom_prod:       string;
//   stock_act:      number;
// }

// export interface CategoriasPdt {
//   id_categoria: string;
//   nombre:       string;
  
// }
