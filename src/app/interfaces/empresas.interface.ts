export interface Empresa {
    nom_emp:    string;
    dir_emp:    string;
    fec_inicio: fecha | Date | any;
    fec_fin?: fecha | Date | any;
    tipo_emp:   string;
    estado:     number;
    telefono:   number;
    celu_emp?:  number;
    email_emp:  string;
    dep_emp:    string;
    id?:         string;
}

export interface fecha {
    seconds:     number;
    nanoseconds: number;
}