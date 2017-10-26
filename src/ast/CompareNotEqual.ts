import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

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

  maxStackIL(value: number): number {
    return value - 1;
  }
}
