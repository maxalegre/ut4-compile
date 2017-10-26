import { CompilationContext } from '../compileCIL/CompilationContext';
import { State } from '../interpreter/state';

export interface ASTNode {
  toString(): string;
  unparse(): string;
}

/**
  Categoría sintáctica de las expresiones de While, las
  construcciones del lenguaje que evalúan a un valor.
*/
export interface Exp extends ASTNode {

  compileCIL(context: CompilationContext): CompilationContext;
  maxStackIL(value: number): number;
  optimization(state: State): Exp;

}

/**
  Categoría sintáctica de las sentencias (statements) de While, las
  construcciones del lenguaje que modifican (potencialmente) los
  valores de las variables en el estado del programa.
*/
export interface Stmt extends ASTNode {

  compileCIL(context: CompilationContext): CompilationContext;
  maxStackIL(value: number): number;
  optimization(state: State): Stmt;
  

}
