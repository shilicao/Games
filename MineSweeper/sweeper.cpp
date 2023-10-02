#include <iostream>
#include <ctime>
#inclue <cstdlib>
using namespace std;

# Some global constants 
const int HEIGHT;
const int WIDTH;
const int MINES;
int main()
{
    displayBoard();
    displayMines();
    checkStatus();
    cout << "Hello World"<<endl;
}

void displayBoard(char board[][BOARD_HEIGHT], int width, int height);
void displayMines(bool mines[][BOARD_HEIGHT], int width, int height);
bool checkStatus(char board[][BOARD_HEIGHT], bool mines[][BOARD_HEIGHT],
int width, int height);