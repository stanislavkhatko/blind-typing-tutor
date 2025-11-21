export default class Generator {
  constructor(args) {
    this.interval = args.interval || 6e4;
    this.number = args.number || 8;
    this.words = this._update();

    this.intervalId = setInterval(() => {
      this.words = this._update();
    }, this.interval);
  }

  /**************
  * PRIVATE
  **************/
  _rand(low, high) { 
    return Math.floor((high-low+1)*Math.random())+Math.floor(low)
  }

  _update() {
    let output = [];

    for(let i = 0; i < this.number; i++)
      output.push(words[this._rand(0, words.length-1)])
    
    return output;
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    return array;
  }

  /**************
  * PUBLIC
  **************/
  getWords() {
    return this._shuffle(this.words).join(' ');
  }

  getOne() {
    let output = [];

    let word = words[this._rand(0, words.length - 1)];

    for(let i = 0; i < this.number; i++)
      output.push(word);

    return output.join(' ');
  }

  dispose() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

}

