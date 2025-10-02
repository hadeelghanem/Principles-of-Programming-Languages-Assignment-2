import { ClassExp, ProcExp, Exp, Program, CExp, Binding, makeIfExp, makeAppExp,IfExp , BoolExp, makePrimOp, makeVarDecl, makeVarRef, makeBoolExp, makeLitExp, makeProcExp, isNumExp, isBoolExp, isStrExp, isPrimOp, isVarRef, isLitExp, isIfExp, isProcExp, isClassExp, isAppExp, isLetExp, isAtomicExp, isCExp, isDefineExp, makeDefineExp, DefineExp, isProgram, isExp, makeProgram, makeBinding, LetExp, makeLetExp } from "./L3-ast";
import { Result, bind, makeFailure, makeOk, mapResult, mapv } from "../shared/result";
import { map, reduce, reverse } from "ramda";
import { makeSymbolSExp } from "./L3-value";
import { applyEnv } from "./L3-env-env";
/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/
export const isNonEmptyList = <T>(list: T[]): list is [T, ...T[]] => list.length > 0;
export const class2proc = (exp: ClassExp): ProcExp =>{
    //@TODO
return makeProcExp(exp.fields,[makeProcExp([makeVarDecl('msg')],[buildIfExp(exp.methods)])]); }
//elper function 
const buildIfExp = (bindings: Binding[]): IfExp | BoolExp => 
    isNonEmptyList(bindings) ? 
        makeIfExp(makeAppExp(makePrimOp('eq?'), [makeVarRef('msg'), makeLitExp(makeSymbolSExp(bindings[0].var.var))]), 
            makeAppExp(bindings[0].val, []), 
                buildIfExp(bindings.slice(1))) : 
    makeBoolExp(false);
/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>
    //@TODO
isExp(exp) ? lexTransformExp(exp) : 
isProgram(exp) ? mapv(mapResult(lexTransformExp, exp.exps), makeProgram) :
exp;

const lexTransformExp = (exp: Exp): Result<Exp> => 
isCExp(exp) ? lexTransformCExp(exp) :
isDefineExp(exp) ? mapv(lexTransformCExp(exp.val),(val: CExp): DefineExp => makeDefineExp(exp.var, val)):
exp;


const lexTransformCExp = (exp: CExp): Result<CExp> => 
isAtomicExp(exp) ? makeOk(exp) :
isLitExp(exp) ? makeOk(exp) :
isIfExp(exp) ? bind(lexTransformCExp(exp.test), (test: CExp) => 
                    bind(lexTransformCExp(exp.then), (then: CExp) => 
                        mapv(lexTransformCExp(exp.alt), (alt: CExp) => makeIfExp(test, then, alt)))) :
isProcExp(exp) ? mapv(mapResult(lexTransformCExp, exp.body), (body: CExp[]): ProcExp => makeProcExp(exp.args, body)) :
isClassExp(exp) ? makeOk(class2proc(exp)): 
isAppExp(exp) ? bind(lexTransformCExp(exp.rator), (rator: CExp): Result<CExp> => 
                    mapv(mapResult(lexTransformCExp, exp.rands), (rands: CExp[]) => makeAppExp(rator, rands))) :
isLetExp(exp) ? bind(mapResult((b: Binding): Result<Binding> => mapv(lexTransformCExp(b.val),(val: CExp) => 
                    makeBinding(b.var.var, val)), exp.bindings), (bindings: Binding[]) =>
                    mapv(mapResult(lexTransformCExp, exp.body), (body: CExp[]): LetExp => makeLetExp(bindings, body))) :
exp;