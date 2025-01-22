/*
  Zdefiniuj typowanie propsów dla CustomButton, które pozwoli na przekazanie dowolnych atrybutów elementu HTML button.
*/

import {ComponentProps, ReactNode} from 'react';

interface CustomButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => (
  <button
    className="p-2 text-white bg-blue-500 rounded-md"
    {...props}
  >
    {children}
  </button>
);

// Przykładowe użycie komponentu Card
const App = () => (
  <CustomButton onClick={() => alert('clicked')} type="button">
    Click me
  </CustomButton>
);

export default App;

export { CustomButton };
