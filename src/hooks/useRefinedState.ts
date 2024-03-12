import { z } from 'zod';
import { useState, useEffect } from 'react';

export function useRefinedState<T extends z.ZodTypeAny, S = z.infer<T>>(
  schema: T,
  initialState: S | (() => S)
) {
  const [state, setState] = useState<S>(initialState);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const parseResult = schema.safeParse(state);
    if (parseResult.success) {
      setErrors([]);
    } else {
      const errors = parseResult.error.issues.map((issue) =>
        // Messages in @blogfolio/types come as "code|message" i.e. "100|Password weak"
        issue.message.replace(/^\d+\|/, '')
      );
      setErrors(errors);
    }
  }, [state, schema]);

  return [state, setState, errors] as const;
}
