export interface UsuarioEmpresas {
  id_usr: string;
  empresas: EmpresaUsrEp[];
  id: string;
}

export interface EmpresaUsrEp {
  id_emp: string;
  nom_emp: string;
}
