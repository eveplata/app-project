export interface Usuario {
  seg_ap?: string;
  dir_usr: string;
  cel_usr: number;
  primer_ap: string;
  fec_nac?: FecUsr | Date | any;
  fec_reg_ing?: FecUsr | Date | any;
  nom_usr: string;
  dep_usr: string;
  correo_usr: string;
  id: string;
  estado: number;
  roles: Roles[];
}

export interface FecUsr {
  seconds: number;
  nanoseconds: number;
}

export interface Roles {
  id_rol:  string;
  nom_rol: string;
}

