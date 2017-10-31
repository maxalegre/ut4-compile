import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';
import { Numeral } from '../ast/Numeral';

/**
  Representación de multiplicaciones.
*/
export class Division implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Division(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} / ${this.rhs.unparse()})`;
  }

  optimization(state: State): Exp {
    var lhsEval = this.lhs.optimization(state);
    var rhsEval = this.rhs.optimization(state);

    if (rhsEval instanceof Numeral && lhsEval instanceof Numeral) {
      return new Numeral(lhsEval.value / rhsEval.value)
    }
    
    return new Division(lhsEval, rhsEval);
  }

  compileCIL(context: CompilationContext): CompilationContext {
    // si el divisor es 0 podemos realizar una eliminacion de codigo
    // 
    var lhsComp = this.lhs.compileCIL(context);
    var rhsComp = this.rhs.compileCIL(context);
    context.appendInstruction(`div`);
    return context;
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
