import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

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

  compileCIL(context: CompilationContext): CompilationContext {
    // si el divisor es 0 podemos realizar una eliminacion de codigo
    // 
    var lhsComp = this.lhs.compileCIL(context);
    var rhsComp = this.rhs.compileCIL(context);
    context.appendInstruction(`div`);
    return context;
  }
  optimization(state: State): Exp{
    return undefined
  }
  maxStackIL(value: number): number {
    return value - 1;
  }
}
