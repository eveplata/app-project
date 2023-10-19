
export interface Solicitud {
  usuario: UsuarioSlt;
  empresa: EmpresaSlt;
  productos: ProductoSlt[];
  estado: number;
  comentario: string | null;
  fecha_solicitud: FechaSolicitud | Date | any;
  id?: string;
  id_emp: string;
  id_usr: string;
}

export interface FechaSolicitud {
  seconds: number;
  nanoseconds: number;
}

export interface EmpresaSlt {
  id_emp: string;
  nom_emp: string;
}

export interface ProductoSlt {
  id_producto: string;
  nom_prod: string;
  prec_prod: number;
  cantidad?: number | null;
  total?: number | null;
}

export interface UsuarioSlt {
  id_usr: string;
  nom_usr: string;
  primer_ap: string;
  seg_ap: string;
}