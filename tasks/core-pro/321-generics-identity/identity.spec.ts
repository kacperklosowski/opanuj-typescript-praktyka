import { describe, it, expect } from 'vitest';
import { IdentityProcessor , type RedditIdentity, type GoogleIdentity, type AppleIdentity} from './identity.ts';
import { join } from 'path';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('IdentityProcessor', () => {
  it('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, './identity.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should find by id', () => {
    const processor = new IdentityProcessor<RedditIdentity>('reddit');
    const identity = processor.findById('4');
    expect(identity?.userName).toBe('Alex Smith');
  });

  it('should find by user name', () => {
    const processor = new IdentityProcessor<AppleIdentity>('apple');
    const identity = processor.findByUserName('Kate Williams');
    expect(identity?.id).toBe('2');
  })

  it('should not find by user name', () => {
    const processor = new IdentityProcessor<GoogleIdentity>('google');
    const identity = processor.findByUserName('Jane Doe');
    expect(identity).toBeUndefined();
  })
});
