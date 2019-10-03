interface SmeupVariable {
  name: string;
  value: string;
}

export default interface SmeupVariables {
  sec?: SmeupVariable[];
  sch?: SmeupVariable[];
  loo?: SmeupVariable[];
}
