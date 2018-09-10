import * as prompts from 'prompts';
import chalk from 'chalk';

export const clear = () => {
  console.clear();
};

export const title = (msg: string) => {
  console.log(`${chalk.yellow('!')} ${msg}`);
};

export const start = (msg: string) => {
  console.log(`${chalk.green('▶')} ${msg}`);
};

export const terminate = (msg: string) => {
  console.log(`${chalk.red('⨯')} ${msg}`);
  process.exit(1);
};

export const success = (msg: string) => {
  console.log(`${chalk.green('✓')} ${msg}`);
  process.exit(1);
};

export const prompt = async (message: string, type: 'text' | 'number' | 'select' = 'text', choices: any[] = []) => {
  const promptsOpts = {
    type,
    message,
    name: 'val',
    validate: value => value !== '' && value !== null && typeof value !== 'undefined' ? true : 'Please insert value...'
  };

  if (type === 'number') {
    promptsOpts['float'] = true;
  }

  if (type === 'select') {
    promptsOpts['choices'] = choices.map(choice => ({ title: `${choice}`, value: choice }));
  }

  return (await prompts(promptsOpts, { onCancel: () => terminate('No Input: Aborted by User.') })).val;
};
