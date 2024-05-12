
class TrueDate {
  constructor() {
    let date = new Date();
    date = date.toString().split(' ');
    this.fullDate = `${date[2]} ${date[1]} ${date[3]}`;
    this.year = date[3];
    this.month = date[1];
    this.day = date[2];
  }

  equals(other) {
    return this.fullDate === other.fullDate;
  }
}

export default TrueDate;
