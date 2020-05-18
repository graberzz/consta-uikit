import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button, IButton, cnButton } from './Button';

const testId = 'button';

const renderComponent = (props: IButton = {}) => {
  const { label = 'Текст кнопки', ...rest } = props;
  return render(<Button data-testid={testId} label={label} {...rest} />);
};

describe('Компонент Button', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      const sizes = ['xs', 's', 'm', 'l'] as const;
      sizes.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          const button = screen.getByTestId(testId);

          expect(button).toHaveClass(cnButton({ size }));
        });
      });
    });

    describe('проверка view', () => {
      const views = ['clear', 'ghost', 'primary', 'secondary'] as const;
      views.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });

          const button = screen.getByTestId(testId);

          expect(button).toHaveClass(cnButton({ view }));
        });
      });
    });

    describe('проверка width', () => {
      const widths = ['full', 'default'] as const;
      widths.forEach((width) => {
        it(`присваивает класс для width=${width}`, () => {
          renderComponent({ width });

          const button = screen.getByTestId(testId);

          expect(button).toHaveClass(cnButton({ width }));
        });
      });
    });

    describe('проверка form', () => {
      const forms = [
        'default',
        'brick',
        'round',
        'brickRound',
        'roundBrick',
        'brickDefault',
        'defaultBrick',
      ] as const;

      forms.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });

          const button = screen.getByTestId(testId);

          expect(button).toHaveClass(cnButton({ form }));
        });
      });
    });

    describe('проверка тэга', () => {
      const tags = ['a', 'div', 'span'] as const;
      tags.forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ as: el });

          const button = screen.getByTestId(testId);

          expect(button.tagName).toEqual(el.toUpperCase());
        });
      });

      it(`должен рендериться как функциональный компонент`, () => {
        const Component = ({ children, innerRef, ...otherProps }) => (
          <span {...otherProps} ref={innerRef}>
            {children}
          </span>
        );

        renderComponent({ as: Component });

        const button = screen.getByTestId(testId);

        expect(button.tagName).toEqual('SPAN');
      });
    });

    describe('проверка disabled', () => {
      it('должен отключать <button>', () => {
        const handleClick = jest.fn();

        renderComponent({ disabled: true, onClick: handleClick });

        const button = screen.getByTestId(testId);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);

        expect(button).toBeDisabled();
        expect(button).toHaveClass(cnButton({ disabled: true }));
      });

      it('должен вешать класс disabled на <a> элемент', () => {
        const handleClick = jest.fn();

        renderComponent({ disabled: true, as: 'a', onClick: handleClick });

        const button = screen.getByTestId(testId);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);
        expect(button).toHaveClass(cnButton({ disabled: true }));
      });
    });
    describe('проверка loading', () => {
      it('должен отключать <button>', () => {
        const handleClick = jest.fn();

        renderComponent({ loading: true, onClick: handleClick });

        const button = screen.getByTestId(testId);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);

        expect(button).toBeDisabled();
        expect(button).toHaveClass(cnButton({ loading: true }));
      });

      it('должен вешать класс loading на <a> элемент', () => {
        const handleClick = jest.fn();

        renderComponent({ loading: true, as: 'a', onClick: handleClick });

        const button = screen.getByTestId(testId);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);
        expect(button).toHaveClass(cnButton({ loading: true }));
      });
    });
  });

  it('должен отображать текст в кнопке', () => {
    const label = 'Это кнопка';

    renderComponent({ label });

    const button = screen.getByTestId(testId);

    expect(button.textContent).toEqual(label);
  });

  it('должен работать onClick, если кнопка не отключена', () => {
    const handleClick = jest.fn();

    renderComponent({ onClick: handleClick });

    const button = screen.getByTestId(testId);

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('проверка иконки', () => {
    it('должен отображать иконку слева', () => {
      const label = 'Текст кнопки';
      const iconLeftText = 'Иконка слева';
      const IconLeft = () => <span>{iconLeftText}</span>;

      renderComponent({ label, iconLeft: IconLeft });

      const button = screen.getByTestId(testId);

      expect(button).toHaveTextContent(iconLeftText + label);
    });

    it('должен отображать иконку справа', () => {
      const label = 'Текст кнопки';
      const iconRightText = 'Иконка справа';
      const IconRight = () => <span>{iconRightText}</span>;

      renderComponent({ label, iconRight: IconRight });

      const button = screen.getByTestId(testId);

      expect(button).toHaveTextContent(label + iconRightText);
    });

    it('должен отображать иконки слева и справа', () => {
      const label = 'Текст кнопки';
      const iconRightText = 'Иконка справа';
      const iconLeftText = 'Иконка слева';

      const IconLeft = () => <span>{iconLeftText}</span>;
      const IconRight = () => <span>{iconRightText}</span>;

      renderComponent({ label, iconRight: IconRight, iconLeft: IconLeft });

      const button = screen.getByTestId(testId);

      expect(button).toHaveTextContent(iconLeftText + label + iconRightText);
    });

    it('должен отображать только иконку', () => {
      const label = 'Текст кнопки';
      const iconLeftText = 'Иконка слева';

      const IconLeft = () => <span>{iconLeftText}</span>;

      renderComponent({ label, iconLeft: IconLeft, onlyIcon: true });

      const button = screen.getByTestId(testId);

      expect(button).toHaveTextContent(iconLeftText);
    });
  });
});