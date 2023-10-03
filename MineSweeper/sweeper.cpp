#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

//Some global constants 
//Note: The constant variables can be changed to fit the needs of individuals.
//This game was an intermediate difficulty to play according to google. 
const int BOARD_HEIGHT = 15;
const int BOARD_WIDTH = 13;
const int MAX_BOMBS = 40;

void displayBoard(char board[][BOARD_HEIGHT], int width, int height)
{
    cout <<"   "; 

    //Few loops that will do the layout of the board. 
    //BOARD_Height = Horizontal
    //BOARD_WIDTH = Vertical 
	for (int i = 1; i <= BOARD_HEIGHT; i++) 
	{
		if (i < 10)
		{
			cout <<" "<<i<<"  ";
			
		}
		else
		{
			cout <<i<<"  ";
		}
	}
	cout <<endl;
	cout <<"  ";
	for (int x = 0; x < BOARD_HEIGHT; x++) //print out the "+---" 
	{
		cout <<"+---"; 
	}
	cout <<"+"<<endl;

	//similar to column, the following loop used to horizontal layout for the board. 
	for (int z = 1; z <= BOARD_WIDTH; z++)
	{
		cout << z;
		for (int j = 0; j < BOARD_HEIGHT; j++)
		{ 
            cout <<" | "<<board[z-1][j];
		}
		cout <<" | "<<endl;
		
		cout <<"  ";
	    for (int x = 0; x < BOARD_HEIGHT; x++)
	    {
		  cout <<"+---";
	    }
	    cout <<"+"<<endl;
	}
}

void displayMines(bool mines[][BOARD_HEIGHT], int width, int height)
{
    char info[BOARD_WIDTH][BOARD_HEIGHT]; //used to hold char array.
	for (int i = 0; i < BOARD_WIDTH; i++)
	{
		for (int x = 0; x < BOARD_HEIGHT; x++)
		{
			if (mines[i][x] == false)
			{
				info[i][x] = ' '; //the character will set to ' ' if mine array is not found.
			}
			else
			{
				info[i][x] = '*'; //Indicates the bombs. 
			}
		}
	}
	displayBoard(info, BOARD_WIDTH, BOARD_HEIGHT); 
}

bool checkStatus(char board[][BOARD_HEIGHT], bool mines[][BOARD_HEIGHT],
int width, int height)
{
    int count = 0; //number of question marks
	int track = 0; //number of mines in the board.
	for (int i = 0; i < width; i++)
	{
		for (int x = 0; x < height; x++)
		{
			if (board[i][x] == '?')
			{
				count++; //keep track of question marks, so it can used to decide if the player has won.
			}
			if (mines [i][x] == true)
			{
				track++;
			}
		}
	}
	if (count == track) //if number of question marks eqauls to bombs, the player has won the game.
	{
		cout <<endl;
		cout <<"You won!"<<endl;
		return true;
	}
	else
	{
		return false;
	}
}

int main()
{
    //seed the random number generator.
	srand(time(NULL)); 
	
	
	bool bombs[BOARD_WIDTH][BOARD_HEIGHT]= {false}; //Marks where the bombs are located.
	char info[BOARD_WIDTH][BOARD_HEIGHT];	//track what info gets displayed to the user.
	for (int i = 0; i < BOARD_WIDTH; i++)
	{
		for (int x = 0; x < BOARD_HEIGHT; x++) 
		{
			info[i][x] = '?'; //set all the values of char array to '?'.
			
		}
	}
	
	//start to generate random x and y postion.
	int x = 0;
	int y = 0;
	int numofBombs = 1; //Declared to track the number of bombs in the board.
	while (numofBombs <= MAX_BOMBS) //with stop until 10 bombs have been placed.
	{
		x = rand()%BOARD_WIDTH; //limits x value to make sure it stay inside of the range.
		y = rand()%BOARD_HEIGHT; //limits y value to make sure it stay inside of the range.
		if (bombs[x][y] == false)
		{
			bombs[x][y] = true; //Represent the mine is there. 
			numofBombs++; 
		}
	}
	
	bool hasLost = false;
	//the following while loop used to let the game to keep on running if the player
	//has not lose or win the game. 
    while (!checkStatus(info, bombs, BOARD_WIDTH, BOARD_HEIGHT) && !hasLost) 
	{
		displayBoard(info, BOARD_WIDTH, BOARD_HEIGHT); //funcation call. Used to fully design the game board.
		
		//prompt user to enter x and y values.
		cout <<"Dig at x: ";
		cin >>x;
		cout <<"Dig at y: ";
		cin >>y;
		//the following eqaution used to convert to array indice.
		x = x - 1;
		y = y - 1;
		if ( x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) //error check
		{
			cout <<"invalid x and y"<<endl;
			continue;
		}
		if (info[x][y] != '?' && info[x][y] <'1' && info[x][y] >'8')
		{
			continue;
		}
		if (bombs[x][y] == true) //if the bombs has been placed
		{
			displayMines(bombs, BOARD_WIDTH, BOARD_HEIGHT);//function call to fully create the position of mines.
			cout <<endl;
			cout <<"You hit a mine! Game over."<<endl;
			hasLost = true;
			continue;
		}
		info[x][y] = 'c'; //set xth and yth value to this character if the bool array is false.
		//start to deal with revealing square algorithm.
		bool checkAgain = true;
		while (checkAgain) //while this condition is true, the loop will keep running.
		{
			checkAgain = false;
			//the follwing nested loop used to check the elements. The main purpose of this 
			//count the number of mines in 8 spaces surrounding 'c'. If at least one mine
			//is found, the space surrounding it should set to clear or white space.
			for (int rows = 0; rows < BOARD_WIDTH; rows++)
			{
				for (int cols = 0; cols < BOARD_HEIGHT; cols++)
				{
					if (info[rows][cols] == 'c')
					{
						int mines =0;
						for (int r = rows -1; r <= rows +1; r++)
						{
							for (int c = cols -1; c <= cols +1; c++)
							{
								if (r >= 0 && r < BOARD_WIDTH)
								{
									if (c >= 0 && c < BOARD_HEIGHT)
									{
										if ( bombs[r][c] == true)
										{
											mines++;
										}
									}
								}
							}								
						}
                                                if (mines > 0)
						{
							info[rows][cols] = mines + '0'; //convert integer value to character version.
						}							
						else 
						{
							//following loop checks if there are any '?' near 'c'. If so, set them to 'c'.
							for (int r = rows -1; r <= rows +1; r++)
						    {
							   for (int c = cols -1; c <= cols +1; c++)
							   {
								   if (r >= 0 && r < BOARD_WIDTH)
								    {
									   if (c >= 0 && c < BOARD_HEIGHT)
									   {
										  if ( info[r][c] == '?')
										  {
											info[r][c] = 'c';
										  }
									   }
								    }
							   }								
						    }
							checkAgain = true;
							info[rows][cols] = ' '; //makes the board expand whenever an empty spot is found.
						}
					}
				}
			}
		}
	}
}
