export class Policy {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public startValidity: string,
    public coverPeriod: string,
    public price: string,
    public coverageId: string,
    public riskId: string,
  ) {}
}
