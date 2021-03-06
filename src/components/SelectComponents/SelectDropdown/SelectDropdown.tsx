import './SelectDropdown.css';

import React from 'react';

import { GetOptionPropsResult, Option, OptionProps } from '../../../hooks/useSelect/useSelect';
import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { cnSelect } from '../cnSelect';
import { PropSize } from '../types';

export const selectDropdownform = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownform[number];
export const defaultSelectDropdownPropForm = selectDropdownform[0];

type Props<ITEM> = PropsWithJsxAttributes<{
  size: PropSize;
  id: string;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  visibleOptions: Option<ITEM>[];
  highlightedIndex: number;
  getOptionProps(props: OptionProps): GetOptionPropsResult;
  onCreate?(newLabel: string): void;
  inputValue?: string;
  hasGroup?: boolean;
  selectedValues: ITEM[] | null;
  labelForCreate?: string;
  labelForNotFound?: string;
  multi?: boolean;
  getOptionLabel(option: ITEM): string;
  form?: SelectDropdownPropForm;
}>;

type SelectDropdown = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

const cnSelectDropdown = cn('SelectDropdown');

export const SelectDropdown: SelectDropdown = (props) => {
  const {
    controlRef,
    visibleOptions,
    highlightedIndex,
    size,
    getOptionProps,
    inputValue,
    dropdownRef,
    id,
    hasGroup = false,
    onCreate,
    selectedValues,
    labelForCreate,
    multi = false,
    getOptionLabel,
    className,
    labelForNotFound,
    form = defaultSelectDropdownPropForm,
  } = props;

  const handleCreate = (): void => {
    if (typeof onCreate === 'function' && inputValue) {
      onCreate(inputValue);
    }
  };

  return (
    <Popover
      anchorRef={controlRef}
      direction="downStartLeft"
      possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
      offset={1}
      role="listbox"
      className={cnSelectDropdown({ form, size }, [className])}
      aria-activedescendant={`${id}-${highlightedIndex}`}
      equalAnchorWidth
    >
      <div className={cnSelect('List', { size, form })} ref={dropdownRef}>
        {visibleOptions.length > 0 ? (
          visibleOptions.map((option, index: number) => {
            const isOptionForCreate = 'optionForCreate' in option;

            const currentOption = visibleOptions[index];
            const prevOption = visibleOptions[index - 1];
            const menuOption = isOptionForCreate ? visibleOptions[index + 1] : currentOption;

            const isFirstGroup =
              hasGroup && !isOptionForCreate && !visibleOptions[index - 1] && index === 0;

            const shouldShowGroupName =
              isFirstGroup || (hasGroup && prevOption && currentOption.group !== prevOption.group);

            return (
              <React.Fragment key={cnSelect('Option', { label: option.label, isOptionForCreate })}>
                {shouldShowGroupName && (
                  <div key={menuOption.group} className={cnSelect('GroupName')}>
                    {menuOption.group}
                  </div>
                )}
                <div
                  aria-selected={
                    !isOptionForCreate &&
                    selectedValues?.some(
                      (val) => getOptionLabel(val) === getOptionLabel(menuOption.item),
                    )
                  }
                  role="option"
                  key={option.label}
                  id={`${id}-${index}`}
                  {...getOptionProps({
                    index,
                    className: cnSelect(multi ? 'CheckItem' : 'ListItem', {
                      forCreate: isOptionForCreate,
                      active:
                        !isOptionForCreate &&
                        selectedValues?.some((val) => {
                          return getOptionLabel(val) === getOptionLabel(menuOption.item);
                        }),
                      hovered: index === highlightedIndex,
                    }),
                  })}
                >
                  {isOptionForCreate ? (
                    <button
                      type="button"
                      className={cnSelect('CreateOption')}
                      disabled={visibleOptions.some(
                        (option, index) =>
                          index !== 0 && option.label.toLowerCase() === inputValue?.toLowerCase(),
                      )}
                      onClick={handleCreate}
                    >
                      + {labelForCreate} «<b>{inputValue}</b>»
                    </button>
                  ) : (
                    option.label
                  )}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <Text className={cnSelectDropdown('LabelForNotFound')}>{labelForNotFound}</Text>
        )}
      </div>
    </Popover>
  );
};
