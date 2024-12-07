import { mergeObjects } from './task.ts';

mergeObjects('hello', 'world');
mergeObjects([], () => {});
mergeObjects(null, undefined);
