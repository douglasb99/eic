/* Copyright (C) Douglas Burkinshaw - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Douglas Burkinshaw <douglaswburkinshaw@hotmail.co.uk>, Jan 2023
 */

/**
 * I wrote this class for a previous project and copied it into this test.
 *
 * It has significant advantages as incorporates thrown errors into method signatures thereby forcing calling code to handle them where a thrown error is otherwise silent
 * at compile time because it is not part of the method signature. I added this class to the test code to show you as personally I like this approach to error handling in typescript.
 *
 * @see https://medium.com/inato/expressive-error-handling-in-typescript-and-benefits-for-domain-driven-design-70726e061c86
 */

export type OkResult<T> = {
  success: true;
  value: T;
};

export type ErrorResult = {
  success: false;
  error: Error;
};

export type Result<T> = OkResult<T> | ErrorResult;

export function isOk<T>(result: Result<T>): result is OkResult<T> {
  return result.success;
}

export function isErr<T>(result: Result<T>): result is ErrorResult {
  return !result.success;
}

export function anOk<T>(value: T): OkResult<T> {
  return {
    success: true,
    value,
  };
}

export function anErr(
  message: string,
  context?: any,
  suppress: boolean = false
): ErrorResult {
  if (!suppress) {
    console.trace(`WARN: ${message}`, context);
  }

  return {
    success: false,
    error: new Error(message),
  };
}
