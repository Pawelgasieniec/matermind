// MasterMind - komputer <-> cz³owiek
// Data: 17.08.2008
// (C)2020 mgr Jerzy Wa³aszek
//-----------------------------

#include <iostream>
#include <iomanip>
#include <string>
#include <cstdlib>
#include <time.h>

using namespace std;

int main( )
{
  string Z [1296], skoder, slamacz, sklucz, sklucz2, sl;
  int zn, i, i1, i2, j, runda;

  srand ((unsigned)time (NULL));

// tworzymy zbiór Z

  for(i = 0; i < 1296; i++)
  {
    Z [i] = ""; i2 = i;
    for(j = 0; j < 4; j++)
    {
      Z [i] += char (65 + (i2 % 6));
      i2 /= 6;
    }
  }
  zn = 1296; // liczba kodów w Z

// rozgrywka

  for(runda = 1; runda < 6; runda++)
    if(zn > 0)
    {
      i2 = rand( ) % zn;
      slamacz = Z [i2];

// usuwamy wylosowane s³owo ze zbioru Z

      for(i = i2 + 1; i < zn; i++) Z [i - 1] = Z [i];
      zn--;

// wylosowane s³owo prezentujemy cz³owiekowi

      cout << "Runda " << runda << ": " << slamacz
           << setw (5)  << zn    << ": ";

// odczytujemy kod klucza

      getline(cin, sklucz);

// analizujemy dane

      if(sklucz == "xxxx") break;

// ze zbioru Z wyrzucamy nie pasuj¹ce kody

      for(i2 = i1 = 0; i1 < zn; i1++)
      {
        skoder  = Z [i1];
        sl      = slamacz;
        sklucz2 = "";
        for(i = 0; i < 4; i++)
          if(skoder [i] == slamacz [i])
          {
            sklucz2     += 'x';
            skoder [i] = '#'; // wartownik w1
            sl [i]     = '$'; // wartownik w2
          }
        for(i = 0; i < 4; i++)
          if(skoder [i] != '#')
            for(j = 0; j < 4; j++)
              if(skoder [i] == sl [j])
              {
                sklucz2  += 'o';
                sl [j]  = '$'; // wartownik w2
                break;
              }
        if(sklucz == sklucz2) Z [i2++] = Z [i1];
      }
      zn = i2;
    }
    else break;

// wyœwietlamy pozosta³e kody w Z

//  cout << endl;
//  if(sklucz != "xxxx")
//  {
//    for(i = 1; i <= zn; i++) cout << Z [i-1] << " ";
//    cout << endl << endl;
//  }
  return 0;
} 
