const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  },
};

cat.jumps();
console.log(cat.lives);
