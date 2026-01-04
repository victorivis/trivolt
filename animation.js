const typingSpeedMs = 135;
class Typewriter{
  static textInfo = {};
  #curText;
  #curInfo;

  setCurrentText(text){
    if(!Object.hasOwn(Typewriter.textInfo, text)){
      Typewriter.textInfo[text] = {typingProgress: 0, lastTypingTime: 0, lastTypingTime: Date.now() + typingSpeedMs};
    }

    this.#curText = text;
    this.#curInfo = Typewriter.textInfo[text];
  }

  getText(){
    const currentTime = Date.now();

    if (this.#curInfo.typingProgress < this.#curText.length) {
      if (currentTime - this.#curInfo.lastTypingTime > typingSpeedMs) {
        this.#curInfo.typingProgress++;
        this.#curInfo.lastTypingTime = currentTime;
      }
    }

    return this.#curText.substring(0, this.#curInfo.typingProgress);
  }

  reset(){
    Typewriter.textInfo = {};
  }
}