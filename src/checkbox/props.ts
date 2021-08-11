/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-07-17 18:09:07
 * */

import { PropType } from 'vue';
import { TdCheckboxProps } from './type';

export default {
  /** 是否选中 */
  checked: Boolean,
  /** 是否选中，非受控属性 */
  defaultChecked: Boolean,
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否为半选 */
  indeterminate: Boolean,
  /** HTM 元素原生属性 */
  name: {
    type: String,
    default: '',
  },
  /** 组件是否只读 */
  readonly: Boolean,
  /** 复选框的值 */
  value: {
    type: [String, Number] as PropType<TdCheckboxProps['value']>,
  },
  /** 值变化时触发 */
  onChange: Function as PropType<TdCheckboxProps['onChange']>,
};
