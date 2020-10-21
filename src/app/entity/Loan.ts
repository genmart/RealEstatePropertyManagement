export class Loan {
    private loanNumber: number;
    private borrowerName: string;
    private dob: Date;
    private propertyAddress: string;
    private cost: number;
    private floodRisk: string;

    public getLoanNumber(): number {
        return this.loanNumber;
    }
    public setLoanNumber(value: number) {
        this.loanNumber = value;
    }
    public getBorrowerName(): string {
        return this.borrowerName;
    }
    public setBorrowerName(value: string) {
        this.borrowerName = value;
    } 
    public getDob(): Date {
        return this.dob;
    }
    public setDob(value: Date) {
        this.dob = value;
    }
    public getPropertyAddress(): string {
        return this.propertyAddress;
    }
    public setPropertyAddress(value: string) {
        this.propertyAddress = value;
    }
    public getCost(): number {
        return this.cost;
    }
    public setCost(value: number) {
        this.cost = value;
    }
    public getFloodRisk(): string {
        return this.floodRisk;
    }
    public setFloodRisk(value: string) {
        this.floodRisk = value;
    }
    
}

