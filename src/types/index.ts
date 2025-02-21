export type User = {
    name: string
    ap_paterno: string
    ap_materno: string
    birthday_date: Date
    cellphone: string
    email: string
}

export type AssignmentWithRelations = {
    id: number;
    user: {
      name: string;
      ap_paterno: string;
      ap_materno: string;
    };
    enterprise: {
      name: string;
    };
    rol: {
      rol_name: string;
    };
  };