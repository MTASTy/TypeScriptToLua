function __TS__Async<TResult>(this: void, f: (this: void, ...args: any[]) => TResult): (this: void, ...args: any[]) => Promise<TResult> {
    return (...args: any[]): Promise<TResult> => {
        return new Promise((resolve, reject) => {
            coroutine.wrap(() => {
                let [ok, result] = pcall(f, ...args);

                // Await until result is not promise
                while(type(result) === "table" && result.then) {
                    [ok, result] = pcall(__TS__Await, result);
                }

                if (ok) {
                    resolve(result);
                    return;
                }

                reject(result);
            })()
        });
    };
}
