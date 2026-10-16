import type { Register } from 'claude-code'

const PANE = 'input-wrap'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'input-wrap', description: 'Open the Input wrap repro pane' })
    return next(e)
  })

  on('command.run', { command: 'input-wrap' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Input wrap', focus: true })
    return { text: 'Input wrap pane opened. Type about 150 characters into the field.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, ($, e, next) => {
    if (e.surface !== 'terminal') return next(e)
    const { Box, Text, Input } = $.ui.resolve(e)
    return (
      <Box flexDirection="column" height={20}>
        <Text dimColor>Type ~150 characters. Enter logs the real length.</Text>
        <Input
          key="desc"
          autoFocus
          placeholder="describe"
          value=""
          onInput={() => {}}
          onSubmit={v => $.ui.log(`input-wrap: field holds ${v.length} chars`)}
        />
      </Box>
    )
  })
}
