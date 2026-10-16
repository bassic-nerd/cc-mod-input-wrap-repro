import { expect, test } from 'claude-code/testing'

test('the pane draws one autoFocus Input with a constant empty value', async $ => {
  const ui = await $.ui.mount({
    plugin: 'cc-mod-input-wrap-repro',
    component: 'Pane',
    requestId: 'input-wrap',
    surface: 'terminal',
    viewport: { columns: 100, rows: 30 },
    props: { bodyColumns: 82 } as any,
  })
  expect(await ui.find({ key: 'desc' })).toBeDefined()
  await ui.input({ key: 'desc', text: 'x'.repeat(150), kind: 'change' })
  expect(await ui.find({ key: 'desc' })).toBeDefined()
  await ui.unmount()
})
