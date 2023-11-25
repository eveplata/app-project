export interface Reclamos {
    id:         string;
    id_usr:     string;
    nom_usr:    string;
    primer_ap:  string;
    seg_ap:     string;
    id_emp:     string;
    nom_emp:    string;
    fecha:      Fecha | Date | any;
    descripcion: string;
    asunto: string;
}

export interface Fecha {
    seconds:     number;
    nanoseconds: number;
}



