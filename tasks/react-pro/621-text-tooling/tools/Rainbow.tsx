import type { TextProps } from './BaseText';

function rainbowText(text: string) {
  return text.split('').map((char: string, index: number) => {
    const hue = Math.floor((index / text.length) * 360);
    return (
      <span key={index} style={{ color: `hsl(${hue}, 80%, 50%)` }}>
        {char}
      </span>
    );
  });
}

export default function withRainbow<P extends TextProps>(
  Component: React.ComponentType<TextProps>,
) {
  return function Rainbow(props: P) {
    const { text, ...rest } = props;

    if (typeof text !== 'string') {
      return <Component {...rest} text={text} />;
    }

    const transformedText = <span data-testid="rainbow">{rainbowText(text)}</span>;

    return <Component {...rest} text={transformedText} />;
  };
}
