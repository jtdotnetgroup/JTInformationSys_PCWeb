/**
 *  加载自定义组件
 *
 */
import Vue from 'vue'

import ButtonsGroup from '@/JITComponents/ButtonsGroup'
import TableList from '@/JITComponents/TableList'
import TreeTableList from '@/JITComponents/TreeTableList'

import { JITInputComponent, JITInputNumberComponent } from '@/JITComponents/JITInput'
import { JITSelectComponent } from '@/JITComponents/JITSelect'
import { JITSWichCmomponent } from '@/JITComponents/JITSwich'
import { JITRadioComponent } from '@/JITComponents/JITRadio'
import { JITMulitpleCheckComponent } from '@/JITComponents/JITMulitpleCheck'
import { JITDateTimePickerComponent } from '@/JITComponents/JITDateTimePicker'
import { JITUpLoadFileComponent } from '@/JITComponents/JITUpLoadFile'
import { JITUpLoadPictureComponent } from '@/JITComponents/JITUpLoadPicture'
import { JITFormItemTemplateComponent } from '@/JITComponents/JITFormItemTemplate'

Vue.use(ButtonsGroup)
Vue.use(TableList)
Vue.use(TreeTableList)
Vue.use(JITInputComponent)
Vue.use(JITInputNumberComponent)
Vue.use(JITSelectComponent)
Vue.use(JITSWichCmomponent)
Vue.use(JITRadioComponent)
Vue.use(JITMulitpleCheckComponent)
Vue.use(JITDateTimePickerComponent)
Vue.use(JITUpLoadFileComponent)
Vue.use(JITUpLoadPictureComponent)
Vue.use(JITFormItemTemplateComponent)
