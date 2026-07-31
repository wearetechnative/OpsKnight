import { describe, expect, it } from 'vitest';
import { extractIncidentEnvironment } from '@/lib/events';

describe('incident environment extraction', () => {
  it('recognizes the current Lambda production tag', () => {
    expect(
      extractIncidentEnvironment({
        tags: 'ClientName:Acme,P1,Environment: Production',
      })
    ).toBe('PRODUCTION');
  });

  it('recognizes explicit is_production metadata', () => {
    expect(extractIncidentEnvironment({ is_production: true })).toBe('PRODUCTION');
    expect(extractIncidentEnvironment({ is_production: 'false' })).toBe('NON_PRODUCTION');
  });

  it('safely treats missing and unknown values as non-production', () => {
    expect(extractIncidentEnvironment({ tags: 'Environment: Unknown' })).toBe('NON_PRODUCTION');
    expect(extractIncidentEnvironment({})).toBe('NON_PRODUCTION');
  });
});
