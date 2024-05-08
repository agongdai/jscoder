'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import _sortBy from 'lodash/sortBy';

import { faSortDown, faSortUp } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';

import CellRenderer from './CellRenderer';
import { ColumnData } from './types';

type Props<T> = {
  data: T[];
  columns: ColumnData<T>[];
  defaultSortingField?: keyof T;
  defaultSortingDirection?: '' | '-';
  onRowClick?: (row: T) => void;
};

export default function JoyTable<T>({
  data,
  columns,
  defaultSortingField,
  defaultSortingDirection = '',
  onRowClick,
}: Props<T>) {
  const [sortingField, setSortingField] = useState<keyof T | undefined>(defaultSortingField);
  const [sortingDirection, setSortingDirection] = useState<'' | '-'>(defaultSortingDirection);

  useEffect(() => {
    if (defaultSortingField) {
      setSortingField(defaultSortingField);
    }
  }, [defaultSortingField]);

  useEffect(() => {
    if (defaultSortingDirection) {
      setSortingDirection(defaultSortingDirection);
    }
  }, [defaultSortingDirection]);

  const sortedData = useMemo(() => {
    if (!sortingField) return data;

    const sorted = _sortBy(data, sortingField);
    return sortingDirection === '-' ? sorted.reverse() : sorted;
  }, [sortingDirection, sortingField, data]);

  const sortByField = useCallback(
    (field: keyof T, sortable: boolean = false) =>
      () => {
        if (!sortable) return;

        if (sortingField === field) {
          setSortingDirection(sortingDirection === '-' ? '' : '-');
        } else {
          setSortingField(field);
          setSortingDirection('');
        }
      },
    [sortingField, sortingDirection],
  );

  return (
    <div className='shadow my-6'>
      <header className='flex bg-bg-light-dark dark:bg-bg-dark-dark opacity-60 w-full text-xs font-semibold'>
        {columns.map((column, index) => (
          <div
            key={index}
            className={cx('grow shrink flex items-center py-1 px-4', {
              'grow-0 shrink-0': column.widthPercentage || column.widthRem,
              'cursor-pointer hover:opacity-75': column.sortable,
            })}
            onClick={sortByField(column.dataKey, column.sortable)}
            style={{
              flexBasis: column.widthPercentage
                ? `${column.widthPercentage}%`
                : column.widthRem
                  ? `${column.widthRem}rem`
                  : 0,
            }}
          >
            <div>
              {column.sortable && sortingField === column.dataKey ? (
                <>
                  <span className='text-text-highlight'>{column.label}</span>
                  <AwesomeIcon
                    size='sm'
                    icon={sortingDirection === '-' ? faSortUp : faSortDown}
                    className={`ml-1`}
                  />
                </>
              ) : (
                column.label
              )}
            </div>
          </div>
        ))}
      </header>

      {sortedData.map((item, index) => (
        <div
          className={cx(
            'flex w-full dark:bg-bg-dark-light hover:dark:bg-hover-bg-dark hover:bg-hover-bg-light ' +
              'bg-white border-t border-border-light dark:border-border-dark',
            { 'cursor-pointer': !!onRowClick },
          )}
          key={index}
          onClick={() => onRowClick && onRowClick(item)}
        >
          {columns.map((column) => (
            <div
              key={((column.dataKey as string) + column.label) as string}
              className={cx('grow shrink flex items-center py-2 px-4', column.className || '', {
                'grow-0 shrink-0': column.widthPercentage || column.widthRem,
              })}
              style={{
                flexBasis: column.widthPercentage
                  ? `${column.widthPercentage}%`
                  : column.widthRem
                    ? `${column.widthRem}rem`
                    : 0,
              }}
            >
              <CellRenderer<T> column={column} item={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
