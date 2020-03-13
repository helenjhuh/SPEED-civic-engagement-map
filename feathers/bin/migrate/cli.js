const meow = require('meow');

const cli = meow(`
  Usage
  $ woof migrate <modelname> <count>

  Options
    --count, -c How many records do you want to create
    --model, -m What data model do you want to create

  Examples
    $ woof migrate users 30 
    $ woof migrate projects 100

`, {
  flags: {
    count: { type: 'number', alias: 'c' },
    model: { type: 'string', alias: 'm' }
  }
});

const handleCLI = (command, flags) => {
  console.log(command, flags);
};

const {input, flags} = cli;
handleCLI(input, flags);
