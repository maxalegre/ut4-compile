import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Disjunction implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Disjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} || ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    this.lhs.compileCIL(context);
    this.rhs.compileCIL(context);
    context.appendInstruction('or');
    return context;
  }

  optimization(): Exp {
    return undefined;
  }

  maxStackIL(value: number): number {
    return value - 1;
  }
}
