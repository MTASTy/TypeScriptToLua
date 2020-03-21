/** @noSelfInFile */

declare type Coroutine = object;

declare namespace coroutine {
    // noinspection ReservedWordAsName
    function yield(... args: any[]): void;
    function create(arg: any, ...args: any[]): Coroutine;
    /** @tuplereturn */
    function resume(co: Coroutine, ...args: any[]): [boolean, any];
    function status(co: Coroutine): "running" | "suspended" | "normal" | "dead";
    function running(): Coroutine;
    function wrap(callback: Function): Function;
}
