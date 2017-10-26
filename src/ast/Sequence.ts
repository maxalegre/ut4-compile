import { Stmt } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las secuencias de sentencias.
*/
export class Sequence implements Stmt {

  statements: [Stmt];

  constructor(statements: [Stmt]) {
    this.statements = statements;
  }

  toString(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(", ");
    return `Sequence(${statements})`
  }

  unparse(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(" ");
    return `{ ${statements} }`
  }

  compileCIL(context: CompilationContext): CompilationContext {
    // si tengo skips los borro en una buena (eliminacion de codigo)
    for (let stmt of this.statements) {
      stmt.compileCIL(context);
    }
    return context;
  }

  maxStackIL(value: number): number {
    for (let stmt of this.statements) {
      value = stmt.maxStackIL(value)
    }
    return value;
  }
}
