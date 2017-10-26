import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

/**
  Representación de usos de variable en expresiones.
*/
export class Variable implements Exp {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  toString(): string {
    return `Variable(${this.id})`;
  }

  unparse(): string {
    return this.id;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    var loc = context.getVar(this.id);
    if (loc == -1) {
      loc = context.addVar(this.id, 'int32');
    }
    context.appendInstruction('ldloc.' + loc);
    return context;
  }

  maxStackIL(value: number): number {
    return value + 1;
  }
}
