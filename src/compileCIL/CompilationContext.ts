class VarIL {
  id: string;
  type: string;

  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
  }
}

export class CompilationContext {

  private count: number;
  private vars: VarIL[];
  private cil: string[];

  constructor() {
    this.count = 0;
    this.vars = [];
    this.cil = [];
  }

  getTag(): string {
    return `IL_${this.count++}`;
  }

  addVar(id: string, type: string): number {
    const v = new VarIL(id, type);
    return this.vars.push(v) - 1;
  }

  getVar(id: string): number {
    return this.vars.findIndex((v) => (v.id === id));
  }

  appendInstruction(cil: string) {
    this.cil.push(cil);
  }

  freeVariables(): string {
    return this.vars.map((v) => (`${v.type} ${v.id}`)).join(',\n');
  }

  getCIL(maxStack: number): string {
    var vars = this.vars.map((v) => (`ldstr "${v.type} ${v.id}"\ncall void class [mscorlib]System.Console::WriteLine(string)`)).join('\n');

    var ret = `
    .assembly Main {}
    .assembly extern mscorlib {}
    .method static void Main()
    {
      .entrypoint
      .maxstack ${maxStack}
      .locals(${this.freeVariables()})
      ${this.cil.join('\n')}
      ${vars}\n
      ret
    }
    `

    var fs = require('fs');
    fs.writeFileSync('compileMe.il', ret, 'utf8');
    
    return ret;
  }

}
