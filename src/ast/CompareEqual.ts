import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las comparaciones por igual.
*/
export class CompareEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} == ${this.rhs.unparse()})`;
  }

  

  compileCIL(context: CompilationContext): CompilationContext {
    this.lhs.compileCIL(context);
    this.lhs.compileCIL(context);
    context.appendInstruction(`ceq`);
    return context;  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
