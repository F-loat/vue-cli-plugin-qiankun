module.exports = [
  {
    name: 'type',
    type: 'list',
    message: 'Pick a project type:',
    choices: [
      {
        name: 'master',
        value: 'master'
      },
      {
        name: 'slave',
        value: 'slave'
      }
    ]
  },
  {
    name: 'port',
    type: 'input',
    default: 8080,
    message: 'Input a slave project port:',
    when: answers => answers.type === 'slave'
  }
]
