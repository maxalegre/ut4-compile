import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

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

  maxStackIL(value: number): number {
    return value - 1;
  }
}
