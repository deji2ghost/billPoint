interface Billed{
    billedFrom: string
    billedTo: string
}
interface service{
    serviceProviderPlace: string
    serviceProviderLocation: string
    serviceProviderNumber : string,
    patientDetails : string,
    patientDetailsNumber : string
}

export const billed: Billed = {
    billedFrom : 'Hospital test',
    billedTo : 'Emmnual Afolabi'
}

export const service: service = {
    serviceProviderPlace : 'Hospital Test',
    serviceProviderLocation : 'Lekki, Lagos Nigeria',
    serviceProviderNumber : '08132556677',
    patientDetails : 'Emmanuel Afolabi',
    patientDetailsNumber : '08132556677'
}