import * as React from 'react';
import { flexRender } from '@tanstack/react-table';
import { cn } from '../utils/cn';
import type { DataTableProps } from './data-table.types';
import './data-table.css';

export function DataTable<TData>({
  table,
  loading = false,
  loadingRowCount = 5,
  emptyState = 'Aucune donnée disponible.',
  errorState,
  onRowClick,
  getRowLabel,
  stickyHeader = false,
  density = 'inherit',
}: DataTableProps<TData>) {
  const columnsCount = Math.max(table.getVisibleLeafColumns().length, 1);
  const rows = table.getRowModel().rows;

  return (
    <div
      className={cn('fp-data-table', stickyHeader && 'fp-data-table--sticky')}
      data-density={density === 'inherit' ? undefined : density}
      aria-busy={loading || undefined}
    >
      <div className="fp-data-table__viewport">
        <table className="fp-data-table__table">
          <thead className="fp-data-table__head">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="fp-data-table__row fp-data-table__row--header">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="fp-data-table__header-cell"
                      aria-sort={
                        sorted === 'asc'
                          ? 'ascending'
                          : sorted === 'desc'
                            ? 'descending'
                            : canSort
                              ? 'none'
                              : undefined
                      }
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="fp-data-table__sort"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span className="fp-data-table__sort-indicator" aria-hidden="true">
                            {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
                          </span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="fp-data-table__body">
            {loading
              ? Array.from({ length: loadingRowCount }, (_, rowIndex) => (
                  <tr key={`loading-${rowIndex}`} className="fp-data-table__row" aria-hidden="true">
                    {Array.from({ length: columnsCount }, (_, cellIndex) => (
                      <td key={cellIndex} className="fp-data-table__cell">
                        <span className="fp-data-table__skeleton" />
                      </td>
                    ))}
                  </tr>
                ))
              : errorState
                ? (
                    <tr>
                      <td className="fp-data-table__state" colSpan={columnsCount}>
                        {errorState}
                      </td>
                    </tr>
                  )
                : rows.length === 0
                  ? (
                      <tr>
                        <td className="fp-data-table__state" colSpan={columnsCount}>
                          {emptyState}
                        </td>
                      </tr>
                    )
                  : rows.map((row) => {
                      const clickable = Boolean(onRowClick);
                      const label = getRowLabel?.(row);

                      return (
                        <tr
                          key={row.id}
                          className={cn(
                            'fp-data-table__row',
                            clickable && 'fp-data-table__row--interactive',
                            row.getIsSelected() && 'fp-data-table__row--selected',
                          )}
                          tabIndex={clickable ? 0 : undefined}
                          aria-label={clickable ? label : undefined}
                          aria-selected={row.getCanSelect() ? row.getIsSelected() : undefined}
                          onClick={clickable ? () => onRowClick?.(row) : undefined}
                          onKeyDown={
                            clickable
                              ? (event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    onRowClick?.(row);
                                  }
                                }
                              : undefined
                          }
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="fp-data-table__cell">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
