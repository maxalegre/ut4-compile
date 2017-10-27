import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';
<<<<<<< HEAD
import { TruthValue } from '../ast/TruthValue';
=======
>>>>>>> ce2386466b2d40d6658634633271535e58e86053

/**
  Representación de las comparaciones por igual.
*/
export class CompareNotEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareNotEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} != ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    this.lhs.compileCIL(context);
    this.lhs.compileCIL(context);
    context.appendInstruction(`ceq`);    
    context.appendInstruction('idc.i4.0')
    context.appendInstruction(`ceq`);
    return context;  
  }

  optimization(state: State): Exp{
    var lhsEval = this.lhs.optimization(state);
    var rhsEval = this.rhs.optimization(state);

    if (lhsEval===rhsEval)
    {
      return new TruthValue(false);
    }

    return new CompareNotEqual(lhsEval,rhsEval);
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
