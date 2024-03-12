import { renderHook, act } from '@testing-library/react';
import { useRefinedState } from '../useRefinedState';
import { z } from 'zod';
import { it, expect } from 'vitest';

const errorMessages = {
  tooShort: 'password too short',
  tooWeak: 'password too weak',
};

const password = z
  .string()
  .min(6, `100|${errorMessages.tooShort}`)
  .refine(
    (s) => Boolean(s.match(/[a-zA-Z]/g)) && Boolean(s.match(/\d/g)),
    errorMessages.tooWeak
  );

it('Sets the error array with the relevant failing tests', () => {
  const { result } = renderHook(() => useRefinedState(password, 'abc'));
  expect(result.current[2]).toEqual(
    expect.arrayContaining([errorMessages.tooShort, errorMessages.tooWeak])
  );

  act(() => result.current[1]('abc1'));
  expect(result.current[2]).toEqual([errorMessages.tooShort]);

  act(() => result.current[1]('abc123'));
  expect(result.current[2].length).toBe(0);
});
