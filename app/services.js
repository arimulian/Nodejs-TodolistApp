import fs from 'fs';
import chalk from 'chalk';

// Membuat directory data
const dirPath = 'data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// Membuat file todo.json
const dataPath = 'data/todo.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}
// fungsi untuk membaca content file
const loadData = () => {
  const file = fs.readFileSync('data/todo.json', 'utf-8');
  const data = JSON.parse(file);
  return data;
};
// Fungsi untuk menampilkan TodoList
const listTodo = () => {
  const data = loadData();
  if (data.length > 0) {
    console.log(chalk.blue.bold('List Todo: '));
    data.map((data, i) => {
      if (data == null) {
        return data
      }

      console.log(`${i + 1}. ${data.todo} create by ${data.nama === undefined ? 'User' : data.nama}`)
    })
  } else {
    console.log(chalk.yellow('List Todo is empty'));
  }
};

//fungsi untuk menyimpan data todo ke file json
const saveTodo = (nama, todo) => {
  const answer = { nama, todo };
  const data = loadData();
  // pengecekan data todo yang duplikat
  const isDuplicate = data.find((data) => data === todo);
  if (isDuplicate) {
    console.log(chalk.red.bold.inverse('Todo already exists'));
    return false;
  }
  data.push(answer);
  fs.writeFileSync('data/todo.json', JSON.stringify(data), 'utf-8');
  console.log(chalk.green.bold.inverse('data added successfully'));
};


// NOTE: Fungsi menghapus data todo
const removeTodo = (no) => {
  const data = loadData();
  for (let i = no; i <= data.length; i++) {
    const element = data[i - 1];
    if (element) {
      data[i - 1] = data[i]
    }
    data[i] - 1
  }
  const result = data.filter(datas => datas !== data.length)
  const dataPath = 'data/todo.json';
  fs.writeFileSync(dataPath, JSON.stringify(result), 'utf-8');
  console.log(chalk.green.bold.inverse('data deleted successfully'));
  // return newData;
}
export { saveTodo, listTodo, removeTodo };