  export interface IInterview {
    id: string;
    company: string;
    vacancyLink: string;
    hrName: string;
    contactTelegram?: string;
    contactWhatsApp?: string;
    contactPhone?: string;
    createdAt: Date;
    salary_from?: number;
    salary_to?: number;
    stages?: IStage[];
    result: 'Refusal' | 'Offer'
  }

  export interface IStage {
    name: string;
    description: string;
    date: null | Date;
  }
