import type { TextProps } from './BaseText';

export default function withBold<P extends TextProps>(Component: React.ComponentType<TextProps>) {
  return function Bold(props: P) {
    return (
      <strong data-testid="bold">
        <Component {...props} />
      </strong>
    );
  };
}
