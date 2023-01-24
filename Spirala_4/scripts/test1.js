let assert = chai.assert;

describe('Provjerava broj prisustva', () => {
  it('Izbaciti gresku ako je broj prisustva manji od 0', () => {
    let errorThrown = false;
    for (let attendance of array.prisustva) {
      if (attendance.predavanja < 0 || attendance.vjezbe < 0) {
        errorThrown = true;
        break;
      }
    }
    assert.equal(errorThrown, false, 'Podaci nisu validni!')
  });
})

describe('Provjerava unos prisustva vise puta za istu sedmicu', () => {
  it('Izbacuje error ako isti student ima dva ili više unosa prisustva za istu sedmicu', () => {
    let duplicateFound = false;
    // Iterate through each attendance entry
    for (let i = 0; i < array.prisustva.length; i++) {
      // Iterate through the rest of the attendance entries
      for (let j = i + 1; j < array.prisustva.length; j++) {
        // Check if the student index and week match for both entries
        if (array.prisustva[i].index === array.prisustva[j].index && array.prisustva[i].sedmica === array.prisustva[j].sedmica) {
          duplicateFound = true;
          break;
        }
      }
    }
    assert.equal(duplicateFound, false, 'Podaci nisu validni!')
  });
});

describe('Dupli indexi', () => {
  it('Izbaciti gresku ako postoje studenti sa istim indexom', () => {
    let duplicateFound = false;
    // Iterate through each student
    for (let i = 0; i < array.studenti.length; i++) {
      // Iterate through the rest of the students
      for (let j = i + 1; j < array.studenti.length; j++) {
        // Check if the student index match for both students
        if (array.studenti[i].index === array.studenti[j].index) {
          duplicateFound = true;
          break;
        }
      }
    }
    assert.equal(duplicateFound, false, 'Podaci nisu validni!')
  });
});

describe('Proverite da li ukupan broj predavanja i vježbi na kojima je student prisustvovao odgovara očekivanoj vrednosti', () => {
  let weeks = array.prisustva.map(a => a.sedmica);
  weeks = weeks.filter((week, index, self) => self.indexOf(week) === index);
  it('Nece ispisati gresku ako odgovara ocekivanoj vrijednosti', () => {
    let errorThrown = false;
    for (let student of array.studenti) {
      let totalPredavanja = 0;
      let totalVjezbe = 0;
      for (let attendance of array.prisustva) {
        if (attendance.index === student.index) {
          totalPredavanja += attendance.predavanja;
          totalVjezbe += attendance.vjezbe;
        }
      }
      let expectedTotalPredavanja = array.brojPredavanjaSedmicno * weeks.length;
      let expectedTotalVjezbe = array.brojVjezbiSedmicno * weeks.length;
      if (totalPredavanja !== expectedTotalPredavanja || totalVjezbe !== expectedTotalVjezbe) {
        errorThrown = true;
        break;
      }
    }
    assert.equal(errorThrown, true, 'Podaci nisu validni!')
  });
});

describe('Provjerite da li ukupan broj sedmica sa prisustvom odgovara broju sedmica u semestru', () => {
  let weeks = array.prisustva.map(a => a.sedmica);
  weeks = weeks.filter((week, index, self) => self.indexOf(week) === index);
  it('Nece izbaciti grešku ako se ukupan broj poklapa sa brojem sedmica u semestru', () => {
    let errorThrown = false;
    let weeksWithAttendance = array.prisustva.map(a => a.sedmica);
    weeksWithAttendance = weeksWithAttendance.filter((week, index, self) => self.indexOf(week) === index);
    if (weeksWithAttendance.length !== weeks.length) {
      errorThrown = true;
    }
    assert.equal(errorThrown, false, 'Podaci nisu validni!')
  });
});

describe('Provjerite da ukupan broj predavanja i vježbi na kojima je student prisustvovao ne prelazi broj održanih sedmično', () => {
  it('Nece izbaciti grešku ako ukupan broj ne prelazi broj održanih nedeljno', () => {
    let errorThrown = false;
    for (let attendance of array.prisustva) {
      if (attendance.predavanja > array.brojPredavanjaSedmicno || attendance.vjezbe > array.brojVjezbiSedmicno) {
        errorThrown = true;
        break;
      }
    }
    assert.equal(errorThrown, false, 'Podaci nisu validni!')
  });
});



