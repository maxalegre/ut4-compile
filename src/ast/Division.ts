import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

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
    var lhsComp = this.lhs.compileCIL(context);
    var rhsComp = this.rhs.compileCIL(context);
    context.appendInstruction(`${lhsComp} ${rhsComp} div`);
    return context;
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
