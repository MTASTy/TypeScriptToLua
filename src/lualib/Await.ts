function __TS__Await<T>(this: void, value: Promise<T>): T {
    const isPromise = type(value) === "table" && value.then;
    if (!isPromise) {
        return value as any;
    }

    let result: any = undefined;
    let errorMessage: string | undefined = undefined;

    if ((value as any).state === 0) {
        const co = coroutine.running();
        value.then(v => { result = v }).catch(v => { errorMessage = v }).finally(() => { coroutine.resume(co) });
        coroutine.yield();
    }

    if ((value as any).state === 1) {
        result = (value as any).value;
    }

    if ((value as any).state === 2) {
        errorMessage = (value as any).reason;
    }

    if (errorMessage) {
        return error(errorMessage, 0);
    }

    return result;
}
