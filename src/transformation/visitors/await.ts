import * as ts from "typescript";
import { FunctionVisitor } from "../context/visitors";
import { LuaLibFeature, transformLuaLibFunction } from "../utils/lualib";

export const transformAwaitExpression: FunctionVisitor<ts.AwaitExpression> = (node, context) => {
    const inner = context.transformExpression(node.expression);
    return transformLuaLibFunction(context, LuaLibFeature.Await, undefined, inner);
};
