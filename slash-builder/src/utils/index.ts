export type NOT<T extends boolean> = T extends true ? false : true;

export type Update<T, TUpdate> =
	& {
		[K in Exclude<keyof T, keyof TUpdate>]: T[K];
	}
	& TUpdate;

export type Simplify<T> =
	& {
		[K in keyof T]: T[K];
	}
	& {};

export type SimplifyMappedType<T> = [T] extends [unknown] ? T : never;

export type Assume<T, U> = T extends U ? T : U;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

export type Nullable<
    T extends any,
    CanBeNull extends boolean,
> = CanBeNull extends true ? T | null : T;

export type DefaultBool<
    T extends boolean | undefined,
    D extends boolean,
> = T extends undefined ? D : NonNullable<T>;