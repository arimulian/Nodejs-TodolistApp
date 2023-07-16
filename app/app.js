import { listTodo, removeTodo, saveTodo } from './services.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  // NOTE:  Menampilkan data todo
  .command({
    command: 'list',
    desc: 'Menampilkan list Todo',
    handler: () => {
      listTodo();
    },
  })
  // NOTE:  Menambahkan data todo
  .command({
    command: 'add',
    desc: 'Menambahkan data Todo',
    builder: {
      nama: {
        describe: 'Nama',
        demandOption: false,
        type: 'string',
      },
      todo: {
        describe: 'Todo',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      saveTodo(argv.nama, argv.todo);
    },
  })
  //NOTE: Comand Menhapus Data todo
  .command({
    command: 'delete',
    desc: 'Menghapus data todo',
    builder: {
      index: {
        desc: 'Index dari data todo',
        demandOption: true,
        type: 'number'
      }
    },
    handler: (argv) => {
      console.log(removeTodo(argv.index))
    }
  })
  .demandCommand()
  .parse();
