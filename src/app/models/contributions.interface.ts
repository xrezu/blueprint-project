export interface Contribution {
    promoterId: string;
    financialEntityId: string;
    financialEntityName?: string;
    totalAmount: number;
    monthlyContributions: number;
    date: string;
  }
  
  export interface UserContribution {
    userId: string;
    contributions: Contribution[];
    financialEntityId: string;
  }
  
  export interface ContributionsResponse {
    map(arg0: (contribution: { promoterId: string; financialEntityId: string; }) => { promoterName: string | undefined; financialEntityName: string | undefined; promoterId: string; financialEntityId: string; }): any;
    contributions: UserContribution[];
  }