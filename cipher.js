//var message = ""

var cipher = {
  "alphabet": "abcdefghijklmnopqrstuvwxyz ",
  "encode": function(message, keyword) {
    var self = this;
    var cipherIndex = [];
    var ciphertext = "";
    var newKey = "";
    var repeatKeyFull = parseInt(message.length / keyword.length);
    var repeatKeyPartial = message.length % keyword.length;
    if (repeatKeyFull >= 1) {
      for (var i=0; i<repeatKeyFull; i++) {
        newKey += keyword;
      }
      for (var i=0; i<repeatKeyPartial; i++) {
        newKey += keyword.charAt(i);
      }
    }
    else {
      newKey = keyword;
    }
    for (i=0; i<message.length; i++) {
      var cipherNum = self.alphabet.indexOf(message.charAt(i)) + self.alphabet.indexOf(newKey.charAt(i))
      cipherIndex.push(cipherNum % self.alphabet.length);
    }
    for (var i in cipherIndex) {
      ciphertext += self.alphabet.charAt(cipherIndex[i]);
    }
    return ciphertext;
  },
  "decode": function(message, keyword) {
    var self = this;
    var cipherIndex = [];
    var ciphertext = "";
    var newKey = "";
    var repeatKeyFull = parseInt(message.length / keyword.length);
    var repeatKeyPartial = message.length % keyword.length;
    if (repeatKeyFull >= 1) {
      for (var i=0; i<repeatKeyFull; i++) {
        newKey += keyword;
      }
      for (var i=0; i<repeatKeyPartial; i++) {
        newKey += keyword.charAt(i);
      }
    }
    else {
      newKey = keyword;
    }
    console.log(newKey);
    for (i=0; i<message.length; i++) {
      var cipherNum = self.alphabet.indexOf(message.charAt(i)) - self.alphabet.indexOf(newKey.charAt(i))
      cipherIndex.push((cipherNum + self.alphabet.length) % self.alphabet.length);
    }
    console.log(cipherNum)
    console.log(cipherIndex)
    for (var i in cipherIndex) {
      ciphertext += self.alphabet.charAt(cipherIndex[i]);
    }
    console.log(ciphertext)
    return ciphertext;
  },
  "makeSecret": function(message, keyword) {
    var secretMessage = this.encode(message, keyword);
    return secretMessage;
  },
  "revealSecret": function(message, keyword) {
    var secretMessage = this.decode(message, keyword);
    return secretMessage;
  }
}

var app = {
  "encodeMessage": document.getElementById("encodeMessage"),
  "encodeKeyword": document.getElementById("encodeKeyword"),
  "decodeMessage": document.getElementById("decodeMessage"),
  "decodeKeyword": document.getElementById("decodeKeyword"),
  "encodeButton": document.getElementById("encodeButton"),
  "decodeButton": document.getElementById("decodeButton"),
  "run": function(){
    this.encodeButton.addEventListener("click", function() {
      var secretMessage = cipher.makeSecret(this.encodeMessage.value, this.encodeKeyword.value);
      alert("Here's your encoded message: " + secretMessage +
            "\n\nHere's your keyword: " + this.encodeKeyword.value +
            "\n\nRemember your keyword, you need it to decode the message.");
    }.bind(this));
    this.decodeButton.addEventListener("click", function() {
      var secretMessage = cipher.revealSecret(this.decodeMessage.value, this.decodeKeyword.value);
      alert("Here's your decoded message: " + secretMessage);
    }.bind(this));
  }
}
app.run();
