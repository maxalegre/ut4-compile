import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';
import { Numeral } from '../ast/Numeral';

/**
  Representación de restas.
*/
export class Substraction implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Substraction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} - ${this.rhs.unparse()})`;
  }

  optimization(state: State): Exp {
    var lhsEval = this.lhs.optimization(state);
    var rhsEval = this.rhs.optimization(state);

    if (lhsEval instanceof Numeral && lhsEval.value === 0) {
      return rhsEval;
    }
    if (rhsEval instanceof Numeral && rhsEval.value === 0) {
      return lhsEval;
    }
    if (rhsEval instanceof Numeral && lhsEval instanceof Numeral) {
      return new Numeral(lhsEval.value - rhsEval.value)
    }

    return new Substraction(lhsEval, rhsEval);
  }

  compileCIL(context: CompilationContext): CompilationContext {
    this.lhs.compileCIL(context);
    this.rhs.compileCIL(context);
    context.appendInstruction('sub');
    return context;
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
