import { Exp, Stmt } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

/**
  Representación de las iteraciones while-do.
*/
export class WhileDo implements Stmt {
  cond: Exp;
  body: Stmt;

  constructor(cond: Exp, body: Stmt) {
    this.cond = cond;
    this.body = body;
  }

  toString(): string {
    return `WhileDo(${this.cond.toString()}, ${this.body.toString()})`;
  }

  unparse(): string {
    return `while ${this.cond.unparse()} do { ${this.body.unparse()} }`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    //si la condicion del while es false cte elminamos el cuerpo del while.
    this.cond.compileCIL(context);

    var tag = context.getTag();
    var tagDo = context.getTag();

    context.appendInstruction(`br.s ${tag}`);

    context.appendInstruction(`${tagDo}: nop`);
    this.body.compileCIL(context);

    context.appendInstruction(`${tag}: nop`);
    context.appendInstruction(`brtrue.s ${tagDo}`);

    return context;
  }

  maxStackIL(value: number): number {
    const maxStackILBody = this.body.maxStackIL(value);
    return 1 + maxStackILBody; // cond + body
  }
}
