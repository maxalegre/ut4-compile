import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

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

  maxStackIL(value: number): number {
    return value - 1;
  }
}
