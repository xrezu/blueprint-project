export interface Promoter {
contributions: any;
    id: string;
    name: string;
    contactEmail: string;
  }

  export interface ContributionSubType {
    promoterId: string;
    financialEntityId: string;
    monthlyContributions: number;
  }