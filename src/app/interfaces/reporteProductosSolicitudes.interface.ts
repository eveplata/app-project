export interface ReporteProductosSolicitudes {
    id_producto:  string;
    nom_prod:     string;
    cont_prod:    number;
    marca:        string;
    uni_med_prod: string;
    cantidad:     number | null;
    empresas:     EmpresaReportePS[];
}

export interface EmpresaReportePS {
    id_emp:  string;
    nom_emp: string;
}
