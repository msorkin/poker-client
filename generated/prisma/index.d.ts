
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Hand
 * 
 */
export type Hand = $Result.DefaultSelection<Prisma.$HandPayload>
/**
 * Model TableSession
 * 
 */
export type TableSession = $Result.DefaultSelection<Prisma.$TableSessionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hand`: Exposes CRUD operations for the **Hand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hands
    * const hands = await prisma.hand.findMany()
    * ```
    */
  get hand(): Prisma.HandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tableSession`: Exposes CRUD operations for the **TableSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TableSessions
    * const tableSessions = await prisma.tableSession.findMany()
    * ```
    */
  get tableSession(): Prisma.TableSessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Game: 'Game',
    Hand: 'Hand',
    TableSession: 'TableSession'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "game" | "hand" | "tableSession"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Hand: {
        payload: Prisma.$HandPayload<ExtArgs>
        fields: Prisma.HandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>
          }
          findFirst: {
            args: Prisma.HandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>
          }
          findMany: {
            args: Prisma.HandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>[]
          }
          create: {
            args: Prisma.HandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>
          }
          createMany: {
            args: Prisma.HandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>[]
          }
          delete: {
            args: Prisma.HandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>
          }
          update: {
            args: Prisma.HandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>
          }
          deleteMany: {
            args: Prisma.HandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>[]
          }
          upsert: {
            args: Prisma.HandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HandPayload>
          }
          aggregate: {
            args: Prisma.HandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHand>
          }
          groupBy: {
            args: Prisma.HandGroupByArgs<ExtArgs>
            result: $Utils.Optional<HandGroupByOutputType>[]
          }
          count: {
            args: Prisma.HandCountArgs<ExtArgs>
            result: $Utils.Optional<HandCountAggregateOutputType> | number
          }
        }
      }
      TableSession: {
        payload: Prisma.$TableSessionPayload<ExtArgs>
        fields: Prisma.TableSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TableSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TableSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>
          }
          findFirst: {
            args: Prisma.TableSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TableSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>
          }
          findMany: {
            args: Prisma.TableSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>[]
          }
          create: {
            args: Prisma.TableSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>
          }
          createMany: {
            args: Prisma.TableSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TableSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>[]
          }
          delete: {
            args: Prisma.TableSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>
          }
          update: {
            args: Prisma.TableSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>
          }
          deleteMany: {
            args: Prisma.TableSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TableSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TableSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>[]
          }
          upsert: {
            args: Prisma.TableSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableSessionPayload>
          }
          aggregate: {
            args: Prisma.TableSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTableSession>
          }
          groupBy: {
            args: Prisma.TableSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TableSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TableSessionCountArgs<ExtArgs>
            result: $Utils.Optional<TableSessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    game?: GameOmit
    hand?: HandOmit
    tableSession?: TableSessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableSessionWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    hands: number
    sessions: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hands?: boolean | GameCountOutputTypeCountHandsArgs
    sessions?: boolean | GameCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountHandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HandWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    passwordHash: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    passwordHash: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "passwordHash" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$TableSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      passwordHash: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    where?: TableSessionWhereInput
    orderBy?: TableSessionOrderByWithRelationInput | TableSessionOrderByWithRelationInput[]
    cursor?: TableSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableSessionScalarFieldEnum | TableSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    status: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    status: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    createdAt: number
    status: number
    _all: number
  }


  export type GameMinAggregateInputType = {
    id?: true
    createdAt?: true
    status?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    createdAt?: true
    status?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    createdAt?: true
    status?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    createdAt: Date
    status: string
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    status?: boolean
    hands?: boolean | Game$handsArgs<ExtArgs>
    sessions?: boolean | Game$sessionsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    createdAt?: boolean
    status?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "status", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hands?: boolean | Game$handsArgs<ExtArgs>
    sessions?: boolean | Game$sessionsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      hands: Prisma.$HandPayload<ExtArgs>[]
      sessions: Prisma.$TableSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      status: string
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hands<T extends Game$handsArgs<ExtArgs> = {}>(args?: Subset<T, Game$handsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Game$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Game$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly status: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.hands
   */
  export type Game$handsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    where?: HandWhereInput
    orderBy?: HandOrderByWithRelationInput | HandOrderByWithRelationInput[]
    cursor?: HandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HandScalarFieldEnum | HandScalarFieldEnum[]
  }

  /**
   * Game.sessions
   */
  export type Game$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    where?: TableSessionWhereInput
    orderBy?: TableSessionOrderByWithRelationInput | TableSessionOrderByWithRelationInput[]
    cursor?: TableSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableSessionScalarFieldEnum | TableSessionScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Hand
   */

  export type AggregateHand = {
    _count: HandCountAggregateOutputType | null
    _avg: HandAvgAggregateOutputType | null
    _sum: HandSumAggregateOutputType | null
    _min: HandMinAggregateOutputType | null
    _max: HandMaxAggregateOutputType | null
  }

  export type HandAvgAggregateOutputType = {
    handNumber: number | null
  }

  export type HandSumAggregateOutputType = {
    handNumber: number | null
  }

  export type HandMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    handNumber: number | null
    state: string | null
    createdAt: Date | null
  }

  export type HandMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    handNumber: number | null
    state: string | null
    createdAt: Date | null
  }

  export type HandCountAggregateOutputType = {
    id: number
    gameId: number
    handNumber: number
    state: number
    createdAt: number
    _all: number
  }


  export type HandAvgAggregateInputType = {
    handNumber?: true
  }

  export type HandSumAggregateInputType = {
    handNumber?: true
  }

  export type HandMinAggregateInputType = {
    id?: true
    gameId?: true
    handNumber?: true
    state?: true
    createdAt?: true
  }

  export type HandMaxAggregateInputType = {
    id?: true
    gameId?: true
    handNumber?: true
    state?: true
    createdAt?: true
  }

  export type HandCountAggregateInputType = {
    id?: true
    gameId?: true
    handNumber?: true
    state?: true
    createdAt?: true
    _all?: true
  }

  export type HandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hand to aggregate.
     */
    where?: HandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hands to fetch.
     */
    orderBy?: HandOrderByWithRelationInput | HandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hands
    **/
    _count?: true | HandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HandMaxAggregateInputType
  }

  export type GetHandAggregateType<T extends HandAggregateArgs> = {
        [P in keyof T & keyof AggregateHand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHand[P]>
      : GetScalarType<T[P], AggregateHand[P]>
  }




  export type HandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HandWhereInput
    orderBy?: HandOrderByWithAggregationInput | HandOrderByWithAggregationInput[]
    by: HandScalarFieldEnum[] | HandScalarFieldEnum
    having?: HandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HandCountAggregateInputType | true
    _avg?: HandAvgAggregateInputType
    _sum?: HandSumAggregateInputType
    _min?: HandMinAggregateInputType
    _max?: HandMaxAggregateInputType
  }

  export type HandGroupByOutputType = {
    id: string
    gameId: string
    handNumber: number
    state: string
    createdAt: Date
    _count: HandCountAggregateOutputType | null
    _avg: HandAvgAggregateOutputType | null
    _sum: HandSumAggregateOutputType | null
    _min: HandMinAggregateOutputType | null
    _max: HandMaxAggregateOutputType | null
  }

  type GetHandGroupByPayload<T extends HandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HandGroupByOutputType[P]>
            : GetScalarType<T[P], HandGroupByOutputType[P]>
        }
      >
    >


  export type HandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    handNumber?: boolean
    state?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hand"]>

  export type HandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    handNumber?: boolean
    state?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hand"]>

  export type HandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    handNumber?: boolean
    state?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hand"]>

  export type HandSelectScalar = {
    id?: boolean
    gameId?: boolean
    handNumber?: boolean
    state?: boolean
    createdAt?: boolean
  }

  export type HandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "handNumber" | "state" | "createdAt", ExtArgs["result"]["hand"]>
  export type HandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type HandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type HandIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $HandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hand"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      handNumber: number
      state: string
      createdAt: Date
    }, ExtArgs["result"]["hand"]>
    composites: {}
  }

  type HandGetPayload<S extends boolean | null | undefined | HandDefaultArgs> = $Result.GetResult<Prisma.$HandPayload, S>

  type HandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HandCountAggregateInputType | true
    }

  export interface HandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hand'], meta: { name: 'Hand' } }
    /**
     * Find zero or one Hand that matches the filter.
     * @param {HandFindUniqueArgs} args - Arguments to find a Hand
     * @example
     * // Get one Hand
     * const hand = await prisma.hand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HandFindUniqueArgs>(args: SelectSubset<T, HandFindUniqueArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HandFindUniqueOrThrowArgs} args - Arguments to find a Hand
     * @example
     * // Get one Hand
     * const hand = await prisma.hand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HandFindUniqueOrThrowArgs>(args: SelectSubset<T, HandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandFindFirstArgs} args - Arguments to find a Hand
     * @example
     * // Get one Hand
     * const hand = await prisma.hand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HandFindFirstArgs>(args?: SelectSubset<T, HandFindFirstArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandFindFirstOrThrowArgs} args - Arguments to find a Hand
     * @example
     * // Get one Hand
     * const hand = await prisma.hand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HandFindFirstOrThrowArgs>(args?: SelectSubset<T, HandFindFirstOrThrowArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hands
     * const hands = await prisma.hand.findMany()
     * 
     * // Get first 10 Hands
     * const hands = await prisma.hand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const handWithIdOnly = await prisma.hand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HandFindManyArgs>(args?: SelectSubset<T, HandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hand.
     * @param {HandCreateArgs} args - Arguments to create a Hand.
     * @example
     * // Create one Hand
     * const Hand = await prisma.hand.create({
     *   data: {
     *     // ... data to create a Hand
     *   }
     * })
     * 
     */
    create<T extends HandCreateArgs>(args: SelectSubset<T, HandCreateArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hands.
     * @param {HandCreateManyArgs} args - Arguments to create many Hands.
     * @example
     * // Create many Hands
     * const hand = await prisma.hand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HandCreateManyArgs>(args?: SelectSubset<T, HandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hands and returns the data saved in the database.
     * @param {HandCreateManyAndReturnArgs} args - Arguments to create many Hands.
     * @example
     * // Create many Hands
     * const hand = await prisma.hand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hands and only return the `id`
     * const handWithIdOnly = await prisma.hand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HandCreateManyAndReturnArgs>(args?: SelectSubset<T, HandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hand.
     * @param {HandDeleteArgs} args - Arguments to delete one Hand.
     * @example
     * // Delete one Hand
     * const Hand = await prisma.hand.delete({
     *   where: {
     *     // ... filter to delete one Hand
     *   }
     * })
     * 
     */
    delete<T extends HandDeleteArgs>(args: SelectSubset<T, HandDeleteArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hand.
     * @param {HandUpdateArgs} args - Arguments to update one Hand.
     * @example
     * // Update one Hand
     * const hand = await prisma.hand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HandUpdateArgs>(args: SelectSubset<T, HandUpdateArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hands.
     * @param {HandDeleteManyArgs} args - Arguments to filter Hands to delete.
     * @example
     * // Delete a few Hands
     * const { count } = await prisma.hand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HandDeleteManyArgs>(args?: SelectSubset<T, HandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hands
     * const hand = await prisma.hand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HandUpdateManyArgs>(args: SelectSubset<T, HandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hands and returns the data updated in the database.
     * @param {HandUpdateManyAndReturnArgs} args - Arguments to update many Hands.
     * @example
     * // Update many Hands
     * const hand = await prisma.hand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hands and only return the `id`
     * const handWithIdOnly = await prisma.hand.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HandUpdateManyAndReturnArgs>(args: SelectSubset<T, HandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hand.
     * @param {HandUpsertArgs} args - Arguments to update or create a Hand.
     * @example
     * // Update or create a Hand
     * const hand = await prisma.hand.upsert({
     *   create: {
     *     // ... data to create a Hand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hand we want to update
     *   }
     * })
     */
    upsert<T extends HandUpsertArgs>(args: SelectSubset<T, HandUpsertArgs<ExtArgs>>): Prisma__HandClient<$Result.GetResult<Prisma.$HandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandCountArgs} args - Arguments to filter Hands to count.
     * @example
     * // Count the number of Hands
     * const count = await prisma.hand.count({
     *   where: {
     *     // ... the filter for the Hands we want to count
     *   }
     * })
    **/
    count<T extends HandCountArgs>(
      args?: Subset<T, HandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HandAggregateArgs>(args: Subset<T, HandAggregateArgs>): Prisma.PrismaPromise<GetHandAggregateType<T>>

    /**
     * Group by Hand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HandGroupByArgs['orderBy'] }
        : { orderBy?: HandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hand model
   */
  readonly fields: HandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hand model
   */
  interface HandFieldRefs {
    readonly id: FieldRef<"Hand", 'String'>
    readonly gameId: FieldRef<"Hand", 'String'>
    readonly handNumber: FieldRef<"Hand", 'Int'>
    readonly state: FieldRef<"Hand", 'String'>
    readonly createdAt: FieldRef<"Hand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Hand findUnique
   */
  export type HandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * Filter, which Hand to fetch.
     */
    where: HandWhereUniqueInput
  }

  /**
   * Hand findUniqueOrThrow
   */
  export type HandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * Filter, which Hand to fetch.
     */
    where: HandWhereUniqueInput
  }

  /**
   * Hand findFirst
   */
  export type HandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * Filter, which Hand to fetch.
     */
    where?: HandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hands to fetch.
     */
    orderBy?: HandOrderByWithRelationInput | HandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hands.
     */
    cursor?: HandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hands.
     */
    distinct?: HandScalarFieldEnum | HandScalarFieldEnum[]
  }

  /**
   * Hand findFirstOrThrow
   */
  export type HandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * Filter, which Hand to fetch.
     */
    where?: HandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hands to fetch.
     */
    orderBy?: HandOrderByWithRelationInput | HandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hands.
     */
    cursor?: HandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hands.
     */
    distinct?: HandScalarFieldEnum | HandScalarFieldEnum[]
  }

  /**
   * Hand findMany
   */
  export type HandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * Filter, which Hands to fetch.
     */
    where?: HandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hands to fetch.
     */
    orderBy?: HandOrderByWithRelationInput | HandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hands.
     */
    cursor?: HandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hands.
     */
    skip?: number
    distinct?: HandScalarFieldEnum | HandScalarFieldEnum[]
  }

  /**
   * Hand create
   */
  export type HandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * The data needed to create a Hand.
     */
    data: XOR<HandCreateInput, HandUncheckedCreateInput>
  }

  /**
   * Hand createMany
   */
  export type HandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hands.
     */
    data: HandCreateManyInput | HandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hand createManyAndReturn
   */
  export type HandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * The data used to create many Hands.
     */
    data: HandCreateManyInput | HandCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hand update
   */
  export type HandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * The data needed to update a Hand.
     */
    data: XOR<HandUpdateInput, HandUncheckedUpdateInput>
    /**
     * Choose, which Hand to update.
     */
    where: HandWhereUniqueInput
  }

  /**
   * Hand updateMany
   */
  export type HandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hands.
     */
    data: XOR<HandUpdateManyMutationInput, HandUncheckedUpdateManyInput>
    /**
     * Filter which Hands to update
     */
    where?: HandWhereInput
    /**
     * Limit how many Hands to update.
     */
    limit?: number
  }

  /**
   * Hand updateManyAndReturn
   */
  export type HandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * The data used to update Hands.
     */
    data: XOR<HandUpdateManyMutationInput, HandUncheckedUpdateManyInput>
    /**
     * Filter which Hands to update
     */
    where?: HandWhereInput
    /**
     * Limit how many Hands to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hand upsert
   */
  export type HandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * The filter to search for the Hand to update in case it exists.
     */
    where: HandWhereUniqueInput
    /**
     * In case the Hand found by the `where` argument doesn't exist, create a new Hand with this data.
     */
    create: XOR<HandCreateInput, HandUncheckedCreateInput>
    /**
     * In case the Hand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HandUpdateInput, HandUncheckedUpdateInput>
  }

  /**
   * Hand delete
   */
  export type HandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
    /**
     * Filter which Hand to delete.
     */
    where: HandWhereUniqueInput
  }

  /**
   * Hand deleteMany
   */
  export type HandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hands to delete
     */
    where?: HandWhereInput
    /**
     * Limit how many Hands to delete.
     */
    limit?: number
  }

  /**
   * Hand without action
   */
  export type HandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hand
     */
    select?: HandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hand
     */
    omit?: HandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HandInclude<ExtArgs> | null
  }


  /**
   * Model TableSession
   */

  export type AggregateTableSession = {
    _count: TableSessionCountAggregateOutputType | null
    _min: TableSessionMinAggregateOutputType | null
    _max: TableSessionMaxAggregateOutputType | null
  }

  export type TableSessionMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    playerId: string | null
    joinedAt: Date | null
  }

  export type TableSessionMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    playerId: string | null
    joinedAt: Date | null
  }

  export type TableSessionCountAggregateOutputType = {
    id: number
    gameId: number
    playerId: number
    joinedAt: number
    _all: number
  }


  export type TableSessionMinAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    joinedAt?: true
  }

  export type TableSessionMaxAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    joinedAt?: true
  }

  export type TableSessionCountAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    joinedAt?: true
    _all?: true
  }

  export type TableSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TableSession to aggregate.
     */
    where?: TableSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableSessions to fetch.
     */
    orderBy?: TableSessionOrderByWithRelationInput | TableSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TableSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TableSessions
    **/
    _count?: true | TableSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TableSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TableSessionMaxAggregateInputType
  }

  export type GetTableSessionAggregateType<T extends TableSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateTableSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTableSession[P]>
      : GetScalarType<T[P], AggregateTableSession[P]>
  }




  export type TableSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableSessionWhereInput
    orderBy?: TableSessionOrderByWithAggregationInput | TableSessionOrderByWithAggregationInput[]
    by: TableSessionScalarFieldEnum[] | TableSessionScalarFieldEnum
    having?: TableSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TableSessionCountAggregateInputType | true
    _min?: TableSessionMinAggregateInputType
    _max?: TableSessionMaxAggregateInputType
  }

  export type TableSessionGroupByOutputType = {
    id: string
    gameId: string
    playerId: string
    joinedAt: Date
    _count: TableSessionCountAggregateOutputType | null
    _min: TableSessionMinAggregateOutputType | null
    _max: TableSessionMaxAggregateOutputType | null
  }

  type GetTableSessionGroupByPayload<T extends TableSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TableSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TableSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableSessionGroupByOutputType[P]>
            : GetScalarType<T[P], TableSessionGroupByOutputType[P]>
        }
      >
    >


  export type TableSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    joinedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tableSession"]>

  export type TableSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    joinedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tableSession"]>

  export type TableSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    joinedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tableSession"]>

  export type TableSessionSelectScalar = {
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    joinedAt?: boolean
  }

  export type TableSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "playerId" | "joinedAt", ExtArgs["result"]["tableSession"]>
  export type TableSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TableSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TableSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TableSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TableSession"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      player: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      playerId: string
      joinedAt: Date
    }, ExtArgs["result"]["tableSession"]>
    composites: {}
  }

  type TableSessionGetPayload<S extends boolean | null | undefined | TableSessionDefaultArgs> = $Result.GetResult<Prisma.$TableSessionPayload, S>

  type TableSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TableSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TableSessionCountAggregateInputType | true
    }

  export interface TableSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TableSession'], meta: { name: 'TableSession' } }
    /**
     * Find zero or one TableSession that matches the filter.
     * @param {TableSessionFindUniqueArgs} args - Arguments to find a TableSession
     * @example
     * // Get one TableSession
     * const tableSession = await prisma.tableSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableSessionFindUniqueArgs>(args: SelectSubset<T, TableSessionFindUniqueArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TableSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TableSessionFindUniqueOrThrowArgs} args - Arguments to find a TableSession
     * @example
     * // Get one TableSession
     * const tableSession = await prisma.tableSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, TableSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TableSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionFindFirstArgs} args - Arguments to find a TableSession
     * @example
     * // Get one TableSession
     * const tableSession = await prisma.tableSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableSessionFindFirstArgs>(args?: SelectSubset<T, TableSessionFindFirstArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TableSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionFindFirstOrThrowArgs} args - Arguments to find a TableSession
     * @example
     * // Get one TableSession
     * const tableSession = await prisma.tableSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, TableSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TableSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TableSessions
     * const tableSessions = await prisma.tableSession.findMany()
     * 
     * // Get first 10 TableSessions
     * const tableSessions = await prisma.tableSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tableSessionWithIdOnly = await prisma.tableSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TableSessionFindManyArgs>(args?: SelectSubset<T, TableSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TableSession.
     * @param {TableSessionCreateArgs} args - Arguments to create a TableSession.
     * @example
     * // Create one TableSession
     * const TableSession = await prisma.tableSession.create({
     *   data: {
     *     // ... data to create a TableSession
     *   }
     * })
     * 
     */
    create<T extends TableSessionCreateArgs>(args: SelectSubset<T, TableSessionCreateArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TableSessions.
     * @param {TableSessionCreateManyArgs} args - Arguments to create many TableSessions.
     * @example
     * // Create many TableSessions
     * const tableSession = await prisma.tableSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TableSessionCreateManyArgs>(args?: SelectSubset<T, TableSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TableSessions and returns the data saved in the database.
     * @param {TableSessionCreateManyAndReturnArgs} args - Arguments to create many TableSessions.
     * @example
     * // Create many TableSessions
     * const tableSession = await prisma.tableSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TableSessions and only return the `id`
     * const tableSessionWithIdOnly = await prisma.tableSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TableSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, TableSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TableSession.
     * @param {TableSessionDeleteArgs} args - Arguments to delete one TableSession.
     * @example
     * // Delete one TableSession
     * const TableSession = await prisma.tableSession.delete({
     *   where: {
     *     // ... filter to delete one TableSession
     *   }
     * })
     * 
     */
    delete<T extends TableSessionDeleteArgs>(args: SelectSubset<T, TableSessionDeleteArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TableSession.
     * @param {TableSessionUpdateArgs} args - Arguments to update one TableSession.
     * @example
     * // Update one TableSession
     * const tableSession = await prisma.tableSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TableSessionUpdateArgs>(args: SelectSubset<T, TableSessionUpdateArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TableSessions.
     * @param {TableSessionDeleteManyArgs} args - Arguments to filter TableSessions to delete.
     * @example
     * // Delete a few TableSessions
     * const { count } = await prisma.tableSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TableSessionDeleteManyArgs>(args?: SelectSubset<T, TableSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TableSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TableSessions
     * const tableSession = await prisma.tableSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TableSessionUpdateManyArgs>(args: SelectSubset<T, TableSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TableSessions and returns the data updated in the database.
     * @param {TableSessionUpdateManyAndReturnArgs} args - Arguments to update many TableSessions.
     * @example
     * // Update many TableSessions
     * const tableSession = await prisma.tableSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TableSessions and only return the `id`
     * const tableSessionWithIdOnly = await prisma.tableSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TableSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, TableSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TableSession.
     * @param {TableSessionUpsertArgs} args - Arguments to update or create a TableSession.
     * @example
     * // Update or create a TableSession
     * const tableSession = await prisma.tableSession.upsert({
     *   create: {
     *     // ... data to create a TableSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TableSession we want to update
     *   }
     * })
     */
    upsert<T extends TableSessionUpsertArgs>(args: SelectSubset<T, TableSessionUpsertArgs<ExtArgs>>): Prisma__TableSessionClient<$Result.GetResult<Prisma.$TableSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TableSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionCountArgs} args - Arguments to filter TableSessions to count.
     * @example
     * // Count the number of TableSessions
     * const count = await prisma.tableSession.count({
     *   where: {
     *     // ... the filter for the TableSessions we want to count
     *   }
     * })
    **/
    count<T extends TableSessionCountArgs>(
      args?: Subset<T, TableSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TableSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TableSessionAggregateArgs>(args: Subset<T, TableSessionAggregateArgs>): Prisma.PrismaPromise<GetTableSessionAggregateType<T>>

    /**
     * Group by TableSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TableSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableSessionGroupByArgs['orderBy'] }
        : { orderBy?: TableSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TableSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TableSession model
   */
  readonly fields: TableSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TableSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    player<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TableSession model
   */
  interface TableSessionFieldRefs {
    readonly id: FieldRef<"TableSession", 'String'>
    readonly gameId: FieldRef<"TableSession", 'String'>
    readonly playerId: FieldRef<"TableSession", 'String'>
    readonly joinedAt: FieldRef<"TableSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TableSession findUnique
   */
  export type TableSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * Filter, which TableSession to fetch.
     */
    where: TableSessionWhereUniqueInput
  }

  /**
   * TableSession findUniqueOrThrow
   */
  export type TableSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * Filter, which TableSession to fetch.
     */
    where: TableSessionWhereUniqueInput
  }

  /**
   * TableSession findFirst
   */
  export type TableSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * Filter, which TableSession to fetch.
     */
    where?: TableSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableSessions to fetch.
     */
    orderBy?: TableSessionOrderByWithRelationInput | TableSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TableSessions.
     */
    cursor?: TableSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TableSessions.
     */
    distinct?: TableSessionScalarFieldEnum | TableSessionScalarFieldEnum[]
  }

  /**
   * TableSession findFirstOrThrow
   */
  export type TableSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * Filter, which TableSession to fetch.
     */
    where?: TableSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableSessions to fetch.
     */
    orderBy?: TableSessionOrderByWithRelationInput | TableSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TableSessions.
     */
    cursor?: TableSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TableSessions.
     */
    distinct?: TableSessionScalarFieldEnum | TableSessionScalarFieldEnum[]
  }

  /**
   * TableSession findMany
   */
  export type TableSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * Filter, which TableSessions to fetch.
     */
    where?: TableSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableSessions to fetch.
     */
    orderBy?: TableSessionOrderByWithRelationInput | TableSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TableSessions.
     */
    cursor?: TableSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableSessions.
     */
    skip?: number
    distinct?: TableSessionScalarFieldEnum | TableSessionScalarFieldEnum[]
  }

  /**
   * TableSession create
   */
  export type TableSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a TableSession.
     */
    data: XOR<TableSessionCreateInput, TableSessionUncheckedCreateInput>
  }

  /**
   * TableSession createMany
   */
  export type TableSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TableSessions.
     */
    data: TableSessionCreateManyInput | TableSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TableSession createManyAndReturn
   */
  export type TableSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * The data used to create many TableSessions.
     */
    data: TableSessionCreateManyInput | TableSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TableSession update
   */
  export type TableSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a TableSession.
     */
    data: XOR<TableSessionUpdateInput, TableSessionUncheckedUpdateInput>
    /**
     * Choose, which TableSession to update.
     */
    where: TableSessionWhereUniqueInput
  }

  /**
   * TableSession updateMany
   */
  export type TableSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TableSessions.
     */
    data: XOR<TableSessionUpdateManyMutationInput, TableSessionUncheckedUpdateManyInput>
    /**
     * Filter which TableSessions to update
     */
    where?: TableSessionWhereInput
    /**
     * Limit how many TableSessions to update.
     */
    limit?: number
  }

  /**
   * TableSession updateManyAndReturn
   */
  export type TableSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * The data used to update TableSessions.
     */
    data: XOR<TableSessionUpdateManyMutationInput, TableSessionUncheckedUpdateManyInput>
    /**
     * Filter which TableSessions to update
     */
    where?: TableSessionWhereInput
    /**
     * Limit how many TableSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TableSession upsert
   */
  export type TableSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the TableSession to update in case it exists.
     */
    where: TableSessionWhereUniqueInput
    /**
     * In case the TableSession found by the `where` argument doesn't exist, create a new TableSession with this data.
     */
    create: XOR<TableSessionCreateInput, TableSessionUncheckedCreateInput>
    /**
     * In case the TableSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableSessionUpdateInput, TableSessionUncheckedUpdateInput>
  }

  /**
   * TableSession delete
   */
  export type TableSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
    /**
     * Filter which TableSession to delete.
     */
    where: TableSessionWhereUniqueInput
  }

  /**
   * TableSession deleteMany
   */
  export type TableSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TableSessions to delete
     */
    where?: TableSessionWhereInput
    /**
     * Limit how many TableSessions to delete.
     */
    limit?: number
  }

  /**
   * TableSession without action
   */
  export type TableSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableSession
     */
    select?: TableSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TableSession
     */
    omit?: TableSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableSessionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    status: 'status'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const HandScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    handNumber: 'handNumber',
    state: 'state',
    createdAt: 'createdAt'
  };

  export type HandScalarFieldEnum = (typeof HandScalarFieldEnum)[keyof typeof HandScalarFieldEnum]


  export const TableSessionScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    playerId: 'playerId',
    joinedAt: 'joinedAt'
  };

  export type TableSessionScalarFieldEnum = (typeof TableSessionScalarFieldEnum)[keyof typeof TableSessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    sessions?: TableSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    sessions?: TableSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    sessions?: TableSessionListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    status?: StringFilter<"Game"> | string
    hands?: HandListRelationFilter
    sessions?: TableSessionListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    hands?: HandOrderByRelationAggregateInput
    sessions?: TableSessionOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    createdAt?: DateTimeFilter<"Game"> | Date | string
    status?: StringFilter<"Game"> | string
    hands?: HandListRelationFilter
    sessions?: TableSessionListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    status?: StringWithAggregatesFilter<"Game"> | string
  }

  export type HandWhereInput = {
    AND?: HandWhereInput | HandWhereInput[]
    OR?: HandWhereInput[]
    NOT?: HandWhereInput | HandWhereInput[]
    id?: StringFilter<"Hand"> | string
    gameId?: StringFilter<"Hand"> | string
    handNumber?: IntFilter<"Hand"> | number
    state?: StringFilter<"Hand"> | string
    createdAt?: DateTimeFilter<"Hand"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }

  export type HandOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    handNumber?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    game?: GameOrderByWithRelationInput
  }

  export type HandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HandWhereInput | HandWhereInput[]
    OR?: HandWhereInput[]
    NOT?: HandWhereInput | HandWhereInput[]
    gameId?: StringFilter<"Hand"> | string
    handNumber?: IntFilter<"Hand"> | number
    state?: StringFilter<"Hand"> | string
    createdAt?: DateTimeFilter<"Hand"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }, "id">

  export type HandOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    handNumber?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    _count?: HandCountOrderByAggregateInput
    _avg?: HandAvgOrderByAggregateInput
    _max?: HandMaxOrderByAggregateInput
    _min?: HandMinOrderByAggregateInput
    _sum?: HandSumOrderByAggregateInput
  }

  export type HandScalarWhereWithAggregatesInput = {
    AND?: HandScalarWhereWithAggregatesInput | HandScalarWhereWithAggregatesInput[]
    OR?: HandScalarWhereWithAggregatesInput[]
    NOT?: HandScalarWhereWithAggregatesInput | HandScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hand"> | string
    gameId?: StringWithAggregatesFilter<"Hand"> | string
    handNumber?: IntWithAggregatesFilter<"Hand"> | number
    state?: StringWithAggregatesFilter<"Hand"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Hand"> | Date | string
  }

  export type TableSessionWhereInput = {
    AND?: TableSessionWhereInput | TableSessionWhereInput[]
    OR?: TableSessionWhereInput[]
    NOT?: TableSessionWhereInput | TableSessionWhereInput[]
    id?: StringFilter<"TableSession"> | string
    gameId?: StringFilter<"TableSession"> | string
    playerId?: StringFilter<"TableSession"> | string
    joinedAt?: DateTimeFilter<"TableSession"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    player?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TableSessionOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    joinedAt?: SortOrder
    game?: GameOrderByWithRelationInput
    player?: UserOrderByWithRelationInput
  }

  export type TableSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TableSessionWhereInput | TableSessionWhereInput[]
    OR?: TableSessionWhereInput[]
    NOT?: TableSessionWhereInput | TableSessionWhereInput[]
    gameId?: StringFilter<"TableSession"> | string
    playerId?: StringFilter<"TableSession"> | string
    joinedAt?: DateTimeFilter<"TableSession"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    player?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TableSessionOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    joinedAt?: SortOrder
    _count?: TableSessionCountOrderByAggregateInput
    _max?: TableSessionMaxOrderByAggregateInput
    _min?: TableSessionMinOrderByAggregateInput
  }

  export type TableSessionScalarWhereWithAggregatesInput = {
    AND?: TableSessionScalarWhereWithAggregatesInput | TableSessionScalarWhereWithAggregatesInput[]
    OR?: TableSessionScalarWhereWithAggregatesInput[]
    NOT?: TableSessionScalarWhereWithAggregatesInput | TableSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TableSession"> | string
    gameId?: StringWithAggregatesFilter<"TableSession"> | string
    playerId?: StringWithAggregatesFilter<"TableSession"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"TableSession"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    sessions?: TableSessionCreateNestedManyWithoutPlayerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    sessions?: TableSessionUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: TableSessionUpdateManyWithoutPlayerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: TableSessionUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    id?: string
    createdAt?: Date | string
    status: string
    hands?: HandCreateNestedManyWithoutGameInput
    sessions?: TableSessionCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    status: string
    hands?: HandUncheckedCreateNestedManyWithoutGameInput
    sessions?: TableSessionUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    hands?: HandUpdateManyWithoutGameNestedInput
    sessions?: TableSessionUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    hands?: HandUncheckedUpdateManyWithoutGameNestedInput
    sessions?: TableSessionUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: string
    createdAt?: Date | string
    status: string
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type HandCreateInput = {
    id?: string
    handNumber: number
    state: string
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutHandsInput
  }

  export type HandUncheckedCreateInput = {
    id?: string
    gameId: string
    handNumber: number
    state: string
    createdAt?: Date | string
  }

  export type HandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutHandsNestedInput
  }

  export type HandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HandCreateManyInput = {
    id?: string
    gameId: string
    handNumber: number
    state: string
    createdAt?: Date | string
  }

  export type HandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionCreateInput = {
    id?: string
    joinedAt?: Date | string
    game: GameCreateNestedOneWithoutSessionsInput
    player: UserCreateNestedOneWithoutSessionsInput
  }

  export type TableSessionUncheckedCreateInput = {
    id?: string
    gameId: string
    playerId: string
    joinedAt?: Date | string
  }

  export type TableSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutSessionsNestedInput
    player?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type TableSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionCreateManyInput = {
    id?: string
    gameId: string
    playerId: string
    joinedAt?: Date | string
  }

  export type TableSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TableSessionListRelationFilter = {
    every?: TableSessionWhereInput
    some?: TableSessionWhereInput
    none?: TableSessionWhereInput
  }

  export type TableSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type HandListRelationFilter = {
    every?: HandWhereInput
    some?: HandWhereInput
    none?: HandWhereInput
  }

  export type HandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type HandCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    handNumber?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
  }

  export type HandAvgOrderByAggregateInput = {
    handNumber?: SortOrder
  }

  export type HandMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    handNumber?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
  }

  export type HandMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    handNumber?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
  }

  export type HandSumOrderByAggregateInput = {
    handNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TableSessionCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    joinedAt?: SortOrder
  }

  export type TableSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    joinedAt?: SortOrder
  }

  export type TableSessionMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    joinedAt?: SortOrder
  }

  export type TableSessionCreateNestedManyWithoutPlayerInput = {
    create?: XOR<TableSessionCreateWithoutPlayerInput, TableSessionUncheckedCreateWithoutPlayerInput> | TableSessionCreateWithoutPlayerInput[] | TableSessionUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutPlayerInput | TableSessionCreateOrConnectWithoutPlayerInput[]
    createMany?: TableSessionCreateManyPlayerInputEnvelope
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
  }

  export type TableSessionUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<TableSessionCreateWithoutPlayerInput, TableSessionUncheckedCreateWithoutPlayerInput> | TableSessionCreateWithoutPlayerInput[] | TableSessionUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutPlayerInput | TableSessionCreateOrConnectWithoutPlayerInput[]
    createMany?: TableSessionCreateManyPlayerInputEnvelope
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TableSessionUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<TableSessionCreateWithoutPlayerInput, TableSessionUncheckedCreateWithoutPlayerInput> | TableSessionCreateWithoutPlayerInput[] | TableSessionUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutPlayerInput | TableSessionCreateOrConnectWithoutPlayerInput[]
    upsert?: TableSessionUpsertWithWhereUniqueWithoutPlayerInput | TableSessionUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: TableSessionCreateManyPlayerInputEnvelope
    set?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    disconnect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    delete?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    update?: TableSessionUpdateWithWhereUniqueWithoutPlayerInput | TableSessionUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: TableSessionUpdateManyWithWhereWithoutPlayerInput | TableSessionUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: TableSessionScalarWhereInput | TableSessionScalarWhereInput[]
  }

  export type TableSessionUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<TableSessionCreateWithoutPlayerInput, TableSessionUncheckedCreateWithoutPlayerInput> | TableSessionCreateWithoutPlayerInput[] | TableSessionUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutPlayerInput | TableSessionCreateOrConnectWithoutPlayerInput[]
    upsert?: TableSessionUpsertWithWhereUniqueWithoutPlayerInput | TableSessionUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: TableSessionCreateManyPlayerInputEnvelope
    set?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    disconnect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    delete?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    update?: TableSessionUpdateWithWhereUniqueWithoutPlayerInput | TableSessionUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: TableSessionUpdateManyWithWhereWithoutPlayerInput | TableSessionUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: TableSessionScalarWhereInput | TableSessionScalarWhereInput[]
  }

  export type HandCreateNestedManyWithoutGameInput = {
    create?: XOR<HandCreateWithoutGameInput, HandUncheckedCreateWithoutGameInput> | HandCreateWithoutGameInput[] | HandUncheckedCreateWithoutGameInput[]
    connectOrCreate?: HandCreateOrConnectWithoutGameInput | HandCreateOrConnectWithoutGameInput[]
    createMany?: HandCreateManyGameInputEnvelope
    connect?: HandWhereUniqueInput | HandWhereUniqueInput[]
  }

  export type TableSessionCreateNestedManyWithoutGameInput = {
    create?: XOR<TableSessionCreateWithoutGameInput, TableSessionUncheckedCreateWithoutGameInput> | TableSessionCreateWithoutGameInput[] | TableSessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutGameInput | TableSessionCreateOrConnectWithoutGameInput[]
    createMany?: TableSessionCreateManyGameInputEnvelope
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
  }

  export type HandUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<HandCreateWithoutGameInput, HandUncheckedCreateWithoutGameInput> | HandCreateWithoutGameInput[] | HandUncheckedCreateWithoutGameInput[]
    connectOrCreate?: HandCreateOrConnectWithoutGameInput | HandCreateOrConnectWithoutGameInput[]
    createMany?: HandCreateManyGameInputEnvelope
    connect?: HandWhereUniqueInput | HandWhereUniqueInput[]
  }

  export type TableSessionUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<TableSessionCreateWithoutGameInput, TableSessionUncheckedCreateWithoutGameInput> | TableSessionCreateWithoutGameInput[] | TableSessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutGameInput | TableSessionCreateOrConnectWithoutGameInput[]
    createMany?: TableSessionCreateManyGameInputEnvelope
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
  }

  export type HandUpdateManyWithoutGameNestedInput = {
    create?: XOR<HandCreateWithoutGameInput, HandUncheckedCreateWithoutGameInput> | HandCreateWithoutGameInput[] | HandUncheckedCreateWithoutGameInput[]
    connectOrCreate?: HandCreateOrConnectWithoutGameInput | HandCreateOrConnectWithoutGameInput[]
    upsert?: HandUpsertWithWhereUniqueWithoutGameInput | HandUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: HandCreateManyGameInputEnvelope
    set?: HandWhereUniqueInput | HandWhereUniqueInput[]
    disconnect?: HandWhereUniqueInput | HandWhereUniqueInput[]
    delete?: HandWhereUniqueInput | HandWhereUniqueInput[]
    connect?: HandWhereUniqueInput | HandWhereUniqueInput[]
    update?: HandUpdateWithWhereUniqueWithoutGameInput | HandUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: HandUpdateManyWithWhereWithoutGameInput | HandUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: HandScalarWhereInput | HandScalarWhereInput[]
  }

  export type TableSessionUpdateManyWithoutGameNestedInput = {
    create?: XOR<TableSessionCreateWithoutGameInput, TableSessionUncheckedCreateWithoutGameInput> | TableSessionCreateWithoutGameInput[] | TableSessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutGameInput | TableSessionCreateOrConnectWithoutGameInput[]
    upsert?: TableSessionUpsertWithWhereUniqueWithoutGameInput | TableSessionUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: TableSessionCreateManyGameInputEnvelope
    set?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    disconnect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    delete?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    update?: TableSessionUpdateWithWhereUniqueWithoutGameInput | TableSessionUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: TableSessionUpdateManyWithWhereWithoutGameInput | TableSessionUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: TableSessionScalarWhereInput | TableSessionScalarWhereInput[]
  }

  export type HandUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<HandCreateWithoutGameInput, HandUncheckedCreateWithoutGameInput> | HandCreateWithoutGameInput[] | HandUncheckedCreateWithoutGameInput[]
    connectOrCreate?: HandCreateOrConnectWithoutGameInput | HandCreateOrConnectWithoutGameInput[]
    upsert?: HandUpsertWithWhereUniqueWithoutGameInput | HandUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: HandCreateManyGameInputEnvelope
    set?: HandWhereUniqueInput | HandWhereUniqueInput[]
    disconnect?: HandWhereUniqueInput | HandWhereUniqueInput[]
    delete?: HandWhereUniqueInput | HandWhereUniqueInput[]
    connect?: HandWhereUniqueInput | HandWhereUniqueInput[]
    update?: HandUpdateWithWhereUniqueWithoutGameInput | HandUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: HandUpdateManyWithWhereWithoutGameInput | HandUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: HandScalarWhereInput | HandScalarWhereInput[]
  }

  export type TableSessionUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<TableSessionCreateWithoutGameInput, TableSessionUncheckedCreateWithoutGameInput> | TableSessionCreateWithoutGameInput[] | TableSessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TableSessionCreateOrConnectWithoutGameInput | TableSessionCreateOrConnectWithoutGameInput[]
    upsert?: TableSessionUpsertWithWhereUniqueWithoutGameInput | TableSessionUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: TableSessionCreateManyGameInputEnvelope
    set?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    disconnect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    delete?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    connect?: TableSessionWhereUniqueInput | TableSessionWhereUniqueInput[]
    update?: TableSessionUpdateWithWhereUniqueWithoutGameInput | TableSessionUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: TableSessionUpdateManyWithWhereWithoutGameInput | TableSessionUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: TableSessionScalarWhereInput | TableSessionScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutHandsInput = {
    create?: XOR<GameCreateWithoutHandsInput, GameUncheckedCreateWithoutHandsInput>
    connectOrCreate?: GameCreateOrConnectWithoutHandsInput
    connect?: GameWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameUpdateOneRequiredWithoutHandsNestedInput = {
    create?: XOR<GameCreateWithoutHandsInput, GameUncheckedCreateWithoutHandsInput>
    connectOrCreate?: GameCreateOrConnectWithoutHandsInput
    upsert?: GameUpsertWithoutHandsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutHandsInput, GameUpdateWithoutHandsInput>, GameUncheckedUpdateWithoutHandsInput>
  }

  export type GameCreateNestedOneWithoutSessionsInput = {
    create?: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GameCreateOrConnectWithoutSessionsInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GameCreateOrConnectWithoutSessionsInput
    upsert?: GameUpsertWithoutSessionsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutSessionsInput, GameUpdateWithoutSessionsInput>, GameUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TableSessionCreateWithoutPlayerInput = {
    id?: string
    joinedAt?: Date | string
    game: GameCreateNestedOneWithoutSessionsInput
  }

  export type TableSessionUncheckedCreateWithoutPlayerInput = {
    id?: string
    gameId: string
    joinedAt?: Date | string
  }

  export type TableSessionCreateOrConnectWithoutPlayerInput = {
    where: TableSessionWhereUniqueInput
    create: XOR<TableSessionCreateWithoutPlayerInput, TableSessionUncheckedCreateWithoutPlayerInput>
  }

  export type TableSessionCreateManyPlayerInputEnvelope = {
    data: TableSessionCreateManyPlayerInput | TableSessionCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type TableSessionUpsertWithWhereUniqueWithoutPlayerInput = {
    where: TableSessionWhereUniqueInput
    update: XOR<TableSessionUpdateWithoutPlayerInput, TableSessionUncheckedUpdateWithoutPlayerInput>
    create: XOR<TableSessionCreateWithoutPlayerInput, TableSessionUncheckedCreateWithoutPlayerInput>
  }

  export type TableSessionUpdateWithWhereUniqueWithoutPlayerInput = {
    where: TableSessionWhereUniqueInput
    data: XOR<TableSessionUpdateWithoutPlayerInput, TableSessionUncheckedUpdateWithoutPlayerInput>
  }

  export type TableSessionUpdateManyWithWhereWithoutPlayerInput = {
    where: TableSessionScalarWhereInput
    data: XOR<TableSessionUpdateManyMutationInput, TableSessionUncheckedUpdateManyWithoutPlayerInput>
  }

  export type TableSessionScalarWhereInput = {
    AND?: TableSessionScalarWhereInput | TableSessionScalarWhereInput[]
    OR?: TableSessionScalarWhereInput[]
    NOT?: TableSessionScalarWhereInput | TableSessionScalarWhereInput[]
    id?: StringFilter<"TableSession"> | string
    gameId?: StringFilter<"TableSession"> | string
    playerId?: StringFilter<"TableSession"> | string
    joinedAt?: DateTimeFilter<"TableSession"> | Date | string
  }

  export type HandCreateWithoutGameInput = {
    id?: string
    handNumber: number
    state: string
    createdAt?: Date | string
  }

  export type HandUncheckedCreateWithoutGameInput = {
    id?: string
    handNumber: number
    state: string
    createdAt?: Date | string
  }

  export type HandCreateOrConnectWithoutGameInput = {
    where: HandWhereUniqueInput
    create: XOR<HandCreateWithoutGameInput, HandUncheckedCreateWithoutGameInput>
  }

  export type HandCreateManyGameInputEnvelope = {
    data: HandCreateManyGameInput | HandCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type TableSessionCreateWithoutGameInput = {
    id?: string
    joinedAt?: Date | string
    player: UserCreateNestedOneWithoutSessionsInput
  }

  export type TableSessionUncheckedCreateWithoutGameInput = {
    id?: string
    playerId: string
    joinedAt?: Date | string
  }

  export type TableSessionCreateOrConnectWithoutGameInput = {
    where: TableSessionWhereUniqueInput
    create: XOR<TableSessionCreateWithoutGameInput, TableSessionUncheckedCreateWithoutGameInput>
  }

  export type TableSessionCreateManyGameInputEnvelope = {
    data: TableSessionCreateManyGameInput | TableSessionCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type HandUpsertWithWhereUniqueWithoutGameInput = {
    where: HandWhereUniqueInput
    update: XOR<HandUpdateWithoutGameInput, HandUncheckedUpdateWithoutGameInput>
    create: XOR<HandCreateWithoutGameInput, HandUncheckedCreateWithoutGameInput>
  }

  export type HandUpdateWithWhereUniqueWithoutGameInput = {
    where: HandWhereUniqueInput
    data: XOR<HandUpdateWithoutGameInput, HandUncheckedUpdateWithoutGameInput>
  }

  export type HandUpdateManyWithWhereWithoutGameInput = {
    where: HandScalarWhereInput
    data: XOR<HandUpdateManyMutationInput, HandUncheckedUpdateManyWithoutGameInput>
  }

  export type HandScalarWhereInput = {
    AND?: HandScalarWhereInput | HandScalarWhereInput[]
    OR?: HandScalarWhereInput[]
    NOT?: HandScalarWhereInput | HandScalarWhereInput[]
    id?: StringFilter<"Hand"> | string
    gameId?: StringFilter<"Hand"> | string
    handNumber?: IntFilter<"Hand"> | number
    state?: StringFilter<"Hand"> | string
    createdAt?: DateTimeFilter<"Hand"> | Date | string
  }

  export type TableSessionUpsertWithWhereUniqueWithoutGameInput = {
    where: TableSessionWhereUniqueInput
    update: XOR<TableSessionUpdateWithoutGameInput, TableSessionUncheckedUpdateWithoutGameInput>
    create: XOR<TableSessionCreateWithoutGameInput, TableSessionUncheckedCreateWithoutGameInput>
  }

  export type TableSessionUpdateWithWhereUniqueWithoutGameInput = {
    where: TableSessionWhereUniqueInput
    data: XOR<TableSessionUpdateWithoutGameInput, TableSessionUncheckedUpdateWithoutGameInput>
  }

  export type TableSessionUpdateManyWithWhereWithoutGameInput = {
    where: TableSessionScalarWhereInput
    data: XOR<TableSessionUpdateManyMutationInput, TableSessionUncheckedUpdateManyWithoutGameInput>
  }

  export type GameCreateWithoutHandsInput = {
    id?: string
    createdAt?: Date | string
    status: string
    sessions?: TableSessionCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutHandsInput = {
    id?: string
    createdAt?: Date | string
    status: string
    sessions?: TableSessionUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutHandsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutHandsInput, GameUncheckedCreateWithoutHandsInput>
  }

  export type GameUpsertWithoutHandsInput = {
    update: XOR<GameUpdateWithoutHandsInput, GameUncheckedUpdateWithoutHandsInput>
    create: XOR<GameCreateWithoutHandsInput, GameUncheckedCreateWithoutHandsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutHandsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutHandsInput, GameUncheckedUpdateWithoutHandsInput>
  }

  export type GameUpdateWithoutHandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    sessions?: TableSessionUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutHandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    sessions?: TableSessionUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateWithoutSessionsInput = {
    id?: string
    createdAt?: Date | string
    status: string
    hands?: HandCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutSessionsInput = {
    id?: string
    createdAt?: Date | string
    status: string
    hands?: HandUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutSessionsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type GameUpsertWithoutSessionsInput = {
    update: XOR<GameUpdateWithoutSessionsInput, GameUncheckedUpdateWithoutSessionsInput>
    create: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutSessionsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutSessionsInput, GameUncheckedUpdateWithoutSessionsInput>
  }

  export type GameUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    hands?: HandUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    hands?: HandUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionCreateManyPlayerInput = {
    id?: string
    gameId: string
    joinedAt?: Date | string
  }

  export type TableSessionUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type TableSessionUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HandCreateManyGameInput = {
    id?: string
    handNumber: number
    state: string
    createdAt?: Date | string
  }

  export type TableSessionCreateManyGameInput = {
    id?: string
    playerId: string
    joinedAt?: Date | string
  }

  export type HandUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HandUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HandUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    handNumber?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type TableSessionUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableSessionUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}