import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';
<<<<<<< HEAD
import { TruthValue } from '../ast/TruthValue';
=======
>>>>>>> ce2386466b2d40d6658634633271535e58e86053

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareLessOrEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareLessOrEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} <= ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    this.lhs.compileCIL(context);
    this.rhs.compileCIL(context);
    context.appendInstruction('cgt');
    context.appendInstruction('ldc.i4.0');
    context.appendInstruction('ceq');
    return context;
  }

  optimization(state: State): Exp{
    var lhsEval = this.lhs.optimization(state);
    var rhsEval = this.rhs.optimization(state);

    if (lhsEval===rhsEval)
    {
      return new TruthValue(true);
    }

    return new CompareLessOrEqual(lhsEval,rhsEval);
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
