import { Exp, Stmt } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las sentencias condicionales.
*/
export class IfThen implements Stmt {
  cond: Exp;
  thenBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
  }

  toString(): string {
    return `IfThen(${this.cond.toString()}, ${this.thenBody.toString()})`;
  }

  unparse(): string {
    return `if ${this.cond.unparse()} then { ${this.thenBody.unparse()} }`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    // si la condicion del if es false podemos obviar el cuerpo del if
    this.cond.compileCIL(context);
    var tag = context.getTag();
    context.appendInstruction(`brfalse.s ${tag}`);
    this.thenBody.compileCIL(context);
    context.appendInstruction(`${tag}: nop`);
    return context;
  }

  maxStackIL(value: number): number {
    const maxStackILThen = this.thenBody.maxStackIL(value);
    return 1 + maxStackILThen; // cond + then
  }
}
