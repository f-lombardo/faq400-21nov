import { Vue } from "vue-property-decorator";
import IVariableContext, { ContextType } from "@/interfaces/IVariableContext";
import SmeupVariables from "@/interfaces/SmeupVariables";
import ExpressionEvaluator from "./expressions/ExpressionEvaluator";

export default abstract class VariableContext extends Vue
  implements IVariableContext {
  private variables: {
    [index: string]: string;
  };

  private exprEvaluator = new ExpressionEvaluator();

  constructor() {
    super();
    this.variables = {};
  }

  getAllVariables(): { name: string; value: string }[] {
    return Object.keys(this.variables).map(k => {
      return {
        name: k,
        value: this.variables[k]
      };
    });
  }

  getVariableValue(key: string): string {
    return this.variables[key];
  }

  putVariable(key: string, value: string): void {
    this.variables[key] = value;
  }

  findValue(name: string): string {
    let value = this.variables[name];
    if (value) {
      return value;
    } else {
      const parent = this.getParentVariableContext();
      if (parent) {
        value = parent.findValue(name);
      }
    }

    return value;
  }

  abstract getContextType(): ContextType;

  abstract getVariableContextAnchestors(): VariableContext[];

  findFirstContainingType(ct: ContextType): IVariableContext | null {
    if (ct === this.getContextType()) {
      return this;
    } else {
      const parent = this.getParentVariableContext();
      if (parent) {
        return parent.findFirstContainingType(ct);
      }
    }

    return null;
  }

  findLastContainingType(ct: ContextType): IVariableContext | null {
    const ancestors = this.getVariableContextAnchestors();
    ancestors.reverse();

    let ris = null;
    for (let comp of ancestors) {
      if (ct === comp.getContextType()) {
        ris = comp;
        break;
      }
    }

    return ris;
  }

  protected executeAssignments(assignments: SmeupVariables) {
    if (!assignments) {
      return;
    }

    if (assignments.sec) {
      const context =
        this.getContextType() === ContextType.SCH
          ? this
          : this.findFirstContainingType(ContextType.SCH);

      if (context) {
        assignments.sec.forEach(secAssignment => {
          const evaluatedName = this.exprEvaluator.variableExpression(
            this,
            secAssignment.name
          );

          const evaluatedValue = this.exprEvaluator.variableExpression(
            this,
            secAssignment.value
          );

          context.putVariable(evaluatedName, evaluatedValue);
        });
      }
    }

    if (assignments.sch) {
      const context = this.findLastContainingType(ContextType.SCH);

      if (context) {
        assignments.sch.forEach(schAssignment => {
          const evaluatedName = this.exprEvaluator.variableExpression(
            this,
            schAssignment.name
          );

          const evaluatedValue = this.exprEvaluator.variableExpression(
            this,
            schAssignment.value
          );

          context.putVariable(evaluatedName, evaluatedValue);
        });
      }
    }

    if (assignments.loo) {
      // TODO al momento sono trattate come sch. Andrebbero salvate in local storage (?)
      const context = this.findLastContainingType(ContextType.SCH);
      if (context) {
        assignments.loo.forEach(looAssignment => {
          const evaluatedName = this.exprEvaluator.variableExpression(
            this,
            looAssignment.name
          );

          const evaluatedValue = this.exprEvaluator.variableExpression(
            this,
            looAssignment.value
          );

          context.putVariable(evaluatedName, evaluatedValue);
        });
      }
    }
  }

  abstract getParentVariableContext(): IVariableContext | null;
}
