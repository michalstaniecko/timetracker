import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBoxLabel from '../../UI/BaseBoxLabel.vue'

describe('BaseBoxLabel', () => {
  it('renders the passed label', () => {
    const wrapper = mount(BaseBoxLabel, { props: { label: 'Test Label' } })
    expect(wrapper.text()).toContain('Test Label')
  })

  it('does not render the label when it is null', () => {
    const wrapper = mount(BaseBoxLabel, { props: { label: null } })
    expect(wrapper.text()).not.toContain('null')
  })

  it('renders the label when it is an empty string', () => {
    const wrapper = mount(BaseBoxLabel, { props: { label: '' } })
    expect(wrapper.text()).toContain('')
  })
})
