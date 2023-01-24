let array = {
    "studenti": [{
        "ime": "Neko Nekic",
        "index": 12345
      },
      {
        "ime": "Drugi Neko",
        "index": 12346
      },
  
  
    ],
    "prisustva": [{
      "sedmica": 1,
      "predavanja": 2,
      "vjezbe": 1,
      "index": 12345
    },
    {
      "sedmica": 1,
      "predavanja": 2,
      "vjezbe": 2,
      "index": 12346
    },
    {
      "sedmica": 2,
      "predavanja": 2,
      "vjezbe": 0,
      "index": 12345
    },
    {
      "sedmica": 2,
      "predavanja": 2,
      "vjezbe": 1,
      "index": 12346
    },
    
    ],
    "predmet": "Razvoj mobilnih aplikacija",
    "brojPredavanjaSedmicno": 2,
    "brojVjezbiSedmicno": 2
  };
  
  function ProcessData(array){
  // kreiramo HTML header sa općim podacima o predmetu
  header =`<div>Predmet: ${array.predmet}</div><div>Broj Predavanja Sedmicno: ${array.brojPredavanjaSedmicno}</div><div>Broj Vjezbi Sedmicno: ${array.brojVjezbiSedmicno}</div><br>`;
  
  // koristimo funkciju map() da izdvojimo indexe svih studenata iz objekta 
  var indexi = array.studenti.map(student => student.index);
  // koristimo funkciju filter() da izdvojimo sve indexe koji se pojavljuju više puta (duplikate)
  var duplikati = indexi.filter((index, i) => indexi.indexOf(index) !== i);
  // ako postoje duplikati, u varijablu message se sprema poruka da podaci o studentima nisu validni
  if (duplikati.length >  0) {
    var message = "<div>Podaci nisu validni!</div>";
  } else {
  var table = "<table>";
  
  
  // koristimo funkciju map() da izdvojimo sve sedmice iz objekta 
  var weeks = array.prisustva.map(a => a.sedmica);
  // koristimo funkciju filter() da izdvojimo samo jedinstvene sedmice
  weeks = weeks.filter((week, index, self) => self.indexOf(week) === index);
  
  // računamo ukupan broj predavanja i vježbi koje se održavaju u toku semestra
  var UkupnoPredavanja = weeks.length * array.brojPredavanjaSedmicno;
  var UkupnoVjezbi = weeks.length * array.brojVjezbiSedmicno;
  
  // dodajemo zaglavlje tabele sa imenima i indexima studenata te nazivima sedmica
  table += "<tr><th>Ime</th><th>Index</th>";
  for (let week of weeks) {
    table += `<th>${week}</th>`;
  }
  table += "<th>Ukupno</th></tr>";
  
  // za svakog studenta dodajemo red u tabelu sa njegovim imenom, indexom i podacima o prisustvu na pojedinačnim predavanjima i vježbama
  for (let student of array.studenti) {
    table += `<tr><td>${student.ime}</td><td>${student.index}</td>`;
    for (let week of weeks) {
      // filtriramo podatke o prisustvu za određenog studenta i sedmicu
      var attendance = array.prisustva.filter(a => a.index == student.index && a.sedmica == week);
       // ako postoji više od jednog zapisa za određenog studenta i sedmicu, u varijablu message se sprema poruka da podaci o prisustvu nisu validni
      if (attendance.length > 1) {
        var message = "<div>Podaci  nisu validni!</div>";
      } else {
         // uzimamo prvi zapis (jer smo filtrirali prethodno)
        attendance = attendance[0];
        if (attendance) {
          // ako su podaci o prisustvu negativni, u varijablu message se sprema poruka da podaci o prisustvu nisu validni
          if (attendance.predavanja < 0 || attendance.vjezbe < 0) {
            var message = "<div>Podaci nisu validni!</div>";
          } else {
            // računamo postotak prisustva na predavanjima i vježbama te ispisujemo u tabelu
            table += `<td> Predavanje: ${(attendance.predavanja / array.brojPredavanjaSedmicno * 100).toFixed(0)}%<br>
            Vjezbe: ${(attendance.vjezbe / array.brojVjezbiSedmicno * 100).toFixed(0)}%</td>`;
          }
        }
      }
    }
    table += `<td><table><th>P</th><th>V</th>`;
    for (let week of weeks) {
      // filtriramo podatke o prisustvu za određenog studenta i sedmicu
      var attendance = array.prisustva.find(a => a.index == student.index && a.sedmica == week);
      if (attendance) {
        // ako postoje podaci o prisustvu, računamo postotak prisustva na predavanjima i vježbama
        var ProcenatPredavanja = attendance.predavanja / array.brojPredavanjaSedmicno * 100;
        var ProcenatVjezbi = attendance.vjezbe / array.brojVjezbiSedmicno * 100;
        // dodajemo podatke o postotku prisustva u tabelu
        table += `<tr>
          <td class="attendance-square" style="background: ${ProcenatPredavanja >= 51 ? 'green' : 'red'}; width:20px; height:20px;"></td>
        <td class="attendance-square" style="background: ${ProcenatVjezbi >= 51 ? 'green' : 'red'}; width:20px; height:20px;"></td>
        </tr>`;
    }
    }
    table += `</table></td>`;
    table += "</tr>";
   
  }}
  
  table += "</table>";
  
  document.getElementById("header").innerHTML = header;
  
  document.getElementById("table").innerHTML =  message || table;
  
  return header + table;
  
  }
  console.log(ProcessData(array));