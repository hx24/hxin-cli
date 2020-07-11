// 要执行的核心文件
// 1）要解析用户的参数
const program = require('commander')
const path = require('path')

const { version } = require('./constants.js')

// 注册命令
// program
//   .command('create') // 配置命令的名字
//   .alias('c') // 命令的别名
//   .description('create a project') // 描述
//   .action(() => { // 具体执行动作
//     console.log('create')
//   })

const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: ['hxin-cli create <project-name>'],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: ['hxin-cli config set <k> <v>', 'hxin-cli config get <k> <v>'],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
}

// 与Object.keys()相同，并且可以拿到symbol
Reflect.ownKeys(mapActions).forEach((action) => {
  const { alias, description } = mapActions[action]
  program
    .command(action) // 配置命令的名字
    .alias(alias) // 命令的别名
    .description(description) // 描述
    .action(() => {
      // 具体执行动作
      if (action === '*') {
        console.log(description)
      } else {
        // console.log(action)
        require(path.resolve(__dirname, action))(...process.argv.slice(3))
      }
    })
})

// 监听用户的help事件
// commander原生并不支持examples，这里在用户输入--help时手动输出examples
program.on('--help', () => {
  console.log('\nExamples: ')
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`  ${example}`)
    })
  })
})

// 解析用户传递过来的参数
program.version(version).parse(process.argv)
