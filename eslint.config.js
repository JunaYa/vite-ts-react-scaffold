import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['tsconfig.json', 'tsconfig.app.json', 'scripts/verifyCommit.ts'],
})
