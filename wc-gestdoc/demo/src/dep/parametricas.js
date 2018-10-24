const TIPOS_GESTOR_DOCUMENTAL = {PLANO: 'plano', ARBOL: 'arbol'}
const RUTAS_TAREAS ={
    //Tramitación
    TN116RIS: 'instrumentacion',
    TN115RG2: 'verificacionRegistral',
    //Formalización
    TN412R1C: 'gestionCargasPrevias',
    TN395SCD: 'ofertaVinculante',
    TN413RMP: 'cuadreMediosPago',
    TN414RVB: 'informeViabilidad',
    TN417RCK: 'gestionCheques',
    TN630GED: 'gestionEscrituraDefectuosa',
    TN411RP0: 'provisionFondos',
    TN419RFS: 'formalizacion',
    TN650INV: 'informeValoracion',
    TN415RD4: 'documentacion',
    TN396CDE: 'certificadoDeuda',
    TN397ENE: 'enervacionSubrogacion',
    //Post-Formalización
    TN665COF: 'cotejoFinal',
    TN635PFV: 'gestionProvisionVendedor',
    TN655AHG: 'gestionAbonoHonorarios',
    TN625GIR: 'gestionInscripcionRegistro',
    TN640GOP: 'gestionOtrosPagos',
    TN615GPI: 'gestionPagoImpuestos',
    TN620GPR: 'gestionPagoRegistro',
    TN645GPF: 'ampliacionProvisionFondos',
    TN660LPF: 'liquidacionProvisionFondos',
    TN610GAN: 'gestionPagoNotario',
    TN605RCP: 'resolucionCargasPrevias',
    TN600CPF: 'cotejoCiego',
    TN450RD6: 'documentacionPF'
}
const TAREAS_USAN_GESTOR_DOCUMENTAL = {
    TN115RG2: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    //Formalización
    TN412R1C: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN395SCD: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN630GED: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN650INV: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN396CDE: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN397ENE: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    //Post-Formalización
    TN655AHG: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN625GIR: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN640GOP: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN615GPI: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN620GPR: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN645GPF: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN610GAN: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN605RCP: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN600CPF: TIPOS_GESTOR_DOCUMENTAL.PLANO,
    TN450RD6: TIPOS_GESTOR_DOCUMENTAL.ARBOL,
    TN415RD4: TIPOS_GESTOR_DOCUMENTAL.ARBOL,
}

export {RUTAS_TAREAS, TAREAS_USAN_GESTOR_DOCUMENTAL, TIPOS_GESTOR_DOCUMENTAL}