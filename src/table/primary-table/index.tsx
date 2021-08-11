import baseTableProps from '../base-table-props';
import {
  DataType, TdBaseTableProps, TdPrimaryTableProps, PrimaryTableCol,
} from '../type';

import primaryTableProps from '../primary-table-props';
import SimpleTable from '../base-table';
import { prefix } from '../../config';
import mixins from '../../utils/mixins';
import expand from './mixins/expand';
import select from './mixins/select';
import sort from './mixins/sort';
import filter from './mixins/filter';
import showColumns from './mixins/show-columns';
import asyncLoadingMixin from './mixins/async-loading';
import { RenderExpandRow } from '../util/interface';
import { PageInfo } from '../../pagination/type';
import { emitEvent } from '../../utils/event';

type PageChangeContext = Parameters<TdBaseTableProps['onPageChange']>;
type ChangeContext = Parameters<TdPrimaryTableProps['onChange']>;

export default mixins(expand, select, sort, filter, showColumns, asyncLoadingMixin).extend({
  name: `${prefix}-primary-table`,
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
  computed: {
    rehandleData(): Array<DataType> {
      const data = this.sorterHandler();
      return this.asyncLoadingHandler([...data]);
    },
    rehandleColumns(): Array<PrimaryTableCol> {
      let columns = this.columns.map((col) => ({ ...col }));
      columns = this.getShowColumns([...this.columns]);
      columns = this.getSorterColumns(columns);
      columns = this.getFilterColumns(columns);
      columns = this.getSelectColumns(columns);
      columns = this.getExpandColumns(columns);
      return columns;
    },
  },
  created() {
    if (typeof this.$attrs['expanded-row-render'] !== 'undefined') {
      console.warn('The expandedRowRender prop is deprecated. Use expandedRow instead.');
    }
  },
  methods: {
    // 提供给 BaseTable 添加渲染 Rows 方法
    renderRows(params: RenderExpandRow): void {
      const { row, rowIndex, rows } = params;
      if (row.colKey === 'async-loading-row') {
        rows.splice(rowIndex, 1, this.renderAsyncLoadingRow());
        return;
      }
      this.renderExpandedRow(params);
    },

  },
  render() {
    const {
      $props, $scopedSlots, rehandleColumns, rehandleData, showColumns,
    } = this;
    const scopedSlots = {

      ...$scopedSlots,
    };
    const baseTableProps = {
      props: {
        ...$props,
        data: rehandleData,
        columns: rehandleColumns,
        provider: {
          renderRows: this.renderRows,
        },
      },
      scopedSlots,
      on: {
        ...this.$listeners,
        'page-change': (pageInfo: PageInfo, newDataSource: Array<DataType>) => {
          emitEvent<PageChangeContext>(this, 'page-change', pageInfo, newDataSource);
          emitEvent<ChangeContext>(
            this, 'change',
            { pagination: pageInfo },
            { trigger: 'pagination', currentData: newDataSource },
          );
        },
      },
    };
    return (
      <div>
        {showColumns && this.renderShowColumns()}
        <SimpleTable {...baseTableProps} />
      </div>
    );
  },
});
