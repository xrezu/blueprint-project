export interface Contribution {
    promoterId: string;
    financialEntityId: string;
    totalAmount: number;
    monthlyContributions: number;
    date: string;
  }
  
  export interface UserContribution {
    userId: string;
    contributions: Contribution[];
  }
  
  export interface ContributionsResponse {
    contributions: UserContribution[];
  }