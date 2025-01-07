import { type FeatureFlags } from './legacy-flags.ts';

type StripV2<T> = T extends `${infer First}V2${infer Second}` ? `${First}${Second}` : never;

type ModernFeatureFlags = {
  [Prop in keyof FeatureFlags as StripV2<Prop>]: FeatureFlags[Prop];
};

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  const modernFlags: ModernFeatureFlags = Object.entries(flags).reduce((acc, [key, value]) => {
    const match = key.match(/(.+)V2(.+)/);

    if(!match) {
      return acc;
    }

    const [, prefix, suffix] = match;
    const newKey = `${prefix}${suffix}` as keyof ModernFeatureFlags;

    acc[newKey] = value;

    return acc;
  }
  , {} as ModernFeatureFlags);

  return modernFlags;
}
