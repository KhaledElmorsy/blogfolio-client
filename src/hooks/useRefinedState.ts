import { useState, useEffect } from 'react';
import { ZodSchemaWithErrors } from '../../../blogfolio-types/build/util';

export function useRefinedState<T extends ZodSchemaWithErrors>(
  schema: T,
  initialState: T['_type'] | (() => T['_type'])
) {
  const [state, setState] = useState<T['_type']>(initialState);
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
