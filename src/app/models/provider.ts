export interface Provider {
    id: number | null;              
    tradeName: string;       
    tid: string;             
    phoneNumber: string;     
    email: string;           
    website: string;         
    address: string;         
    country: string;         
    anualRevenue: number;    
    lastEditedDate?: Date; 
}