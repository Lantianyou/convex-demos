/* eslint-disable */
// Generated by convex-dev@0.0.70
// based on the contents of this directory.
// To regenerate, run `convex codegen`.
import type addChannel from "./addChannel";
import type listChannels from "./listChannels";
import type listMessages from "./listMessages";
import type sendMessage from "./sendMessage";

import type { MutationCtx, QueryCtx } from "convex-dev/server";
type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;
type ClientMutation<F extends (first: MutationCtx, ...args: any) => any> = (
  ...args: DropFirst<Parameters<F>>
) => ReturnType<F>;
type ClientQuery<F extends (first: QueryCtx, ...args: any) => any> = (
  ...args: DropFirst<Parameters<F>>
) => ReturnType<F>;

export type ConvexAPI = {
  queries: {
    listChannels: ClientQuery<typeof listChannels>;
    listMessages: ClientQuery<typeof listMessages>;
  };
  mutations: {
    addChannel: ClientMutation<typeof addChannel>;
    sendMessage: ClientMutation<typeof sendMessage>;
  };
};

import { makeUseQuery, makeUseMutation, makeUseConvex } from "convex-dev/react";

/**
 * Load a reactive query within a React component.
 *
 * This React hook contains internal state that will cause a rerender whenever
 * the query result changes.
 *
 * This relies on the {@link ConvexProvider} being above in the React component tree.
 *
 * @param name - The name of the query function.
 * @param args - The arguments to the query function.
 * @returns `undefined` if loading and the query's return value otherwise.
 */
export const useQuery = makeUseQuery<ConvexAPI>();

/**
 * Construct a new {@link ReactMutation}.
 *
 * Mutation objects can be called like functions to request execution of the
 * corresponding Convex function, or further configured with
 * [optimistic updates](https://docs.convex.dev/using/optimistic-updates).
 *
 * The value returned by this hook is stable across renders, so it can be used
 * by React dependency arrays and memoization logic relying on object identity
 * without causing rerenders.
 *
 * This relies on the {@link ConvexProvider} being above in the React component tree.
 *
 * @param name - The name of the mutation.
 * @returns The {@link ReactMutation} object with that name.
 */
export const useMutation = makeUseMutation<ConvexAPI>();

/**
 * Get the {@link ConvexReactClient} within a React component.
 *
 * This relies on the {@link ConvexProvider} being above in the React component tree.
 *
 * @returns The active {@link ConvexReactClient} object, or `undefined`.
 */
export const useConvex = makeUseConvex<ConvexAPI>();
