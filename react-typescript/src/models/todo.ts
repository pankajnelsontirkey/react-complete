export default class Todo {
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = `${todoText.split(' ').join('')}_${new Date().toISOString()}`;
  }
}
