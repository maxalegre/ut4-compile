import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

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
<<<<<<< HEAD
    context.appendInstruction(`ldloc ${this.id}`);
=======

    var loc = context.getVar(this.id);
    if(loc!=-1)
    {
      loc = context.addVar(this.id, 'int32');
    }
    context.appendInstruction('ldloc.'+loc);    
>>>>>>> 60b6a07ad7e25bd80b56d0ca418eb335231fd222
    return context;
  }

  maxStackIL(value: number): number {
    return value + 1;
  }
}
