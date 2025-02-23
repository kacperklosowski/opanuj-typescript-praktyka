import type { TextProps } from './BaseText';

export default function withItalics<P extends TextProps>(
  Component: React.ComponentType<TextProps>,
) {
  return function Italics(props: P) {
    return (
      <em data-testid="italic">
        <Component {...props} />
      </em>
    );
  };
}
