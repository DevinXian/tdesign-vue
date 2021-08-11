/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-07-17 18:09:07
 * */

import { PropType } from 'vue';
import { TdOptionProps } from './type';

export default {
  /** 是否禁用该选项 */
  disabled: Boolean,
  /** 选项描述（若不设置则默认与 value 相同） */
  label: {
    type: String,
    default: '',
  },
  /** 选项值 */
  value: {
    type: [String, Number] as PropType<TdOptionProps['value']>,
  },
};
