import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';
<<<<<<< HEAD
import { Numeral } from '../ast/Numeral';
=======
>>>>>>> ce2386466b2d40d6658634633271535e58e86053


export class Multiplication implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Multiplication(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} * ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    var lhsComp = this.lhs.compileCIL(context);
    var rhsComp = this.rhs.compileCIL(context);
    context.appendInstruction(`mul`);
    return context;
  }
  optimization(state: State): Exp{
    var lhsEval = this.lhs.optimization(state);
    var rhsEval = this.rhs.optimization(state);

    
    if((lhsEval instanceof Numeral && lhsEval.value===0) || (rhsEval instanceof Numeral && rhsEval.value===0))
    {
        return new Numeral(0);
    }

    if(lhsEval instanceof Numeral && lhsEval.value===1)
    {
        return rhsEval;
    }

    if(rhsEval instanceof Numeral && rhsEval.value===1)
    {
        return lhsEval;
    }

    if(rhsEval instanceof Numeral && lhsEval instanceof Numeral)
    {
      return new Numeral(lhsEval.value*rhsEval.value)
    }

    return new Multiplication(lhsEval,rhsEval);
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
